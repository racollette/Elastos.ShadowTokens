import { ETH_CONFIRMATIONS, HT_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from '../config';
import USDC_ICON from "../../../../assets/usdc.png";

export const USDC_HT = {
    0: {
        symbol: 'USDC',
        name: 'USD Coin',
        id: 'usdc',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        confirmations: ETH_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    1: {
        symbol: 'ethUSDC',
        name: 'USD Coin on Heco (Huobi)',
        id: 'ethusdc',
        transferType: 'release',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '0x480d68eafcb6f25f9586fb941c4522a98727835d',
        confirmations: HT_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: USDC_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 6,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'usdc',
    priceFeed: 'https://api.coincap.io/v2/assets/usd-coin',
}