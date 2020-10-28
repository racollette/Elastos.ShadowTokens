import * as Sentry from "@sentry/react";
import { getStore } from "../../../services/storeService";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { toBN } from 'web3-utils';

import { SUPPORTED_NETWORK_IDS } from './config';
import { TOKENS } from '../tokens';
import { switchOriginChain } from "./txUtils";

// used for montoring balances
// let walletDataInterval: any = null;


export const init = function() {
    const store = getStore();
    const initialAsset = store.get("selectedAsset")
    fetchTokenBalance(initialAsset)
}


export const initLocalWeb3 = async function(type?: any) {
    const store = getStore();
    store.set("walletConnecting", true);
    store.set("spaceError", false);

    // already connected
    if (store.get("localWeb3Address")) {
        return;
    }

    let web3;
    let accounts: string[] = [];
    let network: any = "";
    let netId: number;

    try {
        // if (type === "injected" || !type) {
        if (type === "MetaMask" || !type) {
            // Check if user has web3 installed
            if (typeof window.ethereum !== 'undefined'
                || (typeof window.web3 !== 'undefined')) {
                // Web3 browser user detected. You can now use the provider.
            } else {
                store.set("noWeb3", true)
                return
            }

            const providerOptions = {
            };

            const web3Modal = new Web3Modal({
                // network: selectedNetwork === "mainnet" ? "mainnet" : "private", // optional
                cacheProvider: false, //optional
                providerOptions,
            });
            const web3Provider = await web3Modal.connect();

            web3 = new Web3(web3Provider);
            setListener(web3)

            if (typeof web3.currentProvider === "string") return;
            if (!web3.currentProvider) return;
            accounts = await web3.eth.getAccounts();
            netId = await web3.eth.net.getId();
            network = SUPPORTED_NETWORK_IDS[netId]

        } else if (type === "WalletConnect") {
            console.log('WalletConnect not yet supported')
            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        infuraId: process.env.REACT_APP_INFURA_KEY // "27e484dcd9e3efcfd25a83a78777cdf1" // required
                    }
                }
            };
            const web3Modal = new Web3Modal({
                // network: selectedNetwork === "mainnet" ? "mainnet" : "private", // optional
                cacheProvider: false, //optional
                providerOptions,
            });
            const web3Provider = await web3Modal.connect();
            web3 = new Web3(web3Provider);
            setListener(web3)

            if (typeof web3.currentProvider === "string") return;
            if (!web3.currentProvider) return;
            accounts = await web3.eth.getAccounts();
            netId = await web3.eth.net.getId();
            network = SUPPORTED_NETWORK_IDS[netId]

        } else if (type === "Elaphant") {
            console.log('Elaphant wallet not yet supported')
            return
        } else {
            console.error("Invalid wallet type.");
            store.set("spaceError", true);
            store.set("spaceRequesting", false);
            store.set("walletConnecting", false);
            return;
        }
    } catch (e) {
        console.error(e);
        Sentry.withScope(function(scope) {
            scope.setTag("error-hint", "web3 init");
            Sentry.captureException(e);
        });
        store.set("spaceError", true);
        store.set("spaceRequesting", false);
        store.set("walletConnecting", false);
        return;
    }

    setBridgeDirection(netId)
    store.set("localWeb3", web3);
    store.set("localWeb3Address", accounts[0]);
    store.set("localWeb3Network", network);
    store.set("spaceRequesting", false);
    store.set("walletConnecting", false);
    store.set("selectedWallet", true);
    store.set("convert.destinationValid", true);
    fetchTokenBalance(store.get("selectedAsset"))
    return;
};

export const setBridgeDirection = async function(netId: number) {
    const store = getStore();
    const selectedDirection = store.get("convert.selectedDirection")
    const selectedAsset = store.get("selectedAsset")
    // Set default transfer direction
    switch (netId) {
        case 42:
            if (selectedDirection === 0) { fetchTokenBalance(selectedAsset); return }
            switchOriginChain(selectedDirection)
            break
        case 21:
            if (selectedDirection === 1) { fetchTokenBalance(selectedAsset); return }
            switchOriginChain(selectedDirection)
            break
    }
}

