import { DAI, elaDAI } from './Dai'
import { USDT, elaUSDT } from './Tether'
import { USDC, elaUSDC } from './USD Coin'

import { ETH, elaETH } from './ETH'
import { ELA, ethELA } from './ELA'

import { MAIN, elaMAIN } from './Main'

export const TOKENS: any = {

    // Native tokens
    eth: ETH,
    elaeth: elaETH,
    ela: ELA,
    ethela: ethELA,

    // ERC20 tokens
    dai: DAI,
    eladai: elaDAI,
    usdt: USDT,
    elausdt: elaUSDT,
    usdc: USDC,
    elausdc: elaUSDC,

    // Test ERC20 tokens
    main: MAIN,
    elamain: elaMAIN,
}
