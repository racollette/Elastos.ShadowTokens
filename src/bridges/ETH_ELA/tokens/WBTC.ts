import ERC20_ABI from "../abis/ERC20_ABI.json";
import WBTC_ICON from "../../../assets/wbtc.png";

// Ethereum side
export const WBTC = {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    icon: WBTC_ICON,
    sourceID: 'wbtc',
    destID: 'ethwbtc',
    transferType: 'mint',
    network: 'Ethereum',
    networkID: '42',
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'bitcoin',
    priceFeed: 'https://api.coincap.io/v2/assets/bitcoin',
}

// Elastos side
export const ethWBTC = {
    symbol: 'ethWBTC',
    name: 'Wrapped Bitcoin on Elastos',
    icon: WBTC_ICON,
    sourceID: 'ethwbtc',
    destID: 'wbtc',
    transferType: 'release',
    network: 'Elastos',
    networkID: '21',
    address: '', // generate on elastos
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'bitcoin',
    priceFeed: 'https://api.coincap.io/v2/assets/bitcoin',
}