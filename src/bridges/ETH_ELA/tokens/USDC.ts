import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_FEE } from './config';
import USDC_ICON from "../../../assets/usdc.png";

export const USDC = {
    0: {
        symbol: 'USDC',
        name: 'USD Coin',
        id: 'usdc',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        confirmations: ETH_CONFIRMATIONS,
    },
    1: {
        symbol: 'ethUSDC',
        name: 'USD Coin on Elastos',
        id: 'ethusdc',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '', // generate on elastos
        confirmations: ELA_CONFIRMATIONS,
    },
    home: 0,
    foreign: 1,
    icon: USDC_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 6,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    fee: MULTI_AMB_ERC_ERC_FEE,
    priceTicker: 'usdc',
    priceFeed: 'https://api.coincap.io/v2/assets/usd-coin',
}