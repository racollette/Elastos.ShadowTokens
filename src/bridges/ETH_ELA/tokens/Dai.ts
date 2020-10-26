import ERC20_ABI from "../abis/ERC20_ABI.json";

export const DAI = {
    id: 'DAI',
    name: 'Dai',
    network: '42',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    bridgeMode: 'multi_amb_erc_erc',
    destAsset: "eladai",
    abi: ERC20_ABI,
    confirmations: 8,
    priceTicker: 'dai',
    priceFeed: 'https://api.coincap.io/v2/assets/multi-collateral-dai',
}

export const elaDAI = {
    id: 'elaDAI',
    name: 'Dai on Elastos',
    network: '21',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // generate on elastos
    bridgeMode: 'multi_amb_erc_erc',
    destAsset: "dai",
    abi: ERC20_ABI,
    confirmations: 1,
    priceTicker: 'dai',
    priceFeed: 'https://api.coincap.io/v2/assets/multi-collateral-dai',
}