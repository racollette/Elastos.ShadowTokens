import { HT_CONFIRMATIONS, ELA_CONFIRMATIONS, ELA_HT_AMB_NATIVE_ERC_MIN_TX, ELA_HT_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_FOREIGN, AMB_NATIVE_ERC_FEE_HOME } from '../config';
import HT_ICON from "../../../../assets/ht.png";

export const HT_ELA = {
    0: {
        symbol: 'HT',
        name: 'Huobi Token',
        id: 'ht',
        transferType: 'mint',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '',
        confirmations: HT_CONFIRMATIONS,
        fee: 0.1,
    },
    1: {
        symbol: 'HT',
        name: 'HT on Elastos',
        id: 'elaht',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '0xeceefC50f9aAcF0795586Ed90a8b9E24f55Ce3F3',
        confirmations: ELA_CONFIRMATIONS,
        fee: 0.1,
    },
    home: 0,
    foreign: 1,
    icon: HT_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: ELA_HT_AMB_NATIVE_ERC_MIN_TX,
    maxTx: ELA_HT_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'ht',
    priceFeed: 'https://api.coincap.io/v2/assets/huobi-token',
}