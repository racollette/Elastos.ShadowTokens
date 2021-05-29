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

// Heco (Huobi) to Elastos Bridge
import { HT_ELA } from './HT_ELA/HT'
import { ELA_HT } from './HT_ELA/ELA'
import { FILDA_ELA } from './HT_ELA/FILDA'

// Dev imports
import { HT_DEV_ELA } from './HT_ELA_TESTNET/HT_DEV'
import { ELA_DEV_HT } from './HT_ELA_TESTNET/ELA_DEV'

// Ethereum to Heco (Huobi)
import { ETH_HT } from './ETH_HT/ETH'
import { HT_ETH } from './ETH_HT/HT'
import { DAI_HT } from './ETH_HT/DAI'
import { USDT_HT } from './ETH_HT/USDT'
import { USDC_HT } from './ETH_HT/USDC'
// import { HFIL_HT } from './ETH_HT/HFIL_HT'

// BSC (Binance) to Heco (Huobi) Bridge
import { BNB_HT } from './BNB_HT/BNB'
import { HT_BNB } from './BNB_HT/HT'
import { FILDA_BNB } from './BNB_HT/FILDA'

// Dev imports
import { ETH_DEV_HT } from './ETH_HT_TESTNET/ETH_DEV'
import { HT_DEV_ETH } from './ETH_HT_TESTNET/HT_DEV'
import { USDT_DEV_HT } from './ETH_HT_TESTNET/USDT_DEV'
// import { HFIL_DEV_HT } from './ETH_HT_TESTNET/HFIL_DEV'

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
//////////// Heco (Huobi) and Elastos ////////////
////////////////////////////////////////////////

export const HT_ELA_DEFAULTS = [
    HT_ELA,
    ELA_HT,
    FILDA_ELA,
]

export const ELA_HT_DEFAULTS = [
    ELA_HT,
    HT_ELA,
    FILDA_ELA,
]

////////////////////////////////////////////////
//// Heco (Huobi) Testnet and Elastos Testnet ////
////////////////////////////////////////////////

export const HT_ELA_DEV_DEFAULTS = [
    HT_DEV_ELA,
    ELA_DEV_HT,
]

export const ELA_HT_DEV_DEFAULTS = [
    ELA_DEV_HT,
    HT_DEV_ELA,
]

////////////////////////////////////////////////
//////////// Ethereum and Heco (Huobi) ///////////
////////////////////////////////////////////////

export const ETH_HT_DEFAULTS = [
    ETH_HT,
    HT_ETH,
    DAI_HT,
    USDT_HT,
    USDC_HT,
]

export const HT_ETH_DEFAULTS = [
    HT_ETH,
    ETH_HT,
    DAI_HT,
    USDT_HT,
    USDC_HT,
]

////////////////////////////////////////////////
//////// Ropsten and Heco (Huobi) Testnet ////////
////////////////////////////////////////////////


export const ETH_HT_DEV_DEFAULTS = [
    ETH_DEV_HT,
    HT_DEV_ETH,
    USDT_DEV_HT,
]

export const HT_ETH_DEV_DEFAULTS = [
    HT_DEV_ETH,
    ETH_DEV_HT,
    USDT_DEV_HT,
]

////////////////////////////////////////////////
////////// BSC (Binance) and Heco (Huobi)  ///////////
////////////////////////////////////////////////

export const BNB_HT_DEFAULTS = [
    BNB_HT,
    HT_BNB,
    FILDA_BNB
]

export const HT_BNB_DEFAULTS = [
    HT_BNB,
    BNB_HT,
    FILDA_BNB
]