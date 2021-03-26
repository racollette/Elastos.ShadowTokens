import { BNB_CONFIRMATIONS, HT_CONFIRMATIONS, BNB_HT_AMB_NATIVE_ERC_MIN_TX, BNB_HT_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_FOREIGN, AMB_NATIVE_ERC_FEE_HOME } from '../config';
import FILDA_ICON from "../../../../assets/filda.png"

export const FILDA_BNB = {
    0: {
        symbol: 'htFILDA',
        name: 'FILDA on BSC (Binance)',
        id: 'htfilda',
        transferType: 'release',
        network: 'BSC (Binance)',
        networkID: 56,
        address: '0x8b45796da30a87d8459e1b16fbf106b664ee01e1',
        confirmations: BNB_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'FILDA',
        name: 'FILDA',
        id: 'filda',
        transferType: 'mint',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '0xe36ffd17b2661eb57144ceaef942d95295e637f0',
        confirmations: HT_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    home: 1,
    foreign: 0,
    icon: FILDA_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: BNB_HT_AMB_NATIVE_ERC_MIN_TX,
    maxTx: BNB_HT_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'filda',
    priceFeed: '',
}