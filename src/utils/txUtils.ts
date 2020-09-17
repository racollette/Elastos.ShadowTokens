import * as Sentry from "@sentry/react";
import firebase from "firebase";
import GatewayJS from "@renproject/gateway";
import { randomBytes } from "@renproject/utils";

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

export const windowBlocker = function (event: any) {
  // Cancel the event as stated by the standard.
  event.preventDefault();

  const msg =
    "WARNING: closing the browser window now may result in loss of funds. Are you sure?";

  // Chrome requires returnValue to be set.
  event.returnValue = msg;
  return msg;
};

export const setWindowBlocker = function () {
  window.addEventListener("beforeunload", windowBlocker);
};

export const removeWindowBlocker = function () {
  window.removeEventListener("beforeunload", windowBlocker);
};

/**
 * Create/Update/Delete Transactions on Firebase and 3box
 */
export const addTx = async (tx: any, id?: string) => {
  const store = getStore();
  const storeString = "convert.transactions";

  // const space = store.get('space')
  const db = store.get("db");
  const fsEnabled = store.get("fsEnabled");
  const localWeb3Address = store.get("localWeb3Address");
  const fsSignature = store.get("fsSignature");

  if (!fsEnabled) {
    throw new Error(
      `Unable to create transaction - not connected to database.`
    );
  }

  // add timestamps
  const timestamp = firebase.firestore.Timestamp.fromDate(new Date(Date.now()));
  tx.created = timestamp;
  tx.updated = timestamp;

  const txs = store.get(storeString);
  const newTxs = txs.concat([tx]);

  // update state
  store.set(storeString, newTxs);

  // update localStorage just in case
  localStorage.setItem(storeString, JSON.stringify(newTxs));

  // // update 3box
  // if (space) {
  //     space.private.set(storeString, JSON.stringify(newTxs))
  // }

  id = id || tx.id;

  // update firebase
  try {
    db.collection("transactions")
      .doc(id)
      .set({
        user: localWeb3Address.toLowerCase(),
        walletSignature: fsSignature,
        id,
        updated: timestamp,
        data: JSON.stringify(tx),
      });
  } catch (e) {
    const errorMessage = String(e && e.message);
    Sentry.withScope(function (scope) {
      scope.setTag("error-hint", "storing transaction");
      Sentry.captureException(e);
    });
    e.message = `Unable to store transaction to database${
      errorMessage ? `: ${errorMessage}` : "."
    }`;
    throw e;
  }
};

export const updateTx = async (newTx: any) => {
  const store = getStore();
  const storeString = "convert.transactions";
  // const space = store.get('space')
  const db = store.get("db");
  const fsEnabled = store.get("fsEnabled");
  const localWeb3Address = store.get("localWeb3Address");

  // update timestamp
  newTx.updated = firebase.firestore.Timestamp.fromDate(new Date(Date.now()));

  const txs = store.get(storeString);

  const filtered = txs.filter((t: any) => t.id !== newTx.id);
  const newTxs = filtered.concat([newTx]);

  // update state
  store.set(storeString, newTxs);

  // use localStorage
  localStorage.setItem(storeString, JSON.stringify(newTxs));

  // // update 3box
  // if (space) {
  //     space.private.set(storeString, JSON.stringify(newTxs))
  // }

  // update firebase
  if (fsEnabled) {
    const doc = (db as firebase.firestore.Firestore)
      .collection("transactions")
      .doc(newTx.id);
    let docData;
    try {
      docData = await doc.get();
    } catch (e) {
      console.error(e);
      Sentry.withScope(function (scope) {
        scope.setTag("error-hint", "missing transaction");
        Sentry.captureException(e);
      });
    }

    if (docData?.exists) {
      try {
        await doc.update({
          data: JSON.stringify(newTx),
          user: localWeb3Address.toLowerCase(),
          updated: newTx.updated,
        });
      } catch (e) {
        console.error(e);
        Sentry.withScope(function (scope) {
          scope.setTag("error-hint", "adding transaction");
          Sentry.captureException(e);
        });
      }
    } else {
      await addTx(newTx, newTx.id);
    }
  }
};

