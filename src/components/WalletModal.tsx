import React from 'react'
import { withStore } from '@spyna/react-store'
import { Styles, withStyles } from '@material-ui/styles'
import { initLocalWeb3 } from '../utils/walletUtils'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { WALLET_ICON_MAP } from '../utils/walletUtils'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { grey } from '@material-ui/core/colors'

import theme from '../theme/theme'

const styles: Styles<typeof theme, any> = theme => ({
  container: {
    textAlign: 'center',
    background: 'rgb(32,32,32)',

    borderRadius: '40px',
    // border: "1px solid #ff8000",
    // boxShadow:
    //   "#FFF 0 -2px 3px, #ff0 0 -1px 10px, #ff8000 0 -10px 20px, red 0 -9px 20px, 5px 5px 10px 5px rgba(0,0,0,0)",
    width: 500,
    // margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      maxWidth: '85%'
    },
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  headerText: {
    textAlign: 'center',
    position: 'relative',
    marginBottom: theme.spacing(2)
  },
  navTitle: {
    color: '#fff',
    fontSize: '12'
  },
  back: {
    position: 'absolute',
    top: 4,
    right: 6,
    height: 'auto',
    width: 24,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75
    }
  },
  metamask: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    '& div': {
      background: 'rgb(255,255,255,0.1)',
      borderRadius: '10px',
      border: '1px solid transparent',
      width: 110,
      height: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      // opacity: 0.6,
      transition: 'all 0.2s ease-in-out',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      padding: theme.spacing(2),
      boxShadow:
        '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
      '&:hover': {
        // opacity: 0.8
        boxShadow:
          '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)'
      },
      '&.selected': {
        opacity: 1,
        borderColor: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[0]
      }
    },
    '& img': {
      height: 60,
      width: 'auto'
    }
  },
  walletLabel: {
    paddingTop: theme.spacing(1),
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 12.5,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 11
    }
  },
  selectedWallet: {
    opacity: '1 !important'
  },
  message: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  actionButtonContainer: {
    marginTop: theme.spacing(3),

    '& button': {
      '&.Mui-disabled': {},
      margin: '0px auto',
      fontSize: 12,
      minWidth: 175,
      padding: theme.spacing(1)
    }
  },
  actionButton: {
    width: '100%',
    borderRadius: '16px'
  },
  error: {
    marginTop: theme.spacing(2),
    color: '#FF4545'
  },
  info: {
    marginTop: theme.spacing(2)
  },
  info2: {
    fontWeight: 'bold',
    color: '#3F3F48'
  },
  mobileMessage: {
    display: 'none'
  }
})

class WalletModal extends React.Component<any> {
  goBack () {
    const { store } = this.props
    store.set('showGatewayModal', false)
    store.set('gatewayModalTx', null)
  }

  onClose () {
    const { store } = this.props
    store.set('showWalletModal', false)
  }

  render () {
    const { classes, store } = this.props

    // const walletConnecting = store.get("walletConnecting");
    // const requesting = store.get("spaceRequesting");

    // const error = store.get("spaceError");
    // const box = store.get("box");
    const walletType = store.get('selectedWalletType')
    const showWalletModal = store.get('showWalletModal')

    let text = 'Connect to ' + walletType
    // if (requesting) {
    //   if (!box) {
    //     text = "Connecting to 3box";
    //   } else {
    //     text = "Loading data";
    //   }
    // }

    return (
      <Modal
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"
        //   className={classes.modal}
        open={showWalletModal}
        onClose={this.onClose.bind(this)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={true}>
          <div className={classes.container}>
            <div className={classes.headerText}>
              <Typography variant='overline' className={classes.navTitle}>
                Select a wallet provider
              </Typography>
              <HighlightOffIcon
                style={{ color: grey[500] }}
                className={classes.back}
                onClick={() => {
                  store.set('showWalletModal', false)
                }}
              />
            </div>
            <Grid className={classes.metamask} container justify='center'>
              <Grid
                container
                className={walletType === 'MetaMask' ? 'selected' : ''}
                onClick={() => store.set('selectedWalletType', 'MetaMask')}
              >
                <img src={WALLET_ICON_MAP['MetaMask']} alt='MetaMask' />
                <Typography className={classes.walletLabel}>
                  Metamask
                </Typography>
              </Grid>

              {/* <div
                        className={walletType === "mew-connect" ? "selected" : ""}
                        onClick={() => store.set("selectedWalletType", "mew-connect")}
                    >
                        <img src={Mew} alt="Mew" />
                    </div> */}
              <Grid
                container
                className={walletType === 'Elaphant' ? 'selected' : ''}
                onClick={() => store.set('selectedWalletType', 'Elaphant')}
              >
                <img src={WALLET_ICON_MAP['Elaphant']} alt='Elaphant' />
                <Typography className={classes.walletLabel}>
                  Elaphant
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justify='flex-start'
              direction='column'
              alignItems='center'
              className={classes.actionButtonContainer}
            >
              {/* <Grid item xs={12}> */}
              <Button
                onClick={() => {
                  initLocalWeb3(walletType)
                  store.set('showWalletModal', false)
                }}
                // disabled={walletConnecting || requesting}
                className={classes.actionButton}
                size='large'
                color='secondary'
                disableRipple
                variant='contained'
                fullWidth
              >
                {/* {requesting && (
                  <div className={classes.spinner}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      className={classes.spinnerTop}
                      size={18}
                      thickness={4}
                    />
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      className={classes.spinnerBottom}
                      size={18}
                      thickness={4}
                    />
                  </div>
                )} */}
                {text}
              </Button>
              {/* </Grid> */}

              {/* {!requesting && error && (
                <Typography variant="caption" className={classes.error}>
                  Connection failed.
                </Typography>
              )} */}
              {/* {requesting && (
                <React.Fragment>
                  <Typography variant="caption" className={classes.info}>
                    Connecting to decentralized storage, this may take a minute.
                  </Typography>
                  <Typography variant="caption" className={classes.info2}>
                    Please approve any 3box messages that appear in your wallet.
                  </Typography>
                </React.Fragment>
              )} */}
            </Grid>
          </div>
        </Fade>
      </Modal>
    )
  }
}

export default withStyles(styles)(withStore(WalletModal))
