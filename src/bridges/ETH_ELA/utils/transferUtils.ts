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
    startTokenTransfer(confirmTx)
    // testTokenEvents(confirmTx)
    // testing()
}

export const startTokenTransfer = async function(confirmTx: any) {
    console.log(confirmTx)

    const store = getStore();
    const web3 = store.get("localWeb3")
    const from = store.get("localWeb3Address")
    const recipient = confirmTx.destAddress
    const Contract = web3.eth.Contract;

    const asset = TOKENS[confirmTx.sourceAsset]
    const token = new Contract(ERC20_ABI, asset.address);

    let to = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.sourceNetwork][confirmTx.type]
    let destContract = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.sourceNetwork].release
    if (confirmTx.type === "release") {
        to = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.destNetwork][confirmTx.type]
        destContract = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.destNetwork].mint
    }
    const minTx = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.sourceNetwork].minTx
    const maxTx = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.sourceNetwork].maxTx
    const mediatorConfs = TOKENS[confirmTx.sourceAsset].confirmations
    store.set("confirmationTotal", mediatorConfs)
    const sourceBridge = new Contract(MEDIATOR_ABI, to);

    if (sourceBridge) {
        const value = web3.utils.toWei(String(confirmTx.amount), "ether")

        if (value < minTx) {
            store.set("minTx", (minTx / 1000000000000000000).toFixed(2))
            store.set("belowMinTxLimit", true)
            return
        } else if (value > maxTx) {
            store.set("maxTx", (maxTx / 1000000000000000000).toFixed(2))
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
        // const approve = 
        await token.methods.approve(to, value).send({ from }, (error: any, hash: any) => {
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

        // RelayTokens
        store.set("transactionType", "relay")
        store.set("waitingApproval", true)

        // const receipt =
        await sourceBridge.methods.relayTokens(recipient, value).send({
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
                detectExchangeFinished(recipient, value, destContract, confirmTx.destNetwork)
            })
            .on('error', function(error: any) {
                store.set("confirmationProgress", false)
                store.set("unknownError", true)
            })

    }
};

export const startNativeTransfer = async function(confirmTx: any) {
    // Fill
};


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
const TIMEOUT = 180000

export const detectExchangeFinished = async function(recipient: any, value: any, destContract: string, destNetwork: string) {
    const store = getStore();
    const web3 = new Web3(new Web3.providers.HttpProvider(SUPPORTED_RPC_URLS[destNetwork]))
    const contract = new web3.eth.Contract([{
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "messageId",
                "type": "bytes32"
            }
        ],
        "name": "TokensBridged",
        "type": "event"
    }], destContract)

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
