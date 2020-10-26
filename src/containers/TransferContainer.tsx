import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import { SwapCalls } from "@material-ui/icons";
import classNames from "classnames";
import BackArrow from "../assets/back-arrow.svg";
import Lock from "../assets/lock.svg";
import Release from "../assets/unlock.svg";
import Mint from "../assets/mint.svg";
import Burn from "../assets/burn.svg";
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
import { TOKENS } from "../bridges/ETH_ELA/tokens";
import i18n from "i18next";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import CurrencySelect from "../components/CurrencySelect";
import BigCurrencyInput from "../components/BigCurrencyInput";
import Balance from "../components/Balance";
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
    width: 500,
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
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
  actionsContainer: {
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(0.75),
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  standaloneOption: {
    border: "1px solid" + theme.palette.divider,
    borderRadius: 12,
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
  },
  option: {
    color: "#fff",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 16,
    "& img": {
      height: "auto",
      width: 24,
      marginRight: theme.spacing(0.75),
    },
    "& .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
  },
  optionRow1: {
    height: 34,
    "& img": {
      height: "auto",
      width: 20,
      marginRight: theme.spacing(0.75),
    },
  },
  optionRow2: {
    height: 38,
  },
  addressInput: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: 12,
    border: "1px solid" + theme.palette.divider,
  },
  outputField: {
    display: "inline-block",
  },
  switchDirection: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  sourceLabel: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      cursor: "pointer",
    },
  },
  destLabel: {
    fontSize: 14,
    color: theme.palette.info.contrastText,
    "&:hover": {
      cursor: "pointer",
    },
  },
  destAssetTicker: {
    fontSize: 17.5,
  },
  destAssetText: {
    fontSize: "0.9rem",
  },
  swapContainer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  grayText: {
    color: theme.palette.info.contrastText,
  },
  usd: {
    fontSize: 16,
    wordBreak: "break-word",
  },
  padding: {
    paddingRight: 12,
  },
});

class TransferContainer extends React.Component<any> {
  burnInputRef = React.createRef();
  constructor(props: any) {
    super(props);
    this.state = props.store.getState();
  }

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
    console.log(localWeb3Network);
    const targetWeb3Network = NETWORK_TYPE[selectedAsset];
    console.log(targetWeb3Network);
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
      sourceAddress: localWeb3Address,
      sourceAsset: asset,
      sourceNetwork: NETWORK_MAP[asset],
      sourceNetworkVersion: network,
      destAddress:
        receiveAddress.length > 0 ? receiveAddress : localWeb3Address,
      destAsset: format,
      destNetwork: NETWORK_MAP[format],
      destNetworkVersion: network,
      amount: Number(amount),
      error: false,
      txHash: "",
    };

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
    const destAssetName = TOKENS[destAsset].name;

    let assetConvertType = "Mint";
    let sourceAssetAction = "Lock";
    if (ASSET_CONVERSION_TYPES[selectedAsset] === "release") {
      assetConvertType = "Release";
      sourceAssetAction = "Burn";
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
        store.get(`${TOKENS[selectedAsset].destAsset}usd`) * amount
      ).toFixed(2);
    }

    let output = `${total} (${Numeral(usdValue).format("$0,0.00")})`;

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
    // const hasAllowance = Number(amount) <= Number(allowance);
    // const allowanceRequesting = store.get(
    //     "convert.adapterWbtcAllowanceRequesting"

    return (
      <div className={classes.container}>
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
              <React.Fragment>
                <Grid
                  container
                  className={classNames(
                    classes.standaloneOption,
                    classes.option
                  )}
                >
                  <Grid container className={classes.optionRow1}>
                    <Grid item xs={6} className={classes.grayText}>
                      {sourceAssetAction === "Lock" ? (
                        <img src={Lock} alt="Lock" />
                      ) : (
                        <img src={Burn} alt="Burn" />
                      )}
                      <Translate text={`Transfer.${sourceAssetAction}`} />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container justify="flex-end">
                        <Balance
                          balance={balance}
                          direction={selectedDirection}
                          store={store}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.optionRow2}>
                    <Grid item xs={7}>
                      <BigCurrencyInput
                        active={SYMBOL_MAP[selectedAsset]}
                        className={classes.currencySelect}
                        usdValue={usdValue}
                        value={amount}
                        placeholder={"0.00"}
                        onChange={(event: any) => {
                          let value = event.value || "";
                          store.set("convert.amount", String(value));
                          gatherFeeData();
                        }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid container justify="flex-end">
                        {selectedDirection === 0 ? (
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
                        ) : (
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
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>

              {/* Network direction indicator */}
              <Grid className={classes.switchDirection}>
                <Grid container justify="center">
                  <Grid
                    item
                    xs={4}
                    className={classes.swapContainer}
                    onClick={() => {
                      switchOriginChain(selectedDirection);
                    }}
                  >
                    <Typography className={classes.sourceLabel}>
                      <Translate text="Transfer.From" />
                      &nbsp;{NETWORK_MAP[selectedAsset]}
                      {/* &nbsp;
                      <Translate text="Transfer.Mainnet" /> */}
                    </Typography>

                    <Grid container justify="center">
                      <SwapCalls
                        color={selectedDirection ? "secondary" : "primary"}
                        fontSize="large"
                      />
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
                        {/* &nbsp;
                        <Translate text="Transfer.Mainnet" /> */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Output Field */}
              <Grid
                container
                className={classNames(classes.standaloneOption, classes.option)}
                justify="center"
              >
                <Grid container className={classes.optionRow1}>
                  <Grid item xs={7} sm={7} className={classes.grayText}>
                    {assetConvertType === "Mint" ? (
                      <img src={Mint} alt="Mint" />
                    ) : (
                      <img src={Release} alt="Release" />
                    )}

                    <Translate text={`Transfer.${assetConvertType}`} />
                  </Grid>
                  <Grid item xs={5} sm={5}>
                    <Grid
                      container
                      className={classes.padding}
                      justify="flex-end"
                    >
                      <img src={MINI_ICON_MAP[destAsset]} alt={destAsset} />
                      <Typography className={classes.destAssetTicker}>
                        {SYMBOL_MAP[destAsset]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container className={classes.optionRow2}>
                  <Grid item xs={12} sm={7}>
                    <Grid container justify="flex-start" wrap="nowrap">
                      <Grid item zeroMinWidth>
                        <Typography
                          className={
                            Number(amount) === 0 ? classes.grayText : null
                          }
                          noWrap
                        >
                          {output}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item sm={5}>
                      <Grid
                        container
                        className={classes.padding}
                        justify="flex-end"
                      >
                        <Typography
                          className={classNames(
                            classes.destAssetText,
                            classes.grayText
                          )}
                        >
                          {destAssetName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>

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

              {/* Button */}
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
    );
  }
}

export default withStyles(styles)(withStore(TransferContainer));