export const removeTx = async (tx: any) => {
  const store = getStore();
  const storeString = "convert.transactions";
  // const space = store.get('space')
  const db = store.get("db");
  const fsEnabled = store.get("fsEnabled");

  const txs = store.get(storeString);
  const newTxs = txs.filter((t: any) => t.id !== tx.id);

  // update local state
  store.set(storeString, newTxs);

  // update localStorage just in case
  localStorage.setItem(storeString, JSON.stringify(newTxs));

  // // update 3box
  // if (space) {
  //     space.private.set(storeString, JSON.stringify(newTxs))
  // }

  // update firebase
  if (fsEnabled) {
    try {
      await db.collection("transactions").doc(tx.id).delete();
    } catch (e) {
      console.error(e);
      Sentry.withScope(function (scope) {
        scope.setTag("error-hint", "removing transaction");
        Sentry.captureException(e);
      });
    }
  }
};

export const txExists = function (tx: any) {
  return (
    getStore()
      .get("convert.transactions")
      .filter((t: any) => t.id === tx.id).length > 0
  );
};

/**
 * Calculate Fees for a Transaction
 */
export const gatherFeeData = async function () {
  const store = getStore();
  const amount = store.get("convert.amount");
  const fees = FEE_STRUCTURE
  console.log(fees)
  let selectedAsset = store.get("selectedAsset");
  console.log(selectedAsset)

  const selectedDirection = store.get("convert.selectedDirection");
  // const fixedFeeKey = selectedDirection ? "release" : "lock";
  // const dynamicFeeKey = selectedDirection ? "burn" : "mint";

  if (!amount) {
    return;
  }


  const fixedFee = Number(fees[selectedAsset])/100
  const feeFraction = (100 - Number(fees[selectedAsset]))/100
  
  const total =
    Number(amount*feeFraction) > 0
      ? Number(amount*feeFraction).toFixed(6)
      : "0.000000";

  store.set("convert.networkFee", fixedFee);
  store.set("convert.conversionTotal", total);
};

/**
 * Mint and Burn
 */
export const initGJSDeposit = async function (tx: any) {
  const { amount } = tx;
  const store = getStore() as any;
  const { gjs, localWeb3, localWeb3Address, selectedAsset } = store.getState();

  const storableData = {
    sendToken:
      GatewayJS.Tokens[
        selectedAsset.toUpperCase() as keyof typeof GatewayJS.Tokens
      ].Mint,
    // every source asset for now uses the same unit number as BTC
    sendAmount: GatewayJS.utils.value(amount, "btc").sats().toString(),
    sendTo: localWeb3Address,
  };

  const data = {
    ...storableData,
    web3Provider: localWeb3.currentProvider,
  };

  const preOpenTrades = Array.from((await gjs.getGateways()).values());

  const id = randomBytes(8);
  await addTx(storableData, id);

  let trade: any = null;
  const open = gjs.open(data, id);
  open
    .result()
    .on("status", async (status: any) => {
      console.info(`[GOT STATUS] ${status}`);
      if (status === GatewayJS.LockAndMintStatus.Committed) {
        const postOpenTrades = Array.from((await gjs.getGateways()).values());

        if (preOpenTrades.length !== postOpenTrades.length) {
          const preOpenIds = preOpenTrades.map((t: any) => t.id);
          postOpenTrades.map((pot: any) => {
            // if unique, add to 3box
            if (preOpenIds.indexOf(pot.id)) {
              updateTx(pot);
              trade = pot;
            }
          });
        }
      }
    })
    .on("transferUpdated", (transfer: any) => {
      console.info(`[GOT TRANSFER]`, transfer);
      if (
        !transfer.archived &&
        transfer.status !== GatewayJS.LockAndMintStatus.Committed
      ) {
        updateTx(transfer);
      }
    })
    .catch((error: any) => {
      if (error.message === "Transfer cancelled by user") {
        // remove from 3box
        removeTx(trade);
      } else {
        Sentry.withScope(function (scope) {
          scope.setTag("error-hint", "gatewayjs error");
          Sentry.captureException(error);
        });
      }
    });

  store.set("confirmTx", null);
  store.set("confirmAction", "");
};

