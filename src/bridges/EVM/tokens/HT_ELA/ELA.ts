import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ELA_AMB_NATIVE_ERC_MIN_TX, ELA_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from '../config';
import ELA_ICON from "../../../../assets/ela.png"

export const ELA_HT = {
    0: {
        symbol: 'ELA',
        name: 'ELA on HuobiChain',
        id: 'htela',
        transferType: 'release',
        network: 'HuobiChain',
        networkID: 128,
        address: '0xa1ecFc2beC06E4b43dDd423b94Fef84d0dBc8F5c',
        confirmations: HT_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
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
        fee: 0.1,
    },
    home: 1,
    foreign: 0,
    icon: ELA_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: ELA_AMB_NATIVE_ERC_MIN_TX,
    maxTx: ELA_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}