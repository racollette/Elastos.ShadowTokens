import ERC20_ABI from "../abis/ERC20_ABI.json";
import USDT_ICON from "../../../assets/usdt.png";

// Ethereum side
export const USDT = {
    symbol: 'USDT',
    name: 'Tether',
    icon: USDT_ICON,
    sourceID: 'usdt',
    destID: 'ethusdt',
    transferType: 'mint',
    network: 'Ethereum',
    networkID: '42',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}

// Elastos side
export const ethUSDT = {
    symbol: 'ethUSDT',
    name: 'Tether on Elastos',
    icon: USDT_ICON,
    sourceID: 'ethusdt',
    destID: 'usdt',
    transferType: 'release',
    network: 'Elastos',
    networkID: '21',
    address: '', // generate on elastos
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}