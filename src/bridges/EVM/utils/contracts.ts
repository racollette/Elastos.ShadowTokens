
export const MEDIATOR_CONTRACTS: any = {
    bridge: {
        'ETH_ELA': {
            bridgeMode: {
                multi_amb_erc_erc: {
                    'Ethereum': {
                        release: '0xe6fd75ff38Adca4B97FBCD938c86b98772431867',  // Foreign, Elastos
                        mint: '0xfBec16ac396431162789FF4b5f65F47978988D7f',  // Home, Ethereum
                    },
                    'Elastos': {
                        release: '0x6Ae6B30F6bb361136b0cC47fEe25E44B7d58605c', // Foreign, Ethereum
                        mint: '0x0054351c99288D37B96878EDC2319ca006c8B910', // Home, Elastos
                    }
                },
                amb_native_erc: {
                    'Ethereum': {
                        release: '0x314dfec1Fb4de1e0Be70F260d0a065E497f7E2eB',  // Foreign, Elastos
                        mint: '0xf127003ea39878EFeEE89aA4E22248CC6cb7728E',  // Home, Ethereum
                    },
                    'Elastos': {
                        release: '0x88723077663F9e24091D2c30c2a2cE213d9080C6', // Foreign, Ethereum
                        mint: '0xE235CbC85e26824E4D855d4d0ac80f3A85A520E4', // Home, Elastos
                    }
                }
            }
        },
        'ETH_ELA_TESTNET': {
            bridgeMode: {
                multi_amb_erc_erc: {

                    'Ropsten': {
                        release: '0x6EA7481f1096E822574a54188578d1708F64C828',  // Foreign, Elastos Testnet
                        mint: '0x455d0Ce69b67805Dda4d0300f7102148Dd529e3A',  // Home, Ropsten
                    },
                    'Elastos Testnet': {
                        release: '0xBe8c5fcd11716a4b5B6e1af38661C67757a65047', // Foreign, Ropsten
                        mint: '0x8609de58295eDd21bE216C8FD13e270cB27adf05', // Home, Elastos Testnet
                    }

                },
                amb_native_erc: {
                    'Ropsten': {
                        release: '0xEd778518627a8785431a67fC3C7cdE1C340A4433', // Foreign, Elastos Testnet 
                        mint: '0xA8633A4aa52c8FFeb6cc07E2852130Ba3dc5d67f', // Home, Ropsten
                    },
                    'Elastos Testnet': {
                        release: '0x55Cd1889a2C9aaBa0189178F4e5d5888b9c1408E', // Foreign, Ropsten
                        mint: '0x6239111bbbA4AE922416e829C172eD4BF44d03B4', // Home, Elastos Testnet
                    }

                }
            }
        },
        'HT_ELA_TESTNET': {
            bridgeMode: {
                multi_amb_erc_erc: {
                    'HuobiChain Testnet': {
                        release: '0xCa26B2c0E732f9d907aa4fE9B6b9E7a4304b8D68',  // Foreign, Elastos Testnet
                        mint: '0xf127003ea39878EFeEE89aA4E22248CC6cb7728E',  // Home, HuobiChain Testnet
                    },
                    'Elastos Testnet': {
                        release: '0x5acCF25F5722A6ed0606C02AA5d8cFe27F346e1B', // Foreign, HuobiChain Testnet
                        mint: '0xD2dD65f92D1d426f1a54536841cdA9090b03Ae5c', // Home, Elastos Testnet
                    }
                },
                amb_native_erc: {
                    'HuobiChain Testnet': {
                        release: '0x6f9a499C9929d42CF85Ce82f3DE249a045880327',  // Foreign, Elastos Testnet
                        mint: '0xb4B7F184eE01dC3D7ccb60d38c151dc1d11a0C7e',  // Home, HuobiChain Testnet
                    },
                    'Elastos Testnet': {
                        release: '0x91206Bc48D12e7b9cCef4Ce317B5B04D93ceCB65', // Foreign, HuobiChain Testnet
                        mint: '0x88E1118997D1eC3a6917CA24974484d1933444fd', // Home, Elastos Testnet
                    }
                }
            }
        }
    }


}