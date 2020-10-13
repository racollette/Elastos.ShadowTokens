import React from "react";
import { withStore } from "@spyna/react-store";
import NumberFormat from "react-number-format";
import classNames from "classnames";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import theme from "../theme/theme";
import { Translate } from "./Translate";

const styles: Styles<any, any> = () => ({
  container: {
    width: "100%",
    "& input": {
      fontFamily: "inherit",
      color: "#fff",
      // fontSize: 18
    },
  },
  large: {
    "& input": {
      fontSize: 18,
    },
  },
  medium: {
    "& input": {
      fontSize: 16,
    },
  },
  small: {
    "& input": {
      fontSize: 14,
    },
  },
  smallest: {
    "& input": {
      fontSize: 12,
    },
  },
  input: {
    fontSize: 16,
    width: "100%",
    outline: "none",
    textAlign: "center",
    background: "rgb(32,32,32)",
    color: theme.palette.info.contrastText,
    border: "none",
  },
  balanceContainer: {
    fontSize: 16,
    display: "flex",
    alignItems: "flex-end",
  },
  balanceButton: {
    borderRadius: 8,
  },
});

class BigCurrencyInput extends React.PureComponent<any> {
  ref: React.RefObject<any>;
  input: any;

  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
    this.input = null;
    this.state = props.store.getState();
  }

  componentDidMount() {
    const inputRef = this.props.inputRef;
    if (this.props.inputRef) {
      this.ref = inputRef;
    }

    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const {
      classes,
      className,
      onChange,
      value,
      balance,
      placeholder,
      store,
      direction,
    } = this.props;

    const val = value ? String(value) : "";
    const ref = this.ref;
    const change = onChange || (() => {});

    // const chars = val.replace(".", "").replace(` ${symbol}`, "");
    // let size = "large";
    // if (chars.length > 7 && chars.length <= 9) {
    //   size = "medium";
    // } else if (chars.length > 9 && chars.length <= 12) {
    //   size = "small";
    // } else if (chars.length > 12) {
    //   size = "smallest";
    // }

    return (
      // <div className={classNames(classes.container, classes[size])}>
      <div className={classNames(classes.container)}>
        <React.Fragment>
          <Grid container justify="flex-end">
            <Grid item xs={8}>
              <NumberFormat
                value={val}
                ref={ref}
                thousandSeparator={true}
                allowLeadingZeros={true}
                allowNegative={false}
                // suffix={" {" + Numeral(usdValue).format("$0,0.00") + "}"}
                onValueChange={change}
                getInputRef={(input: any) => {
                  this.input = input;
                }}
                className={classNames(classes.input, className)}
                placeholder={placeholder}
              />
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                justify="flex-end"
                className={classes.balanceContainer}
              >
                <Button
                  variant="outlined"
                  color={direction ? "secondary" : "primary"}
                  className={(classes.small, classes.balanceButton)}
                  onClick={() => {
                    store.set("convert.amount", balance);
                  }}
                >
                  <Translate text="Transfer.Max" />
                  &nbsp;<Hidden xsDown>{balance || "0.00"}</Hidden>
                </Button>
              </Grid>
              {/* <Grid
                container
                justify="flex-end"
                className={classNames(
                  usdValue ? classes.grayText : "",
                  classes.usd
                )}
              >
                ({Numeral(usdValue).format("$0,0.00")})
              </Grid> */}
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(withStore(BigCurrencyInput));
