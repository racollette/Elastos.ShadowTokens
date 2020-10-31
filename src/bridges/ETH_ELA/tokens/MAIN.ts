import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_FEE } from './config';
import MAIN_ICON from "../../../assets/main.png";

export const MAIN = {
    0: {
        symbol: 'MAIN',
        name: 'Main',
        id: 'main',
        transferType: 'mint',
        network: 'Kovan',
        networkID: 42,
        address: '0x41c16473b12211892c813f52815f700440471aa0',
        confirmations: ETH_CONFIRMATIONS,
    },
    1: {
        symbol: 'ethMAIN',
        name: 'Main on Elastos',
        id: 'ethmain',
        transferType: 'release',
        network: 'Elastos Testnet',
        networkID: 21,
        address: '0x37f557939c257b9cdf006f0cb1987814a291f7b4',
        confirmations: ELA_CONFIRMATIONS,
    },
    home: 0,
    foreign: 1,
    icon: MAIN_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    fee: MULTI_AMB_ERC_ERC_FEE,
    priceTicker: 'main',
    priceFeed: '',
}