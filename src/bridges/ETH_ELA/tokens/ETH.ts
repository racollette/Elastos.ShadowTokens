import ERC677_ABI from "../abis/ERC677_ABI.json";

export const elaETH = {
    id: 'elaETH',
    name: 'ETH on Elastos',
    network: '21',
    address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',
    bridgeMode: 'native_amb_erc',
    abi: ERC677_ABI,
    confirmations: 1,
    priceTicker: 'main',
    priceFeed: 'https://api.coincap.io/v2/assets/eth',
}