import { BNB_CONFIRMATIONS, HT_CONFIRMATIONS, BNB_HT_AMB_NATIVE_ERC_MIN_TX, BNB_HT_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_FOREIGN, AMB_NATIVE_ERC_FEE_HOME } from '../config';
import HT_ICON from "../../../../assets/ht.png"

export const HT_BNB = {
    0: {
        symbol: 'HT',
        name: 'HT on Binance',
        id: 'bnbht',
        transferType: 'release',
        network: 'Binance',
        networkID: 56,
        address: '0xad93dB5adEc663FC1D683A7982c621e217017cB2',
        confirmations: BNB_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'HT',
        name: 'Huobi Token',
        id: 'ht',
        transferType: 'mint',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '',
        confirmations: HT_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    home: 1,
    foreign: 0,
    icon: HT_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: BNB_HT_AMB_NATIVE_ERC_MIN_TX,
    maxTx: BNB_HT_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'ht',
    priceFeed: 'https://api.coincap.io/v2/assets/huobi-token',
}