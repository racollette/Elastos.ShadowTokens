import { ETH_CONFIRMATIONS, HT_CONFIRMATIONS, ETH_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from '../config';
import ETH_ICON from "../../../../assets/eth.png"

export const ETH_HT = {
    0: {
        symbol: 'ETH',
        name: 'Ethereum',
        id: 'eth',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '',
        confirmations: ETH_CONFIRMATIONS,
        fee: 0.1,
    },
    1: {
        symbol: 'ETH',
        name: 'ETH on HuobiChain',
        id: 'hteth',
        transferType: 'release',
        network: 'HuobiChain',
        networkID: 128,
        address: '0x5e071258254c85B900Be01F6D7B3f8F34ab219e7',
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