export const initGJSWithdraw = async function (tx: any) {
  const { amount, destAddress } = tx;
  const store = getStore() as any;
  const { gjs, localWeb3, selectedAsset } = store.getState();

  const storableData = {
    sendToken:
      GatewayJS.Tokens[
        selectedAsset.toUpperCase() as keyof typeof GatewayJS.Tokens
      ].Burn,
    // every source asset for now uses the same unit number as BTC
    sendAmount: GatewayJS.utils.value(amount, "btc").sats().toString(),
    sendTo: destAddress,
    web3Provider: localWeb3.currentProvider,
  };

  const data = {
    ...storableData,
    web3Provider: localWeb3.currentProvider,
  };

  const preOpenTrades = Array.from((await gjs.getGateways()).values());

  const id = randomBytes(8);
  await addTx(storableData, id);

  let trade: any = null;
  const open = gjs.open(data, id);
  open
    .result()
    .on("status", async (status: any) => {
      console.info(`[GOT STATUS] ${status}`);
      if (status === GatewayJS.BurnAndReleaseStatus.Committed) {
        const postOpenTrades = Array.from((await gjs.getGateways()).values());

        if (preOpenTrades.length !== postOpenTrades.length) {
          const preOpenIds = preOpenTrades.map((t: any) => t.id);
          postOpenTrades.map((pot: any) => {
            // if unique, add to 3box
            if (preOpenIds.indexOf(pot.id)) {
              updateTx(pot);
              trade = pot;
            }
          });
        }
      }
    })
    .on("transferUpdated", (transfer: any) => {
      console.info(`[GOT TRANSFER]`, transfer);
      if (
        !transfer.archived &&
        transfer.status !== GatewayJS.BurnAndReleaseStatus.Committed
      ) {
        updateTx(transfer);
      }
    })
    .catch((error: any) => {
      if (error.message === "Transfer cancelled by user") {
        // remove from 3box
        removeTx(trade);
      }
    });
};

/**
 * Recover and Continue Transactions
 */
export const isGatewayJSTxComplete = function (status: any) {
  return (
    status === GatewayJS.LockAndMintStatus.ConfirmedOnEthereum ||
    status === GatewayJS.BurnAndReleaseStatus.ReturnedFromRenVM
  );
};

export const reOpenTx = async function (trade: any, id?: string) {
  const store = getStore();
  const gjs = store.get("gjs");
  const localWeb3 = store.get("localWeb3");
  const gateway = gjs.recoverTransfer(localWeb3.currentProvider, trade, id);

  gateway
    .pause()
    .result()
    .on("status", (status: any) => {
      const completed = isGatewayJSTxComplete(status);
      if (completed) {
        // remove from 3box
        removeTx(trade);
      }
      console.info(`[GOT STATUS] ${status}`, gateway, trade);
    })
    .on("transferUpdated", (transfer: any) => {
      console.info(`[GOT TRANSFER]`, transfer);
      if (!transfer.archived) {
        updateTx(transfer);
      }
    })
    .then(console.log)
    .catch((error: any) => {
      if (error.message === "Transfer cancelled by user") {
        // remove from 3box
        removeTx(trade);
      } else {
        Sentry.withScope(function (scope) {
          scope.setTag("error-hint", "gatewayjs error re-opening");
          Sentry.captureException(error);
        });
      }
    });
};


export default {};