export const clearWeb3 = async function() {
    const store = getStore();
    store.set("localWeb3", null);
    store.set("localWeb3Address", "");
    store.set("localWeb3Network", null);
    store.set("walletConnecting", false);
    store.set("selectedWallet", false);
}

export const fetchTokenBalance = async function(asset: any) {
    const token = TOKENS[asset]
    fetchTokenPrice(token)
    if (!token) return

    const store = getStore();

    const web3 = store.get("localWeb3");
    const walletAddress = store.get("localWeb3Address");
    const walletNetwork = store.get("localWeb3Network");

    if (!web3 || !walletAddress) return

    // enable in prod
    if (TOKENS[asset].network !== walletNetwork) return

    // if native coin
    if (!token.address) {
        const coinBal = await web3.eth.getBalance(walletAddress)
        store.set(`${token.sourceID}Balance`, Number(web3.utils.fromWei(coinBal)).toFixed(4));
        return
    }

    // if token
    const tokenContract = new web3.eth.Contract(token.abi, token.address);
    const tokenBal = await tokenContract.methods.balanceOf(walletAddress).call();

    store.set(`${token.sourceID}Balance`, Number(web3.utils.fromWei(tokenBal)).toFixed(4));
    store.set("loadingBalances", false);
}

export const fetchTokenPrice = async function(token: any) {
    const store = getStore();

    if (token.priceFeed.length === 0) return
    try {
        const price = await fetch(token.priceFeed, {
            method: "GET",
        });
        store.set(`${token.priceTicker}usd`, (await price.json()).data.priceUsd);
    } catch (e) {
        console.error(e);
    }
}

// export const watchWalletData = async function() {
//     if (walletDataInterval) {
//         clearInterval(walletDataInterval);
//     }
//     // await updateAllowance()
//     await updateBalance();
//     walletDataInterval = setInterval(async () => {
//         // await updateAllowance()
//         await updateBalance();
//     }, 10 * 1000);
// };

export const setListener = async function(web3: any) {
    const store = getStore();
    // @ts-ignore
    if ((!web3.currentProvider as any).on) return;
    // @ts-ignore FIXME: provide propper provider type
    const listeningProvider: any = web3.currentProvider;
    if (listeningProvider.on) {
        // listen for changes
        listeningProvider.on("accountsChanged", async () => {
            clearWeb3()
            initLocalWeb3()
        });
        listeningProvider.on("chainChanged", async () => {
            // window.location.reload();
            const netId = await web3.eth.net.getId();
            store.set("localWeb3Network", SUPPORTED_NETWORK_IDS[netId])
            // store.set("localWeb3Network", NETWORK_TYPE[CONVERT_MAP[selectedAsset]])
            setBridgeDirection(netId)
        });
        // listeningProvider.on("disconnected", async () => {
        //     window.location.reload();
        // });
    }
}

export const abbreviateAddress = function(walletAddress: string) {
    if (!walletAddress || typeof walletAddress !== "string") {
        return "";
    } else {
        return (
            walletAddress.slice(0, 5) +
            "..." +
            walletAddress.slice(walletAddress.length - 5)
        );
    }
};

export default {};

//  getAccount: function (callback) {
//     this.theWeb3.eth.getAccounts().then((accounts) => {
//       this._theAccount = accounts[0];
//       return callback(this._theAccount);
//     });
//   },

//   getBalanceOfToken: function (callback) {
//     this.getTokenContract()
//       .methods.balanceOf(this._theAccount)
//       .call()
//       .then((balance) => {
//         return callback(balance);
//       });
//   },

//   getBalanceOfETH: function (callback) {
//     this.theWeb3.eth.getBalance(this._theAccount).then((balance) => {
//       console.log("ETH balance", balance);
//       return callback(this.theWeb3.utils.fromWei(balance, "ether"));
//     });
//   },

