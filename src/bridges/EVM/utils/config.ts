import MetaMask from "../../../assets/metamask-fox.svg";
import Elaphant from "../../../assets/elaphant.png";
import WalletConnect from "../../../assets/walletconnect.svg";
import { HT_ELA_DEFAULTS } from '../tokens'

export const VALIDATOR_TIMEOUT = 300000 // Milliseconds
export const PREAUTHORIZE_AMOUNT = 1000000 // Tokens

export const WALLET_ICON_MAP: { [key in string]: string } = {
    MetaMask: MetaMask,
    Elaphant: Elaphant,
    WalletConnect: WalletConnect,
};

export const SUPPORTED_NETWORK_IDS: { [key in number]: string } = {
    1: 'Ethereum',
    3: 'Ropsten',
    20: 'Elastos',
    21: 'Elastos Testnet',
    128: 'Heco (Huobi)',
    256: 'Heco (Huobi) Testnet',
}

export const EXPLORER_URLS: { [key in string]: string } = {
    "Ethereum": "https://etherscan.io",
    "Ropsten": "https://ropsten.etherscan.io",
    "Elastos": "https://explorer.elaeth.io",
    "Elastos Testnet": "https://testnet.elaeth.io",
    "Heco (Huobi)": "https://scan.hecochain.com",
    "Heco (Huobi) Testnet": "https://scan-testnet.hecochain.com"
}

export const SUPPORTED_RPC_URLS: { [key in string]: string } = {
    'Ethereum': `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`, // "https://api-eth.elaphant.app/api/1/eth/wrap",
    'Ropsten': `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    'Elastos': "https://api.elastos.io/eth", // "https://escrpc.elaphant.app", //  // https://mainrpc.elaeth.io
    'Elastos Testnet': "https://rpc.elaeth.io",
    "Heco (Huobi)": "https://http-mainnet.hecochain.com",
    "Heco (Huobi) Testnet": "https://http-testnet.hecochain.com",
}

export const INITIAL_STATE = {
    // wallet & web3
    dataWeb3: null,
    localWeb3: null,
    localWeb3Address: "",
    localWeb3Network: "",
    walletConnecting: false,
    loadingBalances: true,
    fees: null,
    selectedWallet: false,
    selectedWalletType: "MetaMask",

    // bridge selection
    selectedBridge: "HT_ELA",
    // selectedPair: "ela",
    confirmBridge: false,

    // token
    token: HT_ELA_DEFAULTS[0],
    tokenList: HT_ELA_DEFAULTS,

    // modals
    bridgesOpen: false,
    localesOpen: false,
    showWalletModal: false,

    // errors
    noWeb3: false,
    wrongNetwork: false,
    insufficientBalance: false,
    belowMinTxLimit: false,
    exceedsMaxTxLimit: false,
    txRejected: false,
    unknownError: false,

    // warnings
    walletConnectWarning: false,
    validatorError: false,
    validatorTimeout: false,

    // awaiting user
    waitingApproval: false,
    showWaitingApproval: false,

    // confirmations
    confirmTx: null,
    confirmationNumber: 0,
    confirmationTotal: null,
    transferInProgress: false,
    showTransferProgress: false,
    confirming: false,
    confirmationStep: 0,
    transferSuccess: false,
    transactionType: "",

    // txIDs
    sourceTxID: null as string | null,
    destTxID: null as string | null,

    // conversions
    "convert.selectedDirection": 0,
    "convert.amount": "",
    "convert.destination": "",

    // sidechain deposit and withdraw
    page: "bridge",
    transferWallet: "",
    transferURL: "",
    exchangeID: 0,
    depositStatus: "Sidechain.Deposit.Renewal.Waiting",
    depositInProgress: 0,
    depositAmount: 0,
    monitoringTransfer: false,
    withdrawalAmount: 0,
    withdrawalAddress: "",
    withdrawalInProgress: 0,
    withdrawalStatus: "Sidechain.Withdraw.Waiting",
    cryptoName: "",
    cryptoNameFound: false

};