import * as Sentry from "@sentry/react";
import { getStore } from "../../../services/storeService";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { toBN } from 'web3-utils';

import ELA from "../../../assets/ela.png"
import ETH from "../../../assets/eth.png";
import USDT from "../../../assets/usdt.png";
import DAI from "../../../assets/dai.png";
import USDC from "../../../assets/usdc.png";
import MAIN from "../../../assets/main.png";

import MetaMask from "../../../assets/metamask-fox.svg";
import Elaphant from "../../../assets/elaphant.png";
import WalletConnect from "../../../assets/walletconnect.svg";

import { TOKENS } from '../tokens';
import { switchOriginChain } from "./txUtils";

// used for montoring balances
// let walletDataInterval: any = null;

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
    dai: "Dai",
    usdc: "USD Coin",
    main: "Main",
    ethela: "Shadow Elastos",
    elaeth: "Shadow Ethereum",
    elausdt: "Shadow Tether",
    eladai: "Shadow Dai",
    elausdc: "Shadow USD Coin",
    elamain: "Shadow Main",
};

export const SYMBOL_MAP: { [key in string]: string } = {
    ela: "ELA",
    eth: "ETH",
    usdt: "USDT",
    dai: "DAI",
    usdc: "USDC",
    main: "MAIN",
    ethela: "ethELA",
    elaeth: "elaETH",
    elausdt: "elaUSDT",
    eladai: "elaDAI",
    elausdc: "elaUSDC",
    elamain: "elaMAIN",
};

export const CONVERT_MAP: { [key in string]: string } = {
    ela: "ethela",
    eth: "elaeth",
    usdt: "elausdt",
    dai: "eladai",
    usdc: "elausdc",
    main: "elamain",
    ethela: "ela",
    elaeth: "eth",
    elausdt: "usdt",
    eladai: "dai",
    elausdc: "usdc",
    elamain: "main",
};

export const NETWORK_MAP: { [key in string]: string } = {
    ela: "Elastos",
    eth: "Ethereum",
    usdt: "Ethereum",
    dai: "Ethereum",
    usdc: "Ethereum",
    main: "Ethereum",
    ethela: "Ethereum",
    elaeth: "Elastos",
    elausdt: "Elastos",
    eladai: "Elastos",
    elausdc: "Elastos",
    elamain: "Elastos",
};

// Development networks
export const NETWORK_TYPE: { [key in string]: string } = {
    ela: "Elastos testnet",
    eth: "Kovan testnet",
    usdt: "Kovan testnet",
    dai: "Kovan testnet",
    usdc: "Kovan testnet",
    main: "Kovan testnet",
    ethela: "Kovan testnet",
    elaeth: "Elastos testnet",
    elausdt: "Elastos testnet",
    eladai: "Elastos testnet",
    elausdc: "Elastos testnet",
    elamain: "Elastos testnet",
};

export const ASSET_CONVERSION_TYPES: { [key in string]: string } = {
    ela: "mint",
    eth: "mint",
    usdt: "mint",
    dai: "mint",
    usdc: "mint",
    main: "mint",
    ethela: "release",
    elaeth: "release",
    elausdt: "release",
    eladai: "release",
    elausdc: "release",
    elamain: "release",
};

export const MINI_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    usdt: USDT,
    dai: DAI,
    usdc: USDC,
    main: MAIN,
    ethela: ELA,
    elaeth: ETH,
    elausdt: USDT,
    eladai: DAI,
    elausdc: USDC,
    elamain: MAIN,
};

export const SUPPORTED_NETWORK_IDS: { [key in number]: string } = {
    1: 'Ethereum mainnet',
    3: 'Ropsten',
    4: 'Rinkeby',
    20: 'Elastos mainnet',
    21: 'Elastos testnet', // testnet
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
    elastosMainnet: 'Elastos mainnet',
    elastosTestnet: 'Elastos mainnet',
}

