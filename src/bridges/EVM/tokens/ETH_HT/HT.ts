import { HT_CONFIRMATIONS, ETH_CONFIRMATIONS, HT_AMB_NATIVE_ERC_MIN_TX, HT_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_FOREIGN, AMB_NATIVE_ERC_FEE_HOME } from '../config';
import HT_ICON from "../../../../assets/ht.png";

export const HT_ETH = {
    0: {
        symbol: 'WHT',
        name: 'HT on Ethereum',
        id: 'ethht',
        transferType: 'release',
        network: 'Ethereum',
        networkID: 1,
        address: '0x6C597FE480714296ff3cad5aDc351b9E621b93B4',
        confirmations: ETH_CONFIRMATIONS,
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
        fee: AMB_NATIVE_ERC_FEE_HOME,
    },
    home: 1,
    foreign: 0,
    icon: HT_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: HT_AMB_NATIVE_ERC_MIN_TX,
    maxTx: HT_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'ht',
    priceFeed: 'https://api.coincap.io/v2/assets/huobi-token',
}