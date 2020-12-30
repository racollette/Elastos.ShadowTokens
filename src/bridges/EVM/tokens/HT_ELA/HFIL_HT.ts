import { ELA_CONFIRMATIONS, HT_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from '../config';
import HFIL_ICON from "../../../../assets/hfil.png";

export const HFIL_HT = {
    0: {
        symbol: 'HFIL',
        name: 'Heco-Peg HFIL Token',
        id: 'hfil',
        transferType: 'mint',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '0xae3a768f9ab104c69a7cd6041fe16ffa235d1810', 
        confirmations: HT_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    1: {
        symbol: 'htHFIL',
        name: 'Heco-Peg HFIL Token on Elastos',
        id: 'hthfil',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '', // contract address?
        confirmations: ELA_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: HFIL_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'fil',
    priceFeed: 'https://api.coincap.io/v2/assets/filecoin',
}