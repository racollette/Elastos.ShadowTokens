import { ETH_CONFIRMATIONS, HT_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from '../config';
import DAI_ICON from "../../../../assets/dai.png";

export const DAI_HT = {
    0: {
        symbol: 'DAI',
        name: 'Dai',
        id: 'dai',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        confirmations: ETH_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    1: {
        symbol: 'ethDAI',
        name: 'Dai on Heco (Huobi)',
        id: 'ethdai',
        transferType: 'release',
        network: 'Heco (Huobi)',
        networkID: 128,
        address: '0x23e813a4c56cbbc29eae0753fe2fa62d8fd5b82b',
        confirmations: HT_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: DAI_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'dai',
    priceFeed: 'https://api.coincap.io/v2/assets/multi-collateral-dai',
}