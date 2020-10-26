import ERC677_ABI from "../abis/ERC677_ABI.json";

export const ETH = {
    id: 'ETH',
    name: 'Ethereum',
    network: '42',
    address: null,
    bridgeMode: 'native_amb_erc',
    destAsset: "elaeth",
    abi: '',
    confirmations: 8,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}

export const elaETH = {
    id: 'elaETH',
    name: 'ETH on Elastos',
    network: '21',
    address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',
    bridgeMode: 'native_amb_erc',
    destAsset: "eth",
    abi: ERC677_ABI,
    confirmations: 1,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}