import ERC20_ABI from "../abis/ERC20_ABI.json";
import HFIL_ICON from "../../../assets/hfil.png";

// Ethereum side
export const HFIL = {
    symbol: 'HFIL',
    name: 'Huobi Filecoin',
    icon: HFIL_ICON,
    sourceID: 'hfil',
    destID: 'ethhfil',
    transferType: 'mint',
    network: 'Ethereum',
    networkID: '42',
    address: '0x9afb950948c2370975fb91a441f36fdc02737cd4',
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 8,
    fee: 0.1,
    priceTicker: 'fil',
    priceFeed: 'https://api.coincap.io/v2/assets/filecoin',
}

// Elastos side
export const ethHFIL = {
    symbol: 'ethHFIL',
    name: 'Huobi Filecoin on Elastos',
    icon: HFIL_ICON,
    sourceID: 'ethhfil',
    destID: 'hfil',
    transferType: 'release',
    network: 'Elastos',
    networkID: '21',
    address: '', // generate on elastos
    bridgeMode: 'multi_amb_erc_erc',
    abi: ERC20_ABI,
    minTx: 500000000000000000,
    confirmations: 1,
    fee: 0.1,
    priceTicker: 'fil',
    priceFeed: 'https://api.coincap.io/v2/assets/filecoin',
}