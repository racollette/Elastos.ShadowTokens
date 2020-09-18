import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import theme from "../theme/theme";

const styles = () => ({
    link: {
        fontSize: 16,
        textDecoration: "none",
        cursor: "pointer",
    },
    lunarLink: {
        color: theme.palette.primary.main,
        "&:hover": {
            color: "#8DFEFF",
        },
    },
    solarLink: {
        color: "#bd660f",
        "&:hover": {
            color: "#ff0",
        },
    },
});

interface Props {
    className?: string;
    classes: { [key in string]: string };
    onClick: any;
    direction?: any;
}

const ActionLink: React.FC<Props> = function(props) {
    const { children, classes, direction } = props;

    let color = classes.lunarLink;
    if (direction === 1) {
        color = classes.solarLink;
    }

    return (
        <a className={classNames(classes.link, color)} {...props}>
            {children}
        </a>
    );
};

export default withStyles(styles)(ActionLink);
