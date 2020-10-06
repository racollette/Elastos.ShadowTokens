import { getStore } from "../services/storeService";

export const MIN_TX_AMOUNTS = {
    ela: 0.0035036,
    eth: 0.0035036,
    usdt: 0.0035036,
    wela: 0.0035036,
    weth: 0.0035036,
    wusdt: 0.0035036,
};

// Percentage fees
export const FEE_STRUCTURE: { [key in string]: number } = {
    ela: 0.3,
    eth: 0.3,
    usdt: 0.3,
    wela: 0.3,
    weth: 0.3,
    wusdt: 0.3,
}

// Development, switch to mainnet in prod
export const EXPLORER_URLS: { [key in string]: string } = {
    ela: "https://explorer.elaeth.io/", // https://explorer.elaeth.io/,
    eth: "https://kovan.etherscan.io", // https://etherscan.io",
    usdt: "https://kovan.etherscan.io",
    wela: "https://kovan.etherscan.io",
    weth: "https://testnet.elaeth.io/",
    wusdt: "https://testnet.elaeth.io/",
}

export const issueTx = function() {
    const store = getStore();
    store.set("confirmationError", null);
    store.set("waitingApproval", true);
    // const confirmTx = store.get("confirmTx");
}

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

/**
 * Calculate Fees for a Transaction
 */
export const gatherFeeData = async function() {
    const store = getStore();
    const amount = store.get("convert.amount");
    const fees = FEE_STRUCTURE
    let selectedAsset = store.get("selectedAsset");

    // const selectedDirection = store.get("convert.selectedDirection");
    // const fixedFeeKey = selectedDirection ? "release" : "lock";
    // const dynamicFeeKey = selectedDirection ? "burn" : "mint";

    if (!amount) {
        return;
    }


    const fixedFee = Number(fees[selectedAsset]) / 100
    const feeFraction = (100 - Number(fees[selectedAsset])) / 100

    const total =
        Number(amount * feeFraction) > 0
            ? Number(amount * feeFraction).toFixed(6)
            : "0.000000";

    store.set("convert.networkFee", fixedFee);
    store.set("convert.conversionTotal", total);
};

export function getExplorerLink(network: 'source' | 'dest', type: 'transaction' | 'token' | 'address', txInputs: any, id: string): string {
    const symbol = txInputs[`${network}Asset`]
    const prefix = EXPLORER_URLS[symbol]
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
    store.set("confirmBridge", false)
    store.set("confirmTx", false)
    store.set("confirmAction", "")
    store.set("waitingApproval", false)
    store.set("confirmationProgress", false)
    store.set("confirmationNumber", 0)
    store.set("validatorStep", false)
    store.set("validatorProgress", 0)
    store.set("transferSuccess", false)

}