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
let walletDataInterval: any = null;

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
    ela: "Elastos mainnet",
    // eth: "Ethereum mainnet",
    eth: "Kovan testnet",
    usdt: "Kovan testnet",
    dai: "Ethereum mainnet",
    usdc: "Ethereum mainnet",
    main: "Kovan testnet",
    ethela: "Kovan testnet",
    elaeth: "Elastos mainnet",
    elausdt: "Elastos mainnet",
    eladai: "Elastos mainnet",
    elausdc: "Elastos mainnet",
    elamain: "Elastos mainnet"
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
            // network = getNetworkName(netId, "id")
            let networkId = await web3.eth.net.getNetworkType()
            // console.log('netId', netId)
            // console.log('networkId', networkId)
            if (netId === 20 && networkId === "private") {
                networkId = "elastosMainnet"
                network = getNetworkName(networkId, "name")
            } else if (netId === 21 && networkId === "private") {
                networkId = "elastosTestnet"
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
            // network = getNetworkName(netId, "id")
            let networkId = await web3.eth.net.getNetworkType()
            if (netId === 20 && networkId === "private") {
                networkId = "elastosMainnet"
                network = getNetworkName(networkId, "name")
            } else if (netId === 21 && networkId === "private") {
                networkId = "elastosTestnet"
                network = getNetworkName(networkId, "name")
            } else {
                network = getNetworkName(netId, "id")
                console.log(network)
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

    setBridgeDirection(netId)
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

export const setBridgeDirection = async function(netId: number) {
    const store = getStore();
    const selectedDirection = store.get("convert.selectedDirection")
    // Set default transfer direction
    switch (netId) {
        case 42:
            if (selectedDirection === 0) return
            switchOriginChain(selectedDirection)
            break
        case 21:
            if (selectedDirection === 1) return
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

export const updateMarketData = async function() {
    console.log('updateMarketData')
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

    // try {
    //     const usdt = await fetch(`https://api.coincap.io/v2/assets/tether`, {
    //         method: "GET",
    //     });

    //     store.set("usdtusd", (await usdt.json()).data.priceUsd);
    // } catch (e) {
    //     console.error(e);
    //     Sentry.withScope(function(scope) {
    //         scope.setTag("error-hint", "updating market data");
    //         Sentry.captureException(e);
    //     });
    // }
};

export const fetchTokenPrice = async function(token: any) {
    console.log('updateMarketData')
    const store = getStore();

    if (token.priceFeed.length === 0) return
    try {
        const price = await fetch(token.priceFeed, {
            method: "GET",
        });
        store.set(`${token.priceTicker}usd`, (await price.json()).data.priceUsd);
        console.log('price object', price)
    } catch (e) {
        console.error(e);
    }
}

export const fetchTokenBalance = async function(asset: any) {
    const store = getStore();

    const web3 = store.get("localWeb3");
    const walletAddress = store.get("localWeb3Address");
    // const walletNetwork = store.get("localWeb3Network");
    if (!web3 || !walletAddress) {
        return;
    }
    // Enable in prod
    // if (NETWORK_TYPE[asset] !== walletNetwork) return

    const token = TOKENS[asset]
    if (!token) return

    fetchTokenPrice(token)
    const tokenContract = new web3.eth.Contract(token.abi, token.address);
    const tokenBal = await tokenContract.methods.balanceOf(walletAddress).call();
    store.set(`${token.id}Balance`, Number(web3.utils.fromWei(tokenBal)).toFixed(2));
}

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

    if (walletNetwork === "Ethereum mainnet" || walletNetwork === "Kovan testnet" || walletNetwork === "Rinkeby") {
        const ethBal = await web3.eth.getBalance(walletAddress);
        console.log(ethBal)
        console.log('ETH BALANACE', ethBal)
        store.set("ETHBalance", Number(web3.utils.fromWei(ethBal)).toFixed(2));
    } else if (walletNetwork === "Elastos mainnet" || walletNetwork === "Elastos testnet") {
        const elaBal = await web3.eth.getBalance(walletAddress);
        console.log('ELA BALANACE', elaBal)
        store.set("ELABalance", Number(web3.utils.fromWei(elaBal)).toFixed(2));
    }


    // Mana test
    // const usdt = new web3.eth.Contract(ERC20_ABI, "0x0f5d2fb29fb7d3cfee444a200298f468908cc942");
    // const usdtBal = await usdt.methods.balanceOf(walletAddress).call();
    // store.set("USDTBalance", Number(web3.utils.fromWei(usdtBal)).toFixed(4));

    // Enigma test
    // const usdt = new web3.eth.Contract(ERC20_ABI, "0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4");
    // console.log(usdt)
    // const usdtBal = await usdt.methods.balanceOf(walletAddress).call();
    // store.set("USDTBalance", Number(usdtBal / (Math.pow(10, 8))).toFixed(4));

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
            initLocalWeb3()
        });
        listeningProvider.on("chainChanged", async () => {
            // window.location.reload();
            const netId = await web3.eth.net.getId();
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
