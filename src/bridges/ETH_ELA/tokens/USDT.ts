import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_FEE } from './config';
import USDT_ICON from "../../../assets/usdt.png";

export const USDT = {
    0: {
        symbol: 'USDT',
        name: 'Tether',
        id: 'usdt',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 42,
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        confirmations: ETH_CONFIRMATIONS,
    },
    1: {
        symbol: 'ethUSDT',
        name: 'Tether on Elastos',
        id: 'ethusdt',
        transferType: 'release',
        network: 'Elastos',
        networkID: 21,
        address: '', // generate on elastos
        confirmations: ELA_CONFIRMATIONS,
    },
    home: 0,
    foreign: 1,
    icon: USDT_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    fee: MULTI_AMB_ERC_ERC_FEE,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}