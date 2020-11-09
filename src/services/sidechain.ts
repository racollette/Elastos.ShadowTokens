import { getStore } from "./storeService";
import { SIDECHAIN_TRANSFER_TIMEOUT } from "./config"
import { fetchTokenBalance } from "../bridges/ETH_ELA/utils/walletUtils"
import { ELA } from '../bridges/ETH_ELA/tokens/ELA'

export const depositELA = async function() {
    const store = getStore();
    const address = store.get("localWeb3Address")
    if (address.length === 0) return
    store.set("depositInProgress", 0)
    store.set("depositStatus", "Sidechain.Deposit.Renewal.Waiting")

    const req = {
        "user_did": address,
        "src_chain_id": 1,
        "back_addr": "EYH69rRAfDQ2HRa35bmYRh6UoAZ8u3n7ZJ",
        "dst_chain_id": 3,
        "dst_addr": address
    };

    try {
        const generateAddress = await fetch("https://transfer.elaphant.net/api/1/ela_exchange/generator", {
            body: JSON.stringify(req),
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: "POST",
        });
        const response = (await generateAddress.json())
        const depositAddress = response.data.src_chain_addr;
        const exchangeID = response.data.exchange_id;
        store.set("monitoringTransfer", false)
        store.set('depositMainchainAddress', depositAddress);
        store.set('exchangeID', exchangeID);

    } catch (e) {
        console.error(e);
    }
}

export const withdrawELA = async function(withdrawalAddress: string, withdrawalAmount: number) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    const localWeb3Address = store.get("localWeb3Address")

    let contract = new web3.eth.Contract([{ "constant": false, "inputs": [{ "name": "_addr", "type": "string" }, { "name": "_amount", "type": "uint256" }, { "name": "_fee", "type": "uint256" }], "name": "receivePayload", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_addr", "type": "string" }, { "indexed": false, "name": "_amount", "type": "uint256" }, { "indexed": false, "name": "_crosschainamount", "type": "uint256" }, { "indexed": true, "name": "_sender", "type": "address" }], "name": "PayloadReceived", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_sender", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "_black", "type": "address" }], "name": "EtherDeposited", "type": "event" }]);
    contract.options.address = "0xC445f9487bF570fF508eA9Ac320b59730e81e503";
    const value = web3.utils.toWei(withdrawalAmount.toString(), "ether")
    const cdata = contract.methods.receivePayload(withdrawalAddress, value, "100000000000000").encodeABI();
    let tx = { data: cdata, to: contract.options.address, from: localWeb3Address, value: value };

    store.set("withdrawalInProgress", 0)
    web3.eth.sendTransaction(tx)
        .on('transactionHash', function(hash: any) {
            store.set("withdrawalInProgress", 1)
            store.set("withdrawalStatus", "Sidechain.Withdraw.Waiting")
        })
        .on('confirmation', function(confirmationNumber: any, receipt: any) {
            if (confirmationNumber === 2) {
                store.set("withdrawalInProgress", 2)
                store.set("withdrawalStatus", "Sidechain.Withdraw.Complete")
            }
        })
        .on('error', console.error);

}

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const checkDepositStatus = async function() {
    const store = getStore();
    const exchangeID = store.get("exchangeID");
    const address = store.get("localWeb3Address");
    const monitoringTransfer = store.get("monitoringTransfer")


    const stopTime = Date.now() + SIDECHAIN_TRANSFER_TIMEOUT
    const startingBalance = store.get('elaBalance')
    if (monitoringTransfer) return
    while (Date.now() <= stopTime) {
        store.set("monitoringTransfer", true)

        const fetchDepositStatus = await fetch(`https://transfer.elaphant.net/api/1/ela_exchange/${address}/tx/${exchangeID}`, {
            method: "GET",
        })
        const res = (await fetchDepositStatus.json())
        if (!res.data) return

        switch (res.data.state) {
            case "renewal_waiting":
                store.set("depositStatus", "Sidechain.Deposit.Renewal.Waiting")
                store.set("depositInProgress", 0);
                break;
            case "renewal_timeout":
                store.set("depositStatus", "Sidechain.Deposit.Renewal.Timeout")
                store.set("depositInProgress", 2);
                break;
            case "transferring":
                store.set("depositStatus", "Sidechain.Deposit.Transferring")
                store.set("depositInProgress", 1);
                break;
            case "transfer_finish":
                store.set("depositStatus", "Sidechain.Deposit.Transfer.Finish")
                store.set("depositInProgress", 2);
                break;
            case "transfer_failed":
                store.set("depositStatus", "Sidechain.Deposit.Transfer.Failed")
                store.set("depositInProgress", 2);
                break;
            case "backing":
                store.set("depositStatus", "Sidechain.Deposit.Backing")
                store.set("depositInProgress", 1);
                break;
            case "back_finish":
                store.set("depositStatus", "Sidechain.Deposit.Back.Finish")
                store.set("depositInProgress", 1);
                break;
            case "back_failed":
                store.set("depositStatus", "Sidechain.Deposit.Back.Failed")
                store.set("depositInProgress", 2);
                break;
            case "direct_transferring":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transferring")
                store.set("depositInProgress", 1);
                break;
            case "direct_transferring_wait_gather":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transferring")
                store.set("depositInProgress", 1);
                break;
            case "direct_transfer_finish":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transfer.Finish")
                store.set("depositInProgress", 2);
                break;
            case "direct_transfer_failed":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transfer.Failed")
                store.set("depositInProgress", 1);
                break;
        }
        fetchTokenBalance(ELA)
        if (store.get("depositInProgress") === 2 && store.get('elaBalance') > startingBalance) {
            store.set("monitoringTransfer", false)
            return
        }

        await wait(10000);
    }

    if (Date.now() > stopTime) {
        console.log('Transfer status timeout. Over 60 minutes has elapsed.')
        store.set("monitoringTransfer", false)
        return
    }
}
