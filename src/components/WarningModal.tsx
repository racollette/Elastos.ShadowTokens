import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import theme from "../theme/theme";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Warning from "../assets/alert.svg";

const styles: Styles<typeof theme, any> = (theme) => ({
    container: {
        textAlign: "center",
        background: "rgb(37,37,37)",
        borderRadius: "40px",
        width: 350,
        padding: theme.spacing(3),
        [theme.breakpoints.down("xs")]: {
            width: "80%",
        },
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    },
    errorContainer: {
        paddingTop: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "& img": {
            height: 75,
            width: "auto",
            marginBottom: theme.spacing(1),
        },
    },
    successText: {
        color: "#fff",
        fontSize: 18,
    },
    walletText: {
        color: "#fff",
        fontSize: 18,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    generalContainer: {
        paddingTop: theme.spacing(4),
        alignItems: "center",
        justifyContent: "center",
    },
    confirmationText: {
        // color: theme.palette.info.contrastText,
        color: "#fff",
        fontSize: 16,
    },
    confirmationCount: {
        color: "#fff",
        fontSize: 16,
    },
    dismissContainer: {
        paddingTop: theme.spacing(2),
    },
    actionButton: {
        borderRadius: "16px",
    },
    spacer: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    }
});

interface Props {
    className?: string;
    classes: { [key in string]: string };
    warningType: string;
    store: any;
}

const WarningModal: React.FC<Props> = function(props) {
    const { classes, warningType, store } = props;
    const open = store.get(warningType);

    return (
        <div>
            <React.Fragment>
                <Modal
                    open={open}
                    onClose={() => {
                        store.set({ warningType }, false);
                    }}
                    className={classes.modal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={true}>
                        <div className={classes.container}>
                            {warningType === "wrongNetwork" && (
                                <div>
                                    <div className={classes.errorContainer}>
                                        <img src={Warning} alt="Warning" />
                                        <Typography className={classes.successText}>
                                            Warning
                    </Typography>
                                    </div>
                                    <div className={classes.generalContainer}>
                                        <Typography className={classes.confirmationText}>
                                            Please be advised that retrieving Ethereum-based assets from other blockchains requires a wallet capable of switching networks. Currently, this includes the MetaMask, etc etc wallets.
                    </Typography>
                                    </div>
                                </div>
                            )}

                            <Grid
                                container
                                justify="flex-end"
                                className={classes.dismissContainer}
                            >
                                <Button
                                    variant={"outlined"}
                                    color="secondary"
                                    disableRipple
                                    fullWidth
                                    className={classNames(classes.actionButton)}
                                    onClick={() => {
                                        store.set(warningType, false);
                                    }}
                                >
                                    Okay
                </Button>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
            </React.Fragment>
        </div>
    );
};

export default withStyles(styles)(WarningModal);
