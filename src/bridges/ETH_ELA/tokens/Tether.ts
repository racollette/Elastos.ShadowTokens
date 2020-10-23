import ERC20_ABI from "../abis/ERC20_ABI.json";

export const USDT = {
    id: 'USDT',
    name: 'USDT',
    network: '42',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    bridgeMode: 'erc_erc_amb',
    abi: ERC20_ABI,
    confirmations: 8,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}

export const eUSDT = {
    id: 'eUSDT',
    name: 'eUSDT',
    network: '21',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // generate on elastos
    bridgeMode: 'erc_erc_amb',
    abi: ERC20_ABI,
    confirmations: 1,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}