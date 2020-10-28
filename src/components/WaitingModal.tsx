import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import theme from "../theme/theme";
import DoubleArrow from "../assets/double-arrow.svg";
import LinearProgress from "@material-ui/core/LinearProgress";
import { WALLET_ICON_MAP } from "../bridges/ETH_ELA/utils/config";
import { TOKENS } from "../bridges/ETH_ELA/tokens";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
  actionButton: {
    borderRadius: "16px",
  },
  close: {
    position: "absolute",
    top: 8,
    left: 10,
    height: "auto",
    width: 20,
    cursor: "pointer",
    zIndex: 100000,
    "&:hover": {
      opacity: 0.75,
    },
  },
  header: {
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  walletIconContainer: {
    paddingTop: theme.spacing(1),
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    // opacity: 0.6,
    transition: "all 0.2s ease-in-out",
    "& img": {
      height: 50,
      width: "auto",
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
  assetText: {
    color: theme.palette.info.contrastText,
    fontSize: 18,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  tokenMapContainer: {
    paddingTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  assetIcon: {
    height: 42,
    width: "auto",
  },
  fromToIcon: {
    height: 34,
    width: "auto",
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
  spinnerContainer: {
    paddingTop: theme.spacing(4),
    alignItems: "center",
    justifyContent: "center",
  },
  waitingText: {
    color: theme.palette.info.contrastText,
    fontSize: 16,
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  spacer: {
    marginTop: theme.spacing(1),
  },
});

interface Props {
  className?: string;
  classes: { [key in string]: string };
  onClick: any;
  wallet: any;
  sourceAsset: any;
  destAsset: any;
  sourceNetwork: any;
  destNetwork: any;
  amount: any;
  total: any;
  open: any;
  type: any;
}

const WaitingModal: React.FC<Props> = function (props) {
  // class WaitingModal extends React.PureComponent<any> {

  // constructor(props: any) {
  //   super(props);
  //   this.state = props.store.getState();
  // }

  // const [open, setOpen] = React.useState(false);

  const {
    classes,
    wallet,
    sourceAsset,
    destAsset,
    amount,
    total,
    open,
    type,
  } = props;

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <React.Fragment>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
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
            <div>
              {type === "approve" && (
                <div className={classes.container}>
                  <div className={classes.spacer} />
                  <div className={classes.walletIconContainer}>
                    <img src={TOKENS[sourceAsset].icon} alt={sourceAsset} />
                    <Typography className={classes.walletText}>
                      <Translate text="Waiting.ApproveSpend" />
                      &nbsp;{TOKENS[sourceAsset].symbol}
                    </Typography>
                  </div>
                  <div className={classes.spacer} />
                  <div className={classes.spinnerContainer}>
                    <LinearProgress color="secondary" />
                    <Typography className={classes.waitingText}>
                      <Translate text="Waiting.User" />
                    </Typography>
                  </div>
                </div>
              )}
              {type === "approveConfs" && (
                <div className={classes.container}>
                  <div className={classes.spacer} />
                  <div className={classes.walletIconContainer}>
                    <img src={TOKENS[sourceAsset].icon} alt={sourceAsset} />
                    <Typography className={classes.walletText}>
                      <Translate text="Waiting.SpendApproved1" />
                      &nbsp;{TOKENS[sourceAsset].symbol}&nbsp;
                      <Translate text="Waiting.SpendApproved2" />
                    </Typography>
                  </div>
                  <div className={classes.spacer} />
                  <div className={classes.spinnerContainer}>
                    <LinearProgress color="primary" />
                    <Typography className={classes.waitingText}>
                      <Translate text="Waiting.Confirmations" />
                    </Typography>
                  </div>
                </div>
              )}
              {type === "relay" && (
                <div className={classes.container}>
                  <div className={classes.walletIconContainer}>
                    <img src={WALLET_ICON_MAP[wallet]} alt={wallet} />
                    <Typography className={classes.walletText}>
                      <Translate text="Waiting.Confirm" />
                      {/* &nbsp;{wallet} */}
                    </Typography>
                  </div>
                  <div className={classes.tokenMapContainer}>
                    <div className={classes.assetText}>
                      <Typography>{Number(amount).toFixed(2)}</Typography>
                      <Typography>{TOKENS[sourceAsset].symbol}</Typography>
                    </div>
                    <img
                      className={classes.assetIcon}
                      src={TOKENS[sourceAsset].icon}
                      alt={sourceAsset}
                    />
                    <img
                      className={classes.fromToIcon}
                      src={DoubleArrow}
                      alt="To"
                    />
                    <img
                      className={classes.assetIcon}
                      src={TOKENS[destAsset].icon}
                      alt={destAsset}
                    />
                    <div className={classes.assetText}>
                      <Typography>{Number(total).toFixed(2)}</Typography>
                      <Typography>{TOKENS[destAsset].symbol}</Typography>
                    </div>
                  </div>

                  <div className={classes.spinnerContainer}>
                    <LinearProgress color="secondary" />
                    <Typography className={classes.waitingText}>
                      <Translate text="Waiting.User" />
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default withStyles(styles)(WaitingModal);
