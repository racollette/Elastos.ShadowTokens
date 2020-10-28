// import { BridgeableERC20Asset } from '@poanet/tokenbridge-bw-exchange'
// import { ERC677Asset } from '@poanet/tokenbridge-bw-exchange'
import ERC20_ABI from "../abis/ERC20_ABI.json";
import MAIN_ICON from "../../../assets/main.png";

// Ethereum side
export const MAIN = {
    symbol: 'MAIN',
    name: 'Main',
    icon: MAIN_ICON,
    sourceID: 'main',
    destID: 'ethmain',
    transferType: 'mint',
    network: 'Kovan',
    networkID: '42',
    address: '0x41c16473b12211892c813f52815f700440471aa0',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'main',
    priceFeed: '',
}

// Elastos side
export const ethMAIN = {
    symbol: 'ethMAIN',
    name: 'Main on Elastos',
    icon: MAIN_ICON,
    sourceID: 'ethmain',
    destID: 'main',
    transferType: 'release',
    network: 'Elastos Testnet',
    networkID: '21',
    address: '0x37f557939c257b9cdf006f0cb1987814a291f7b4',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'main',
    priceFeed: '',
}
