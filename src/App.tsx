import React from "react";
import { createStore, withStore } from "@spyna/react-store";
import queryString from "query-string";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import BridgeContainer from "./containers/BridgeContainer";
import NavContainer from "./containers/NavContainer";
import FooterContainer from "./containers/FooterContainer";
// import NetworkModalContainer from "./containers/NetworkModalContainer";
import WalletModal from "./components/WalletModal";
import TransferContainer2 from "./containers/TransferContainer2";
import ConfirmContainer from "./containers/ConfirmContainer";
import ErrorModal from "./components/ErrorModal";
import { storeListener } from "./services/storeService";
import theme from "./theme/theme";
// import { setNetwork } from "./utils/walletUtils";
import { BRIDGE_SYMBOL_MAP } from "./utils/bridgeUtils";
import { USDT_ADDRESS_TEST } from "./utils/web3Utils";

require("dotenv").config();

const styles = () => ({
    container: {
        minHeight: "100vh",
        // background: "rgb(32,32,32)",
        // backgroundImage:
        //   "radial-gradient(circle, rgba(28,28,28,1) 30%, rgba(239,239,239,1) 33%, rgba(64,102,120,1) 38%, rgba(28,28,28,1) 45%);",
        // backgroundImage: "radial-gradient( rgba(75,78,78,1) 0%, rgba(0,0,0,1) 70%)",
        // background:
        // "linear-gradient(111.63deg, rgb(255, 195, 171) 0%, rgb(250, 250, 226) 49.48%, rgb(203, 243, 239) 100%)",
        // backgroundImage:
        //   "linear-gradient(90deg, rgba(114,188,219,1) 0%, rgba(72,134,161,1) 10%, rgba(24,39,43,1) 20%, rgba(40,40,40,1) 50%, rgba(78,61,21,1) 80%, rgba(194,151,58,1) 90%, rgba(244,202,108,1) 100%);",

        // backgroundImage: "linear-gradient(315deg, #000000 0%, #414141 74%)",
        backgroundImage: "linear-gradient(115deg, #263040 0%, #2c2123 80%)",
        // backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",

        // backgroundPosition: "0 -30vh",
        backgroundRepeat: "no-repeat",
        // alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        // alignItems: "start",
    },
    transfersContainer: {
        padding: theme.spacing(3),
    },
});

const initialState = {
    // networking
    USDTAddress: USDT_ADDRESS_TEST,
    selectedNetwork: "",
    queryParams: {},

    // wallet & web3
    dataWeb3: null,
    localWeb3: null,
    localWeb3Address: "",
    localWeb3Network: "",
    box: null,
    space: null,
    spaceError: false,
    spaceRequesting: false,
    walletConnecting: false,
    loadingBalances: true,
    ethBalance: 0,
    fees: null,
    selectedWalletType: "MetaMask",

    // bridge/wallet selection
    selectedBridge: "",
    selectedPair: "",
    confirmBridge: false,
    selectedWallet: false,
    selectedTab: 1,
    selectedAsset: "eth",

    // modals
    showWalletModal: false,
    showNetworkMenu: false,
    showDepositModal: false,
    depositDisclosureChecked: false,
    showCancelModal: false,
    cancelModalTx: null,
    showGatewayModal: false,
    gatewayModalTx: null,
    showAboutModal: false,

    // errors
    noWeb3: false,
    wrongNetwork: false,
    txRejected: false,
    unknownError: false,

    // warnings
    walletConnectWarning: false,

    // awaiting user
    waitingApproval: false,

    // confirmations
    confirmTx: null,
    confirmAction: "",
    confirmationNumber: 0,
    confirmationTotal: 6,
    confirmationError: null as string | null,
    confirmationProgress: false,
    validatorStep: false,
    validatorProgress: 0,
    transferSuccess: false,

    // contracts
    _contractInput: null,

    // txIDs
    sourceTxID: null as string | null,
    destTxID: null as string | null,

    // conversions
    // 'convert.adapterAddress': ADAPTER_TEST,
    "convert.adapterWbtcAllowance": "",
    "convert.adapterWbtcAllowanceRequesting": "",
    "convert.transactions": [],
    "convert.pendingConvertToEthereum": [],
    "convert.selectedFormat": "weth",
    "convert.selectedDirection": 0,
    "convert.amount": "",
    "convert.destination": "",
    "convert.destinationValid": false,
    "convert.destinationInputFocused": false,
    "convert.showDestinationError": false,
    "convert.exchangeRate": "",
    "convert.renVMFee": "",
    "convert.networkFee": "",
    "convert.conversionTotal": "",
};

