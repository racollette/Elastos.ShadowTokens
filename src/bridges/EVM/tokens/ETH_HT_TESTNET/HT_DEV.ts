import { HT_CONFIRMATIONS, ETH_CONFIRMATIONS, HT_AMB_NATIVE_ERC_MIN_TX, HT_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from '../config';
import HT_ICON from "../../../../assets/ht.png";

export const HT_DEV_ETH = {
    0: {
        symbol: 'HT',
        name: 'HT on Ethereum',
        id: 'ethht',
        transferType: 'release',
        network: 'Ropsten',
        networkID: 3,
        address: '0x3e465A513900f88775A264F6d67341c920654245',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'HT',
        name: 'Huobi Token',
        id: 'ht',
        transferType: 'mint',
        network: 'HuobiChain Testnet',
        networkID: 256,
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