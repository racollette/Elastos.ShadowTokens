import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import theme from "../theme/theme";
import {
    BRIDGE_SYMBOL_MAP,
    BRIDGE_NAME_MAP,
    BRIDGE_ICON_MAP,
} from "../utils/bridgeUtils";

const styles: Styles<any, any> = () => ({
    cradleContainer: {
        height: 130,
        paddingBottom: theme.spacing(4),
        // paddingTop: theme.spacing(1),
        // paddingLeft: theme.spacing(1),
        // paddingRight: theme.spacing(1),
        // "& circle": { stroke: "#606060", strokeWidth: "4" },
        // "& circle:nth-of-type(1)": { fill: "#c85367ff" },
        // "& circle:nth-of-type(2)": { fill: "#ffff" },
        // "& circle:nth-of-type(3)": { fill: "#797986" },
        // "& circle:nth-of-type(4)": { fill: "#0d81cfff" },
    },
    orangeStart: {
        stopColor: "#d56066ff",
        stopOpacity: 1,
    },
    orangeStop: {
        stopColor: "#8c176eff",
        stopOpacity: 1,
    },
    blueStart: {
        stopColor: "#18b5deff",
        stopOpacity: 1,
    },
    blueStop: {
        stopColor: "#0041bdff",
        stopOpacity: 1,
    },
    grayStart: {
        stopColor: "#bfbfbf",
        stopOpacity: 1,
    },
    grayStop: {
        stopColor: "#23282a",
        stopOpacity: 1,
    }
});

class CradleAnimation extends React.PureComponent<any> {
    render() {
        const {
            classes,
        } = this.props;

        return (
            <div className={(classes.cradleContainer)}>
                <svg width="340" height="130" className={classes.clackers}>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="15%">
                            <stop offset="0%" className={classes.blueStop} />
                            <stop offset="100%" className={classes.blueStart} />
                        </linearGradient>

                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="15%">
                            <stop offset="0%" className={classes.blueStart} />
                            <stop offset="100" className={classes.grayStop} />
                        </linearGradient>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="15%">
                            <stop offset="0%" className={classes.grayStop} />
                            <stop offset="100%" className={classes.orangeStart} />
                        </linearGradient>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="15%">
                            <stop offset="0%" className={classes.orangeStart} />
                            <stop offset="100%" className={classes.orangeStop} />
                        </linearGradient>
                    </defs>
                    {/* <!-- Left arc path --> */}
                    <svg>
                        <path id="arc-left-up" fill="none" d="M 90 90 A 90 90 0 0 1 0 0" />
                    </svg>
                    {/* <!-- Right arc path --> */}
                    <svg>
                        <path id="arc-right-up" fill="none" d="M 100 90 A 90 90 0 0 0 190 0" />
                    </svg>

                    <text x="170" y="50" fill="#ffffff" font-size="17"
                        text-anchor="middle">
                        {/* One token in, one token out. */}
                        Conservation of token
  </text>
                    <circle cx="20" cy="20" r="20" fill="url(#grad1)" filter="url(#f1)">
                        <animateMotion dur="1.5s" repeatCount="indefinite"
                            calcMode="linear"
                            keyPoints="0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0"
                            keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0">
                            <mpath href="#arc-left-up" />
                        </animateMotion>
                    </circle>
                    <circle cx="150" cy="110" r="20" fill="url(#grad2)" filter="url(#f1)" />
                    <circle cx="190" cy="110" r="20" fill="url(#grad3)" filter="url(#f1)" />
                    <circle cx="130" cy="20" r="20" fill="url(#grad4)" filter="url(#f1)">
                        <animateMotion dur="1.5s" repeatCount="indefinite"
                            calcMode="linear"
                            keyPoints="0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0"
                            keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0">
                            <mpath href="#arc-right-up" />
                        </animateMotion>
                    </circle>
                </svg>
            </div>
        );
    }
}

export default withStyles(styles)(CradleAnimation);
