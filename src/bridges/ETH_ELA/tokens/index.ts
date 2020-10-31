// Native coins
import { ETH } from './ETH'
import { ELA } from './ELA'

// Tokens
import { DAI } from './DAI'
import { USDT } from './USDT'
import { USDC } from './USDC'
import { HFIL } from './HFIL'
import { WBTC } from './WBTC'

// Dev imports
import { ETH_DEV } from './ETH_DEV'
import { ELA_DEV } from './ELA_DEV'
import { MAIN } from './MAIN'

export const ETH_DEFAULTS = [
    // Native coins
    ETH,
    // ERC20 tokens
    ELA,
    WBTC,
    DAI,
    USDT,
    USDC,
    HFIL,
]

export const ELA_DEFAULTS = [
    // Native coins
    ELA,
    // ERC20 tokens
    ETH,
    WBTC,
    DAI,
    USDT,
    USDC,
    HFIL,
]

///////////////////////////////////////////
/// Dev mode: Kovan and Elastos Testnet ///
///////////////////////////////////////////

export const ETH_DEV_DEFAULTS = [
    ETH_DEV,
    ELA_DEV,
    MAIN,
]

export const ELA_DEV_DEFAULTS = [
    ELA_DEV,
    ETH_DEV,
    MAIN,
]
