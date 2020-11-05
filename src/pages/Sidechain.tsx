import React from "react";
import { withStyles } from "@material-ui/styles";
import { withStore } from "@spyna/react-store";
import theme from "../theme/theme";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  container: {
    background: "rgb(32,32,32)",
    borderRadius: "30px",
    width: 500,
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
});

interface Props {
  store: any;
  classes: { [key in string]: string };
}

class Sidechain extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid className={classes.container}>
          Hey deposit funds to Elastos sidechain
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStore(withStyles(styles)(Sidechain));
