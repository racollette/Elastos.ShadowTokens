import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import theme from "../theme/theme";
import classNames from "classnames";
// import { restoreInitialState } from "../bridges/ETH_ELA/utils/txUtils";
// import { BRIDGE_NAME_MAP, BRIDGE_ICON_MAP } from "../bridges/bridges";
import Hidden from "@material-ui/core/Hidden";
// import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ShadowtokensTitle from "../assets/logo_title.svg";
import ShadowtokensLogo from "../assets/logo.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LanguageSelect from "../components/LanguageSelect";
import BridgeSelect from "../components/BridgeSelect";
import { Translate } from "../components/Translate";
import Switch from "../components/Switch";
import Menu from "../components/Menu";

const styles: Styles<typeof theme, any> = (theme) => ({
  navContainer: {
    padding: theme.spacing(1.5),
    minHeight: 52,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  logo: {
    height: 44,
    width: "auto",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      height: 60,
    },
  },
  branding: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(0.5),
    fontSize: 26,
  },
  aboutButton: {
    marginRight: theme.spacing(1),
    "& svg": {
      height: "0.7em",
      marginRight: theme.spacing(0.25),
    },
  },
  accountButton: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
    "& svg": {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  faq: {
    marginRight: theme.spacing(2),
  },
  hideMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  padMobile: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
  },
  icon: {
    height: 22,
    width: "auto",
    marginRight: theme.spacing(0.75),
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: "#3dc29c",
    borderRadius: 5,
    float: "left",
    marginTop: 6.85,
    marginRight: 4,
    marginLeft: 2,
  },
  walletLabel: {
    marginRight: theme.spacing(1),
  },
  activeNetwork: {
    textTransform: "uppercase",
    marginRight: theme.spacing(2),
  },
  navButtons: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      // justifyContent: "center",
    },
  },
  walletActive: {
    borderColor: "rgb(66, 66, 66)",
    backgroundColor: "rgb(32,32,32)",
    "&:hover": {
      // backgroundColor: "rgb(54,54,54)",
      borderColor: theme.palette.primary.main,
    },
  },
  bridgeActive: {
    borderColor: "rgb(66, 66, 66)",
    backgroundColor: "rgb(32,32,32)",
    "&:hover": {
      // backgroundColor: "rgb(54,54,54)",
      borderColor: theme.palette.secondary.main,
    },
  },
  walletButtonText: {
    fontSize: 14,
    color: "#fff",
    marginRight: 4,
    marginLeft: 4,
  },
  pendingButtonText: {
    fontSize: 14,
    fontWeight: 550,
    color: "#fff",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
  },
  pendingContainer: {
    height: 36,
    border: "1px solid rgb(66,66,66)",
    borderRadius: 8,
    backgroundColor: "rgb(36,36,36)",
    marginLeft: 6,
    alignItems: "center",
  },
});

const WalletButton = withStyles({
  root: {
    marginLeft: 8,
    textTransform: "none",
    border: "1px solid " + theme.palette.primary.main,
    borderRadius: 8,
    backgroundColor: "rgb(13, 129, 207, 0.2)",
    padding: 6,
    "&:hover": {
      backgroundColor: "rgb(13, 129, 207, 0.45)",
    },
  },
})(Button);

const PendingButton = withStyles({
  root: {
    marginLeft: 8,
    textTransform: "none",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: 8,
    backgroundColor: "rgb(200, 83, 103, 0.2)",
    padding: 6,
    "&:hover": {
      backgroundColor: "rgb(200, 83, 103, 0.45)",
    },
  },
})(Button);

class NavContainer extends React.Component<any> {
  anchorRef = React.createRef();

  async componentDidMount() {}

  toggleNeworkMenu() {
    const { store } = this.props;
    const showNetworkMenu = store.get("showNetworkMenu");
    store.set("showNetworkMenu", !showNetworkMenu);
  }

