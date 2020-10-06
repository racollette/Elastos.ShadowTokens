import { getStore } from "../services/storeService";

export const updateConfirmations = function(confirmation: number) {
    const store = getStore();
    const confirmationTotal = store.get("confirmationTotal");
    let confirmationNumber = store.get("confirmationNumber");

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
