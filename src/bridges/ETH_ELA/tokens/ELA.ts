import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ELA_AMB_NATIVE_ERC_MIN_TX, AMB_NATIVE_ERC_FEE } from './config';
import ELA_ICON from "../../../assets/ela.png"

export const ELA = {
    0: {
        symbol: 'ELA',
        name: 'ELA on Ethereum',
        id: 'ethela',
        transferType: 'release',
        network: 'Ethereum',
        networkID: 1,
        address: '0xe6fd75ff38adca4b97fbcd938c86b98772431867',
        confirmations: ETH_CONFIRMATIONS,
    },
    1: {
        symbol: 'ELA',
        name: 'Elastos',
        id: 'ela',
        transferType: 'mint',
        network: 'Elastos',
        networkID: 20,
        address: '',
        confirmations: ELA_CONFIRMATIONS,

    },
    home: 1,
    foreign: 0,
    icon: ELA_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: ELA_AMB_NATIVE_ERC_MIN_TX,
    fee: AMB_NATIVE_ERC_FEE,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}