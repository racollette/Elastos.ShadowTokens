import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import theme from "../theme/theme";
import DoubleArrow from "../assets/double-arrow.svg";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  MINI_ICON_MAP,
  WALLET_ICON_MAP,
  SYMBOL_MAP,
} from "../utils/walletUtils";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(32,32,32)",

    borderRadius: "40px",
    // border: "1px solid #3596DD",
    // boxShadow:
    //   "#FFF 0 -5px 4px, #8DFEFF 0 -3px 10px, #3596DD 0 -10px 20px, #2552B9 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0)",
    maxWidth: 350,
    // margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
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
  },
  assetText: {
    color: theme.palette.info.contrastText,
    fontSize: 18,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  tokenMapContainer: {
    paddingTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  assetIcon: {
    height: 50,
    width: "auto",
  },
  fromToIcon: {
    height: 40,
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
            <div className={classes.container}>
              {/* <div className={classes.header}>
                <img
                  className={classes.close}
                  src={BackArrow}
                  alt="Close"
                  onClick={onClick}
                />
              </div> */}
              <div className={classes.walletIconContainer}>
                <img src={WALLET_ICON_MAP[wallet]} alt={wallet} />
                <Typography className={classes.walletText}>
                  Confirm transaction with {wallet}
                </Typography>
              </div>
              <div className={classes.tokenMapContainer}>
                <div className={classes.assetText}>
                  <Typography>{Number(amount).toFixed(2)}</Typography>
                  <Typography>
                    {SYMBOL_MAP[sourceAsset as keyof typeof SYMBOL_MAP]}
                  </Typography>
                </div>
                <img
                  className={classes.assetIcon}
                  src={MINI_ICON_MAP[sourceAsset]}
                  alt={sourceAsset}
                />
                <img
                  className={classes.fromToIcon}
                  src={DoubleArrow}
                  alt="To"
                />
                <img
                  className={classes.assetIcon}
                  src={MINI_ICON_MAP[destAsset]}
                  alt={destAsset}
                />
                <div className={classes.assetText}>
                  <Typography>{Number(total).toFixed(2)}</Typography>
                  <Typography>
                    {SYMBOL_MAP[destAsset as keyof typeof SYMBOL_MAP]}
                  </Typography>
                </div>
              </div>

              <div className={classes.spinnerContainer}>
                <LinearProgress color="primary" />
                <Typography className={classes.waitingText}>
                  Waiting for user response...
                </Typography>
              </div>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default withStyles(styles)(WaitingModal);
