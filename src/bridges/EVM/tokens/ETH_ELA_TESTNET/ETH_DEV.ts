import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ETH_AMB_NATIVE_ERC_MIN_TX, ETH_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from '../config';
import ETH_ICON from "../../../../assets/eth.png";

export const ETH_DEV = {
    0: {
        symbol: 'ETH',
        name: 'Ethereum',
        id: 'eth',
        transferType: 'mint',
        network: 'Ropsten',
        networkID: 3,
        address: '',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_HOME,

    },
    1: {
        symbol: 'ETH',
        name: 'ETH on Elastos',
        id: 'elaeth',
        transferType: 'release',
        network: 'Elastos Testnet',
        networkID: 21,
        address: '0x23F1528E61d0AF04fAa7cff8C7ce9046D9130789',
        confirmations: ELA_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,

    },
    home: 0,
    foreign: 1,
    icon: ETH_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: ETH_AMB_NATIVE_ERC_MIN_TX,
    maxTx: ETH_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}