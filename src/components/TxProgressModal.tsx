import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import theme from "../theme/theme";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import LinearDeterminate from "./LinearDeterminate";
import ActionLink from "../components/ActionLink";
import { SYMBOL_MAP } from "../bridges/ETH_ELA/utils/walletUtils";
import {
  getExplorerLink,
  restoreInitialState,
} from "../bridges/ETH_ELA/utils/txUtils";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Success from "../assets/success.svg";
import Sent from "../assets/sent.svg";
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
  successContainer: {
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  walletText: {
    color: "#fff",
    fontSize: 18,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  generalContainer: {
    paddingTop: theme.spacing(4),
    alignItems: "center",
    justifyContent: "center",
  },
  confirmationText: {
    color: "#fff",
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  waitingText: {
    color: theme.palette.info.contrastText,
    fontSize: 16,
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  dismissContainer: {
    paddingTop: theme.spacing(2),
  },
  actionButton: {
    borderRadius: "16px",
  },
});

const ExplorerButton = withStyles({
  root: {
    textTransform: "none",
    color: theme.palette.info.contrastText,
  },
})(Button);

const SuccessButton = withStyles({
  root: {
    color: theme.palette.success.light,
    borderColor: theme.palette.success.light,
  },
})(Button);

interface Props {
  className?: string;
  classes: { [key in string]: string };
  onClick: any;
  open: any;
  confirmation: any;
  total: any;
  txInput: any;
  validatorStep: boolean;
  transferSuccess: boolean;
  sourceTxID?: any;
  destTxID?: any;
}

const TxProgressModal: React.FC<Props> = function (props) {
  const {
    classes,
    open,
    confirmation,
    total,
    txInput,
    validatorStep,
    transferSuccess,
    sourceTxID,
    destTxID,
  } = props;

  return (
    <div>
      <React.Fragment>
        <Modal
          // aria-labelledby="transition-modal-title"
          // aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          // onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            {transferSuccess ? (
              <div className={classes.container}>
                <div className={classes.successContainer}>
                  <img src={Success} alt="Transfer Complete" />
                  <Typography className={classes.successText}>
                    <Translate text="Progress.Success" />
                  </Typography>
                </div>
                <div className={classes.generalContainer}>
                  <Typography className={classes.confirmationText}>
                    {SYMBOL_MAP[txInput.destAsset]}&nbsp;
                    <Translate text="Progress.Received" />
                    &nbsp;{txInput.destNetwork}&nbsp;
                    <Translate text="Progress.Chain" />
                  </Typography>
                  <ActionLink
                    url={getExplorerLink(
                      "dest",
                      "transaction",
                      txInput,
                      destTxID
                    )}
                  >
                    <ExplorerButton startIcon={<OpenInNewIcon />}>
                      <Translate text="Progress.Explorer" />
                    </ExplorerButton>
                  </ActionLink>
                </div>
                <Grid
                  container
                  justify="flex-end"
                  className={classes.dismissContainer}
                >
                  <SuccessButton
                    variant={"outlined"}
                    disableRipple
                    fullWidth
                    className={classNames(classes.actionButton)}
                    onClick={() => {
                      restoreInitialState();
                    }}
                  >
                    <Translate text="Progress.Accept" />
                  </SuccessButton>
                </Grid>
              </div>
            ) : (
              <div className={classes.container}>
                <div className={classes.successContainer}>
                  <img src={Sent} alt="Sent" />
                  <Typography className={classes.successText}>
                    <Translate text="Progress.Sent" />
                  </Typography>
                  <ActionLink
                    url={getExplorerLink(
                      "source",
                      "transaction",
                      txInput,
                      sourceTxID
                    )}
                  >
                    <ExplorerButton startIcon={<OpenInNewIcon />}>
                      <Translate text="Progress.Explorer" />
                    </ExplorerButton>
                  </ActionLink>
                </div>

                {!validatorStep ? (
                  <div className={classes.generalContainer}>
                    <Typography className={classes.confirmationText}>
                      <Translate text="Progress.Blocks" />
                    </Typography>

                    <LinearDeterminate
                      confirmationNumber={confirmation}
                      confirmationTotal={total}
                    />
                    <Typography className={classes.confirmationText}>
                      {confirmation} of {total}
                    </Typography>
                  </div>
                ) : (
                  <div className={classes.generalContainer}>
                    <LinearProgress color="primary" />
                    <Typography className={classes.waitingText}>
                      <Translate text="Progress.Oracles" />
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </Fade>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default withStyles(styles)(TxProgressModal);
