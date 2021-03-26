import { BNB_CONFIRMATIONS, HT_CONFIRMATIONS, BNB_HT_AMB_NATIVE_ERC_MIN_TX, BNB_HT_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_FOREIGN, AMB_NATIVE_ERC_FEE_HOME } from '../config';
import BNB_ICON from "../../../../assets/bnb.png"

export const BNB_HT = {
    0: {
        symbol: 'BNB',
        name: 'Binance Coin',
        id: 'bnb',
        transferType: 'mint',
        network: 'BSC (Binance)',
        networkID: 56,
        address: '',
        confirmations: BNB_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'BNB',
        name: 'BNB on Heco (Huobi)',
        id: 'htbnb',
        transferType: 'release',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '0xE4645Eb46F1A512FAf03a6c45299CFf14cAc4FfD',
        confirmations: HT_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: BNB_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: BNB_HT_AMB_NATIVE_ERC_MIN_TX,
    maxTx: BNB_HT_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'bnb',
    priceFeed: 'https://api.coincap.io/v2/assets/binance-coin',
}