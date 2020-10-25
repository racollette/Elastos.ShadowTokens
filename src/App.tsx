import React from "react";
import { createStore, withStore } from "@spyna/react-store";
import queryString from "query-string";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import BridgeContainer from "./containers/BridgeContainer";
import NavContainer from "./containers/NavContainer";
// import FooterContainer from "./containers/FooterContainer";
// import NetworkModalContainer from "./containers/NetworkModalContainer";
import WalletModal from "./components/WalletModal";
import TransferContainer from "./containers/TransferContainer";
import ConfirmContainer from "./containers/ConfirmContainer";
import ErrorModal from "./components/ErrorModal";
import { storeListener } from "./services/storeService";
import theme from "./theme/theme";
// import { setNetwork } from "./utils/walletUtils";
import { BRIDGE_SYMBOL_MAP } from "./bridges/bridges";
// import { initLocalWeb3 } from "./bridges/ETH_ELA/utils/walletUtils";
require("dotenv").config();

const styles = () => ({
  appWrapper: {
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
  },
  headerWrapper: {
    width: "100%",
    justifyContent: "space-between",
  },
  bodyWrapper: {
    display: "flex",
    width: "100%",
    paddingTop: "17.5vh",
    alignItems: "center",
    flex: 1,
    zIndex: 10,
    padding: theme.spacing(1.5),
    [theme.breakpoints.down("xs")]: {
      paddingTop: "5vh",
    },
  },
  contentContainer: {
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  transfersContainer: {
    padding: theme.spacing(3),
  },
});

const initialState = {
  // networking
  // USDTAddress: USDT_ADDRESS_TEST,
  selectedNetwork: "",
  queryParams: {},

  // wallet & web3
  dataWeb3: null,
  localWeb3: null,
  localWeb3Address: "",
  localWeb3Network: "",
  walletConnecting: false,
  loadingBalances: true,
  ethBalance: 0,
  fees: null,
  selectedWalletType: "MetaMask",

  // bridge/wallet selection
  selectedBridge: "eth",
  selectedPair: "ela",
  confirmBridge: false,
  selectedWallet: false,
  selectedTab: 1,
  selectedAsset: "eth",

  // modals
  localesOpen: false,
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
  confirmAction: "",
  confirmationNumber: 0,
  confirmationTotal: null,
  confirmationError: null as string | null,
  confirmationProgress: false,
  validatorStep: false,
  transactionType: "",
  transferSuccess: false,

  // contracts
  _contractInput: null,

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
    // initLocalWeb3();
  }

  render() {
    window.ethereum.autoRefreshOnNetworkChange = false;
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
    const insufficientBalance = store.get("insufficientBalance");
    const belowMinTxLimit = store.get("belowMinTxLimit");
    const exceedsMaxTxLimit = store.get("exceedsMaxTxLimit");

    return (
      <ThemeProvider theme={theme}>
        <Grid container justify="center">
          <Grid container className={classes.appWrapper}>
            <Grid container className={classes.headerWrapper} justify="center">
              <NavContainer />
            </Grid>
            <Grid container className={classes.bodyWrapper} justify="center">
              {showWalletModal && <WalletModal />}

              {!confirmBridge && (
                <>
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
                </>
              )}
              {confirmBridge && (
                <>
                  {confirmTx && confirmAction ? (
                    <ConfirmContainer />
                  ) : (
                    <TransferContainer />
                  )}
                </>
              )}

              {noWeb3 && (
                <div>
                  <ErrorModal store={store} errorType={"noWeb3"} />
                </div>
              )}
              {insufficientBalance && (
                <div>
                  <ErrorModal store={store} errorType={"insufficientBalance"} />
                </div>
              )}
              {belowMinTxLimit && (
                <div>
                  <ErrorModal store={store} errorType={"belowMinTxLimit"} />
                </div>
              )}
              {exceedsMaxTxLimit && (
                <div>
                  <ErrorModal store={store} errorType={"exceedsMaxTxLimit"} />
                </div>
              )}
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
