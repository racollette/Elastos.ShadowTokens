import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import theme from "../theme/theme";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Github from "../assets/github.svg";
import Telegram from "../assets/telegram.svg";
import Twitter from "../assets/twitter.svg";

const styles: Styles<typeof theme, any> = (theme) => ({
  footerContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    fontSize: 10,
    "& a": {
      color: theme.palette.info.contrastText,
      marginRight: theme.spacing(2),
      textDecoration: "none",
      "&:hover": {
        opacity: 0.75,
      },
    },
  },
  footerLogo: {
    height: 12,
    width: "auto",
    marginLeft: theme.spacing(0.5),
  },
});

class FooterContainer extends React.Component<any> {
  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} className={classes.footerContainer}>
        <Container>
          {/* <Grid container alignItems="flex-end"> */}

          <Grid container alignItems="center" justify="space-between">
            <Typography className={classes.footerLinks} variant="caption">
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={"https://elabank.net/"}
              >
                Home
              </a>{" "}
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={"https://elabank.net/"}
              >
                About
              </a>{" "}
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={"https://elabank.net/"}
              >
                FAQs
              </a>{" "}
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={"https://elabank.net/"}
              >
                Docs
              </a>{" "}
            </Typography>
            <Typography className={classes.footerLinks} variant="caption">
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={"https://twitter.com/shadowtokens"}
              >
                <img
                  alt="Twitter"
                  className={classes.footerLogo}
                  src={Twitter}
                />
              </a>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={"https://github.com/elabank"}
              >
                <img alt="Github" className={classes.footerLogo} src={Github} />
              </a>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={"https://t.me/elabank"}
              >
                <img
                  alt="Telegram"
                  className={classes.footerLogo}
                  src={Telegram}
                />
              </a>
            </Typography>
          </Grid>
          {/* </Grid> */}
        </Container>
      </Grid>
    );
  }
}

export default withStyles(styles)(withStore(FooterContainer));
