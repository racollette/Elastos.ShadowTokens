import ERC20_ABI from "../abis/ERC20_ABI.json";

export const USDC = {
    id: 'USDC',
    name: 'USDC',
    network: '42',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    bridgeMode: 'erc_erc_amb',
    abi: ERC20_ABI,
    priceTicker: 'usdc',
    priceFeed: 'https://api.coincap.io/v2/assets/usd-coin',
    confirmations: 8,
}

export const eUSDC = {
    id: 'eUSDC',
    name: 'eUSDC',
    network: '21',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // generate on elastos
    bridgeMode: 'erc_erc_amb',
    abi: ERC20_ABI,
    priceTicker: 'usdc',
    priceFeed: 'https://api.coincap.io/v2/assets/usd-coin',
    confirmations: 1,
}