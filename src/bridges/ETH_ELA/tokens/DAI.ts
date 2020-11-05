import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_FEE } from './config';
import DAI_ICON from "../../../assets/dai.png";

export const DAI = {
    0: {
        symbol: 'DAI',
        name: 'Dai',
        id: 'dai',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 42,
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        confirmations: ETH_CONFIRMATIONS,
    },
    1: {
        symbol: 'ethDAI',
        name: 'Dai on Elastos',
        id: 'ethdai',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '0xa41bffd77b68619aa3073acde91f32ee3d996a8a', // generate on elastos
        confirmations: ELA_CONFIRMATIONS,
    },
    home: 0,
    foreign: 1,
    icon: DAI_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    fee: MULTI_AMB_ERC_ERC_FEE,
    priceTicker: 'dai',
    priceFeed: 'https://api.coincap.io/v2/assets/multi-collateral-dai',
}