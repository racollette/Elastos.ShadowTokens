import ERC677_ABI from "../abis/ERC677_ABI.json";
import ELA_ICON from "../../../assets/ela.png"

// Ethereum side
export const ethELA = {
    symbol: 'ELA',
    name: 'Elastos on Ethereum',
    icon: ELA_ICON,
    sourceID: 'ethela',
    destID: 'ela',
    transferType: 'release',
    network: 'Ethereum',
    networkID: '21',
    address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',
    bridgeMode: 'native_amb_erc',
    abi: ERC677_ABI,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}

// Elastos side
export const ELA = {
    symbol: 'ELA',
    name: 'Elastos',
    icon: ELA_ICON,
    sourceID: 'ela',
    destID: 'ethela',
    transferType: 'mint',
    network: 'Elastos Testnet',
    networkID: '42',
    address: null,
    bridgeMode: 'native_amb_erc',
    abi: null,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}

