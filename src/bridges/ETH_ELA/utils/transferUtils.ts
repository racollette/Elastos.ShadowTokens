import { getStore } from "../../../services/storeService";
import Web3 from "web3";
import { EventData } from 'web3-eth-contract'
// import { toWei } from 'web3-utils'
import ERC20_ABI from "../abis/ERC20_ABI.json";
import MEDIATOR_ABI from "../abis/MEDIATOR_ABI.json";
import { TOKENS } from '../tokens'
import { MEDIATOR_CONTRACTS } from "./contracts";

// Development rpc
export const SUPPORTED_RPC_URLS: { [key in string]: string } = {
    Elastos: "https://rpc.elaeth.io", // "https://mainrpc.elaeth.io",
    Ethereum: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
}

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

export const nativeTransfer = async function(confirmTx: any, contracts: any) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    const sourceMediator = contracts.source
    const from = confirmTx.sourceAddress
    // const recipient = confirmTx.destAddress
    const value = web3.utils.toWei(String(confirmTx.amount), "ether")

    store.set("transactionType", "relay")
    store.set("waitingApproval", true)

    if (confirmTx.sourceAsset === 'eth') {
        const mediatorConfs = 8
        store.set("confirmationTotal", mediatorConfs)

        store.set("transactionType", "relay")
        store.set("waitingApproval", true)
        await web3.eth.sendTransaction({
            from: from, to: sourceMediator, value: value
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
                store.set("waitingApproval", false);
                store.set("confirmationProgress", true);
            })
            .on('receipt', function(receipt: any) {
                console.log('receipt')
                console.log(receipt)
            })
            .on('confirmation', function(confirmationNumber: number, receipt: any) {
                updateRelayConfirmations(confirmationNumber, mediatorConfs);
                detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork)
            })
            .on('error', function(error: any) {
                if (error.code === 4001) {
                    store.set("confirmationProgress", false)
                    store.set("txRejected", true)
                } else {
                    store.set("confirmationProgress", false)
                    store.set("unknownError", true)
                }
            })

    } else if (confirmTx.sourceAsset === 'elaeth') {

        const asset = TOKENS[confirmTx.sourceAsset]
        const token = new web3.eth.Contract(asset.abi, asset.address);

        const mediatorConfs = asset.confirmations
        store.set("confirmationTotal", mediatorConfs)

        await token.methods.transfer(contracts.source, value).send({ from }, (error: any, hash: any) => {
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
            .on("transactionHash", (tx: any) => {
                store.set("waitingApproval", false);
                store.set("confirmationProgress", true);
            })
            .on('confirmation', function(confirmationNumber: number, receipt: any) {
                updateRelayConfirmations(confirmationNumber, mediatorConfs);
                detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork)
            })
            .on('error', function(error: any) {
                if (error.code === 4001) {
                    store.set("confirmationProgress", false)
                    store.set("txRejected", true)
                } else {
                    store.set("confirmationProgress", false)
                    store.set("unknownError", true)
                }
            })
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

export const tokenTransfer = async function(confirmTx: any, contracts: any) {
    console.log(confirmTx)
    const store = getStore();
    const web3 = store.get("localWeb3")
    const from = store.get("localWeb3Address")

    const asset = TOKENS[confirmTx.sourceAsset]
    const tokenAddress = asset.address
    const token = new web3.eth.Contract(ERC20_ABI, asset.address);

    if (contracts.sourceMediator) {
        const value = web3.utils.toWei(String(confirmTx.amount), "ether")

        if (value < contracts.minTx) {
            store.set("minTx", (contracts.minTx / 1000000000000000000).toFixed(2))
            store.set("belowMinTxLimit", true)
            return
        } else if (value > contracts.maxTx) {
            store.set("maxTx", (contracts.maxTx / 1000000000000000000).toFixed(2))
            store.set("exceedsMaxTxLimit", true)
            return
        }
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

        relayTokens(contracts, tokenAddress, value, from, confirmTx)
    }
}

export const relayTokens = async function(contracts: any, tokenAddress: string, value: number, from: string, confirmTx: any) {
    const store = getStore();
    const sourceMediator = contracts.sourceMediator
    const mediatorConfs = TOKENS[confirmTx.sourceAsset].confirmations
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
            // return callback(hash);
            store.set("sourceTxID", hash)
        }
    })
        .on("transactionHash", (tx: any) => {
            store.set("waitingApproval", false);
            store.set("confirmationProgress", true);
        })
        .on('confirmation', function(confirmationNumber: number, receipt: any) {
            updateRelayConfirmations(confirmationNumber, mediatorConfs);
            detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork)
        })
        .on('error', function(error: any) {
            if (error.code === 4001) {
                store.set("confirmationProgress", false)
                store.set("txRejected", true)
            } else {
                store.set("confirmationProgress", false)
                store.set("unknownError", true)
            }
        })
}

export const updateRelayConfirmations = function(confirmationNumber: number, confirmationTotal: number) {
    const store = getStore();
    store.set("confirmationTotal", confirmationTotal);

    if (confirmationNumber === confirmationTotal) {
        store.set("validatorStep", true);
        setTimeout(() => {
            store.set("validatorProgress", 1);
        }, 5000);
    } else {
        confirmationNumber++;
        store.set("confirmationNumber", confirmationNumber);
    }
}

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))
const TIMEOUT = 360000

export const detectExchangeFinished = async function(recipient: any, value: any, dest: string, destNetwork: string) {
    const store = getStore();
    const web3 = new Web3(new Web3.providers.HttpProvider(SUPPORTED_RPC_URLS[destNetwork]))
    const contract = new web3.eth.Contract([
        {
            "anonymous": false,
            "inputs": [
                { "indexed": true, "name": "recipient", "type": "address" },
                { "indexed": false, "name": "value", "type": "uint256" },
                { "indexed": true, "name": "messageId", "type": "bytes32" }
            ],
            "name": "TokensBridged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                { "indexed": true, "name": "token", "type": "address" },
                { "indexed": true, "name": "recipient", "type": "address" },
                { "indexed": false, "name": "value", "type": "uint256" },
                { "indexed": true, "name": "messageId", "type": "bytes32" }
            ],
            "name": "TokensBridged",
            "type": "event"
        },
        {
            "type": "event",
            "name": "NewTokenRegistered",
            "inputs": [
                {
                    "type": "address",
                    "name": "foreignToken",
                    "indexed": true
                },
                {
                    "type": "address",
                    "name": "homeToken",
                    "indexed": true
                }
            ],
            "anonymous": false
        }
    ], dest)

    console.log(contract)

    let fromBlock = await web3.eth.getBlockNumber()
    const stopTime = Date.now() + TIMEOUT
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
            store.set("transferSuccess", true);
            return;
        }
        fromBlock = currentBlock
        await wait(4000);
    }
}
