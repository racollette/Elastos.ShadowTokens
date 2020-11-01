import React from "react";
import { createStore, withStore } from "@spyna/react-store";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import BridgeContainer from "./containers/BridgeContainer";
import NavContainer from "./containers/NavContainer";
import WalletModal from "./components/WalletModal";
import TransferContainer from "./containers/TransferContainer";
import ConfirmContainer from "./containers/ConfirmContainer";
import ErrorModal from "./components/ErrorModal";
import { storeListener } from "./services/storeService";
import theme from "./theme/theme";
import { BRIDGE_SYMBOL_MAP } from "./bridges/bridges";

import { INITIAL_STATE } from "./bridges/ETH_ELA/utils/config";
import { init } from "./bridges/ETH_ELA/utils/walletUtils";

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
    init();
  }

  render() {
    if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;
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
    const pleaseConnect = store.get("pleaseConnect");
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
                    items={["ETH", "ELA"]}
                    onBridgeChange={(v: string) => {
                      const bridge = v.toLowerCase();
                      store.set("selectedBridge", bridge);
                      if (bridge === selectedPair) {
                        if (bridge === "eth") {
                          store.set("selectedPair", "ela");
                          store.set("selectedAsset", "eth");
                          // store.set("convert.selectedFormat", "elaeth");
                          store.set("convert.selectedDirection", 0);
                        }
                        if (bridge === "ela") {
                          store.set("selectedPair", "eth");
                          store.set("selectedAsset", "ela");
                          // store.set("convert.selectedFormat", "ethela");
                          store.set("convert.selectedDirection", 1);
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
              {pleaseConnect && (
                <div>
                  <ErrorModal store={store} errorType={"pleaseConnect"} />
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

export default createStore(withStyles(styles)(App), INITIAL_STATE);
