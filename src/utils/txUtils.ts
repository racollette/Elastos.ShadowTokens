import { getStore } from "../services/storeService";

export const MIN_TX_AMOUNTS = {
    ela: 0.00035036,
    eth: 0.00035036,
    usdt: 0.00035036,
    wela: 0.00035036,
    weth: 0.00035036,
    wusdt: 0.00035036,
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
    console.log(fees)
    let selectedAsset = store.get("selectedAsset");
    console.log(selectedAsset)

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

export default {};
