import ERC20_ABI from "../abis/ERC20_ABI.json";
import DAI_ICON from "../../../assets/dai.png";

// Ethereum side
export const DAI = {
    symbol: 'DAI',
    name: 'Dai',
    icon: DAI_ICON,
    sourceID: 'dai',
    destID: 'ethdai',
    transferType: 'mint',
    network: 'Ethereum',
    networkID: '42',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'dai',
    priceFeed: 'https://api.coincap.io/v2/assets/multi-collateral-dai',
}

// Elastos side
export const ethDAI = {
    symbol: 'ethDAI',
    name: 'Dai on Elastos',
    icon: DAI_ICON,
    sourceID: 'ethdai',
    destID: 'dai',
    transferType: 'release',
    network: 'Elastos',
    networkID: '21',
    address: '', // generate on elastos
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'dai',
    priceFeed: 'https://api.coincap.io/v2/assets/multi-collateral-dai',
}