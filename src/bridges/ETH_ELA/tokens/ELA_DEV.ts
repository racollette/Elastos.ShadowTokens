import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, AMB_NATIVE_ERC_MIN_TX, AMB_NATIVE_ERC_FEE } from './config';
import ELA_ICON from "../../../assets/ela.png"

export const ELA_DEV = {
    0: {
        symbol: 'ELA',
        name: 'Elastos on Ethereum',
        id: 'ethela',
        transferType: 'release',
        network: 'Kovan',
        networkID: 42,
        address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',

        confirmations: ETH_CONFIRMATIONS,
    },
    1: {
        symbol: 'ELA',
        name: 'Elastos',
        id: 'ela',
        transferType: 'mint',
        network: 'Elastos Testnet',
        networkID: 21,
        address: '',
        confirmations: ELA_CONFIRMATIONS,

    },
    home: 1,
    foreign: 0,
    icon: ELA_ICON,
    bridgeMode: 'native_amb_erc',
    decimals: 18,
    minTx: AMB_NATIVE_ERC_MIN_TX,
    fee: AMB_NATIVE_ERC_FEE,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}