import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import { SwapCalls } from "@material-ui/icons";
import classNames from "classnames";
import BackArrow from "../assets/back-arrow.svg";
import { gatherFeeData, MIN_TX_AMOUNTS } from "../utils/txUtils";
import {
  MINI_ICON_MAP,
  SYMBOL_MAP,
  CONVERT_MAP,
  NETWORK_MAP,
  // abbreviateAddress,
  // updateBalance,
} from "../utils/walletUtils";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CurrencySelect from "../components/CurrencySelect";
import BigCurrencyInput from "../components/BigCurrencyInput";
// import ActionLink from "../components/ActionLink";
import Numeral from "numeral";
import theme from "../theme/theme";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(20,20,20)",
    borderRadius: "40px",
    // boxShadow: "#FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0)",
    maxWidth: 500,
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  lunar: {
    boxShadow:
      "#FFF 0 -5px 4px, #8DFEFF 0 -3px 10px, #3596DD 0 -10px 20px, #2552B9 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0)",
  },
  solar: {
    boxShadow:
      "#FFF 0 -5px 4px, #ff0 0 -3px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0)",
  },
  headerText: {
    textAlign: "center",
    position: "relative",
  },
  navTitle: {
    color: "#fff",
    fontSize: "12",
    marginBottom: theme.spacing(2),
  },
  back: {
    position: "absolute",
    top: 4,
    left: 10,
    height: "auto",
    width: 20,
    cursor: "pointer",
    zIndex: 100000,
    "&:hover": {
      opacity: 0.75,
    },
  },
  transferActionTabs: {
    margin: "0px auto",
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    "& div.MuiToggleButtonGroup-root": {
      width: "100%",
    },
    "& button": {
      width: "50%",
    },
  },
  depositAddressContainer: {},
  depositAddress: {
    width: "100%",
  },
  actionButtonContainer: {
    paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
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
    borderRadius: "16px",
  },
  amountField: {
    width: "100%",
  },
  depositButton: {},
  withdrawButton: {},
  actions: {},
  transactionsContainer: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(0),
    marginTop: theme.spacing(2),
    borderTop: "1px solid #EBEBEB",
  },
  actionsContainer: {
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  destChooser: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    "& div.MuiToggleButtonGroup-root": {
      width: "100%",
    },
    "& button": {
      width: "50%",
    },
  },
  fees: {
    width: "100%",
    border: "1px solid " + theme.palette.divider,
    fontSize: 12,
    padding: theme.spacing(1),
    paddingBottom: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    "& span": {
      marginBottom: theme.spacing(1),
    },
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(0.75),
  },
  toggle: {
    "& button": {
      minHeight: "auto",
      border: "1px solid transparent",
      borderBottom: "1px solid " + theme.palette.divider,
      height: 56,
      backgroundColor: "#fff",
      "&:first-child": {
        borderRight: "1px solid " + theme.palette.divider,
      },
      "&.MuiToggleButton-root": {},
      "&.Mui-selected": {
        borderBottom: "1px solid transparent",
        color: theme.palette.primary.main,
        backgroundColor: "#transparent !important",
      },
      "& .MuiToggleButton-label": {
        fontSize: 16,
      },
      "& span": {
        textTransform: "capitalize !important",
      },
    },
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  optionsContainer: {
    border: "1px solid #EDEFF3",
    borderBottom: "none",
    borderRadius: 4,
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
  },
  option: {
    color: "#fff",
    // borderBottom: "1px solid #EDEFF3",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: 60,
    fontSize: 16,
    "& img": {
      height: "auto",
      width: 24,
      marginRight: theme.spacing(1),
    },
    "& .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
    },
  },
  standaloneOption: {
    border: "1px solid #DBE0E8",
    borderRadius: 12,
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
  },
  addressInput: {
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  currencySelect: {
    marginLeft: theme.spacing(-1),
    width: "calc(100% + 8px)",
    "& MuiButton-root": {
      textTransform: "none !important",
    },
  },
  amountContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  totalCell: {
    wordBreak: "break-word",
  },
  amountError: {
    textAlign: "center",
    color: "#FF4545",
    fontSize: 12,
    margin: "0px auto",
  },
  switchDirection: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  switchNetworkLabels: {
    fontSize: 14,
    color: "#b8bbc6",
  },
  disclosure: {
    width: "100%",
    maxWidth: 370,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
    border: "1px solid " + theme.palette.primary.main,
    fontSize: 12,
    lineHeight: "17px",
    borderRadius: 4,
    marginBottom: theme.spacing(3),
    "& a": {
      color: "inherit",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  grayText: {
    color: "#b8bbc6",
  },
  usd: {
    fontSize: 16,
    // whiteSpace: "none",
    wordBreak: "break-word",
  },
  large: {
    fontSize: 17,
  },
  medium: {
    fontSize: 15,
  },
  small: {
    fontSize: 13,
  },
  smallest: {
    fontSize: 11,
  },
});

class TransferContainer2 extends React.Component<any> {
  burnInputRef = React.createRef();
  constructor(props: any) {
    super(props);
    this.state = props.store.getState();
  }

  showDepositModal(tx: any) {
    const { store } = this.props;
    store.set("showDepositModal", true);
    store.set("depositModalTx", tx);
  }

  async gatherFeeData() {}

  getBalance(asset: string) {
    console.log("getBalance");
    const { store } = this.props;
    console.log(store.get("ethBalance"));
    return store.get(`${asset}Balance`);
  }

  validateDeposit() {
    const { store } = this.props;
    const selectedAsset = store.get("selectedAsset");
    const amount = store.get("convert.amount");
    const amountValid =
      Number(amount) >=
      MIN_TX_AMOUNTS[selectedAsset as keyof typeof MIN_TX_AMOUNTS];

    if (!amount || !amountValid) {
      store.set("convert.showAmountError", true);
      return false;
    } else {
      store.set("convert.showAmountError", false);
      return true;
    }
  }

  validateWithdraw() {
    const { store } = this.props;
    const amount = store.get("convert.amount");
    const convertAddressValid = store.get("convert.destinationValid");
    const showAddressError = !convertAddressValid;
    const selectedAsset: keyof typeof MIN_TX_AMOUNTS = store.get(
      "selectedAsset"
    );
    const selectedFormat: keyof typeof SYMBOL_MAP = store.get(
      "convert.selectedFormat"
    );
    const balance = store.get(SYMBOL_MAP[selectedFormat] + "Balance");

    const amountValid =
      Number(amount) >= MIN_TX_AMOUNTS[selectedAsset] &&
      amount <= Number(balance);

    if (showAddressError) {
      store.set("convert.showDestinationError", true);
    } else {
      store.set("convert.showDestinationError", false);
    }

    if (!amount || !amountValid) {
      store.set("convert.showAmountError", true);
    } else {
      store.set("convert.showAmountError", false);
    }

    if (showAddressError || !amount || !amountValid) {
      return false;
    } else {
      return true;
    }
  }

  async newDeposit() {
    const { store } = this.props;

    const amount = store.get("convert.amount");
    const localWeb3Address = store.get("localWeb3Address");
    const network = store.get("selectedNetwork");
    const format: keyof typeof NETWORK_MAP = store.get(
      "convert.selectedFormat"
    );
    const asset: keyof typeof NETWORK_MAP = store.get("selectedAsset");

    const tx = {
      id: "tx-" + Math.floor(Math.random() * 10 ** 16),
      type: "convert",
      instant: false,
      // awaiting: `${asset}-init`,
      sourceAsset: asset,
      sourceNetwork: NETWORK_MAP[asset],
      sourceNetworkVersion: network,
      destAddress: localWeb3Address,
      destNetwork: NETWORK_MAP[format],
      destNetworkVersion: network,
      destAsset: format,
      amount: Number(amount),
      error: false,
      txHash: "",
    };

    if (!this.validateDeposit()) {
      return;
    }

    store.set("confirmTx", tx);
    store.set("confirmAction", "deposit");
  }

  async newWithdraw() {
    const { store } = this.props;

    const amount = store.get("convert.amount");
    const destination = store.get("convert.destination");
    const network = store.get("selectedNetwork");
    const format: keyof typeof NETWORK_MAP = store.get(
      "convert.selectedFormat"
    );
    const asset: keyof typeof NETWORK_MAP = store.get("selectedAsset");

    const tx = {
      id: "tx-" + Math.floor(Math.random() * 10 ** 16),
      type: "convert",
      instant: false,
      sourceAsset: format,
      sourceNetwork: NETWORK_MAP[format],
      sourceNetworkVersion: network,
      destAddress: destination,
      destNetwork: NETWORK_MAP[asset],
      destNetworkVersion: network,
      destAsset: asset,
      amount: Number(amount),
      error: false,
      txHash: "",
    };

    if (!this.validateWithdraw()) {
      return;
    }

    store.set("confirmTx", tx);
    store.set("confirmAction", "withdraw");
  }

  async switchOriginChain() {
    const { store } = this.props;
    // console.log("Swapping direction");
    const selectedDirection = store.get("convert.selectedDirection");
    if (selectedDirection === 0) {
      store.set("convert.selectedDirection", Number(1));
    } else {
      store.set("convert.selectedDirection", Number(0));
    }

    const selectedAsset: keyof typeof MIN_TX_AMOUNTS = store.get(
      "selectedAsset"
    );
    const destAsset = CONVERT_MAP[selectedAsset];

    store.set("convert.selectedFormat", selectedAsset);
    store.set("selectedAsset", destAsset);

    // store.set("convert.amount", "");
    // store.set("convert.networkFee", "");
    // store.set("convert.conversionTotal", "");
    // store.set("convert.destination", "");
    // store.set("convert.showAmountError", false);
    // store.set("convert.showDestinationError", false);
  }

  render() {
    const { classes, store } = this.props;

    const selectedDirection = store.get("convert.selectedDirection");
    const selectedFormat: keyof typeof SYMBOL_MAP = store.get(
      "convert.selectedFormat"
    );
    const selectedAsset: keyof typeof MIN_TX_AMOUNTS = store.get(
      "selectedAsset"
    );
    const destAsset = selectedFormat;
    // const localWeb3Address = store.get("localWeb3Address");
    const balance = store.get(SYMBOL_MAP[selectedAsset] + "Balance");
    const amount = store.get("convert.amount");
    const total = Number(store.get("convert.conversionTotal")).toFixed(4);

    // const allowance = store.get("convert.adapterWbtcAllowance");
    // const convertAddressValid = store.get("convert.destinationValid");
    // const hasAllowance = Number(amount) <= Number(allowance);
    // const allowanceRequesting = store.get(
    //     "convert.adapterWbtcAllowanceRequesting"
    // );

    // const canConvertTo = amount >= MIN_TX_AMOUNTS[selectedAsset];
    // const canConvertFrom =
    //     Number(amount) >= MIN_TX_AMOUNTS[selectedAsset] &&
    //     amount <= Number(balance) &&
    //     convertAddressValid;
    // const showAmountError = store.get("convert.showAmountError");
    // const showDestinationError = store.get("convert.showDestinationError");
    // const destAsset = selectedDirection ? selectedAsset : selectedFormat;

    // Replace 'w' to retrieve price of native asset, assuming they are equivalent
    // Careful if asset ticket contains a w
    const usdValue = Number(
      store.get(`${selectedAsset.replace("w", "")}usd`) * amount
    ).toFixed(2);
    const chars = total ? String(total) : "";

    let size = "large";
    if (chars.length > 8 && chars.length <= 10) {
      size = "medium";
    } else if (chars.length > 10 && chars.length <= 12) {
      size = "small";
    } else if (chars.length > 12) {
      size = "smallest";
    }

    return (
      <React.Fragment>
        <div
          className={classNames(
            selectedDirection ? classes.solar : classes.lunar,
            classes.container
          )}
        >
          <div className={classes.headerText}>
            <img
              className={classes.back}
              src={BackArrow}
              alt="Back"
              onClick={() => {
                store.set("selectedWallet", false);
                store.set("walletConnecting", false);
                store.set("spaceRequesting", false);
              }}
            />
            <Typography className={classes.navTitle}>
              Build Transaction
            </Typography>
          </div>
          {
            <div className={classes.actionsContainer}>
              <Grid className={classes.actions}>
                {selectedDirection === 0 && (
                  /// ETH to ELA
                  <React.Fragment>
                    <Grid
                      container
                      className={classNames(
                        classes.standaloneOption,
                        classes.option
                      )}
                    >
                      <Grid item xs={3}>
                        <CurrencySelect
                          active={SYMBOL_MAP[selectedAsset]}
                          className={classes.currencySelect}
                          items={["ETH", "wELA", "USDT"]}
                          onCurrencyChange={(v: string) => {
                            const asset = v.toLowerCase();
                            if (asset === "wela") {
                              store.set(
                                "convert.selectedFormat",
                                `${asset.replace("w", "")}`
                              );
                              store.set("selectedAsset", asset);
                            } else {
                              store.set("convert.selectedFormat", `w${asset}`);
                              store.set("selectedAsset", asset);
                            }
                            gatherFeeData();
                          }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <BigCurrencyInput
                          active={SYMBOL_MAP[selectedAsset]}
                          className={classes.currencySelect}
                          usdValue={usdValue}
                          value={amount}
                          balance={balance}
                          direction={selectedDirection}
                          placeholder={"Convert Amount"}
                          onChange={(event: any) => {
                            const value = event.value || "";
                            console.log("Send amount input", value);
                            store.set("convert.amount", String(value));
                            gatherFeeData();
                          }}
                        />
                        {/* {showAmountError && (
                          <Typography className={classes.amountError}>
                            Minimum mint amount is{" "}
                            {MIN_TX_AMOUNTS[selectedAsset]}{" "}
                            {SYMBOL_MAP[selectedAsset]}
                          </Typography>
                        )} */}
                      </Grid>
                    </Grid>

                    {/* Network direction indicator */}
                    <Grid className={classes.switchDirection}>
                      <Grid container justify="center">
                        <Typography className={classes.switchNetworkLabels}>
                          From {NETWORK_MAP[selectedAsset]}
                        </Typography>
                      </Grid>
                      <Grid container justify="center">
                        <SwapCalls
                          fontSize="large"
                          onClick={this.switchOriginChain.bind(this)}
                        />
                      </Grid>
                      <Grid container justify="center">
                        <Typography className={classes.switchNetworkLabels}>
                          To {NETWORK_MAP[destAsset]}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      className={classNames(
                        classes.standaloneOption,
                        classes.option
                      )}
                      justify="center"
                    >
                      <Grid item xs={4}>
                        You will receive
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        className={classNames(
                          classes.totalCell,
                          classes.currencySelect,
                          classes[size]
                        )}
                      >
                        <img src={MINI_ICON_MAP[destAsset]} alt={destAsset} />{" "}
                        {total || ""} {SYMBOL_MAP[destAsset]}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className={classNames(
                          usdValue ? classes.grayText : "",
                          classes.usd
                        )}
                      >
                        <Grid
                          container
                          justify="flex-end"
                          className={classNames(classes[size])}
                        >
                          ({Numeral(usdValue).format("$0,0.00")})
                        </Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                  /// End ETH to ELA
                )}

                {selectedDirection === 1 && (
                  /// ELA to ETH
                  <React.Fragment>
                    <Grid
                      container
                      className={classNames(
                        classes.standaloneOption,
                        classes.option
                      )}
                    >
                      <Grid item xs={3}>
                        <CurrencySelect
                          active={SYMBOL_MAP[selectedAsset]}
                          className={classes.currencySelect}
                          items={["wETH", "ELA", "wUSDT"]}
                          // ETHBalance={store.get("ethbal")}
                          onCurrencyChange={(v: string) => {
                            const asset = v.toLowerCase();
                            const destAsset = CONVERT_MAP[asset];
                            store.set("selectedAsset", asset);
                            store.set("convert.selectedFormat", destAsset);
                            gatherFeeData();
                          }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <BigCurrencyInput
                          active={SYMBOL_MAP[selectedAsset]}
                          className={classes.currencySelect}
                          usdValue={usdValue}
                          value={amount}
                          balance={balance}
                          direction={selectedDirection}
                          placeholder={"Convert Amount"}
                          onChange={(event: any) => {
                            const value = event.value || "";
                            console.log("Send amount input", value);
                            store.set("convert.amount", String(value));
                            gatherFeeData();
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Network direction indicator */}
                    <Grid className={classes.switchDirection}>
                      <Grid container justify="center">
                        <Typography className={classes.switchNetworkLabels}>
                          From {NETWORK_MAP[selectedAsset]}
                        </Typography>
                      </Grid>
                      <Grid container justify="center">
                        <SwapCalls
                          fontSize="large"
                          onClick={this.switchOriginChain.bind(this)}
                        />
                      </Grid>
                      <Grid container justify="center">
                        <Typography className={classes.switchNetworkLabels}>
                          To {NETWORK_MAP[destAsset]}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      className={classNames(
                        classes.standaloneOption,
                        classes.option
                      )}
                      justify="center"
                    >
                      <Grid item xs={4}>
                        You will receive
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        className={classNames(
                          classes.totalCell,
                          classes.currencySelect,
                          classes[size]
                        )}
                      >
                        <img src={MINI_ICON_MAP[destAsset]} alt={destAsset} />{" "}
                        {total || ""} {SYMBOL_MAP[destAsset]}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className={classNames(
                          usdValue ? classes.grayText : "",
                          classes.usd
                        )}
                      >
                        <Grid
                          container
                          justify="flex-end"
                          className={classNames(classes[size])}
                        >
                          ({Numeral(usdValue).format("$0,0.00")})
                        </Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                  /// End ELA to ETH
                )}

                <Grid
                  container
                  justify="center"
                  className={classes.actionButtonContainer}
                >
                  {/* {selectedDirection === 0 && ( */}
                  <Grid item xs={12}>
                    <Button
                      disabled={!total || parseFloat(total) < 0.0000001}
                      variant={"contained"}
                      disableRipple
                      color={selectedDirection ? "secondary" : "primary"}
                      size="large"
                      fullWidth
                      className={classNames(
                        classes.margin,
                        classes.actionButton
                      )}
                      onClick={this.newDeposit.bind(this)}
                    >
                      Next
                    </Button>
                  </Grid>
                  {/* )} */}
                  {/* {selectedDirection === 1 && (
                    <Grid item xs={12}>
                      <Button
                        disabled={!total || parseFloat(total) < 0.0000001}
                        variant={"contained"}
                        disableRipple
                        color="primary"
                        fullWidth
                        size="large"
                        className={classNames(
                          classes.margin,
                          classes.actionButton
                        )}
                        onClick={this.newWithdraw.bind(this)}
                      >
                        Next
                      </Button>
                    </Grid>
                  )} */}
                </Grid>
              </Grid>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withStore(TransferContainer2));
