import { getStore } from "../../../services/storeService";
import Web3 from "web3";
import { VALIDATOR_TIMEOUT } from '../tokens/config';
import { SUPPORTED_RPC_URLS } from './config';
import { EventData } from 'web3-eth-contract'
import ERC20_ABI from "../abis/ERC20_ABI.json";
import ERC677_ABI from "../abis/ERC677_ABI.json";
import MEDIATOR_ABI from "../abis/MEDIATOR_ABI.json";
import { MEDIATOR_CONTRACTS } from "./contracts";

export const handleBridgeMode = function(confirmTx: any) {
    const contracts = getMediatorContracts(confirmTx)
    switch (contracts.bridgeMode) {
        case "amb_native_erc":
            nativeTransfer(confirmTx, contracts)
            break
        case "multi_amb_erc_erc":
            tokenTransfer(confirmTx, contracts)
            break
    }
}

export const getMediatorContracts = function(confirmTx: any) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    let bridgeMode;
    if (confirmTx.sourceAsset === 'eth' || confirmTx.sourceAsset === 'elaeth' || confirmTx.sourceAsset === 'ela' || confirmTx.sourceAsset === 'ethela') {
        bridgeMode = 'amb_native_erc'
    } else {
        bridgeMode = 'multi_amb_erc_erc'
    }

    console.log(confirmTx)
    let source = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.sourceNetwork][confirmTx.type]
    let dest = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.sourceNetwork].release
    if (confirmTx.type === "release") {
        source = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.destNetwork][confirmTx.type]
        dest = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.destNetwork].mint
    }

    const contracts = {
        bridgeMode: bridgeMode,
        source: source,
        sourceMediator: new web3.eth.Contract(MEDIATOR_ABI, source),
        dest: dest,
        minTx: MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.sourceNetwork].minTx,
        maxTx: MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.sourceNetwork].maxTx,
    }

    return contracts
}


export const nativeTransfer = async function(confirmTx: any, contracts: any) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    const from = confirmTx.sourceAddress
    const recipient = confirmTx.destAddress
    const value = web3.utils.toWei(String(confirmTx.amount), "ether")

    // const asset = store.get("token")
    const mediatorConfs = confirmTx.confirmations
    store.set("confirmationTotal", mediatorConfs)

    if (confirmTx.type === 'mint') {

        store.set("transactionType", "relay")
        store.set("waitingApproval", true)
        await contracts.sourceMediator.methods.relayTokens(recipient).send({
            from: from,
            value: value,
        }, (error: any, hash: any) => {
            if (error) {
                if (error.code === 4001) {
                    store.set("waitingApproval", false)
                    store.set("txRejected", true)
                } else {
                    store.set("waitingApproval", false)
                    store.set("unknownError", true)
                }
                return console.error(error);
            } else {
                // return callback(hash);
                store.set("sourceTxID", hash)
            }
        })
            .on("transactionHash", (tx: any) => {
                store.set("transferInProgress", true);
                store.set("waitingApproval", false);
                store.set("confirming", true);
                store.set("confirmationStep", 1);
            })
            .on('receipt', function(receipt: any) {
                console.log('receipt')
            })
            .on('confirmation', function(confirmationNumber: number, receipt: any) {
                const confirmed = updateRelayConfirmations(confirmationNumber, mediatorConfs)
                if (confirmed) detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork, "amb_native_erc")
            })
            .on('error', function(error: any) {
                if (error.code === 4001) {
                    store.set("confirming", false)
                    store.set("txRejected", true)
                } else {
                    store.set("confirming", false)
                    store.set("unknownError", true)
                }
            })

    } else if (confirmTx.type === 'release') {

        const token = new web3.eth.Contract(ERC677_ABI, confirmTx.address);

        store.set("waitingApproval", true);
        store.set("transactionType", "relay")
        await token.methods.transferAndCall(contracts.source, value, recipient).send({ from }, (error: any, hash: any) => {
            if (error) {
                if (error.code === 4001) {
                    store.set("waitingApproval", false)
                    store.set("txRejected", true)
                } else {
                    store.set("waitingApproval", false)
                    store.set("unknownError", true)
                }
                return console.error(error);
            } else {
                store.set("sourceTxID", hash)
                store.set("transactionType", "approveConfs")
            }
        })
            .on("transactionHash", (tx: any) => {
                store.set("transferInProgress", true);
                store.set("waitingApproval", false);
                store.set("confirming", true);
                store.set("confirmationStep", 1);
            })
            .on('confirmation', function(confirmationNumber: number, receipt: any) {
                const confirmed = updateRelayConfirmations(confirmationNumber, mediatorConfs)
                if (confirmed) detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork, "amb_native_erc")
            })
            .on('error', function(error: any) {
                if (error.code === 4001) {
                    store.set("confirming", false)
                    store.set("txRejected", true)
                } else {
                    store.set("confirming", false)
                    store.set("unknownError", true)
                }
            })
    }

}

