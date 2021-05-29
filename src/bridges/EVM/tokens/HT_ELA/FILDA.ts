import { ELA_CONFIRMATIONS, HT_CONFIRMATIONS, ELA_HT_AMB_NATIVE_ERC_MIN_TX, ELA_HT_AMB_NATIVE_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_FOREIGN, MULTI_AMB_ERC_ERC_FEE_HOME } from '../config';
import FILDA_ICON from "../../../../assets/filda.png"

export const FILDA_ELA = {
    1: {
        symbol: 'htFILDA',
        name: 'FILDA on Heco on Elastos',
        id: 'htfilda',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '0xb9ae03e3320235d3a8ae537f87ff8529b445b590',
        confirmations: ELA_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    0: {
        symbol: 'FILDA',
        name: 'FILDA on Heco',
        id: 'filda',
        transferType: 'mint',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '0xe36ffd17b2661eb57144ceaef942d95295e637f0',
        confirmations: HT_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    home: 0,
    foreign: 1,
    icon: FILDA_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: ELA_HT_AMB_NATIVE_ERC_MIN_TX,
    maxTx: ELA_HT_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'filda',
    priceFeed: '',
}