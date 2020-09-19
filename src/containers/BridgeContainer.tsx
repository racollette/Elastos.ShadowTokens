import React from "react";
import { withStore } from "@spyna/react-store";
import theme from "../theme/theme";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import {
  BRIDGE_SYMBOL_MAP,
  BRIDGE_NAME_MAP,
  BRIDGE_ICON_MAP,
} from "../utils/bridgeUtils";

const NoCapsButton = withStyles({
  root: {
    textTransform: "none",
  },
})(Button);

const styles = () => ({
  container: {
    background: "rgb(20,20,20)",
    // border: "0.5px solid " + theme.palette.primary.contrastText,
    borderRadius: "40px",
    // boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
    // boxShadow: "0px 0px 10px 5px rgba(255,255,255,0.78)",
    boxShadow:
      " #FFF 0 -5px 4px, #8DFEFF 0 -3px 10px, #3596DD 0 -10px 20px, #2552B9 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0)",
    maxWidth: 500,
    // width: "100%",
    // minHeight: "50vh",
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: 34,
    fontWeight: 700,
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
  gray: {
    color: "#848994",
  },
  subtitle: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
    fontSize: 18,
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
    align: "center !important",
  },
  actionButtonContainer: {
    // paddingTop: theme.spacing(2),
    marginTop: theme.spacing(3),

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
  bridgeSelectionBox: {
    border: "0.5px solid " + theme.palette.primary.contrastText,
    borderRadius: "10px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bridgeSelectionLabel: {
    color: "#848994",
    marginBottom: theme.spacing(1),
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  amountField: {
    width: "100%",
  },
  endAdornment: {
    "& p": {},
  },
  item: {
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    minWidth: 55,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "& div": {
      display: "flex",
    },
    justifyContent: "flex-start",
  },
  select: {
    display: "flex",
    "& div": {
      display: "flex",
    },
    "& MuiInput-underline:before": {
      display: "none",
    },
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  button: {
    fontSize: 24,
    color: "#fff",
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  arrow: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& svg": {
      width: 22,
      height: "auto",
      marginLeft: theme.spacing(0.75),
    },
  },
  balance: {
    fontSize: 12,
    marginTop: -2,
    color: "#585861",
  },
  standaloneOption: {
    border: "1px solid #DBE0E8",
    borderRadius: 4,
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
  },
  option: {
    minHeight: 60,
    fontSize: 14,
    "& img": {
      height: "auto",
      width: 24,
      marginRight: theme.spacing(1),
    },
    "& .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
    },
  },
});

type Balances = {
  [key in string]: string | any;
};

interface Props extends Balances {
  items: Array<keyof typeof BRIDGE_SYMBOL_MAP>;
  classes: { [key in string]: string };
  active?: string;
  pair?: string;
  disabled?: boolean;
}

class BridgeContainer extends React.Component<Props> {
  bridgeEl: React.RefObject<any>;
  pairsEl: React.RefObject<any>;
  state = {
    currency: "",
    bridgeOpen: false,
    pairsOpen: false,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      currency: "",
      bridgeOpen: false,
      pairsOpen: false,
    };
    this.bridgeEl = React.createRef();
    this.pairsEl = React.createRef();
  }

  setBridge() {
    const { store } = this.props;
    store.set("confirmBridge", true);
    console.log(store.get("confirmBridge"));
    // store.set("selectedBridge", bridge);
    // store.set("selectedPair", pair);
  }

  handleBridgeOpen() {
    this.setState({
      bridgeOpen: true,
    });
  }

  handleBridgeClose(event: any) {
    const { store } = this.props;
    const selectedBridge = store.get("selectedBridge");

    const value = event.target.value;
    console.log("HANDLE BRIDGE CLOSE", value);
    console.log(selectedBridge);
    if (value) {
      this.props.onBridgeChange(value);
      this.setState({ currency: value });
      //   this.props.onPairChange(value);
    }
    this.setState({ bridgeOpen: false });
  }

  handlePairsOpen() {
    this.setState({
      pairsOpen: true,
    });
  }

  handlePairsClose(event: any) {
    // console.log(event, event.target, event.target.value)
    const value = event.target.value;
    if (value) {
      this.props.onPairChange(value);
      this.setState({ currency: value });
    }
    this.setState({ pairsOpen: false });
  }

  render() {
    const { classes, items, active, pair } = this.props;

    const { bridgeOpen, pairsOpen } = this.state;
    const selected = active || items[0];
    const chainPair = pair || items[0];

    let pairOptions = [...items].filter((item) => item !== selected);
    // console.log("PAIR OPTIONS", pairOptions);

    return (
      <div className={classes.container}>
        <Grid container justify="center">
          {/* <span>
                        <Typography className={classes.title} variant="h2">
                            Introducing&nbsp;
            </Typography>
                    </span> */}
          <span>
            <Typography
              className={classNames(classes.title, classes.gray)}
              variant="h3"
            >
              Shadow
            </Typography>
          </span>
          <span>
            <Typography className={classes.title} variant="h3">
              Tokens
            </Typography>
          </span>
          <Typography
            align="center"
            className={classes.subtitle}
            variant="body1"
          >
            Your assets, anywhere. Map your tokens to other blockchains by
            minting ShadowTokens.
          </Typography>
        </Grid>
        <div className={classes.actionsContainer}>
          <Grid>
            <React.Fragment>
              <Grid container className={classNames(classes.option)}>
                <Grid item xs={6}>
                  <Grid container justify="center">
                    {/* Bridge Chain */}
                    <div className={classes.bridgeSelectionLabel}>
                      Supported Bridges
                    </div>
                    <NoCapsButton
                      fullWidth
                      className={(classes.button, classes.bridgeSelectionBox)}
                      // size="large"
                      ref={this.bridgeEl}
                      aria-controls="bridgeMenu"
                      aria-haspopup="true"
                      onClick={this.handleBridgeOpen.bind(this)}
                    >
                      <img
                        src={BRIDGE_ICON_MAP[selected.toLowerCase()]}
                        alt={selected}
                        className={classes.icon}
                      />
                      <span className={classes.assetSymbol}>
                        {BRIDGE_NAME_MAP[selected.toLowerCase()]}
                      </span>
                      <div className={classes.arrow}>
                        <ArrowDropDown />
                      </div>
                    </NoCapsButton>
                    <Menu
                      id="bridgeMenu"
                      anchorEl={this.bridgeEl.current}
                      keepMounted
                      open={bridgeOpen}
                      onClose={this.handleBridgeClose.bind(this)}
                    >
                      {items.map((i, index) => {
                        return (
                          <MenuItem
                            className={classes.item}
                            onClick={() => {
                              this.handleBridgeClose.bind(this)({
                                target: {
                                  value: i,
                                },
                              });
                            }}
                            key={index}
                            value={i}
                          >
                            <div>
                              <img
                                src={BRIDGE_ICON_MAP[i.toLowerCase()]}
                                alt={i}
                                className={classes.icon}
                              />
                            </div>
                            <Grid
                              container
                              direction="column"
                              alignItems="flex-start"
                            >
                              <span>{i}</span>
                              <span className={classes.balance}>
                                {
                                  BRIDGE_NAME_MAP[
                                    i.toLowerCase() as keyof typeof BRIDGE_NAME_MAP
                                  ]
                                }
                              </span>
                            </Grid>
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container justify="center">
                    {/* Pair Chain */}
                    <div className={classes.bridgeSelectionLabel}>
                      Pair Networks
                    </div>
                    <NoCapsButton
                      fullWidth
                      className={(classes.button, classes.bridgeSelectionBox)}
                      // size="large"
                      ref={this.pairsEl}
                      aria-controls="pairsMenu"
                      aria-haspopup="true"
                      onClick={this.handlePairsOpen.bind(this)}
                    >
                      <img
                        src={BRIDGE_ICON_MAP[chainPair.toLowerCase()]}
                        alt={selected}
                        className={classes.icon}
                      />
                      <span className={classes.assetSymbol}>
                        {BRIDGE_NAME_MAP[chainPair.toLowerCase()]}
                      </span>
                      <div className={classes.arrow}>
                        <ArrowDropDown />
                      </div>
                    </NoCapsButton>
                    <Menu
                      id="pairsMenu"
                      anchorEl={this.pairsEl.current}
                      keepMounted
                      open={pairsOpen}
                      onClose={this.handlePairsClose.bind(this)}
                    >
                      {pairOptions.map((i, index) => {
                        return (
                          <MenuItem
                            className={classes.item}
                            onClick={() => {
                              this.handlePairsClose.bind(this)({
                                target: {
                                  value: i,
                                },
                              });
                            }}
                            key={index}
                            value={i}
                          >
                            <div>
                              <img
                                src={BRIDGE_ICON_MAP[i.toLowerCase()]}
                                alt={i}
                                className={classes.icon}
                              />
                            </div>
                            <Grid
                              container
                              direction="column"
                              alignItems="flex-start"
                            >
                              <span>{i}</span>
                              <span className={classes.balance}>
                                {
                                  BRIDGE_NAME_MAP[
                                    i.toLowerCase() as keyof typeof BRIDGE_NAME_MAP
                                  ]
                                }
                              </span>
                            </Grid>
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justify="center"
                  className={classes.actionButtonContainer}
                >
                  <Grid item xs={12}>
                    <Button
                      variant={"contained"}
                      disableRipple
                      color="primary"
                      size="large"
                      fullWidth
                      className={classNames(classes.actionButton)}
                      onClick={this.setBridge.bind(this)}
                    >
                      Proceed
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withStore(BridgeContainer));