interface Props {
    store: any;
    classes: { [key in string]: string };
}

class AppWrapper extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const { store } = this.props;
        const params = queryString.parse(window.location.search);

        store.set("queryParams", params);
        // setNetwork("mainnet");
        // initLocalWeb3("injected");
    }

    render() {
        // window.ethereum.autoRefreshOnNetworkChange = false;
        // window.ethereum.on(isVersion8 ? 'chainChanged' : 'networkChanged', network => {
        //     choiceNetwork()
        // })
        const classes = this.props.classes;
        const store = this.props.store;
        storeListener(store);

        const confirmBridge = store.get("confirmBridge");
        const selectedBridge = store.get("selectedBridge");
        const selectedPair = store.get("selectedPair");

        const showWalletModal = store.get("showWalletModal");
        const confirmAction = store.get("confirmAction");
        const confirmTx = store.get("confirmTx");

        const noWeb3 = store.get("noWeb3");

        return (
            <ThemeProvider theme={theme}>
                {/* <NetworkModalContainer /> */}
                <Grid container className={classes.container}>
                    <Grid container className={classes.contentContainer}>
                        <Grid container alignItems="flex-start">
                            <NavContainer />
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                            {showWalletModal && (
                                <WalletModal />
                            )}

                            {!confirmBridge && (
                                <Grid item xs={12} sm={8} md={6}>
                                    <BridgeContainer
                                        active={
                                            selectedBridge ? BRIDGE_SYMBOL_MAP[selectedBridge] : "ETH"
                                        }
                                        pair={
                                            selectedPair ? BRIDGE_SYMBOL_MAP[selectedPair] : "ELA"
                                        }
                                        items={["ELA", "ETH", "TRX"]}
                                        onBridgeChange={(v: string) => {
                                            const bridge = v.toLowerCase();
                                            store.set("selectedBridge", bridge);
                                            if (bridge === selectedPair) {
                                                console.log("Same asset detected switching pair menu");
                                                if (bridge === "eth") {
                                                    store.set("selectedPair", "ela");
                                                }
                                                if (bridge === "ela") {
                                                    store.set("selectedPair", "eth");
                                                }
                                                if (bridge === "trx") {
                                                    store.set("selectedPair", "ela");
                                                }
                                            }
                                        }}
                                        onPairChange={(v: string) => {
                                            const pair = v.toLowerCase();
                                            store.set("selectedPair", pair);
                                        }}
                                    />
                                </Grid>
                            )}
                            {confirmBridge && (
                                <Grid item xs={12} sm={8} md={6}>
                                    {confirmTx && confirmAction ? (
                                        <ConfirmContainer />
                                    ) : (
                                            <TransferContainer2 />
                                        )}
                                </Grid>
                            )}

                            {noWeb3 && (
                                <div>
                                    <ErrorModal store={store} errorType={"noWeb3"} />
                                </div>
                            )}
                        </Grid>
                        <Grid container alignItems="flex-end">
                            {" "}
                            <FooterContainer />
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

const AppWrapperComponent = withStore(AppWrapper);

class App extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return <AppWrapperComponent classes={classes} />;
    }
}

export default createStore(withStyles(styles)(App), initialState);
