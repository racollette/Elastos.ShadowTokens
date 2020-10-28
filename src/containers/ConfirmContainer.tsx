import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import classNames from "classnames";
import Numeral from "numeral";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BackArrow from "../assets/back-arrow.svg";
import WalletIcon from "../assets/wallet-icon-dark.svg";
import DarkTooltip from "../components/DarkTooltip";
import WaitingModal from "../components/WaitingModal";
import TxProgressModal from "../components/TxProgressModal";
import ErrorModal from "../components/ErrorModal";
import { Translate } from "../components/Translate";
import theme from "../theme/theme";
import { abbreviateAddress } from "../bridges/ETH_ELA/utils/walletUtils";
import { handleBridgeMode } from "../bridges/ETH_ELA/utils/transferUtils";
import { TOKENS } from "../bridges/ETH_ELA/tokens";

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
  actionsContainer: {
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    color: "#fff",
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
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
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
  actions: {
    paddingTop: theme.spacing(1),
  },
  transactionsContainer: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(0),
    marginTop: theme.spacing(2),
    borderTop: "1px solid #EBEBEB",
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
      border: "0px solid transparent",
      borderBottom: "1px solid " + theme.palette.divider,
      "&:first-child": {
        borderRight: "1px solid " + theme.palette.divider,
      },
      "&.Mui-selected": {
        borderBottom: "0px solid transparent",
      },
    },
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  optionsContainer: {
    borderBottom: "none",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    "& :last-child": {
      borderBottom: "1px solid transparent",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  option: {
    borderBottom: "1px solid " + theme.palette.divider,
    minHeight: 50,
    fontSize: 14,
    "& img": {
      height: "auto",
      width: 24,
      marginRight: theme.spacing(1),
    },
    "& div": {
      display: "flex",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: 36,
    },
  },
  fade: {
    color: theme.palette.info.contrastText,
  },
  totalOption: {
    minHeight: 60,
    fontSize: 16,
    color: "#3F3F48",
    "& img": {
      height: "auto",
      width: 24,
      marginRight: theme.spacing(1),
    },
    "& div": {
      display: "flex",
      alignItems: "center",
    },
  },
  totalContainer: {
    borderBottom: "1px solid " + theme.palette.divider,
  },

  titleAmount: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    position: "relative",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0,
    },
  },
  navTitle: {
    color: "#fff",
    fontSize: "12",
    marginBottom: theme.spacing(2),
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
  amountCell: {
    wordBreak: "break-word",
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
    borderRadius: 4,
    lineHeight: "17px",
    marginBottom: theme.spacing(3),
    "& a": {
      color: "inherit",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  error: {
    marginTop: theme.spacing(2),
    color: "#FF4545",
  },
});

class ConfirmContainer extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = props.store.getState();
  }

  showDepositModal(tx: any) {
    const { store } = this.props;
    store.set("showDepositModal", true);
    store.set("depositModalTx", tx);
  }

  render() {
    const { classes, store } = this.props;

    // const confirmAction = store.get("confirmAction");
    // const isDeposit = confirmAction === "deposit";
    const confirmTx = store.get("confirmTx");
    const selectedWallet = store.get("selectedWalletType");
    const selectedAsset = store.get("selectedAsset");
    const amount = store.get("convert.amount");
    const serviceFee = (
      Number(store.get("convert.networkFee")) * Number(amount)
    ).toFixed(4);
    // const networkFee = store.get("convert.networkFee");
    const total = Number(store.get("convert.conversionTotal")).toFixed(4);
    const canConvertTo = amount > 0.00010001;

    // const confirmationError = store.get("confirmationError");
    const sourceAsset = confirmTx.sourceAsset;
    const sourceNetwork = confirmTx.sourceNetwork;
    const destAsset = confirmTx.destAsset;
    const destNetwork = confirmTx.destNetwork;

    const waitingApproval = store.get("waitingApproval");
    const txRejected = store.get("txRejected");
    const unknownError = store.get("unknownError");

    const sourceTxID = store.get("sourceTxID");
    const destTxID = store.get("destTxID");

    const confirmationNumber = store.get("confirmationNumber");
    const confirmationTotal = store.get("confirmationTotal");

    // Tx progress watcher
    const transferInProgress = store.get("transferInProgress");
    const confirming = store.get("confirming");
    const confirmationStep = store.get("confirmationStep");
    const validatorTimeout = store.get("validatorTimeout");
    const transferSuccess = store.get("transferSuccess");

    const type = store.get("transactionType");

    let usdValue = Number(store.get(`${selectedAsset}usd`) * amount).toFixed(2);
    if (TOKENS[selectedAsset].transferType === "release") {
      usdValue = Number(
        store.get(`${TOKENS[selectedAsset].destAsset}usd`) * amount
      ).toFixed(2);
    }

    const chars = String(amount).replace(".", "");

    let size = "large";
    if (chars.length > 5 && chars.length <= 7) {
      size = "medium";
    } else if (chars.length > 7 && chars.length <= 9) {
      size = "small";
    } else if (chars.length > 9) {
      size = "smallest";
    }
    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.headerText}>
            <img
              className={classes.back}
              src={BackArrow}
              alt="Back"
              onClick={() => {
                store.set("confirmTx", null);
                store.set("confirmAction", "");
                store.set("convert.destination", "");
              }}
            />
            <Typography variant="overline" className={classes.navTitle}>
              <Translate text="Confirm.Header" />
            </Typography>

            <Typography variant="body1" className={classes.titleAmount}>
              ({Numeral(usdValue).format("$0,0.00")})
            </Typography>

            <Typography variant="h4" className={classNames(classes[size])}>
              {Numeral(confirmTx.amount).format("0,0.00")}{" "}
              {TOKENS[sourceAsset].symbol}
            </Typography>

            <Typography variant="body1">
              <Translate text="Confirm.From" />
              &nbsp;{sourceNetwork}&nbsp;
              <Translate text="Confirm.Network" />
            </Typography>
          </div>
          <div className={classes.actionsContainer}>
            <Grid className={classes.actions}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Grid
                    className={classes.optionsContainer}
                    container
                    direction="column"
                  >
                    <Grid container className={classes.option}>
                      <Grid item xs={6} className={classes.fade}>
                        <Translate text="Confirm.Destination" />
                      </Grid>
                      <Grid item xs={6}>
                        {destNetwork}&nbsp;
                        <Translate text="Confirm.Network" />
                      </Grid>
                    </Grid>

                    <Grid container className={classes.option}>
                      <Grid item xs={6} className={classes.fade}>
                        <Translate text="Confirm.Asset" />
                      </Grid>
                      <Grid item xs={6}>
                        <img alt={destAsset} src={TOKENS[destAsset].icon} />
                        {TOKENS[destAsset].symbol}
                      </Grid>
                    </Grid>

                    <Grid container className={classes.option}>
                      <Grid item xs={6} className={classes.fade}>
                        <Translate text="Confirm.Target" />
                      </Grid>
                      <Grid item xs={6}>
                        <DarkTooltip
                          placement="top"
                          title={confirmTx.destAddress}
                          arrow
                        >
                          <div>
                            <img src={WalletIcon} alt="Wallet" />
                            {abbreviateAddress(confirmTx.destAddress)}
                          </div>
                        </DarkTooltip>
                      </Grid>
                    </Grid>

                    <Grid container className={classes.option}>
                      <Grid item xs={6} className={classes.fade}>
                        <Translate text="Confirm.Fee" />
                      </Grid>
                      <Grid item xs={6} className={classes.amountCell}>
                        <img alt={sourceAsset} src={TOKENS[sourceAsset].icon} />
                        {serviceFee} {TOKENS[sourceAsset].symbol}
                      </Grid>
                    </Grid>

                    <div className={classes.totalContainer}>
                      <Grid container className={classNames(classes.option)}>
                        <Grid item xs={6} className={classes.fade}>
                          <Translate text="Confirm.Receive" />
                        </Grid>
                        <Grid item xs={6} className={classes.amountCell}>
                          <img alt={destAsset} src={TOKENS[destAsset].icon} />
                          {total} {TOKENS[destAsset].symbol}
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                justify="center"
                className={classes.actionButtonContainer}
              >
                <Grid item xs={12}>
                  <Button
                    disabled={!canConvertTo}
                    variant={"contained"}
                    color="secondary"
                    size="large"
                    disableRipple
                    fullWidth
                    className={classNames(classes.actionButton)}
                    onClick={() => {
                      handleBridgeMode(confirmTx);
                      // store.set("transactionType", "relay");
                      // store.set("waitingApproval", true);
                    }}
                  >
                    <Translate text="Confirm.Start" />
                  </Button>

                  {waitingApproval && (
                    <WaitingModal
                      wallet={selectedWallet}
                      onClick={() => {
                        store.set("waitingApproval", false);
                      }}
                      open={waitingApproval}
                      sourceAsset={sourceAsset}
                      destAsset={destAsset}
                      sourceNetwork={sourceNetwork}
                      destNetwork={destNetwork}
                      amount={amount}
                      total={total}
                      type={type}
                    />
                  )}

                  {txRejected && (
                    <ErrorModal store={store} errorType={"txRejected"} />
                  )}

                  {unknownError && (
                    <ErrorModal store={store} errorType={"unknownError"} />
                  )}

                  {transferInProgress && (
                    <TxProgressModal
                      txInput={confirmTx}
                      wallet={selectedWallet}
                      onClick={() => {
                        store.set("waitingApproval", false);
                      }}
                      open={transferInProgress}
                      confirmation={confirmationNumber}
                      total={confirmationTotal}
                      confirming={confirming}
                      confirmationStep={confirmationStep}
                      transferSuccess={transferSuccess}
                      validatorTimeout={validatorTimeout}
                      sourceTxID={sourceTxID}
                      destTxID={destTxID}
                    />
                  )}

                  {/* {confirmationProgress && (
                    <TxProgressModal
                      txInput={confirmTx}
                      wallet={selectedWallet}
                      onClick={() => {
                        store.set("waitingApproval", false);
                      }}
                      open={confirmationProgress}
                      confirmation={confirmationNumber}
                      total={confirmationTotal}
                      validatorStep={validatorStep}
                      transferSuccess={transferSuccess}
                      sourceTxID={sourceTxID}
                    />
                  )}
                  {transferSuccess && (
                    <TxProgressModal
                      txInput={confirmTx}
                      wallet={selectedWallet}
                      onClick={() => {
                        store.set("waitingApproval", false);
                      }}
                      open={confirmationProgress}
                      confirmation={confirmationNumber}
                      total={confirmationTotal}
                      validatorStep={validatorStep}
                      validatorProgress={validatorProgress}
                      transferSuccess={transferSuccess}
                      destTxID={destTxID}
                    />
                  )} */}
                </Grid>
                {/* {confirmationError && (
                  <Typography variant="caption" className={classes.error}>
                    {confirmationError}
                  </Typography>
                )} */}
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withStore(ConfirmContainer));
