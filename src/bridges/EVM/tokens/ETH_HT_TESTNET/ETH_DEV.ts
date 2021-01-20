import { ETH_CONFIRMATIONS, HT_CONFIRMATIONS, ETH_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from '../config';
import ETH_ICON from "../../../../assets/eth.png"

export const ETH_DEV_HT = {
    0: {
        symbol: 'ETH',
        name: 'Ethereum',
        id: 'eth',
        transferType: 'mint',
        network: 'Ropsten',
        networkID: 3,
        address: '',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_HOME,
    },
    1: {
        symbol: 'ETH',
        name: 'ETH on Heco (Huobi)',
        id: 'hteth',
        transferType: 'release',
        network: 'Heco (Huobi) Testnet',
        networkID: 256,
        address: '0xE6394bA16Dde7815Ac85503591771f0bf0373c17',
        confirmations: HT_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: ETH_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: 0.5, // Fix this. Add proper constant or change method to pull fees from contract
    maxTx: ETH_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}