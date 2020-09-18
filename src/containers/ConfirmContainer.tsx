import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import classNames from "classnames";
import Numeral from "numeral";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import BackArrow from "../assets/back-arrow.svg";
import WalletIcon from "../assets/wallet-icon.svg";
import DarkTooltip from "../components/DarkTooltip";
import theme from "../theme/theme";
import {
    abbreviateAddress,
    MINI_ICON_MAP,
    SYMBOL_MAP,
} from "../utils/walletUtils";

const styles: Styles<typeof theme, any> = (theme) => ({
    container: {
        textAlign: "center",
        background: "rgb(20,20,20)",
        borderRadius: "40px",
        boxShadow:
            " #FFF 0 -5px 4px, #8DFEFF 0 -3px 10px, #3596DD 0 -10px 20px, #2552B9 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0)",
        maxWidth: 500,
        margin: "0px auto " + theme.spacing(1) + "px",
        padding: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
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
        padding: theme.spacing(3),
        textAlign: "center",
        "& button": {
            "&.Mui-disabled": {},
            margin: "0px auto",
            fontSize: 12,
            minWidth: 175,
            padding: theme.spacing(1),
        },
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
    },
    option: {
        borderBottom: "1px solid " + theme.palette.divider,
        minHeight: 60,
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
        // borderTop: "1px solid " + theme.palette.divider,
        borderBottom: "1px solid " + theme.palette.divider,
        // paddingLeft: theme.spacing(3),
        // paddingRight: theme.spacing(3),
    },
    headerText: {
        textAlign: "center",
        position: "relative",
        backgroundColor: "#fbfbfb",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderBottom: "1px solid " + theme.palette.divider,
        paddingBottom: theme.spacing(6),
        paddingTop: theme.spacing(1),
    },
    titleAmount: {
        marginTop: theme.spacing(5),
    },
    navTitle: {
        color: "#87888C",
    },
    back: {
        position: "absolute",
        top: 16,
        left: 16,
        height: "auto",
        width: 18,
        cursor: "pointer",
        zIndex: 100000,
        "&:hover": {
            opacity: 0.75,
        },
    },
    large: {
        fontSize: 50,
    },
    medium: {
        fontSize: 40,
    },
    small: {
        fontSize: 30,
    },
    smallest: {
        fontSize: 20,
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

    async gatherFeeData() { }

    async confirmDeposit() {
        const { store } = this.props;
        // const confirmTx = store.get("confirmTx");
        store.set("confirmationError", null);

        // initGJSDeposit(confirmTx).catch((error) => {
        //     console.error(error);
        //     Sentry.withScope(function(scope) {
        //         scope.setTag("error-hint", "initGJSDeposit");
        //         Sentry.captureException(error);
        //     });
        //     store.set("confirmationError", String(error.message));
        // });
    }

    async confirmWithdraw() {
        const { store } = this.props;
        // const confirmTx = store.get("confirmTx");
        store.set("confirmationError", null);

        // initGJSWithdraw(confirmTx).catch((error) => {
        //     console.error(error);
        //     Sentry.withScope(function(scope) {
        //         scope.setTag("error-hint", "initGJSWithdraw");
        //         Sentry.captureException(error);
        //     });
        //     store.set("confirmationError", String(error.message));
        // });
    }

    render() {
        const { classes, store } = this.props;

        const selectedAsset = store.get("selectedAsset");
        // const selectedDirection = store.get("convert.selectedDirection");
        const amount = store.get("convert.amount");
        const serviceFee = (
            Number(store.get("convert.networkFee")) * Number(amount)
        ).toFixed(4);
        // const networkFee = store.get("convert.networkFee");
        const total = Number(store.get("convert.conversionTotal")).toFixed(4);
        const canConvertTo = amount > 0.00010001;
        // const confirmAction = store.get("confirmAction");
        // const isDeposit = confirmAction === "deposit";
        const confirmTx = store.get("confirmTx");
        const confirmationError = store.get("confirmationError");
        const sourceAsset = confirmTx.sourceAsset;
        const sourceNetwork = confirmTx.sourceNetwork;
        const destAsset = confirmTx.destAsset;
        const destNetwork = confirmTx.destNetwork;

        // Replace 'w' to retrieve price of native asset, assuming they are equivalent
        // Careful if asset ticket contains a w
        const usdValue = Number(
            store.get(`${selectedAsset.replace("w", "")}usd`) * amount
        ).toFixed(2);

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
                            }}
                        />
                        <Typography variant="overline" className={classes.navTitle}>
                            Converting
            </Typography>

                        <Typography variant="body1" className={classes.titleAmount}>
                            ({Numeral(usdValue).format("$0,0.00")})
            </Typography>

                        <Typography variant="h4" className={classNames(classes[size])}>
                            {Numeral(confirmTx.amount).format("0,0.00")}{" "}
                            {SYMBOL_MAP[sourceAsset as keyof typeof SYMBOL_MAP]}
                        </Typography>

                        <Typography variant="body1">
                            from {sourceNetwork} Network
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
                                            <Grid item xs={6}>
                                                Receiving
                      </Grid>
                                            <Grid item xs={6}>
                                                <img alt={destAsset} src={MINI_ICON_MAP[destAsset]} />
                                                {SYMBOL_MAP[destAsset as keyof typeof SYMBOL_MAP]}
                                            </Grid>
                                        </Grid>

                                        <Grid container className={classes.option}>
                                            <Grid item xs={6}>
                                                Destination
                      </Grid>
                                            <Grid item xs={6}>
                                                {destNetwork} Network
                      </Grid>
                                        </Grid>

                                        <Grid container className={classes.option}>
                                            <Grid item xs={6}>
                                                Target Address
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
                                            <Grid item xs={6}>
                                                Service Fee
                      </Grid>
                                            <Grid item xs={6} className={classes.amountCell}>
                                                <img
                                                    alt={sourceAsset}
                                                    src={MINI_ICON_MAP[sourceAsset]}
                                                />
                                                {serviceFee}{" "}
                                                {SYMBOL_MAP[sourceAsset as keyof typeof SYMBOL_MAP]}
                                            </Grid>
                                        </Grid>

                                        <div className={classes.totalContainer}>
                                            <Grid container className={classNames(classes.option)}>
                                                <Grid item xs={6}>
                                                    You will receive
                        </Grid>
                                                <Grid item xs={6} className={classes.amountCell}>
                                                    <img alt={destAsset} src={MINI_ICON_MAP[destAsset]} />
                                                    {total}{" "}
                                                    {SYMBOL_MAP[destAsset as keyof typeof SYMBOL_MAP]}
                                                </Grid>
                                            </Grid>
                                        </div>

                                        {/* <Grid container className={classes.option}>
                      <Grid item xs={6}>
                        {NAME_MAP[selectedAsset as keyof typeof NAME_MAP]}{" "}
                        Network Fee
                      </Grid>
                      <Grid item xs={6} className={classes.amountCell}>
                        <img
                          alt={selectedAsset}
                          src={MINI_ICON_MAP[selectedAsset]}
                        />
                        {networkFee}{" "}
                        {SYMBOL_MAP[selectedAsset as keyof typeof SYMBOL_MAP]}
                      </Grid>
                    </Grid> */}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                justify="center"
                                className={classes.actionButtonContainer}
                            >
                                {/* {selectedDirection === 0 && ( */}
                                <Grid item xs={12}>
                                    <Button
                                        disabled={!canConvertTo}
                                        variant={"contained"}
                                        color="primary"
                                        size="large"
                                        disableRipple
                                        fullWidth
                                        className={classNames(classes.margin, classes.actionButton)}
                                        onClick={this.confirmWithdraw.bind(this)}
                                    >
                                        Confirm
                  </Button>
                                </Grid>
                                {/* )} */}
                                {/* {selectedDirection === 1 && (
                  <Grid item xs={12}>
                    <Button
                      disabled={false}
                      variant={"contained"}
                      color="primary"
                      size="large"
                      disableRipple
                      fullWidth
                      className={classNames(
                        classes.margin,
                        classes.actionButton
                      )}
                      onClick={this.confirmWithdraw.bind(this)}
                    >
                      Confirm
                    </Button>
                  </Grid>
                )} */}
                                {confirmationError && (
                                    <Typography variant="caption" className={classes.error}>
                                        {confirmationError}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(withStore(ConfirmContainer));
