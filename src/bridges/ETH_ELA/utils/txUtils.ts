import { getStore } from "../../../services/storeService";
import { EXPLORER_URLS } from "./config";
import { fetchTokenBalance } from "./walletUtils";
import { TOKENS } from "../tokens";

export const windowBlocker = function(event: any) {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    const msg =
        "WARNING: closing the browser window now may result in loss of funds. Are you sure?";

    // Chrome requires returnValue to be set.
    event.returnValue = msg;
    return msg;
};

export const setWindowBlocker = function() {
    window.addEventListener("beforeunload", windowBlocker);
};

export const removeWindowBlocker = function() {
    window.removeEventListener("beforeunload", windowBlocker);
};

export const convertWei = function(value: string, type: 'from' | 'to') {
    const store = getStore();
    const web3 = store.get("localWeb3")
    switch (type) {
        case 'from': {
            return web3.utils.fromWei(value)
        }
        case 'to': {
            return web3.utils.toWei(value)
        }
    }
}

export const gatherFeeData = async function() {
    const store = getStore();
    const amount = store.get("convert.amount");
    let selectedAsset = store.get("selectedAsset");

    if (!amount) {
        return;
    }

    const fixedFee = TOKENS[selectedAsset].fee / 100
    const feeFraction = (100 - TOKENS[selectedAsset].fee) / 100

    const total =
        Number(amount * feeFraction) > 0
            ? Number(amount * feeFraction).toFixed(6)
            : "0.000000";

    store.set("convert.networkFee", fixedFee);
    store.set("convert.conversionTotal", total);
};

export function getExplorerLink(network: 'source' | 'dest', type: 'transaction' | 'token' | 'address', txInputs: any, id: string): string {
    const symbol = txInputs[`${network}Asset`]
    const prefix = EXPLORER_URLS[TOKENS[symbol].network]
    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${id}`
        }
        case 'token': {
            return `${prefix}/token/${id}`
        }
        case 'address':
        default: {
            return `${prefix}/address/${id}`
        }
    }
}

export function restoreInitialState() {
    const store = getStore();
    const selectedAsset = store.get("selectedAsset")
    fetchTokenBalance(selectedAsset)
    store.set("confirmTx", false)
    store.set("convert.amount", "")
    store.set("waitingApproval", false)
    store.set("confirmationProgress", false)
    store.set("confirmationNumber", 0)
    store.set("transferInProgress", false)
    store.set("confirming", false)
    store.set("confirmationStep", 0)
    store.set("transferSuccess", false)
    store.set("validatorTimeout", false)

}

export function switchOriginChain(selectedDirection: number) {
    const store = getStore();
    if (selectedDirection === 0) {
        store.set("convert.selectedDirection", Number(1));
    } else {
        store.set("convert.selectedDirection", Number(0));
    }

    store.set("confirmTx", false)
    store.set("convert.amount", "")
    const selectedAsset = store.get("selectedAsset")
    store.set("selectedAsset", TOKENS[selectedAsset].destID);
    store.set("convert.selectedFormat", selectedAsset);
    fetchTokenBalance(TOKENS[selectedAsset].destID)

    // Swap bridge direction
    const bridge = store.get("selectedBridge")
    const pair = store.get("selectedPair")
    store.set("selectedBridge", pair)
    store.set("selectedPair", bridge)
}