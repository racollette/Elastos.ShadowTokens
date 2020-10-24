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
import Fail from "../assets/fail.svg";
import Alert from "../assets/alert.svg";
import { Translate } from "./Translate";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(37,37,37)",
    borderRadius: "40px",
    width: 350,
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "75%",
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
  },
});

interface Props {
  className?: string;
  classes: { [key in string]: string };
  currentNetwork?: any;
  targetNetwork?: any;
  errorType: string;
  store: any;
}

const ErrorModal: React.FC<Props> = function (props) {
  const { classes, targetNetwork, errorType, store } = props;
  const open = store.get(errorType);
  const minTx = store.get("minTx");
  const maxTx = store.get("maxTx");

  return (
    <div>
      <React.Fragment>
        <Modal
          open={open}
          onClose={() => {
            store.set({ errorType }, false);
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
              {errorType === "wrongNetwork" && (
                <div>
                  <div className={classes.errorContainer}>
                    <img src={Fail} alt="Error" />
                    <Typography className={classes.successText}>
                      <Translate text="Error.WrongNetwork.Title" />
                    </Typography>
                  </div>
                  <div className={classes.generalContainer}>
                    <Typography className={classes.confirmationText}>
                      <Translate text="Error.WrongNetwork.Message1" />
                      &nbsp;{targetNetwork}&nbsp;
                      <Translate text="Error.WrongNetwork.Message2" />
                    </Typography>
                  </div>
                </div>
              )}

              {errorType === "noWeb3" && (
                <div>
                  <div className={classes.errorContainer}>
                    <img src={Alert} alt="Alert" />
                    <Typography className={classes.successText}>
                      <Translate text="Error.NoWeb3.Title" />
                    </Typography>
                  </div>
                  <div className={classes.generalContainer}>
                    <Typography className={classes.confirmationText}>
                      <Translate text="Error.NoWeb3.Message" />
                    </Typography>
                  </div>
                </div>
              )}

              {errorType === "insufficientBalance" && (
                <div>
                  <div
                    className={classNames(
                      classes.errorContainer,
                      classes.spacer
                    )}
                  >
                    <img src={Alert} alt="Alert" />
                    <Typography className={classes.successText}>
                      <Translate text="Error.InsufficientBalance.Message" />
                    </Typography>
                  </div>
                </div>
              )}

              {errorType === "belowMinTxLimit" && (
                <div>
                  <div
                    className={classNames(
                      classes.errorContainer,
                      classes.spacer
                    )}
                  >
                    <img src={Alert} alt="Alert" />
                    <Typography className={classes.successText}>
                      <Translate text="Error.BelowMinTxLimit.Message" />
                      &nbsp;({minTx})
                    </Typography>
                  </div>
                </div>
              )}

              {errorType === "exceedsMaxTxLimit" && (
                <div>
                  <div
                    className={classNames(
                      classes.errorContainer,
                      classes.spacer
                    )}
                  >
                    <img src={Alert} alt="Alert" />
                    <Typography className={classes.successText}>
                      <Translate text="Error.ExceedsMaxTxLimit.Message" />
                      &nbsp;({maxTx})
                    </Typography>
                  </div>
                </div>
              )}

              {errorType === "txRejected" && (
                <div>
                  <div
                    className={classNames(
                      classes.errorContainer,
                      classes.spacer
                    )}
                  >
                    <img src={Alert} alt="Alert" />
                    <Typography className={classes.successText}>
                      <Translate text="Error.TxRejected.Message" />
                    </Typography>
                  </div>
                </div>
              )}

              {errorType === "unknownError" && (
                <div>
                  <div
                    className={classNames(
                      classes.errorContainer,
                      classes.spacer
                    )}
                  >
                    <img src={Alert} alt="Alert" />
                    <Typography className={classes.successText}>
                      <Translate text="Error.Unknown.Message" />
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
                    store.set(errorType, false);
                  }}
                >
                  <Translate text="Error.Accept" />
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default withStyles(styles)(ErrorModal);
