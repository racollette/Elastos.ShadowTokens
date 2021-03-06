import { HT_CONFIRMATIONS, ELA_CONFIRMATIONS, HT_AMB_NATIVE_ERC_MIN_TX, HT_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from '../config';
import HT_ICON from "../../../../assets/ht.png";

export const HT_DEV_ELA = {
    0: {
        symbol: 'HT',
        name: 'Huobi Token',
        id: 'ht',
        transferType: 'mint',
        network: 'Heco (Huobi) Testnet',
        networkID: 256,
        address: '',
        confirmations: HT_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_HOME,
    },
    1: {
        symbol: 'HT',
        name: 'HT on Elastos',
        id: 'elaht',
        transferType: 'release',
        network: 'Elastos Testnet',
        networkID: 21,
        address: '0x899ffe3e4d342c12e41e9547e3f6499a3477896a',
        confirmations: ELA_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: HT_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: HT_AMB_NATIVE_ERC_MIN_TX,
    maxTx: HT_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'ht',
    priceFeed: 'https://api.coincap.io/v2/assets/huobi-token',
}