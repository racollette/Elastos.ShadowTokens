import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_FEE } from './config';
import HFIL_ICON from "../../../assets/hfil.png";

export const HFIL = {
    0: {
        symbol: 'HFIL',
        name: 'Huobi Filecoin',
        id: 'hfil',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0x9afb950948c2370975fb91a441f36fdc02737cd4',
        confirmations: ETH_CONFIRMATIONS,
    },
    1: {
        symbol: 'ethHFIL',
        name: 'Huobi Filecoin on Elastos',
        id: 'ethhfil',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '', // generate on elastos
        confirmations: ELA_CONFIRMATIONS,
    },
    home: 0,
    foreign: 1,
    icon: HFIL_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    fee: MULTI_AMB_ERC_ERC_FEE,
    priceTicker: 'fil',
    priceFeed: 'https://api.coincap.io/v2/assets/filecoin',
}