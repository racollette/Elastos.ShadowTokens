import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import { SwapCalls } from "@material-ui/icons";
// import InfoLogo1 from "../assets/infoLogo1.svg";
// import InfoLogo2 from "../assets/infoLogo2.svg";
import classNames from "classnames";
import BackArrow from "../assets/back-arrow.svg";
import {
  gatherFeeData,
  switchOriginChain,
  MIN_TX_AMOUNTS,
} from "../bridges/ETH_ELA/utils/txUtils";
import {
  MINI_ICON_MAP,
  SYMBOL_MAP,
  CONVERT_MAP,
  NETWORK_MAP,
  NETWORK_TYPE,
  ASSET_CONVERSION_TYPES,
  fetchTokenBalance,
} from "../bridges/ETH_ELA/utils/walletUtils";
import i18n from "i18next";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import CurrencySelect from "../components/CurrencySelect";
import BigCurrencyInput from "../components/BigCurrencyInput";
import ErrorModal from "../components/ErrorModal";
import AddressValidator from "wallet-address-validator";
import Numeral from "numeral";
import theme from "../theme/theme";
import { Translate } from "../components/Translate";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(32,32,32)",
    borderRadius: "40px",
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
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1),
    },
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
    "&:hover": {
      opacity: 0.75,
    },
  },
  transferActionTabs: {
    margin: "0px auto",
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
    marginTop: theme.spacing(2),

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
    borderBottom: "none",
    borderRadius: 4,
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
  },
  option: {
    color: "#fff",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
      minHeight: 40,
    },
  },
  standaloneOption: {
    border: "1px solid" + theme.palette.divider,
    borderRadius: 12,
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
  },
  addressInput: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: 12,
    border: "1px solid" + theme.palette.divider,
  },
  currencySelect: {
    marginLeft: theme.spacing(-1),
    width: "calc(100% + 8px)",
    "& MuiButton-root": {
      textTransform: "none !important",
    },
  },
  outputField: {
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
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
  // infoLogo: {
  //   height: 48,
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  // },
  sourceLabel: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
  },
  destLabel: {
    fontSize: 14,
    color: theme.palette.info.contrastText,
  },
  switchLogo: {
    height: 20,
    width: "auto",
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
    color: theme.palette.info.contrastText,
  },
  usd: {
    fontSize: 16,
    wordBreak: "break-word",
  },
  large: {
    fontSize: 16,
  },
  medium: {
    fontSize: 14.5,
  },
  small: {
    fontSize: 13,
  },
  smallest: {
    fontSize: 11.5,
  },
});

class TransferContainer extends React.Component<any> {
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

  isSelectedNetwork() {
    const { store } = this.props;
    const selectedAsset: keyof typeof MIN_TX_AMOUNTS = store.get(
      "selectedAsset"
    );
    const localWeb3Network = store.get("localWeb3Network");
    // console.log(localWeb3Network);
    const targetWeb3Network = NETWORK_TYPE[selectedAsset];
    // console.log(targetWeb3Network);
    const correctNetwork = localWeb3Network === targetWeb3Network;

    if (!correctNetwork) {
      store.set("wrongNetwork", true);
    } else {
      return true;
    }
  }

