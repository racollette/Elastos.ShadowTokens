import ERC677_ABI from "../abis/ERC677_ABI.json";
import ETH_ICON from "../../../assets/eth.png";

// Ethereum side
export const ETH = {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: ETH_ICON,
    sourceID: 'eth',
    destID: 'elaeth',
    transferType: 'mint',
    network: 'Kovan',
    networkID: '42',
    address: null,
    bridgeMode: 'native_amb_erc',
    abi: null,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}

// Elastos side
export const elaETH = {
    symbol: 'ETH',
    name: 'Ethereum on Elastos',
    icon: ETH_ICON,
    sourceID: 'elaeth',
    destID: 'eth',
    transferType: 'release',
    network: 'Elastos Testnet',
    networkID: '21',
    address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',
    bridgeMode: 'native_amb_erc',
    abi: ERC677_ABI,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}