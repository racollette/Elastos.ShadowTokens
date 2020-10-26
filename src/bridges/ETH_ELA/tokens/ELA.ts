import ERC677_ABI from "../abis/ERC677_ABI.json";

export const ELA = {
    id: 'ELA',
    name: 'Elastos',
    network: '42',
    address: null,
    bridgeMode: 'native_amb_erc',
    destAsset: "ethela",
    abi: '',
    confirmations: 1,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}

export const ethELA = {
    id: 'elaETH',
    name: 'ELA on Ethereum',
    network: '21',
    address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',
    bridgeMode: 'native_amb_erc',
    destAsset: "ela",
    abi: ERC677_ABI,
    confirmations: 8,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}