export const tokenTransfer = async function(confirmTx: any, contracts: any) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    const from = store.get("localWeb3Address")
    const token = new web3.eth.Contract(ERC20_ABI, confirmTx.address);

    if (contracts.sourceMediator) {
        const value = web3.utils.toWei(String(confirmTx.amount), "ether")

        // const excessValue = web3.utils.toWei(String(Number(confirmTx.amount)* 1000000)), "ether")
        // const allowance = await token.methods.allowance(from, to).call()
        // console.log('allowance', allowance)
        // if (toBN(allowance).lt(toBN(value))) {

        // ApproveSpend
        store.set("waitingApproval", true);
        store.set("transactionType", "approve")
        await token.methods.approve(contracts.source, value).send({ from }, (error: any, hash: any) => {
            if (error) {
                if (error.code === 4001) {
                    store.set("waitingApproval", false)
                    store.set("txRejected", true)
                } else {
                    store.set("waitingApproval", false)
                    store.set("unknownError", true)
                }
                return console.error(error);
            } else {
                // return callback(hash);
                store.set("sourceTxID", hash)
                store.set("transactionType", "approveConfs")
            }
        })
            .on('receipt', function(receipt: any) {
                store.set("waitingApproval", false);
            })

        relayTokens(contracts, confirmTx.address, value, from, confirmTx)
    }
}

export const relayTokens = async function(contracts: any, tokenAddress: string, value: number, from: string, confirmTx: any) {
    const store = getStore();
    const sourceMediator = contracts.sourceMediator
    const mediatorConfs = confirmTx.confirmations
    const recipient = confirmTx.destAddress
    store.set("confirmationTotal", mediatorConfs)

    store.set("transactionType", "relay")
    store.set("waitingApproval", true)
    await sourceMediator.methods.relayTokens(tokenAddress, recipient, value).send({
        from
    }, (error: any, hash: any) => {
        if (error) {
            if (error.code === 4001) {
                store.set("waitingApproval", false)
                store.set("txRejected", true)
            } else {
                store.set("waitingApproval", false)
                store.set("unknownError", true)
            }
            return console.error(error);
        } else {
            store.set("sourceTxID", hash)
        }
    })
        .on("transactionHash", (tx: any) => {
            store.set("transferInProgress", true);
            store.set("waitingApproval", false);
            store.set("confirming", true);
            store.set("confirmationStep", 1);
        })
        .on('confirmation', function(confirmationNumber: number, receipt: any) {
            const confirmed = updateRelayConfirmations(confirmationNumber, mediatorConfs)
            if (confirmed) detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork, "multi_amb_erc_erc")

        })
        .on('error', function(error: any) {
            if (error.code === 4001) {
                store.set("confirming", false)
                store.set("txRejected", true)
            } else {
                store.set("confirming", false)
                store.set("unknownError", true)
            }
        })
}

export const updateRelayConfirmations = function(confirmationNumber: number, confirmationTotal: number) {
    const store = getStore();
    store.set("confirmationTotal", confirmationTotal);

    if (confirmationNumber === confirmationTotal) {
        store.set("confirmationNumber", confirmationNumber);
        setTimeout(() => {
            store.set("confirmationStep", 2);
            store.set("confirmationNumber", 0);
        }, 1000);
        return true
    } else if (confirmationNumber < confirmationTotal) {
        confirmationNumber++;
        store.set("confirmationNumber", confirmationNumber);
    }
}

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const detectExchangeFinished = async function(recipient: any, value: any, dest: string, destNetwork: string, type: string) {
    const store = getStore();
    const web3 = new Web3(new Web3.providers.HttpProvider(SUPPORTED_RPC_URLS[destNetwork]))

    let abi = NATIVE_ERC_MEDIATOR_ABI
    if (type === "multi_amb_erc_erc") {
        abi = ERC_ERC_MEDIATOR_ABI
    }
    // Odd issue with importing mediator ABI. TokensBridged 3 vs 4 inputs
    const contract = new web3.eth.Contract(abi, dest)

    let fromBlock = await web3.eth.getBlockNumber()
    const stopTime = Date.now() + VALIDATOR_TIMEOUT
    while (Date.now() <= stopTime) {
        const currentBlock = await web3.eth.getBlockNumber()

        const events: EventData[] = await contract.getPastEvents('TokensBridged', {
            fromBlock,
            toBlock: currentBlock
        }, function(error: any, event: any) {
            // Error handling
        })

        const confirmationEvent = events.filter(event => event.returnValues.recipient === recipient)

        if (confirmationEvent.length > 0) {
            const txID = confirmationEvent[0].transactionHash
            store.set("destTxID", txID);
            store.set("confirming", false);
            store.set("transferSuccess", true);
            return
        }
        fromBlock = currentBlock
        await wait(4000);
    }

    if (Date.now() > stopTime) {
        // console.log('Mediator contract TokensBridged timeout. Over 5 minutes has elapsed.')
        store.set("confirming", false)
        store.set("validatorTimeout", true)
        return
    }
}

export const ERC_ERC_MEDIATOR_ABI: any =
    [{
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "token", "type": "address" },
            { "indexed": true, "name": "recipient", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" },
            { "indexed": true, "name": "messageId", "type": "bytes32" }
        ],
        "name": "TokensBridged",
        "type": "event"
    }]

export const NATIVE_ERC_MEDIATOR_ABI: any =
    [{
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "recipient", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" },
            { "indexed": true, "name": "messageId", "type": "bytes32" }
        ],
        "name": "TokensBridged",
        "type": "event"
    }]

