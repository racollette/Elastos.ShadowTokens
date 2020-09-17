import * as Sentry from "@sentry/react";

import Web3 from "web3";
import GatewayJS from "@renproject/gateway";
// import Box from '3box'
import Web3Modal from "web3modal";
import firebase from "firebase";
import MEWconnect from "@myetherwallet/mewconnect-web-client";

import ELA from "../assets/ela.png"
import ETH from "../assets/eth.png";
import TRX from "../assets/tron.png";
import USDT from "../assets/usdt.png";

import { getStore } from "../services/storeService";
import erc20ABI from "./erc20ABI.json";
import {
    USDT_ADDRESS_TEST,
} from "./web3Utils";

// used for montoring balances
let walletDataInterval: any = null;

// export const ASSETS = ["BTC", "WBTC"];

// Top level bridge selection options
export const BRIDGE_SYMBOL_MAP: { [key in string]: string } = {
    ela: "ELA",
    eth: "ETH",
    trx: "TRX"
}
export const BRIDGE_NAME_MAP: { [key in string]: string } = {
    ela: "Elastos",
    eth: "Ethereum",
    trx: "Tron"
}
export const BRIDGE_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    trx: TRX
}
/////////////////////////////////////

export const NAME_MAP = {
    ela: "Elastos",
    eth: "Ethereum",
    usdt: "Tether",
    wela: "Wrapped Elastos",
    weth: "Wrapped Ethereum",
    wusdt: "Wrapped Tether",
};

export const SYMBOL_MAP = {
    ela: "ELA",
    eth: "ETH",
    usdt: "USDT",
    wela: "wELA",
    weth: "wETH",
    wusdt: "wUSDT",
};

export const CONVERT_MAP: { [key in string]: string } = {
    ela: "wela",
    eth: "weth",
    usdt: "wusdt",
    wela: "ela",
    weth: "eth",
    wusdt: "usdt",
};

export const NETWORK_MAP = {
    ela: "Elastos",
    eth: "Ethereum",
    usdt: "Ethereum",
    wela: "Ethereum",
    weth: "Elastos",
    wusdt: "Elastos",
};

export const MINI_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    usdt: USDT,
    wela: ELA,
    weth: ETH,
    wusdt: USDT,
};

export const SUPPORTED_NETWORKS = {
    1: 'MAINNET',
    3: 'ROPSTEN',
    4: 'RINKEBY',
    42: 'KOVAN',
};

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

export const updateMarketData = async function() {
    const store = getStore();

    try {
        const eth = await fetch(`https://api.coincap.io/v2/assets/ethereum`, {
            method: "GET",
        });

        store.set("ethusd", (await eth.json()).data.priceUsd);
    } catch (e) {
        console.error(e);
        Sentry.withScope(function(scope) {
            scope.setTag("error-hint", "updating market data");
            Sentry.captureException(e);
        });
    }

    try {
        const ela = await fetch(`https://api.coincap.io/v2/assets/elastos`, {
            method: "GET",
        });

        store.set("elausd", (await ela.json()).data.priceUsd);
    } catch (e) {
        console.error(e);
        Sentry.withScope(function(scope) {
            scope.setTag("error-hint", "updating market data");
            Sentry.captureException(e);
        });
    }

    try {
        const usdt = await fetch(`https://api.coincap.io/v2/assets/tether`, {
            method: "GET",
        });

        store.set("usdtusd", (await usdt.json()).data.priceUsd);
    } catch (e) {
        console.error(e);
        Sentry.withScope(function(scope) {
            scope.setTag("error-hint", "updating market data");
            Sentry.captureException(e);
        });
    }
};

export const updateBalance = async function() {
    console.log('Update Balances')
    const store = getStore();

    const web3 = store.get("localWeb3");
    const walletAddress = store.get("localWeb3Address");
    const USDTAddress = store.get("USDTAddress");

    console.log(web3)
    console.log(walletAddress)

    if (!web3 || !walletAddress) {
        return;
    }

    // const usdt = new web3.eth.Contract(erc20ABI, USDTAddress);
    // const usdtBal = await usdt.methods.balanceOf(walletAddress).call();

    const ethBal = await web3.eth.getBalance(walletAddress);
    console.log('ETH BALANACE', ethBal)


    store.set("ETHBalance", Number(web3.utils.fromWei(ethBal)).toFixed(4));
    // store.set("USDTBalance", Number(parseInt(usdtBal.toString()) / 10 ** 8).toFixed(8));
    store.set("loadingBalances", false);

    updateMarketData();
};

export const watchWalletData = async function() {
    const store = getStore();
    if (walletDataInterval) {
        clearInterval(walletDataInterval);
    }
    // await updateAllowance()
    await updateBalance();
    walletDataInterval = setInterval(async () => {
        // await updateAllowance()
        await updateBalance();
    }, 10 * 1000);
};

