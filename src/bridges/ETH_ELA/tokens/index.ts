// Default imports

// Tokens
import { DAI, ethDAI } from './DAI'
import { USDT, ethUSDT } from './USDT'
import { USDC, ethUSDC } from './USDC'
import { HFIL, ethHFIL } from './HFIL'
import { WBTC, ethWBTC } from './WBTC'

// Native coins
import { ETH, elaETH } from './ETH'
import { ELA, ethELA } from './ELA'

// Testnet tokens
import { MAIN, ethMAIN } from './MAIN'

export const TOKENS: any = {

    // Native coins
    eth: ETH,
    elaeth: elaETH,
    ela: ELA,
    ethela: ethELA,

    // ERC20 tokens
    dai: DAI,
    ethdai: ethDAI,
    usdt: USDT,
    ethusdt: ethUSDT,
    usdc: USDC,
    ethusdc: ethUSDC,
    wbtc: WBTC,
    ethwbtc: ethWBTC,
    hfil: HFIL,
    ethhfil: ethHFIL,

    // Test ERC20 tokens
    main: MAIN,
    ethmain: ethMAIN,
}

export const ETH_DEFAULTS: any = [
    // Native coins
    ETH,
    // ERC20 tokens
    ethELA,
    WBTC,
    DAI,
    USDT,
    USDC,
    HFIL,
    // Test ERC20 tokens
    MAIN,
]


export const ELA_DEFAULTS: any = [
    // Native coins
    ELA,
    // ERC20 tokens
    elaETH,
    ethWBTC,
    ethDAI,
    ethUSDT,
    ethUSDC,
    ethHFIL,
    // Test ERC20 tokens
    ethMAIN,
]