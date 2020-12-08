// Ethereum to Elastos Bridge 
// Native coins
import { ETH } from './ETH_ELA/ETH'
import { ELA } from './ETH_ELA/ELA'
// Tokens
import { DAI } from './ETH_ELA/DAI'
import { USDT } from './ETH_ELA/USDT'
import { USDC } from './ETH_ELA/USDC'
import { HFIL } from './ETH_ELA/HFIL'
// import { WBTC } from './WBTC'
import { BAT } from './ETH_ELA/BAT'
import { ELP } from './ETH_ELA/ELP'
// Dev imports
import { ETH_DEV } from './ETH_ELA_TESTNET/ETH_DEV'
import { ELA_DEV } from './ETH_ELA_TESTNET/ELA_DEV'

// HuobiChain to Elastos Bridge
// Dev imports
import { HT_DEV_ELA } from './HT_ELA_TESTNET/HT_DEV'
import { ELA_DEV_HT } from './HT_ELA_TESTNET/ELA_DEV'

/////////////////////////////////////////////
//////////// Ethereum and Elastos ///////////
/////////////////////////////////////////////

export const ETH_DEFAULTS = [
    // Native coins
    ETH,
    // ERC20 tokens
    ELA,
    DAI,
    USDT,
    USDC,
    HFIL,
    BAT,
    ELP
]

export const ELA_DEFAULTS = [
    // Native coins
    ELA,
    // ERC20 tokens
    ETH,
    DAI,
    USDT,
    USDC,
    HFIL,
    BAT,
    ELP
]

/////////////////////////////////////////////////
///////// Ropsten and Elastos Testnet ///////////
/////////////////////////////////////////////////

export const ETH_DEV_DEFAULTS = [
    ETH_DEV,
    ELA_DEV,
]

export const ELA_DEV_DEFAULTS = [
    ELA_DEV,
    ETH_DEV
]


////////////////////////////////////////////////
//////////// HuobiChain and Elastos ////////////
////////////////////////////////////////////////


////////////////////////////////////////////////
//// HuobiChain Testnet and Elastos Testnet ////
////////////////////////////////////////////////

export const HT_ELA_DEV_DEFAULTS = [
    HT_DEV_ELA,
    ELA_DEV_HT,
]

export const ELA_HT_DEV_DEFAULTS = [
    ELA_DEV_HT,
    HT_DEV_ELA,
]