  isBalanceEnough() {
    const { store } = this.props;
    const selectedAsset: keyof typeof MIN_TX_AMOUNTS = store.get(
      "selectedAsset"
    );
    let balance = Number(store.get(SYMBOL_MAP[selectedAsset] + "Balance"));
    if (isNaN(balance)) balance = 0;
    const inputAmount = Number(store.get("convert.amount"));

    if (inputAmount > balance) {
      store.set("insufficientBalance", true);
    } else {
      this.newTransfer();
    }
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
    const selectedFormat = store.get("convert.selectedFormat");
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

  async newTransfer() {
    const { store } = this.props;

    const amount = store.get("convert.amount");
    const inputAddress = store.get("convert.destination");
    const localWeb3Address = store.get("localWeb3Address");
    let receiveAddress = localWeb3Address;
    if (inputAddress.length > 0) {
      receiveAddress = inputAddress;
    }
    const network = store.get("selectedNetwork");
    const format: keyof typeof NETWORK_MAP = store.get(
      "convert.selectedFormat"
    );
    const asset: keyof typeof NETWORK_MAP = store.get("selectedAsset");

    const tx = {
      id: "tx-" + Math.floor(Math.random() * 10 ** 16),
      type: ASSET_CONVERSION_TYPES[asset],
      instant: false,
      // awaiting: `${asset}-init`,
      sourceAsset: asset,
      sourceNetwork: NETWORK_MAP[asset],
      sourceNetworkVersion: network,
      destAddress:
        receiveAddress.length > 0 ? receiveAddress : localWeb3Address,
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
    store.set("confirmAction", ASSET_CONVERSION_TYPES[format]);
  }

  render() {
    const { classes, store } = this.props;

    // Transaction parameters
    const selectedWallet = store.get("selectedWallet");
    const selectedDirection = store.get("convert.selectedDirection");
    const selectedFormat: keyof typeof SYMBOL_MAP = store.get(
      "convert.selectedFormat"
    );
    const selectedAsset: keyof typeof MIN_TX_AMOUNTS = store.get(
      "selectedAsset"
    );
    const destAsset = selectedFormat;
    let assetConvertType = "Mint";
    if (ASSET_CONVERSION_TYPES[selectedAsset] === "release") {
      assetConvertType = "Release";
    }
    const balance = store.get(SYMBOL_MAP[selectedAsset] + "Balance");
    const amount = store.get("convert.amount");
    let total = Number(store.get("convert.conversionTotal")).toFixed(4);

    // Account parameters
    const localWeb3Address = store.get("localWeb3Address");
    // const localWeb3Network = store.get("localWeb3Network");

    // Conditionals
    if (amount.length < 1) {
      total = "0.00";
    }

    let usdValue = Number(store.get(`${selectedAsset}usd`) * amount).toFixed(2);
    if (ASSET_CONVERSION_TYPES[selectedAsset] === "release") {
      usdValue = Number(
        store.get(`${selectedAsset.substring(3)}usd`) * amount
      ).toFixed(2);
    }

    let output = `${total} ${SYMBOL_MAP[destAsset]}  (${Numeral(
      usdValue
    ).format("$0,0.00")})`;

    const chars = total ? String(total) : "";
    let size = "large";
    if (chars.length > 8 && chars.length <= 10) {
      size = "medium";
    } else if (chars.length > 10 && chars.length <= 13) {
      size = "small";
    } else if (chars.length > 13) {
      size = "smallest";
    }

    let enableButton = false;
    const showDestinationError = store.get("convert.showDestinationError");
    const destinationValid = store.get("convert.destinationValid");
    if (destinationValid) {
      if (parseFloat(amount) > 0.0000001) {
        enableButton = true;
      }
    }
    const wrongNetwork = store.get("wrongNetwork");

    // Workaround to translation issue in input placeholder field
    const locale = i18n.language;
    const placeholder =
      locale === "en"
        ? `Enter ${NETWORK_MAP[destAsset]} Address`
        : `输入 ${NETWORK_MAP[destAsset]} 地址`;
    const inputError =
      locale === "en"
        ? `Please enter a valid ${NETWORK_MAP[destAsset]} address`
        : `请输入一个有效的 ${NETWORK_MAP[destAsset]} 地址`;

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
                // store.set("selectedWallet", false);
                store.set("confirmBridge", false);
                // store.set("localWeb3Address", "");
                store.set("walletConnecting", false);
                store.set("spaceRequesting", false);
              }}
            />
            <Typography variant="overline" className={classes.navTitle}>
              <Translate text="Transfer.Header" />
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
                          items={[
                            "ETH",
                            "ethELA",
                            "USDT",
                            "DAI",
                            "USDC",
                            "MAIN",
                          ]}
                          onCurrencyChange={(v: string) => {
                            const asset = v.toLowerCase();
                            if (asset === "ethela") {
                              store.set(
                                "convert.selectedFormat",
                                `${asset.replace("eth", "")}`
                              );
                              store.set("selectedAsset", asset);
                            } else {
                              store.set(
                                "convert.selectedFormat",
                                `ela${asset}`
                              );
                              store.set("selectedAsset", asset);
                            }
                            gatherFeeData();
                            fetchTokenBalance(asset);
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
                          placeholder={"0.00"}
                          onChange={(event: any) => {
                            let value = event.value || "";
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
                    <Grid
                      container
                      className={classes.switchDirection}
                      alignItems="center"
                    >
                      {/* <Grid item xs={4}>
                        <Grid container justify="flex-end">
                          <img
                            className={classes.infoLogo}
                            alt="Show More"
                            src={InfoLogo1}
                          />
                        </Grid>
                      </Grid> */}
                      <Grid item xs={12}>
                        <Grid container justify="center">
                          <Typography className={classes.sourceLabel}>
                            <Translate text="Transfer.From" />
                            &nbsp;{NETWORK_MAP[selectedAsset]}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          justify="center"
                          onClick={() => {
                            switchOriginChain(selectedDirection);
                          }}
                        >
                          <SwapCalls color="primary" fontSize="large" />
                          {/* <img
                          src={SwitchLogo}
                          className={classes.switchLogo}
                          alt="Switch Direction"
                        /> */}
                        </Grid>
                        <Grid container justify="center">
                          <Typography className={classes.destLabel}>
                            <Translate text="Transfer.To" />
                            &nbsp;{NETWORK_MAP[destAsset]}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* <Grid item xs={4}>
                        <Grid container justify="flex-start">
                          <img
                            className={classes.infoLogo}
                            alt="Show More"
                            src={InfoLogo2}
                          />
                        </Grid>
                      </Grid> */}
                    </Grid>

                    <Grid
                      container
                      className={classNames(
                        classes.standaloneOption,
                        classes.option
                      )}
                      justify="center"
                    >
                      <Hidden xsDown>
                        <Grid item className={classes.grayText} sm={4}>
                          <Translate text={`Transfer.${assetConvertType}`} />
                        </Grid>
                      </Hidden>

                      <Grid
                        item
                        sm={8}
                        className={classNames(
                          classes.currencySelect,
                          classes[size]
                        )}
                      >
                        <Grid
                          container
                          justify="center"
                          className={classNames(
                            classes[size],
                            classes.outputField
                          )}
                        >
                          <img src={MINI_ICON_MAP[destAsset]} alt={destAsset} />
                          <Typography>{output}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
                {selectedDirection === 1 && (
                  // / ELA to ETH
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
                          items={[
                            "ELA",
                            "elaETH",
                            "elaUSDT",
                            "elaDAI",
                            "elaUSDC",
                            "elaMAIN",
                          ]}
                          // ETHBalance={store.get("ethbal")}
                          onCurrencyChange={(v: string) => {
                            const asset = v.toLowerCase();
                            const destAsset = CONVERT_MAP[asset];
                            store.set("selectedAsset", asset);
                            store.set("convert.selectedFormat", destAsset);
                            fetchTokenBalance(asset);
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
                          placeholder={"0.00"}
                          onChange={(event: any) => {
                            const value = event.value || "";
                            store.set("convert.amount", String(value));
                            gatherFeeData();
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Network direction indicator */}
                    <Grid
                      className={classes.switchDirection}
                      onClick={() => {
                        switchOriginChain(selectedDirection);
                      }}
                    >
                      <Grid container justify="center">
                        <Typography className={classes.sourceLabel}>
                          <Translate text="Transfer.From" />
                          &nbsp;{NETWORK_MAP[selectedAsset]}
                        </Typography>
                      </Grid>
                      <Grid container justify="center">
                        <SwapCalls color="secondary" fontSize="large" />
                        {/* <img
                          src={SwitchLogo}
                          className={classes.switchLogo}
                          alt="Switch Direction"
                        /> */}
                      </Grid>
                      <Grid container justify="center">
                        <Typography className={classes.destLabel}>
                          <Translate text="Transfer.To" />
                          &nbsp;{NETWORK_MAP[destAsset]}
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
                      <Hidden xsDown>
                        <Grid item className={classes.grayText} sm={4}>
                          <Translate text={`Transfer.${assetConvertType}`} />
                        </Grid>
                      </Hidden>

                      <Grid
                        item
                        sm={8}
                        className={classNames(
                          classes.currencySelect,
                          classes[size]
                        )}
                      >
                        <Grid
                          container
                          justify="center"
                          className={classNames(
                            classes[size],
                            classes.outputField
                          )}
                        >
                          <img src={MINI_ICON_MAP[destAsset]} alt={destAsset} />
                          <Typography>{output}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
                {/* Destination Address input */}
                <Grid>
                  <div className={classes.addressInput}>
                    <TextField
                      color={selectedDirection ? "secondary" : "primary"}
                      label={<Translate text="Transfer.Destination" />}
                      placeholder={
                        localWeb3Address && localWeb3Address.length > 0
                          ? localWeb3Address
                          : placeholder
                      }
                      size="medium"
                      fullWidth={true}
                      error={showDestinationError}
                      helperText={showDestinationError ? inputError : ""}
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        onFocus: () => {
                          store.set("convert.destinationInputFocused", true);
                        },
                        onBlur: () => {
                          store.set("convert.destinationInputFocused", false);
                        },
                      }}
                      onChange={(event) => {
                        const value = event.target.value;
                        let address = value;
                        if (value.length > 0) {
                          store.set("convert.destination", value);
                          // Address validator hard coded to ethereum
                        } else {
                          address = localWeb3Address;
                          store.set("convert.destination", localWeb3Address);
                        }
                        store.set(
                          "convert.destinationValid",
                          AddressValidator.validate(address, "ETH", "prod")
                        );
                      }}
                    />
                  </div>
                </Grid>
                {/* /// */}
                <Grid
                  container
                  justify="center"
                  className={classes.actionButtonContainer}
                >
                  <Grid item xs={12}>
                    {!selectedWallet ? (
                      <Button
                        variant={"contained"}
                        disableRipple
                        color={selectedDirection ? "secondary" : "primary"}
                        size="large"
                        fullWidth
                        className={classNames(classes.actionButton)}
                        onClick={() => {
                          store.set("showWalletModal", true);
                        }}
                      >
                        <Translate text="Transfer.Connect" />
                      </Button>
                    ) : (
                      <div>
                        <Button
                          disabled={!enableButton}
                          variant={"contained"}
                          disableRipple
                          color={selectedDirection ? "secondary" : "primary"}
                          size="large"
                          fullWidth
                          className={classNames(classes.actionButton)}
                          onClick={() => {
                            if (this.isSelectedNetwork()) {
                              this.isBalanceEnough();
                            }
                          }}
                        >
                          <Translate text="Transfer.Next" />
                        </Button>
                        {wrongNetwork && (
                          <div>
                            <ErrorModal
                              currentNetwork={store.get("localWeb3Network")}
                              targetNetwork={NETWORK_TYPE[selectedAsset]}
                              store={store}
                              errorType={"wrongNetwork"}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withStore(TransferContainer));