export const initDataWeb3 = async function() {
    const store = getStore();
    const network = store.get("selectedNetwork");
    store.set(
        "dataWeb3",
        new Web3(
            `https://${
            network === "testnet" ? "rinkeby" : "mainnet"
            }.infura.io/v3/bd80ce1ca1f94da48e151bb6868bb150`
        )
    );

};

/**
 * Connecting to Local Web3 Wallet
 */
export const initLocalWeb3 = async function(type: any) {
    console.log("Init Local Web3")
    const store = getStore();
    store.set("walletConnecting", true);

    // Temporary passage condition
    store.set("selectedWallet", true);
    /////

    // already connected
    if (store.get("localWeb3Address")) {
        return;
    }

    store.set("spaceError", false);
    const selectedNetwork = store.get("selectedNetwork");

    let web3;
    let currentProvider;
    let accounts = [];
    let network = "";

    try {
        if (type === "injected" || !type) {
            const providerOptions = {};
            const web3Modal = new Web3Modal({
                network: selectedNetwork === "testnet" ? "rinkeby" : "mainnet",
                cacheProvider: false,
                providerOptions,
            });
            const web3Provider = await web3Modal.connect();

            web3 = new Web3(web3Provider);
            currentProvider = web3.currentProvider;
            if (typeof currentProvider === "string") return;
            if (!currentProvider) return;
            accounts = await web3.eth.getAccounts();
            const netId = await web3.eth.net.getId();
            if (netId === 1) {
                network = "mainnet";
            } else if (netId === 4) {
                network = "mainnet"; //testnet
            } else {
                network = "mainnet";
            }
        } else if (type === "mew-connect") {
            const chainId = selectedNetwork === "testnet" ? 42 : 1;
            const jsonRpcUrl = `wss://${
                selectedNetwork === "testnet" ? "rinkeby" : "mainnet"
                }.infura.io/ws/v3/7117ca7a3c7b4b94b24944c1ef0ecec9`;

            const mewConnect = new MEWconnect.Provider({
                windowClosedError: true,
            });
            const web3Provider = mewConnect.makeWeb3Provider(
                chainId,
                jsonRpcUrl,
                true
            );

            web3 = new Web3(web3Provider);
            currentProvider = web3.currentProvider;

            if (typeof currentProvider === "string") return;
            if (!currentProvider) return;

            accounts = await web3Provider.enable();
            network = selectedNetwork;
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

    const address = accounts[0];
    const addressLowerCase = address.toLowerCase();
    const db = store.get("db");
    const fns = store.get("fns");

    if (selectedNetwork !== network) {
        store.set("showNetworkModal", true);
        store.set("spaceError", true);
        store.set("spaceRequesting", false);
        store.set("walletConnecting", false);
        return;
    }

    // try {
    //     ///////////////////////////////////////////////////////
    //     // Firebase Sign In or Sign Up
    //     //////////////////////////////////////////////////////

    //     let signature = "";
    //     let rawSig = "";

    //     // get from local storage if user has signed in already
    //     const localSigMap = localStorage.getItem("sigMap");
    //     const localRawSigMap = JSON.parse(
    //         localStorage.getItem("rawSigMap") || "{}"
    //     );
    //     const localSigMapData = localSigMap ? JSON.parse(localSigMap) : {};
    //     if (localSigMapData[addressLowerCase] && localRawSigMap[addressLowerCase]) {
    //         signature = localSigMapData[addressLowerCase];
    //         rawSig = localRawSigMap[addressLowerCase];
    //     } else {
    //         // get unique wallet signature for firebase backup
    //         // @ts-ignore
    //         rawSig = await web3.eth.personal.sign(
    //             web3.utils.utf8ToHex("Signing in to RenBridge"),
    //             addressLowerCase
    //         );
    //         signature = web3.utils.sha3(rawSig)!;
    //         localSigMapData[addressLowerCase] = signature;
    //         localStorage.setItem("sigMap", JSON.stringify(localSigMapData));

    //         localRawSigMap[addressLowerCase] = rawSig;
    //         localStorage.setItem("rawSigMap", JSON.stringify(localRawSigMap));
    //     }

    //     store.set("fsSignature", signature);

    //     let token: string | null = null;
    //     try {
    //         const res = await fns.httpsCallable("authenticate")({
    //             signed: rawSig,
    //             account: addressLowerCase,
    //         });

    //         token = res.data.token;
    //         if (!token) {
    //             throw new Error("missing token");
    //         }
    //     } catch (e) {
    //         console.log("No token auth, falling back to email / sig");
    //     }

    //     // auth with firestore
    //     const bridgeId = `${addressLowerCase}@renproject.io`;
    //     const currentFsUser = firebase.auth().currentUser;
    //     let fsUser;

    //     if (!currentFsUser || currentFsUser.email !== bridgeId) {
    //         try {
    //             fsUser = token
    //                 ? (await firebase.auth().signInWithCustomToken(token)).user
    //                 : (
    //                     await firebase
    //                         .auth()
    //                         .signInWithEmailAndPassword(bridgeId, signature)
    //                 ).user;
    //         } catch (e) {
    //             console.error(e);
    //             // We can register this user as they do not exist
    //             if (e.message.includes("There is no user record")) {
    //                 fsUser = (
    //                     await firebase
    //                         .auth()
    //                         .createUserWithEmailAndPassword(bridgeId, signature)
    //                 ).user;
    //             } else {
    //                 console.error(e);
    //                 Sentry.withScope(function(scope) {
    //                     scope.setTag("error-hint", "web3 init");
    //                     Sentry.captureException(e);
    //                 });
    //             }
    //         }
    //     } else {
    //         fsUser = currentFsUser;
    //     }

    //     store.set("fsUser", fsUser);

    //     if (fsUser) {
    //         // update user collection
    //         const doc = await db.collection("users").doc(fsUser.uid);
    //         const docData = await doc.get();

    //         if (docData.exists) {
    //             const data = docData.data();
    //             if (data.signatures.indexOf(signature) < 0) {
    //                 // add a new signature if needed
    //                 await doc.update({
    //                     signatures: data.signatures.concat([signature]),
    //                     updated: firebase.firestore.Timestamp.fromDate(
    //                         new Date(Date.now())
    //                     ),
    //                 });
    //             }
    //         } else {
    //             // create user
    //             await doc.set({
    //                 uid: fsUser.uid,
    //                 updated: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
    //                 signatures: [signature],
    //             });
    //         }
    //     }

    //     store.set("fsEnabled", true);

    ///////////////////////////////////////////////////////
    // Recover Transactions
    //////////////////////////////////////////////////////

    store.set("localWeb3", web3);
    store.set("localWeb3Address", accounts[0]);
    store.set("localWeb3Network", network);
    store.set("spaceRequesting", false);
    store.set("walletConnecting", false);

    updateBalance();

    if ((!currentProvider as any).on) return;
    // FIXME: provide propper provider type
    const listeningProvider: any = currentProvider;
    if (listeningProvider.on) {
        // listen for changes
        listeningProvider.on("accountsChanged", async () => {
            window.location.reload();
        });

        listeningProvider.on("chainChanged", async () => {
            window.location.reload();
        });

        // listeningProvider.on("networkChanged", async () => {
        //     window.location.reload();
        // });

        listeningProvider.on("disconnected", async () => {
            window.location.reload();
        });
    }
    // } catch (e) {
    //     console.error(e);
    //     Sentry.withScope(function(scope) {
    //         scope.setTag("error-hint", "main initialization");
    //         Sentry.captureException(e);
    //     });
    //     store.set("spaceError", true);
    //     store.set("spaceRequesting", false);
    //     store.set("walletConnecting", false);
    // }

    return;
};

export const setAddresses = async function() {
    const store = getStore();
    const network = store.get("selectedNetwork");
    if (network === "testnet") {
        // store.set("renELAAddress", RENELA_TEST);
    } else {
        // store.set("renELAAddress", RENELA_MAIN);
    }
};

export const setNetwork = async function(network: any) {
    const store = getStore();
    console.log('NETWORK CONNECTION')
    store.set("selectedNetwork", network);

    if (network === "mainnet") {
        store.set("selectedNetworkName", "Ethereum");
    } else if (network === "testnet") {
        store.set("selectedNetworkName", "Rinkeby");
    } else if (network === "private") {
        store.set("selectedNetworkName", "Elastos");
    } else {
        store.set("selectedNetworkName", "No Network");
    }

    store.set(
        "gjs",
        new GatewayJS(network, {
            // If we want to test against gatewayjs staging, we should change the endpoint
            // manually in a PR, which does not get merged, and check the preview build
            // endpoint: "https://ren-gatewayjs-staging.netlify.app/",
        })
    );
    // @ts-ignore
    setAddresses.bind(this)();
};

// export async function getEthereumNetwork() {
// 	if (!window.web3) return { name: 'MAINNET', networkId: 1 };
// 	let networkId = 1;
// 	try {
// 		if (window.web3?.eth?.net) {
// 			networkId = await window.web3.eth.net.getId();
// 			return { name: SUPPORTED_NETWORKS[networkId], networkId: Number(networkId) };
// 		} else if (window.web3?.version?.network) {
// 			networkId = Number(window.web3.version.network);
// 			return { name: SUPPORTED_NETWORKS[networkId], networkId };
// 		} else if (window.ethereum?.networkVersion) {
// 			networkId = Number(window.ethereum?.networkVersion);
// 			return { name: SUPPORTED_NETWORKS[networkId], networkId };
// 		}
// 		return { name: 'MAINNET', networkId };
// 	} catch (e) {
// 		console.log(e);
// 		return { name: 'MAINNET', networkId };
// 	}
// }

export default {};
