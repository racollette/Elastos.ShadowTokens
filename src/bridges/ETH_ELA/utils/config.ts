import MetaMask from "../../../assets/metamask-fox.svg";
import Elaphant from "../../../assets/elaphant.png";
import WalletConnect from "../../../assets/walletconnect.svg";

export const WALLET_ICON_MAP: { [key in string]: string } = {
    MetaMask: MetaMask,
    Elaphant: Elaphant,
    WalletConnect: WalletConnect,
};

export const VALIDATOR_TIMEOUT = 300000

export const SUPPORTED_NETWORK_IDS: { [key in number]: string } = {
    1: 'Ethereum',
    20: 'Elastos',
    21: 'Elastos Testnet',
    42: 'Kovan',
}

export const EXPLORER_URLS: { [key in string]: string } = {
    "Ethereum": "https://etherscan.io",
    "Kovan": "https://kovan.etherscan.io",
    "Elastos": "https://explorer.elaeth.io",
    "Elastos Testnet": "https://testnet.elaeth.io",
}

export const SUPPORTED_RPC_URLS: { [key in string]: string } = {
    'Ethereum': `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    'Kovan': `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    'Elastos': "https://mainrpc.elaeth.io",
    'Elastos Testnet': "https://rpc.elaeth.io",
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
    selectedWalletType: "MetaMask",

    // bridge/wallet selection
    selectedBridge: "eth",
    selectedPair: "ela",
    confirmBridge: false,
    selectedWallet: false,
    selectedAsset: "eth",

    // modals
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

    // awaiting user
    waitingApproval: false,

    // confirmations
    confirmTx: null,
    confirmationNumber: 0,
    confirmationTotal: null,
    transferInProgress: false,
    confirming: false,
    confirmationStep: 0,
    transferSuccess: false,
    validatorTimeout: false,
    transactionType: "",

    // txIDs
    sourceTxID: null as string | null,
    destTxID: null as string | null,

    // conversions
    "convert.transactions": [],
    "convert.selectedFormat": "elaeth",
    "convert.selectedDirection": 0,
    "convert.amount": "",
    "convert.destination": "",
};