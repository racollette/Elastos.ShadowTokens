import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, AMB_NATIVE_ERC_MIN_TX, AMB_NATIVE_ERC_FEE } from './config';
import ETH_ICON from "../../../assets/eth.png";

export const ETH_DEV = {
    0: {
        symbol: 'ETH',
        name: 'Ethereum',
        id: 'eth',
        transferType: 'mint',
        network: 'Kovan',
        networkID: 42,
        address: '',
        confirmations: ETH_CONFIRMATIONS,

    },
    1: {
        symbol: 'ETH',
        name: 'ETH on Elastos',
        id: 'elaeth',
        transferType: 'release',
        network: 'Elastos Testnet',
        networkID: 21,
        address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',
        confirmations: ELA_CONFIRMATIONS,

    },
    home: 0,
    foreign: 1,
    icon: ETH_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: AMB_NATIVE_ERC_MIN_TX,
    fee: AMB_NATIVE_ERC_FEE,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}