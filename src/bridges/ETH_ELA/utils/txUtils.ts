import { getStore } from "../../../services/storeService";
import { CONVERT_MAP, NETWORK_TYPE, fetchTokenBalance } from "./walletUtils";

export const MIN_TX_AMOUNTS = {
    ela: 0.0035036,
    eth: 0.0035036,
    usdt: 0.0035036,
    dai: 0.0035036,
    usdc: 0.0035036,
    main: 0.0035036,
    ethela: 0.0035036,
    elaeth: 0.0035036,
    elausdt: 0.0035036,
    eladai: 0.0035036,
    elausdc: 0.0035036,
    elamain: 0.0035036,
};

// Percentage fees
export const FEE_STRUCTURE: { [key in string]: number } = {
    ela: 0.1,
    eth: 0.1,
    usdt: 0.1,
    dai: 0.1,
    usdc: 0.1,
    main: 0.1,
    ethela: 0.1,
    elaeth: 0.1,
    elausdt: 0.1,
    eladai: 0.1,
    elausdc: 0.1,
    elamain: 0.1,
}

// Development, switch to mainnet in prod
export const EXPLORER_URLS: { [key in string]: string } = {
    ela: "https://explorer.elaeth.io/", // https://explorer.elaeth.io/,
    eth: "https://kovan.etherscan.io", // https://etherscan.io",
    usdt: "https://etherscan.io",
    dai: "https://etherscan.io",
    usdc: "https://etherscan.io",
    main: "https://kovan.etherscan.io",
    ethela: "https://kovan.etherscan.io",
    elaeth: "https://testnet.elaeth.io/",
    elausdt: "https://explorer.elaeth.io/",
    eladai: "https://explorer.elaeth.io/",
    elausdc: "https://explorer.elaeth.io/",
    elamain: "https://testnet.elaeth.io/",
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
    let selectedAsset = store.get("selectedAsset");

    // const selectedDirection = store.get("convert.selectedDirection");
    // const fixedFeeKey = selectedDirection ? "release" : "lock";
    // const dynamicFeeKey = selectedDirection ? "burn" : "mint";

    if (!amount) {
        return;
    }

    const fixedFee = Number(FEE_STRUCTURE[selectedAsset]) / 100
    const feeFraction = (100 - Number(FEE_STRUCTURE[selectedAsset])) / 100

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
    const selectedAsset = store.get("selectedAsset")
    fetchTokenBalance(selectedAsset)
    store.set("confirmTx", false)
    store.set("confirmAction", "")
    store.set("convert.amount", "")
    store.set("waitingApproval", false)
    store.set("confirmationProgress", false)
    store.set("confirmationNumber", 0)
    store.set("validatorStep", false)
    store.set("validatorProgress", 0)
    store.set("transferSuccess", false)
}

export function switchOriginChain(selectedDirection: number) {
    const store = getStore();
    if (selectedDirection === 0) {
        store.set("convert.selectedDirection", Number(1));
    } else {
        store.set("convert.selectedDirection", Number(0));
    }

    const selectedAsset = store.get("selectedAsset")
    store.set("selectedAsset", CONVERT_MAP[selectedAsset]);
    store.set("convert.selectedFormat", CONVERT_MAP[CONVERT_MAP[selectedAsset]]);
    store.set("localWeb3Network", NETWORK_TYPE[CONVERT_MAP[selectedAsset]])
    fetchTokenBalance(CONVERT_MAP[selectedAsset])
}