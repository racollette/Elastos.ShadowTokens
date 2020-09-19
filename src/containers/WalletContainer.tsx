import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import { initLocalWeb3 } from "../utils/walletUtils";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import BackArrow from "../assets/back-arrow.svg";
import { WALLET_ICON_MAP } from "../utils/walletUtils";

import theme from "../theme/theme";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(25,25,25)",
    borderRadius: "40px",
    boxShadow:
      "#FFF 0 -5px 4px, #ff0 0 -3px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0)",
    maxWidth: 500,
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  headerText: {
    textAlign: "center",
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  navTitle: {
    color: "#fff",
    fontSize: "12",
  },
  back: {
    position: "absolute",
    top: 8,
    left: 10,
    height: "auto",
    width: 20,
    cursor: "pointer",
    zIndex: 100000,
    "&:hover": {
      opacity: 0.75,
    },
  },
  metamask: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    "& div": {
      background: "rgb(255,255,255,0.1)",
      borderRadius: "10px",
      border: "1px solid transparent",
      width: 110,
      height: 110,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      // opacity: 0.6,
      transition: "all 0.2s ease-in-out",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      padding: theme.spacing(2),
      boxShadow:
        "0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)",
      "&:hover": {
        // opacity: 0.8
        boxShadow:
          "0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)",
      },
      "&.selected": {
        opacity: 1,
        borderColor: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[0],
      },
    },
    "& img": {
      height: 60,
      width: "auto",
    },
  },
  walletLabel: {
    paddingTop: theme.spacing(1),
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 12.5,
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  selectedWallet: {
    opacity: "1 !important",
  },
  message: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  actionButtonContainer: {
    marginTop: theme.spacing(3),

    "& button": {
      "&.Mui-disabled": {},
      margin: "0px auto",
      fontSize: 12,
      minWidth: 175,
      padding: theme.spacing(1),
    },
  },
  actionButton: {
    width: "100%",
    borderRadius: "16px",
    // [theme.breakpoints.down('sm')]: {
    //     display: 'none'
    // }
  },
  error: {
    marginTop: theme.spacing(2),
    color: "#FF4545",
  },
  info: {
    marginTop: theme.spacing(2),
  },
  info2: {
    fontWeight: "bold",
    color: "#3F3F48",
  },
  // spinner: {
  //   position: "relative",
  //   marginRight: theme.spacing(1),
  //   marginTop: theme.spacing(0.5),
  //   width: 18,
  // },
  // spinnerTop: {
  //   color: "#eee",
  // },
  // spinnerBottom: {
  //   color: "#a4a4a4",
  //   animationDuration: "550ms",
  //   position: "absolute",
  //   left: 0,
  // },
  mobileMessage: {
    display: "none",
    // [theme.breakpoints.down('sm')]: {
    //     display: 'block'
    // }
  },
});

const NoCapsButton = withStyles({
  root: {
    textTransform: "none",
  },
})(Button);

class WalletContainer extends React.Component<any> {
  state = {};

  goBack() {
    const { store } = this.props;
    store.set("showGatewayModal", false);
    store.set("gatewayModalTx", null);
  }

  render() {
    const { classes, store } = this.props;

    const walletConnecting = store.get("walletConnecting");
    const requesting = store.get("spaceRequesting");

    const error = store.get("spaceError");
    const box = store.get("box");
    const walletType = store.get("selectedWalletType");

    let text = "Connect to " + walletType;
    if (requesting) {
      if (!box) {
        text = "Connecting to 3box";
      } else {
        text = "Loading data";
      }
    }

    return (
      <div className={classes.container}>
        <div className={classes.headerText}>
          <img
            className={classes.back}
            src={BackArrow}
            alt="Back"
            onClick={() => {
              store.set("confirmBridge", false);
            }}
          />
          <Typography variant="overline" className={classes.navTitle}>
            Select a wallet provider
          </Typography>
        </div>
        <Grid className={classes.metamask} container justify="center">
          <Grid
            container
            className={walletType === "MetaMask" ? "selected" : ""}
            onClick={() => store.set("selectedWalletType", "MetaMask")}
          >
            <img src={WALLET_ICON_MAP["MetaMask"]} alt="MetaMask" />
            <Typography className={classes.walletLabel}>Metamask</Typography>
          </Grid>

          {/* <div
                        className={walletType === "mew-connect" ? "selected" : ""}
                        onClick={() => store.set("selectedWalletType", "mew-connect")}
                    >
                        <img src={Mew} alt="Mew" />
                    </div> */}
          <Grid
            container
            className={walletType === "Elaphant" ? "selected" : ""}
            onClick={() => store.set("selectedWalletType", "Elaphant")}
          >
            <img src={WALLET_ICON_MAP["Elaphant"]} alt="Elaphant" />
            <Typography className={classes.walletLabel}>Elaphant</Typography>
          </Grid>
        </Grid>
        {/* <Grid container justify="center">
          <Typography className={classes.message} variant="body1">
            To mint or release assets, connect to a wallet provider.
          </Typography>
        </Grid> */}
        <Grid
          container
          justify="flex-start"
          direction="column"
          alignItems="center"
          className={classes.actionButtonContainer}
        >
          {/* <Grid item xs={12}> */}
          <NoCapsButton
            onClick={() => {
              initLocalWeb3(walletType);
            }}
            disabled={walletConnecting || requesting}
            className={classes.actionButton}
            size="large"
            color="secondary"
            disableRipple
            variant="contained"
            fullWidth
          >
            {requesting && (
              <div className={classes.spinner}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  className={classes.spinnerTop}
                  size={18}
                  thickness={4}
                />
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  className={classes.spinnerBottom}
                  size={18}
                  thickness={4}
                />
              </div>
            )}
            {text}
          </NoCapsButton>
          {/* </Grid> */}

          {!requesting && error && (
            <Typography variant="caption" className={classes.error}>
              Connection failed.
            </Typography>
          )}
          {requesting && (
            <React.Fragment>
              <Typography variant="caption" className={classes.info}>
                Connecting to decentralized storage, this may take a minute.
              </Typography>
              <Typography variant="caption" className={classes.info2}>
                Please approve any 3box messages that appear in your wallet.
              </Typography>
            </React.Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withStore(WalletContainer));
