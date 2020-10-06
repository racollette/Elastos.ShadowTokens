import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    typography: {
        fontFamily: [
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    palette: {
        type: "dark",
        primary: {
            light: "#8DFEFF",
            main: "#0d81cfff", // "#4e92ffff",
            dark: "#404040",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff0",
            main: "#c85367ff",
            dark: "#404040",
            contrastText: "#fff",
        },
        info: {
            light: "#9ca0b0",
            main: "#797986",
            dark: "#404040",
            contrastText: "rgba(255, 255, 255, 0.5)",
        },
        success: {
            light: "#32ce7cff",
            main: "#0aab6eff",
            dark: "#404040",
            contrastText: "#fff",
        },
        divider: "#606060",
    },
    overrides: {
        // MuiCssBaseline: {
        //     '@global': {
        //         '@font-face': [WorkSans],
        //     },
        // },
        MuiButton: {
            root: {
                textTransform: "none",
            }
        },
        MuiButtonBase: {
            root: {
                textTransform: "none",
                borderRadius: 4,
                "&.MuiButton-outlined": {
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingLeft: 9,
                    paddingRight: 9,
                    "&.Mui-disabled": {
                        // backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
                        border: "1px solid transparent",
                    },
                },
                "&.MuiButton-sizeLarge": {
                    minHeight: 54,
                    fontSize: 18,
                },
                "&.MuiButton-contained": {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                fontSize: 14,
                "& .MuiInputAdornment-marginDense span": {
                    fontSize: 12,
                },
                "& fieldset": {
                    borderRadius: 0,
                },
            },
            notchedOutline: {
                // borderColor: 'rgba(255, 255, 255, 0.23) !important',
                borderWidth: "1px !important",
            },
            inputMarginDense: {
                fontSize: 12,
                paddingTop: 11.5,
                paddingBottom: 11.5,
            },
        },
        // MuiInputBase: {
        //     input: {
        //         textAlign: "center"
        //     }
        // },
        //@ts-ignore
        MuiToggleButtonGroup: {
            root: {
                backgroundColor: "#fff",
                "& span": {
                    fontSize: 14,
                },
                "& button": {
                    minHeight: 54,
                },
                borderRadius: 0,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
            },
            grouped: {
                "&:not(:first-child)": {
                    // borderLeft: '1px solid rgba(255, 255, 255, 0.23)'
                },
            },
        },
        MuiMenu: {
            paper: {
                boxShadow: "0px 1px 3px rgba(0, 27, 58, 0.1)",
                border: "1px solid #DCE0E3",
                minWidth: 190,
                backgroundColor: "rgb(32,32,32)",
            },
        },
        // .MuiToggleButtonGroup-grouped:not(:first-child)
        MuiToggleButton: {
            root: {
                backgroundColor: "#eeeeee2e !important",
                "& img": {
                    opacity: 0.75,
                },
                "&.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    color: "#000",
                    fontWeight: "500",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    },
                    "& img": {
                        opacity: 1,
                    },
                },
                borderRadius: 0,
                "&:hover": {
                    backgroundColor: "#eeeeee2e !important",
                },
                "& .MuiToggleButton-label": {
                    fontSize: 12,
                },
            },
        },
    },
});
