import * as Sentry from "@sentry/react";

import Web3 from "web3";
// import Box from '3box'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ELA from "../assets/ela.png"
import ETH from "../assets/eth.png";
import TRX from "../assets/tron.png";
import USDT from "../assets/usdt.png";

import MetaMask from "../assets/metamask-fox.svg";
import Elaphant from "../assets/elaphant.png";
import WalletConnect from "../assets/walletconnect.svg";

import { getStore } from "../services/storeService";

import { CONTRACT_MAP } from "./web3Utils";
import { updateConfirmations } from "./transferUtils";
import ETH_ELA_GATEWAY_ABI from "./ETH_ELA_GATEWAY_ABI.json";
// import erc20ABI from "./erc20ABI.json";


// used for montoring balances
let walletDataInterval: any = null;

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

// Supported wallets
export const WALLET_ICON_MAP: { [key in string]: string } = {
    MetaMask: MetaMask,
    Elaphant: Elaphant,
    WalletConnect: WalletConnect,
};

export const NAME_MAP = {
    ela: "Elastos",
    eth: "Ethereum",
    usdt: "Tether",
    wela: "Wrapped Elastos",
    weth: "Wrapped Ethereum",
    wusdt: "Wrapped Tether",
};

export const SYMBOL_MAP: { [key in string]: string } = {
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

export const NETWORK_MAP: { [key in string]: string } = {
    ela: "Elastos",
    eth: "Ethereum",
    usdt: "Ethereum",
    wela: "Ethereum",
    weth: "Elastos",
    wusdt: "Elastos",
};

// Development networks
export const NETWORK_TYPE: { [key in string]: string } = {
    ela: "Elastos mainnet",
    // eth: "Ethereum mainnet",
    eth: "Kovan testnet",
    usdt: "Ethereum mainnet",
    wela: "Ethereum mainnet",
    weth: "Elastos mainnet",
    wusdt: "Elastos mainnet",
};

export const ASSET_CONVERSION_TYPES = {
    ela: "mint",
    eth: "mint",
    usdt: "mint",
    wela: "release",
    weth: "release",
    wusdt: "release",
};

export const MINI_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    usdt: USDT,
    wela: ELA,
    weth: ETH,
    wusdt: USDT,
};

export const SUPPORTED_NETWORK_IDS: { [key in number]: string } = {
    1: 'Ethereum mainnet',
    3: 'Ropsten',
    4: 'Rinkeby',
    30: 'RSK mainnet',
    31: 'RSK testnet',
    42: 'Kovan testnet',
    61: 'Ethereum classic',
    77: 'Sokol testnet',
    99: 'POA network',
    100: 'xDai chain'
}

export const SUPPORTED_NETWORK_NAMES: { [key in string]: string } = {
    main: 'Ethereum mainnet',
    private: 'Unknown',
    elastos: 'Elastos mainnet'
}

// Development rpc
export const SUPPORTED_RPC_URLS: { [key in string]: string } = {
    ela: "https://mainrpc.elaeth.io", // "https://rpc.elaeth.io",

}

export const getNetworkName = function(id: any, type: string) {
    switch (type) {
        case "id":
            return SUPPORTED_NETWORK_IDS[id] || 'Unknown'
        case "name":
            return SUPPORTED_NETWORK_NAMES[id] || 'Unknown'
    }
}

export const walletConnectOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
        }
    }
}

/**
 * Connecting to Local Web3 Wallet
 */
