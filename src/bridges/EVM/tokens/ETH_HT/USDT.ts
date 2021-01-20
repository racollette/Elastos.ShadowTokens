import { ETH_CONFIRMATIONS, HT_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from '../config';
import USDT_ICON from "../../../../assets/usdt.png";

export const USDT_HT = {
    0: {
        symbol: 'USDT',
        name: 'Tether',
        id: 'usdt',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        confirmations: ETH_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    1: {
        symbol: 'ethUSDT',
        name: 'Tether on Heco (Huobi)',
        id: 'ethusdt',
        transferType: 'release',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '0x581edd7eab23896513360d7ee8dfe07a5cad2abd',
        confirmations: HT_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: USDT_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 6,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}