export const init = function() {
    const store = getStore();
    const initialAsset = store.get("selectedAsset")
    fetchTokenBalance(initialAsset)
}

export const getNetworkName = function(id: any, type: string) {
    switch (type) {
        case "id":
            return SUPPORTED_NETWORK_IDS[id] || 'Unknown'
        case "name":
            return SUPPORTED_NETWORK_NAMES[id] || 'Elastos mainnet'
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

            // network = getNetworkName(netId, "id")
            // let networkId = await web3.eth.net.getNetworkType()
            // console.log('netId', netId)
            // console.log('networkId', networkId)
            // if (netId === 20 && networkId === "private") {
            //     networkId = "elastosMainnet"
            //     network = getNetworkName(networkId, "name")
            // } else if (netId === 21 && networkId === "private") {
            //     networkId = "elastosTestnet"
            //     network = getNetworkName(networkId, "name")
            // } else {
            //     network = getNetworkName(netId, "id")
            //     console.log(network)
            // }
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

    // const selectedAsset = store.get("selectedAsset")
    // store.set("selectedAsset", CONVERT_MAP[selectedAsset]);
    // store.set("convert.selectedFormat", CONVERT_MAP[CONVERT_MAP[selectedAsset]]);
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
    if (NETWORK_TYPE[asset] !== walletNetwork) return

    // if native coin
    if (!token.address) {
        const coinBal = await web3.eth.getBalance(walletAddress)
        store.set(`${token.id}Balance`, Number(web3.utils.fromWei(coinBal)).toFixed(4));
        return
    }

    // if token
    const tokenContract = new web3.eth.Contract(token.abi, token.address);
    const tokenBal = await tokenContract.methods.balanceOf(walletAddress).call();
    store.set(`${token.id}Balance`, Number(web3.utils.fromWei(tokenBal)).toFixed(4));

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



// export const getInputContract = function(inputAsset: string) {
//     const store = getStore();
//     // const contractInput = store.get("_contractInput")
//     const web3 = store.get("localWeb3")

//     let contract = new web3.eth.Contract(MEDIATOR_ABI, MEDIATOR_CONTRACTS[inputAsset].home)
//     store.set("_contractInput", contract)

//     return contract
// };

// export const testTransfer = function(confirmTx: any) {
//     // const contract = getInputContract(confirmTx.sourceAsset)
//     const store = getStore();
//     const web3 = store.get("localWeb3")
//     const web3Address = store.get("localWeb3Address")

//     console.log(confirmTx)

//     console.log(web3Address)
//     console.log(web3.utils.toWei(String(confirmTx.amount), "ether"))

//     web3.eth
//         .sendTransaction(
//             {
//                 from: web3Address,
//                 to: "0x61ffC37eFB973561d5fe91B11c14EbAd603F7d67", // CONTRACT_MAP[confirmTx.sourceAsset],
//                 value: web3.utils.toWei(String(confirmTx.amount), "ether"),
//             },
//             (error: any, hash: any) => {
//                 if (error) {
//                     if (error.code === 4001) {
//                         store.set("waitingApproval", false)
//                         store.set("txRejected", true)
//                     } else {
//                         store.set("waitingApproval", false)
//                         store.set("unknownError", true)
//                     }
//                     return console.error(error);
//                 } else {
//                     // return callback(hash);
//                     store.set("sourceTxID", hash)
//                 }
//             }
//         )
//         .on("transactionHash", (tx: any) => {
//             // console.log('done callback')
//             // }).on('receipt', receipt => {
//             // return doneCallback(receipt.transactionHash)
//             // return doneCallback(tx);
//             store.set("waitingApproval", false);
//             store.set("confirmationProgress", true);
//         })
//         .on('confirmation', function(confirmationNumber: number, receipt: any) {
//             updateConfirmations(confirmationNumber);
//         })
//     // .on('error', (error: any) => {
//     //     store.set("waitingApproval", false)
//     //     store.set("unknownError", true)
//     // })
// };


export default {};
