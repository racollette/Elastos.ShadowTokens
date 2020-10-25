import ERC20_ABI from "../abis/ERC20_ABI.json";

export const USDT = {
    id: 'USDT',
    name: 'Tether',
    network: '42',
    address: '0xe5bea34a93e9d2335ac2413917a1c35a83834907', // Rov token //'0xdac17f958d2ee523a2206206994597c13d831ec7',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    confirmations: 8,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}

export const elaUSDT = {
    id: 'elaUSDT',
    name: 'Tether on Elastos',
    network: '21',
    address: '0xed21eb0e997d023b4df6b85eee8c9384147d2cdd', // generate on elastos
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    confirmations: 1,
    priceTicker: 'usdt',
    priceFeed: 'https://api.coincap.io/v2/assets/tether',
}