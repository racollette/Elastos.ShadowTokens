import { getStore } from "../../../services/storeService";
import { EventData, Contract } from 'web3-eth-contract'
// import { toWei } from 'web3-utils'
import ERC20_ABI from "../abis/ERC20_ABI.json";
import { TOKENS } from '../tokens'
import { MEDIATOR_ABI } from "../abis/Mediator";
import { MEDIATOR_CONTRACTS } from "./contracts";

export const handleBridgeMode = function(confirmTx: any) {
    startTokenTransfer(confirmTx)
}

export const startTokenTransfer = async function(confirmTx: any) {
    console.log(confirmTx)

    const store = getStore();
    const web3 = store.get("localWeb3")
    const from = store.get("localWeb3Address")
    const Contract = web3.eth.Contract;

    const asset = TOKENS[confirmTx.sourceAsset]
    const token = new Contract(ERC20_ABI, asset.address);
    let to = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.sourceNetwork][confirmTx.type]
    if (confirmTx.type === "release") {
        to = MEDIATOR_CONTRACTS.bridgeMode[asset.bridgeMode][confirmTx.destNetwork][confirmTx.type]
    }
    const mediatorConfs = TOKENS[confirmTx.sourceAsset].confirmations
    store.set("confirmationTotal", mediatorConfs)
    const bridge = new Contract(MEDIATOR_ABI, to);
    // console.log('bridge contract', bridge)

    if (bridge) {
        const value = web3.utils.toWei(String(confirmTx.amount), "ether")
        // const excessValue = web3.utils.toWei(String(Number(confirmTx.amount)* 1000000)), "ether")

        // const allowance = await token.methods.allowance(from, to).call()
        // console.log('allowance', allowance)
        // if (toBN(allowance).lt(toBN(value))) {

        // ApproveSpend
        store.set("transactionType", "approve")
        // const approve
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
            .on("transactionHash", (tx: any) => {
                console.log('transactionhash')
            })
            .on('receipt', function(receipt: any) {
                store.set("waitingApproval", false);
            })
        // .on('confirmation', function(confirmationNumber: number, receipt: any) {
        //     console.log(confirmationNumber)
        //     if (confirmationNumber === 1) {
        //         store.set("waitingApproval", false);
        //     }
        // })


        // RelayTokens
        store.set("transactionType", "relay")
        store.set("waitingApproval", true)

        // const receipt
        await bridge.methods.relayTokens(from, value).send({
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
            })

        detectExchangeFinished(from, value, bridge)
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
            setTimeout(() => {
                store.set("transferSuccess", true);
            }, 2000);
        }, 5000);
    } else {
        confirmationNumber++;
        store.set("confirmationNumber", confirmationNumber);
    }
}

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))
const TIMEOUT = 9180000

export const detectExchangeFinished = async function(account: any, value: any, contract: Contract) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    // const contract = new web3.eth.Contract(MEDIATOR_ABI, this.assetABridge)
    // waitForEvent(web3, contract, 'TokensBridged', processMediatorEvents(account))
    let fromBlock = await web3.eth.getBlockNumber()

    const stopTime = Date.now() + TIMEOUT
    while (Date.now() <= stopTime) {
        const currentBlock = await web3.eth.getBlockNumber()

        console.log(contract)
        const events: EventData[] = await contract.getPastEvents('TokensBridged', {
            fromBlock,
            toBlock: currentBlock
        }, function(error: any, event: any) { console.log(event); })

        console.log(events)
        // const confirmationEvent = events.filter(event => event.returnValues.transactionHash === sendResult.txHash)
        const confirmationEvent = events

        if (confirmationEvent.length > 0) {
            return;
        }
        fromBlock = currentBlock
        await wait(5000);
    }
}

// export const processMediatorEvents: Function = function(account: any) {
//     // return events => {
//     //     const confirmationEvent = events.filter(
//     //         event => event.returnValues.recipient.toLowerCase() === account.toLowerCase()
//     //     )
//     //     return confirmationEvent.length > 0
//     // }
//     return null
// }


// export const isBridgeContract = async (contract: Contract): Promise<boolean> => {
//   try {
//     await contract.methods.deployedAtBlock().call()
//     return true
//   } catch (e) {
//     return false
//   }
// }