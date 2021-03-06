import React from "react";
import { withStyles } from "@material-ui/styles";
import { getStore } from "../services/storeService";
import theme from "../theme/theme";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import LinearProgress from "@material-ui/core/LinearProgress";
import QRCode from "qrcode.react";
import WalletModal from "../components/WalletModal";
import ErrorModal from "../components/ErrorModal";
import DarkTooltip from "../components/DarkTooltip";
import BigCurrencyInput from "../components/BigCurrencyInput";
import Balance from "../components/Balance";
import TextField from "@material-ui/core/TextField";
// import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useTranslation } from "react-i18next";
import { depositELA, withdrawELA } from "../services/sidechain";
import { searchCryptoName } from "../services/cryptoname";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ELA_ICON from "../assets/ela.png";
import Elaphant from "../assets/elaphant.png";
import Elastos from "../assets/elawallet.png";
import Ledger from "../assets/ledger.png";

const styles = () => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgb(32,32,32)",
    color: theme.palette.primary.contrastText,
  },
  container: {
    color: theme.palette.primary.contrastText,
    background: "rgb(32,32,32)",
    borderRadius: "30px",
    width: 500,
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  instructionBox: {
    margin: "auto",
    maxWidth: "80%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  step: {
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  statusBox: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: "1px solid rgb(66,66,66)",
    borderRadius: 12,
    padding: theme.spacing(1.5),
    minWidth: "100%",
  },
  statusText: {
    fontSize: "0.9rem",
    color: theme.palette.info.contrastText,
    // [theme.breakpoints.down("xs")]: {
    //   fontSize: "0.85rem",
    // },
  },
  icon: {
    marginLeft: theme.spacing(0.75),
    marginRight: theme.spacing(0.75),
    height: 18,
    width: "auto",
  },
  walletIcon: {
    marginRight: theme.spacing(1.5),
    height: 24,
    width: "auto",
  },
  actionButton: {
    borderRadius: 12,
    marginTop: theme.spacing(1.5),
  },
  address: {
    color: theme.palette.info.contrastText,
    fontSize: "0.8rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.55rem",
    },
  },
  QRcode: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mobileLink: {
    textDecoration: "none",
    color: theme.palette.info.contrastText,
    fontSize: "0.9rem",
  },
  tooltip: {
    marginLeft: theme.spacing(0.75),
    marginRight: theme.spacing(0.75),
  },
  spacer: {
    marginBottom: theme.spacing(0.75),
  },
  doubleSpacer: {
    marginBottom: theme.spacing(1.5),
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  green: {
    color: theme.palette.success.light,
  },
  warn: {
    fontSize: "0.85rem",
    fontStyle: "italic",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
  red: {
    color: theme.palette.secondary.main,
  }
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

interface Props {
  className?: string;
  classes: { [key in string]: string };
}

const Sidechain: React.FC<Props> = function (props) {
  const store = getStore();
  const { t } = useTranslation();
  const { classes } = props;
  const [value, setValue] = React.useState(0);
  const [copy, setCopy] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // const help = t("Sidechain.Disclaimer");
  const clickToCopy = t("Sidechain.ClickToCopy");
  const copied = t("Sidechain.Copied");

  const showWalletModal = store.get("showWalletModal");
  const walletNetwork = store.get("localWeb3Network");
  const noWeb3 = store.get("noWeb3");
  const wrongNetwork = store.get("wrongNetwork");
  const insufficientBalance = store.get("insufficientBalance");

  const transferURL = store.get("transferURL");
  const localWeb3Address = store.get("localWeb3Address");

  const depositStatus = store.get("depositStatus");
  const depositInProgress = store.get("depositInProgress");
  const withdrawalStatus = store.get("withdrawalStatus");
  const withdrawalInProgress = store.get("withdrawalInProgress");

  const transferWallet = store.get("transferWallet");
  const monitoring = store.get("monitoringTransfer");
  const balance = store.get("elaBalance");
  const depositAmount = store.get("depositAmount");
  const depositValue = store.get("depositValue");
  const withdrawalAmount = store.get("withdrawalAmount");
  const withdrawalAddress = store.get("withdrawalAddress");

  const cryptoNameFound = store.get("cryptoNameAddress");
  const cryptoNameAddress = store.get("cryptoNameAddress");

  let enableButton = false;
  if (
    Number(withdrawalAmount) > 0.01 &&
    Number(withdrawalAmount) <= Number(balance) &&
    withdrawalAddress.trim().length === 34
  ) {
    enableButton = true;
  }

  return (
    <React.Fragment>
      {showWalletModal && <WalletModal />}
      {noWeb3 && (
        <div>
          <ErrorModal store={store} errorType={"noWeb3"} />
        </div>
      )}
      {wrongNetwork && (
        <div>
          <ErrorModal
            currentNetwork={store.get("localWeb3Network")}
            targetNetwork={"Elastos"}
            errorType={"wrongNetwork"}
            store={store}
          />
        </div>
      )}
      {insufficientBalance && (
        <div>
          <ErrorModal store={store} errorType={"insufficientBalance"} />
        </div>
      )}
      <Grid className={classes.container}>
        <div className={classes.root}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label={`${t("Sidechain.Deposit")} ELA`} color="primary" />
            <Tab label={`${t("Sidechain.Withdraw")} ELA`} />
          </Tabs>
          {/* Deposit */}
          <TabPanel value={value} index={0}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              className={classes.instructionBox}
            >
              <Grid container className={classes.statusBox}>
                <Grid item className={classes.spacer}>
                  <Typography className={classes.step}>
                    {t("Sidechain.Description.Title")}
                  </Typography>
                </Grid>

                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  className={classes.statusText}
                >
                  {t("Sidechain.Deposit")}{" "}
                  <Hidden xsDown>
                    <img className={classes.icon} src={ELA_ICON} alt="ELA" />
                  </Hidden>
                  {t("Sidechain.Description.Deposit.Message")}
                </Grid>
              </Grid>
              {localWeb3Address.length > 0 ? (
                <>
                  {/* Wallet Selector */}
                  {transferWallet.length === 0 && (
                    <Grid item xs={12} className={classes.statusBox}>
                      <Grid item className={classes.spacer}>
                        <Typography className={classes.step}>
                          {t("Sidechain.Deposit.SelectWallet")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          disableRipple
                          size="large"
                          onClick={() => {
                            store.set("transferWallet", "elaphant");
                          }}
                          className={classes.statusText}
                        >
                          <img
                            className={classes.walletIcon}
                            src={Elaphant}
                            alt="Elaphant Wallet"
                          />
                          Elaphant {t("Sidechain.Deposit.Wallet")}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          disableRipple
                          size="large"
                          onClick={() => {
                            store.set("transferWallet", "elastos");
                          }}
                          className={classes.statusText}
                        >
                          <img
                            className={classes.walletIcon}
                            src={Elastos}
                            alt="Elastos Official Wallet"
                          />
                          Elastos Official {t("Sidechain.Deposit.Wallet")}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          disableRipple
                          size="large"
                          onClick={() => {
                            store.set("transferWallet", "ledger");
                          }}
                          className={classes.statusText}
                        >
                          <img
                            className={classes.walletIcon}
                            src={Ledger}
                            alt="Elastos Light Wallet (Ledger)"
                          />
                          Elastos Light {t("Sidechain.Deposit.Wallet")} (Ledger)
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  {transferWallet === "elaphant" && (
                    <>
                      <Grid item xs={12} className={classes.statusBox}>
                        <Grid item className={classes.doubleSpacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Deposit.Amount.Title")}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.doubleSpacer}>
                          <Grid container justify="flex-end">
                            <BigCurrencyInput
                              value={depositAmount}
                              placeholder={"0.00 ELA"}
                              onChange={(event: any) => {
                                let value = event.value || "";
                                store.set("depositAmount", value);
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.statusText}>
                            {t("Sidechain.Deposit.TransferFee")}: 1 ELA
                          </Typography>
                        </Grid>
                        <Grid item className={classes.spacer}>
                          <Button
                            variant={"contained"}
                            disableRipple
                            color="primary"
                            size="large"
                            fullWidth
                            className={classes.actionButton}
                            onClick={() => {
                              store.set("transferWallet", "elaphantQR");
                              depositELA();
                            }}
                          >
                            {t("Sidechain.Deposit")}{" "}
                            {Number(depositAmount) <= 1
                              ? 0.0
                              : (depositAmount - 1).toLocaleString("en-IN", {
                                  maximumSignificantDigits: 3,
                                })}{" "}
                            ELA
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {transferWallet === "elaphantQR" && (
                    <>
                      <Grid item xs={12} className={classes.statusBox}>
                        <Grid item className={classes.spacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Scan.Title")}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.spacer}>
                          <Grid
                            container
                            alignItems="center"
                            className={classes.statusText}
                          >
                            <Hidden xsDown>
                              {t("Sidechain.Start.Message")}
                            </Hidden>

                            {/* <DarkTooltip
                              placement="right"
                              title={help}
                              className={classes.icon}
                            >
                              <ErrorOutlineIcon
                                color="secondary"
                                fontSize="small"
                              />
                            </DarkTooltip> */}
                          </Grid>
                        </Grid>
                        <Grid item className={classes.spacer}>
                          <Grid container alignItems="center">
                            <Hidden xsDown>
                              <QRCode
                                className={classes.QRcode}
                                size={350}
                                value={transferURL}
                                bgColor="#FFF"
                                fgColor="rgb(32,32,32)"
                                includeMargin={true}
                                imageSettings={{
                                  src: ELA_ICON,
                                  height: 40,
                                  width: 40,
                                }}
                              />
                            </Hidden>
                            {/* <CopyToClipboard
                              text={transferURL}
                              onCopy={() => {
                                setCopy(true);
                                setTimeout(() => {
                                  setCopy(false);
                                }, 1500);
                              }}
                            >
                              <DarkTooltip
                                placement="top"
                                title={copy ? copied : clickToCopy}
                              >
                                <Grid
                                  container
                                  alignItems="center"
                                  justify="flex-start"
                                >
                                  <Typography className={classes.address}>
                                    {transferURL}
                                  </Typography>
                                  {copy ? (
                                    <CheckCircleOutlineIcon
                                      className={classes.icon}
                                      fontSize="small"
                                    />
                                  ) : (
                                    <FileCopyIcon
                                      className={classes.icon}
                                      fontSize="small"
                                    />
                                  )}
                                </Grid>
                              </DarkTooltip>
                            </CopyToClipboard> */}
                            <a
                              className={classes.mobileLink}
                              href={transferURL}
                            >
                              {t("Sidechain.Deposit.Mobile")}
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>

                      {monitoring ? (
                        <Grid item xs={12} className={classes.statusBox}>
                          <Grid item className={classes.spacer}>
                            <Typography className={classes.step}>
                              {t("Sidechain.Status.Title")}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              justify="flex-start"
                              className={classes.statusText}
                            >
                              {t(depositStatus)}
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            className={classNames(
                              classes.spacer,
                              classes.progress
                            )}
                          >
                            <LinearProgress color="primary" />
                          </Grid>

                          {depositInProgress === 2 && (
                            <Grid container justify="flex-start">
                              <Grid item className={classes.statusText}>
                                {t("Sidechain.Notify.Time")}
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      ) : (
                        <>
                          <Grid item xs={12} className={classes.statusBox}>
                            <Grid item className={classes.spacer}>
                              <Typography className={classes.step}>
                                {t("Sidechain.Status.Title")}
                              </Typography>
                            </Grid>
                            <Grid item className={classes.statusText}>
                              {t("Sidechain.Deposit.Transfer.Finish")}
                            </Grid>
                          </Grid>

                          <Grid item xs={12} className={classes.statusBox}>
                            <Grid item className={classes.spacer}>
                              <Typography className={classes.step}>
                                {t("Sidechain.Balance.Title")}
                              </Typography>
                            </Grid>

                            <Grid item className={classes.statusText}>
                              {balance} ELA
                              {depositValue > 0 && (
                                <span className={classes.green}>
                                  &nbsp; (+{depositValue.toFixed(2)})
                                </span>
                              )}
                            </Grid>
                          </Grid>
                        </>
                      )}

                      <Grid container>
                        <Button
                          variant={"outlined"}
                          disableRipple
                          color="primary"
                          fullWidth
                          className={classes.actionButton}
                          onClick={() => {
                            store.set("depositAmount", "");
                            store.set("transferWallet", "");
                          }}
                        >
                          {t("Sidechain.Reset.Deposit")}
                        </Button>
                      </Grid>
                    </>
                  )}

                  {(transferWallet === "elastos" ||
                    transferWallet === "ledger") && (
                    <>
                      <Grid item xs={12} className={classes.statusBox}>
                        <Grid item className={classes.spacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Deposit.Instructions.Title")}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.spacer}>
                          <Typography className={classes.statusText}>
                            {t("Sidechain.Deposit.Instructions.Message")}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.spacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Deposit.Instructions.Step1")}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.spacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Deposit.Instructions.Step2")}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.doubleSpacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Deposit.Instructions.Step3")}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.spacer}>
                          <Grid container>
                            <span className={classes.address}>
                              toesc{localWeb3Address}
                            </span>
                            <span>
                              <CopyToClipboard
                                text={`toesc${localWeb3Address}`}
                                onCopy={() => {
                                  setCopy(true);
                                  setTimeout(() => {
                                    setCopy(false);
                                  }, 1500);
                                }}
                              >
                                <DarkTooltip
                                  placement="top"
                                  title={copy ? copied : clickToCopy}
                                >
                                  <div>
                                    {copy ? (
                                      <CheckCircleOutlineIcon
                                        className={classes.icon}
                                        fontSize="small"
                                      />
                                    ) : (
                                      <FileCopyIcon
                                        className={classes.icon}
                                        fontSize="small"
                                      />
                                    )}
                                  </div>
                                </DarkTooltip>
                              </CopyToClipboard>
                            </span>
                          </Grid>
                        </Grid>
                        <Grid item>
                          {transferWallet === "elastos" && (
                            <Typography className={classes.step}>
                              {t("Sidechain.Deposit.Instructions.Step4")}
                            </Typography>
                          )}
                          {transferWallet === "ledger" && (
                            <Typography className={classes.step}>
                              {t("Sidechain.Deposit.Instructions.Step4-1")}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Button
                          variant={"outlined"}
                          disableRipple
                          color="primary"
                          fullWidth
                          className={classes.actionButton}
                          onClick={() => {
                            store.set("depositAmount", "");
                            store.set("transferWallet", "");
                          }}
                        >
                          {t("Sidechain.Reset.Deposit")}
                        </Button>
                      </Grid>
                    </>
                  )}

                  {/* {depositInProgress >= 1 && (
                    <>
                      <Grid item xs={12} className={classes.statusBox}>
                        <Grid item className={classes.spacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Status.Title")}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            justify="flex-start"
                            className={classes.statusText}
                          >
                            {t(depositStatus)}
                          </Grid>
                        </Grid>
                        {depositInProgress === 1 && (
                          <Grid item className={classes.progress}>
                            <LinearProgress color="primary" />
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} className={classes.statusBox}>
                        <Grid item className={classes.spacer}>
                          <Typography className={classes.step}>
                            {t("Sidechain.Balance.Title")}
                          </Typography>
                        </Grid>
                        {depositInProgress === 2 && monitoring ? (
                          <Grid container justify="flex-start">
                            <Grid item className={classes.statusText}>
                              {t("Sidechain.Notify.Time")}
                              <LinearProgress
                                className={classes.progress}
                                color="primary"
                              />
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid
                            container
                            justify="flex-start"
                            className={classes.statusText}
                          >
                            {balance} ELA
                            {depositValue > 0 && (
                              <div className={classes.green}>
                                &nbsp; (+{depositValue.toFixed(2)})
                              </div>
                            )}
                          </Grid>
                        )}
                      </Grid>
                    </>
                  )} */}

                  {/* {depositInProgress === 2 && (
                    <Button
                      variant={"contained"}
                      disableRipple
                      color="primary"
                      size="large"
                      fullWidth
                      className={classes.actionButton}
                      onClick={() => {
                        store.set("depositInProgress", 0);
                        depositELA();
                      }}
                    >
                      {t("Sidechain.Reset.Deposit")}
                    </Button>
                  )} */}
                </>
              ) : (
                <Button
                  variant={"contained"}
                  disableRipple
                  color="primary"
                  size="large"
                  fullWidth
                  className={classes.actionButton}
                  onClick={() => {
                    store.set("showWalletModal", true);
                  }}
                >
                  {t("Transfer.Connect")}
                </Button>
              )}
            </Grid>
          </TabPanel>
          {/* Withdraw */}
          <TabPanel value={value} index={1}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              className={classes.instructionBox}
            >
              <Grid container className={classes.statusBox}>
                <Grid item className={classes.spacer}>
                  <Typography className={classes.step}>
                    {t("Sidechain.Description.Title")}
                  </Typography>
                </Grid>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  className={classes.statusText}
                >
                  {t("Sidechain.Withdraw")}{" "}
                  <Hidden xsDown>
                    <img className={classes.icon} src={ELA_ICON} alt="ELA" />
                  </Hidden>
                  {t("Sidechain.Description.Withdaw.Message")}
                </Grid>
              </Grid>
              {localWeb3Address.length === 42 ? (
                <>
                  <Grid item xs={12} className={classes.statusBox}>
                    <Grid item>
                      <Typography className={classes.step}>
                        {t("Sidechain.Amount.Title")}
                      </Typography>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item xs={8}>
                            <Grid container justify="flex-end">
                              <BigCurrencyInput
                                value={withdrawalAmount}
                                placeholder={"0.00"}
                                onChange={(event: any) => {
                                  let value = event.value || "";
                                  store.set("withdrawalAmount", value);
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container justify="flex-end">
                              <Balance
                                balance={balance}
                                direction={1}
                                onSetMax={() => {
                                  if (balance) {
                                    store.set("withdrawalAmount", balance);
                                  } else {
                                    store.set("withdrawalAmount", 0);
                                  }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Typography className={classes.warn}><span className={classes.red}>{t("Sidechain.Withdraw.Warning")}:</span> {t("Sidechain.Withdraw.Warning.Message")}</Typography>
                  <Grid item xs={12} className={classes.statusBox}>
                    <Grid item>
                      <Typography className={classes.step}>
                        {t("Sidechain.Destination.Title")}
                      </Typography>
                      <Grid item>
                        <Grid container alignItems="center">
                          <TextField
                            size="medium"
                            fullWidth={true}
                            placeholder={t("Sidechain.Withdraw.Input.Address")}
                            InputProps={{ disableUnderline: true }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // helperText={
                            //   withdrawalAddress.length !== 34
                            //     ? "Not a valid Elastos address"
                            //     : ""
                            // }
                            onChange={(event) => {
                              store.set("cryptoNameFound", false);
                              const address = event.target.value.toString();
                              searchCryptoName(address);
                              if (!cryptoNameFound) {
                                store.set("withdrawalAddress", address);
                              }
                            }}
                          />
                        </Grid>
                        {cryptoNameFound ? (
                          <Grid container>
                            <Grid item xs zeroMinWidth>
                              <Typography className={classes.statusText} noWrap>
                                {cryptoNameAddress}
                              </Typography>
                            </Grid>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  {withdrawalInProgress === 0 && (
                    <Button
                      variant={"contained"}
                      disabled={!enableButton}
                      disableRipple
                      color="primary"
                      size="large"
                      fullWidth
                      className={classes.actionButton}
                      onClick={() => {
                        if (walletNetwork !== "Elastos") {
                          store.set("wrongNetwork", true);
                          return;
                        }
                        if (withdrawalAmount > balance) {
                          store.set("insufficientBalance", true);
                          return;
                        }
                        if (withdrawalAddress.length === 34) {
                          withdrawELA(withdrawalAddress, withdrawalAmount);
                        }
                      }}
                    >
                      {t("Sidechain.Withdraw")}
                    </Button>
                  )}
                  {withdrawalInProgress >= 1 && (
                    <Grid item xs={12} className={classes.statusBox}>
                      <Grid item className={classes.spacer}>
                        <Typography className={classes.step}>
                          {t("Sidechain.Status.Title")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          justify="flex-start"
                          className={classes.statusText}
                        >
                          {t(withdrawalStatus)}
                        </Grid>
                      </Grid>
                      {withdrawalInProgress === 1 && (
                        <Grid item className={classes.progress}>
                          <LinearProgress color="primary" />
                        </Grid>
                      )}
                    </Grid>
                  )}
                  {withdrawalInProgress === 2 && (
                    <Button
                      variant={"contained"}
                      disableRipple
                      color="primary"
                      size="large"
                      fullWidth
                      className={classes.actionButton}
                      onClick={() => {
                        store.set("withdrawalInProgress", 0);
                      }}
                    >
                      {t("Sidechain.Reset.Withdraw")}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant={"contained"}
                  disableRipple
                  color="primary"
                  size="large"
                  fullWidth
                  className={classes.actionButton}
                  onClick={() => {
                    store.set("showWalletModal", true);
                  }}
                >
                  {t("Transfer.Connect")}
                </Button>
              )}
            </Grid>
          </TabPanel>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Sidechain);
