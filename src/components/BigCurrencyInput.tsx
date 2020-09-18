import React from "react";
import { withStore } from "@spyna/react-store";
import NumberFormat from "react-number-format";
import classNames from "classnames";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import ActionLink from "../components/ActionLink";
import Typography from "@material-ui/core/Typography";

const styles: Styles<any, any> = () => ({
  container: {
    width: "100%",
    "& input": {
      fontFamily: "inherit",
      color: "#fff",
      fontSize: 18,
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
    fontSize: 18,
    width: "100%",
    outline: "none",
    textAlign: "center",
    background: "rgb(20,20,20)",
    color: "#fff",
    border: "none",
  },
  balanceContainer: {
    fontSize: 18,
    display: "flex",
    alignItems: "flex-end",
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
      symbol,
      value,
      balance,
      placeholder,
      store,
      direction,
    } = this.props;

    const val = value ? String(value) : "";
    const ref = this.ref;
    const change = onChange || (() => {});

    const chars = val.replace(".", "").replace(` ${symbol}`, "");

    let size = "large";
    if (chars.length > 7 && chars.length <= 9) {
      size = "medium";
    } else if (chars.length > 9 && chars.length <= 12) {
      size = "small";
    } else if (chars.length > 12) {
      size = "smallest";
    }

    return (
      // <div className={classNames(classes.container, classes[size])}>
      <div className={classNames(classes.container, classes[size])}>
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
                <Typography>
                  <ActionLink
                    direction={direction}
                    onClick={() => {
                      store.set("convert.amount", balance);
                    }}
                  >
                    Max: {balance || "0.0000"}
                  </ActionLink>
                </Typography>
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