export const initLocalWeb3 = async function(type: any) {
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
            const netId = await web3.eth.net.getId();
            // network = getNetworkName(netId, "id")
            let networkId = await web3.eth.net.getNetworkType()
            if (netId === 1 && networkId === "private") {
                networkId = "elastos"
                network = getNetworkName(networkId, "name")
            } else {
                network = getNetworkName(netId, "id")
                console.log(network)
            }
            // } else if (type === "mew-connect") {
            //     const chainId = selectedNetwork === "testnet" ? 42 : 1;
            //     const jsonRpcUrl = `wss://${
            //         selectedNetwork === "testnet" ? "rinkeby" : "mainnet"
            //         }.infura.io/ws/v3/7117ca7a3c7b4b94b24944c1ef0ecec9`;
            //     const mewConnect = new MEWconnect.Provider({
            //         windowClosedError: true,
            //     });
            //     const web3Provider = mewConnect.makeWeb3Provider(
            //         chainId,
            //         jsonRpcUrl,
            //         true
            //     );
            //     web3 = new Web3(web3Provider);
            //     currentProvider = web3.currentProvider;
            //     if (typeof currentProvider === "string") return;
            //     if (!currentProvider) return;
            //     accounts = await web3Provider.enable();
            //     network = selectedNetwork;
        } else if (type === "WalletConnect") {
            console.log('WalletConnect not yet supported')
            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
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
            const netId = await web3.eth.net.getId();
            // network = getNetworkName(netId, "id")
            let networkId = await web3.eth.net.getNetworkType()
            if (netId === 1 && networkId === "private") {
                networkId = "elastos"
                network = getNetworkName(networkId, "name")
            } else {
                network = getNetworkName(netId, "id")
            }
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

    // const address = accounts[0];
    // const addressLowerCase = address.toLowerCase();
    // const db = store.get("db");
    // const fns = store.get("fns");

    // if (selectedNetwork !== network) {
    //     store.set("showNetworkModal", true);
    //     store.set("spaceError", true);
    //     store.set("spaceRequesting", false);
    //     store.set("walletConnecting", false);
    //     return;
    // }

    store.set("localWeb3", web3);
    store.set("localWeb3Address", accounts[0]);
    store.set("localWeb3Network", network);
    store.set("spaceRequesting", false);
    store.set("walletConnecting", false);
    store.set("selectedWallet", true);
    store.set("convert.destinationValid", true);

    updateBalance();
    return;
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
    const walletNetwork = store.get("localWeb3Network");
    // const USDTAddress = store.get("USDTAddress");

    if (!web3 || !walletAddress) {
        return;
    }
    // const usdt = new web3.eth.Contract(erc20ABI, USDTAddress);
    // const usdtBal = await usdt.methods.balanceOf(walletAddress).call();

    if (walletNetwork === "Ethereum mainnet" || walletNetwork === "Kovan testnet" || walletNetwork === "Rinkeby") {
        const ethBal = await web3.eth.getBalance(walletAddress);
        console.log('ETH BALANACE', ethBal)
        store.set("ETHBalance", Number(web3.utils.fromWei(ethBal)).toFixed(4));
    } else if (walletNetwork === "Elastos mainnet" || walletNetwork === "Elastos testnet") {
        const elaBal = await web3.eth.getBalance(walletAddress);
        console.log('ELA BALANACE', elaBal)
        store.set("ELABalance", Number(web3.utils.fromWei(elaBal)).toFixed(4));
    }

    // store.set("USDTBalance", Number(parseInt(usdtBal.toString()) / 10 ** 8).toFixed(8));
    store.set("loadingBalances", false);

    updateMarketData();
};

export const watchWalletData = async function() {
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

// export const setNetwork = async function(network: any) {
//     const store = getStore();
//     setAddresses.bind(this)();
// };

export const setListener = async function(web3: any) {
    // @ts-ignore
    if ((!web3.currentProvider as any).on) return;
    // @ts-ignore FIXME: provide propper provider type
    const listeningProvider: any = web3.currentProvider;
    if (listeningProvider.on) {
        // listen for changes
        listeningProvider.on("accountsChanged", async () => {
            window.location.reload();
        });

        listeningProvider.on("chainChanged", async () => {
            window.location.reload();
        });

        listeningProvider.on("networkChanged", async () => {
            window.location.reload();
            // initLocalWeb3(store.get("selectedWalletType"))
        });

        listeningProvider.on("disconnected", async () => {
            window.location.reload();
        });
    }
}

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

////// Send tx

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



export const getInputContract = function(inputAsset: string) {
    const store = getStore();
    // const contractInput = store.get("_contractInput")
    const web3 = store.get("localWeb3")

    let contract = new web3.eth.Contract(ETH_ELA_GATEWAY_ABI, CONTRACT_MAP[inputAsset])
    store.set("_contractInput", contract)

    return contract
};

export const startTransfer = function(confirmTx: any) {
    // const contract = getInputContract(confirmTx.sourceAsset)
    const store = getStore();
    const web3 = store.get("localWeb3")
    const web3Address = store.get("localWeb3Address")

    console.log(confirmTx)

    console.log(web3Address)
    console.log(web3.utils.toWei(String(confirmTx.amount), "ether"))

    web3.eth
        .sendTransaction(
            {
                from: web3Address,
                to: "0x61ffC37eFB973561d5fe91B11c14EbAd603F7d67", // CONTRACT_MAP[confirmTx.sourceAsset],
                value: web3.utils.toWei(String(confirmTx.amount), "ether"),
            },
            (error: any, hash: any) => {
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
            }
        )
        .on("transactionHash", (tx: any) => {
            // console.log('done callback')
            // }).on('receipt', receipt => {
            // return doneCallback(receipt.transactionHash)
            // return doneCallback(tx);
            store.set("waitingApproval", false);
            store.set("confirmationProgress", true);
        })
        .on('confirmation', function(confirmationNumber: number, receipt: any) {
            updateConfirmations(confirmationNumber);
        })
    // .on('error', (error: any) => {
    //     store.set("waitingApproval", false)
    //     store.set("unknownError", true)
    // })
};



export default {};
