import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import theme from "../theme/theme";
import classNames from "classnames";
import { restoreInitialState } from "../utils/txUtils";
import { BRIDGE_NAME_MAP, BRIDGE_ICON_MAP } from "../utils/bridgeUtils";
import Hidden from "@material-ui/core/Hidden";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ShadowtokensLogo from "../assets/logo_title14.svg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LanguageSelect from "../components/LanguageSelect";
import { Translate } from "../components/Translate";

const styles: Styles<typeof theme, any> = (theme) => ({
  navContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: 52,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  logo: {
    height: 48,
    width: "auto",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      height: 38,
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
    [theme.breakpoints.down("xs")]: {
      width: "85%",
      marginTop: theme.spacing(1.5),
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
  walletActive: {
    borderColor: theme.palette.info.contrastText,
    // '&:hover': {
    //     borderColor: theme.palette.primary.dark,
    // },
  },
  bridgeActive: {
    borderColor: theme.palette.info.contrastText,
    // '&:hover': {
    //     borderColor: theme.palette.secondary.dark,
    // },
  },
  icon: {
    height: 22,
    width: "auto",
    marginRight: theme.spacing(1),
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: "#3dc29c",
    borderRadius: 5,
    float: "left",
    marginTop: 6.85,
    marginRight: 6,
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
      justifyContent: "center",
    },
  },
  navButtonText: {
    fontSize: 14,
  },
  logoMobile: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
});

const WalletButton = withStyles({
  root: {
    textTransform: "none",
    border: "1px solid " + theme.palette.primary.main,
    borderRadius: 8,
    backgroundColor: "rgb(32,32,32)",
    padding: 5,
    "&:hover": {
      borderColor: theme.palette.primary.contrastText,
      backgroundColor: "rgb(32,32,32)",
    },
  },
})(Button);

const BridgeButton = withStyles({
  root: {
    textTransform: "none",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: 8,
    backgroundColor: "rgb(32,32,33)",
    padding: 5,
    "&:hover": {
      borderColor: theme.palette.primary.contrastText,
      backgroundColor: "rgb(32,32,32)",
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

    const walletAddress = store.get("localWeb3Address");
    const selectedBridge = store.get("selectedBridge");
    const selectedPair = store.get("selectedPair");

    return (
      <Grid item xs={12} className={classes.navContainer}>
        <Container>
          {
            <Grid container alignItems="center">
              <Grid item xs={12} sm={5}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  className={classes.logoMobile}
                >
                  <img
                    alt="Ren Logo"
                    className={classes.logo}
                    src={ShadowtokensLogo}
                  />
                  {/* <div className={classes.branding}>ShadowTokens</div> */}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Grid
                  container
                  className={classes.navButtons}
                  alignItems="center"
                >
                  <WalletButton
                    disableRipple
                    onClick={() => {
                      // if (!walletAddress) {
                      store.set("showWalletModal", true);
                      //   initLocalWeb3(walletType);
                      // }
                    }}
                    variant="outlined"
                    size="small"
                    className={classNames(
                      classes.accountButton,
                      walletAddress && classes.walletActive
                    )}
                  >
                    {walletAddress ? (
                      <div>
                        <div className={classes.circle}></div>
                        <span>
                          {walletAddress.slice(0, 7) +
                            "..." +
                            walletAddress.slice(walletAddress.length - 5)}
                        </span>
                      </div>
                    ) : (
                      <span className={classes.navButtonText}>
                        <Translate text="Nav.Connect" />
                        {/* <span className={classes.hideMobile}></span> */}
                      </span>
                    )}
                  </WalletButton>
                  <BridgeButton
                    disableRipple
                    onClick={() => {
                      restoreInitialState();
                    }}
                    variant="outlined"
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
                        className={classes.navButtonText}
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
                      <span className={classes.navButtonText}>
                        <Translate text="Nav.Bridge" />

                        {/* <span className={classes.hideMobile}></span> */}
                      </span>
                    )}
                  </BridgeButton>
                  <Hidden smDown>
                    <LanguageSelect
                      className={classes.hideMobile}
                      store={store}
                      isVisible={true}
                      position={{ right: 0 }}
                    />
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          }
        </Container>
      </Grid>
    );
  }
}

export default withStyles(styles)(withStore(NavContainer));
