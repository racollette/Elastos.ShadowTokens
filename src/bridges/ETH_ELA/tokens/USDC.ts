import ERC20_ABI from "../abis/ERC20_ABI.json";
import USDC_ICON from "../../../assets/usdc.png";

// Ethereum side
export const USDC = {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: USDC_ICON,
    sourceID: 'usdc',
    destID: 'ethusdc',
    transferType: 'mint',
    network: 'Ethereum',
    networkID: '42',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'usdc',
    priceFeed: 'https://api.coincap.io/v2/assets/usd-coin',
}

// Elastos side
export const ethUSDC = {
    symbol: 'ethUSDC',
    name: 'USD Coin on Elastos',
    icon: USDC_ICON,
    sourceID: 'ethusdc',
    destID: 'usdc',
    transferType: 'release',
    network: 'Elastos',
    networkID: '21',
    address: '', // generate on elastos
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'usdc',
    priceFeed: 'https://api.coincap.io/v2/assets/usd-coin',
}