  render() {
    const { classes, store } = this.props;

    const page = store.get("page");
    const walletAddress = store.get("localWeb3Address");
    // const selectedBridge = store.get("selectedBridge");
    // const selectedPair = store.get("selectedPair");

    const approving = store.get("waitingApproval");
    const transferring = store.get("transferInProgress");
    const pending = approving || transferring ? true : false;

    const confirmationStep = store.get("confirmationStep");
    const confirmationNumber = store.get("confirmationNumber");

    return (
      <Grid item xs={12} className={classes.navContainer}>
        {
          <Grid container alignItems="center">
            <Grid item xs={2} sm={5}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                className={classes.logoMobile}
              >
                <img
                  alt="ShadowTokens"
                  className={classes.logo}
                  src={ShadowtokensLogo}
                />
                <Hidden xsDown>
                  <img
                    alt="ShadowTokens"
                    className={classes.logo}
                    src={ShadowtokensTitle}
                  />
                </Hidden>
              </Grid>
            </Grid>
            <Grid item xs={10} sm={7}>
              <Grid
                container
                className={classes.navButtons}
                alignItems="center"
                justify="flex-end"
              >
                {page === "bridge" && walletAddress && pending && (
                  <div className={classes.padMobile}>
                    <Grid container alignItems="center">
                      <PendingButton
                        variant="contained"
                        size="small"
                        disableRipple
                        onClick={() => {
                          if (approving) {
                            store.set("showWaitingApproval", true);
                            return;
                          }
                          if (transferring) {
                            store.set("showTransferProgress", true);
                            return;
                          }
                        }}
                      >
                        {approving && (
                          <span className={classes.pendingButtonText}>
                            <Translate text="Nav.Approve" />
                          </span>
                        )}
                        {transferring && (
                          <div>
                            {confirmationStep === 1 && (
                              <span className={classes.pendingButtonText}>
                                {confirmationNumber < 1 ? (
                                  <Translate text="Nav.Submitting" />
                                ) : (
                                  <Translate text="Nav.Confirming" />
                                )}
                              </span>
                            )}
                            {confirmationStep === 2 && (
                              <span className={classes.pendingButtonText}>
                                <Translate text="Nav.Bridging" />
                              </span>
                            )}
                          </div>
                        )}
                        <CircularProgress color="secondary" size={18} />
                      </PendingButton>
                    </Grid>
                  </div>
                )}

                <div className={classes.padMobile}>
                  <WalletButton
                    disableRipple
                    onClick={() => {
                      store.set("showWalletModal", true);
                    }}
                    variant="contained"
                    size="small"
                    className={classNames(
                      classes.accountButton,
                      walletAddress && classes.walletActive
                    )}
                  >
                    {walletAddress ? (
                      <div>
                        <div className={classes.circle}></div>
                        <span className={classes.walletButtonText}>
                          {walletAddress.slice(0, 7) +
                            "..." +
                            walletAddress.slice(walletAddress.length - 5)}
                        </span>
                      </div>
                    ) : (
                      <span className={classes.walletButtonText}>
                        <Translate text="Nav.Connect" />
                      </span>
                    )}
                  </WalletButton>
                </div>

                {/* <Hidden smDown> */}
                {/* <BridgeButton
                  disableRipple
                  onClick={() => {
                    // restoreInitialState();
                    // store.set("confirmBridge", false);
                  }}
                  variant="contained"
                  size="small"
                  className={classNames(
                    classes.accountButton,
                    selectedBridge && classes.bridgeActive
                  )}
                >
                  {selectedBridge ? (
                    <Grid
                      container
                      alignItems="center"
                      justify="center"
                      className={classes.bridgeButtonText}
                    >
                      <img
                        src={BRIDGE_ICON_MAP[selectedBridge]}
                        alt={BRIDGE_NAME_MAP[selectedBridge]}
                        className={classes.icon}
                      />
                      {BRIDGE_NAME_MAP[selectedBridge]}
                      <SwapHorizIcon />
                      <img
                        src={BRIDGE_ICON_MAP[selectedPair]}
                        alt={BRIDGE_NAME_MAP[selectedPair]}
                        className={classes.icon}
                      />
                      {BRIDGE_NAME_MAP[selectedPair]}
                    </Grid>
                  ) : (
                    <span className={classes.bridgeButtonText}>
                      <Translate text="Nav.Bridge" />
                    </span>
                  )}
                </BridgeButton> */}
                <BridgeSelect
                  className={classes.hideMobile}
                  store={store}
                  isVisible={true}
                />
                {/* </Hidden> */}
                <div className={classes.padMobile}>
                  <Switch className={classes.padMobile} />
                </div>
                {/* <Hidden smDown> */}
                  <LanguageSelect
                    className={classes.hideMobile}
                    store={store}
                    isVisible={true}
                  />
                {/* </Hidden> */}
                <div className={classes.padMobile}>
                  <Menu />
                </div>
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(withStore(NavContainer));
