import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ETH_AMB_NATIVE_ERC_MIN_TX, AMB_NATIVE_ERC_FEE } from './config';
import ETH_ICON from "../../../assets/eth.png";

export const ETH = {
    0: {
        symbol: 'ETH',
        name: 'Ethereum',
        id: 'eth',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '',
        confirmations: ETH_CONFIRMATIONS,

    },
    1: {
        symbol: 'ETH',
        name: 'ETH on Elastos',
        id: 'elaeth',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '0x802c3e839e4fdb10af583e3e759239ec7703501e',
        confirmations: ELA_CONFIRMATIONS,

    },
    home: 0,
    foreign: 1,
    icon: ETH_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: ETH_AMB_NATIVE_ERC_MIN_TX,
    fee: AMB_NATIVE_ERC_FEE,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}