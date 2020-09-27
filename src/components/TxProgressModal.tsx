import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import theme from "../theme/theme";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Button from "@material-ui/core/Button";
import LinearDeterminate from "./LinearDeterminate";
import ActionLink from "../components/ActionLink";
import { SYMBOL_MAP } from "../utils/walletUtils";
import { getExplorerLink, restoreInitialState } from "../utils/txUtils";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Success from "../assets/success.svg";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(20,20,20)",
    borderRadius: "40px",
    // border: "1px solid #3596DD",
    // boxShadow:
    //     "#FFF 0 -2px 3px, #8DFEFF 0 -3px 10px, #3596DD 0 -10px 20px, #2552B9 0 -18px 40px, 5px 5px 10px 5px rgba(0,0,0,0)",
    maxWidth: 350,
    minWidth: 350,
    // margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80%",
    },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  successContainer: {
    paddingTop: theme.spacing(1),
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    // opacity: 0.6,
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
});

const ExplorerButton = withStyles({
  root: {
    textTransform: "none",
    color: theme.palette.info.contrastText,
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
  validatorProgress: number;
  transferSuccess: boolean;
}

const TxProgressModal: React.FC<Props> = function (props) {
  const {
    classes,
    open,
    confirmation,
    total,
    txInput,
    validatorStep,
    validatorProgress,
    transferSuccess,
  } = props;

  // Dummy tx id, instead return from wallet provider
  let txId1 =
    "0xf6c69955e79c17962aeffde498688bd749511ff4591fc78319fd6c5e235fddea";
  let txId2 =
    "0x8f17ac71a470ab41f945c488a1636ee9af96c7949e5efd9814f72e60ccb0a831";

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
                    Success
                  </Typography>
                </div>
                <div className={classes.generalContainer}>
                  <Typography className={classes.confirmationText}>
                    {SYMBOL_MAP[txInput.destAsset]} received on{" "}
                    {txInput.destNetwork} blockchain
                  </Typography>
                  <ActionLink
                    url={getExplorerLink("dest", "transaction", txInput, txId2)}
                  >
                    <ExplorerButton startIcon={<OpenInNewIcon />}>
                      View in explorer
                    </ExplorerButton>
                  </ActionLink>
                </div>
                <Grid
                  container
                  justify="flex-end"
                  className={classes.dismissContainer}
                >
                  <Button
                    variant={"outlined"}
                    color="primary"
                    disableRipple
                    fullWidth
                    className={classNames(classes.actionButton)}
                    onClick={() => {
                      restoreInitialState();
                    }}
                  >
                    Okay
                  </Button>
                </Grid>
              </div>
            ) : (
              <div className={classes.container}>
                <div className={classes.successContainer}>
                  <Typography className={classes.successText}>
                    Transfer request sent
                  </Typography>
                  <ActionLink
                    url={getExplorerLink(
                      "source",
                      "transaction",
                      txInput,
                      txId1
                    )}
                  >
                    <ExplorerButton startIcon={<OpenInNewIcon />}>
                      View in explorer
                    </ExplorerButton>
                  </ActionLink>
                </div>

                {!validatorStep ? (
                  <div className={classes.generalContainer}>
                    <Typography className={classes.confirmationText}>
                      Waiting for block confirmations...
                    </Typography>

                    <LinearDeterminate
                      confirmationNumber={confirmation}
                      confirmationTotal={total}
                    />
                    <Typography className={classes.confirmationCount}>
                      {confirmation} of {total}
                    </Typography>
                  </div>
                ) : (
                  <div className={classes.generalContainer}>
                    {transferSuccess ? (
                      <Typography className={classes.confirmationText}>
                        Transfer complete
                      </Typography>
                    ) : (
                      <Typography className={classes.confirmationText}>
                        Oracles validating transaction...
                      </Typography>
                    )}

                    <LinearDeterminate
                      confirmationNumber={validatorProgress}
                      confirmationTotal={1}
                    />
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
