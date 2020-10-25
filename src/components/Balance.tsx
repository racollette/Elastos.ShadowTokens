import React from "react";
import theme from "../theme/theme";
import { Styles, withStyles } from "@material-ui/styles";
import classNames from "classnames";
import Hidden from "@material-ui/core/Hidden";
import { Translate } from "./Translate";

const styles: Styles<any, any> = () => ({
  button: {
    marginRight: theme.spacing(0.75),
    fontSize: 14,
    borderRadius: 8,
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.75),
      paddingRight: theme.spacing(0.75),
    },
  },
  primary: {
    color: theme.palette.primary.main,
    border: "1px solid rgba(13, 129, 207, 0.5)",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid rgb(13, 129, 207, 1)",
      backgroundColor: "rgba(13, 129, 207, 0.08)",
    },
  },
  secondary: {
    color: "rgb(200, 83, 103, 1)",
    border: "1px solid rgba(200, 83, 103, 0.5)",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid rgb(200, 83, 103, 1)",
      backgroundColor: "rgba(200, 83, 103, 0.08)",
    },
  },
});

interface Props {
  className?: string;
  classes: { [key in string]: string };
  direction: number;
  balance: string;
  store: any;
}

const Balance: React.FC<Props> = function (props) {
  const { classes, direction, balance, store } = props;

  return (
    <React.Fragment>
      <div
        className={classNames(
          direction ? classes.secondary : classes.primary,
          classes.button
        )}
        onClick={() => {
          if (balance) {
            store.set("convert.amount", balance);
          } else {
            store.set("convert.amount", 0);
          }
        }}
      >
        <Translate text="Transfer.Max" />
        <Hidden xsDown>&nbsp;{balance || "0.00"}</Hidden>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Balance);
