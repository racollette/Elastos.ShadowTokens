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
        'HT_ELA': {
            bridgeMode: {
                multi_amb_erc_erc: {
                    'HuobiChain': {
                        release: '0x6683268d72eeA063d8ee17639cC9B7C317d1734a',  // Foreign, Elastos
                        mint: '0x323b5913dadd3e61e5242Fe44781cb7Dd4BE7EB8',  // Home, HuobiChain
                    },
                    'Elastos': {
                        release: '0x3394577F74B86b9FD4D6e1D8a66c668bC6188379', // Foreign, HuobiChain
                        mint: '0x59F65A3913F1FFcE7aB684bd8c24ba3790bD376B', // Home, Elastos
                    }
                },
                amb_native_erc: {
                    'HuobiChain': {
                        release: '0x5e071258254c85B900Be01F6D7B3f8F34ab219e7',  // Foreign, Elastos
                        mint: '0x4490ee96671855BD0a52Eb5074EC5569496c0162',  // Home, HuobiChain
                    },
                    'Elastos': {
                        release: '0x5acCF25F5722A6ed0606C02AA5d8cFe27F346e1B', // Foreign, HuobiChain
                        mint: '0x74efe86928abe5bCD191f2e6C85b01861ea1C17d', // Home, Elastos
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
        },
        'ETH_HT_TESTNET': {
            bridgeMode: {
                multi_amb_erc_erc: {
                    'Ropsten': {
                        release: '0x961Cc972B29422AB37C2D45760Bf5DCbF98e0119', // Foreign, Ropsten
                        mint: '0x36dB7c661F6988f3631f7e832f821303123A7BE9', // Home, HuobiChain Testnet
                    },
                    'HuobiChain Testnet': {
                        release: '0xb83399B89D6624f472b568Fac7575Da674574C39',  // Foreign, HuobiChain Testnet
                        mint: '0x0cc527A3Db91ce7aDa19441e130665DD6D6d0632',  // Home, Ropsten
                    }
                },
                amb_native_erc: {
                    'Ropsten': {
                        release: '0xCe1d726DfCAD38133813f2CC2047C38f301acB0d', // Foreign, HuobiChain Testnet 
                        mint: '0x74efe86928abe5bCD191f2e6C85b01861ea1C17d', // Home, Ropsten
                    },
                    'HuobiChain Testnet': {
                        release: '0xa901d5a7E2ABC42Fcc744957C877d8db166744c0', // Foreign, Ropsten
                        mint: '0x81B5A2a1F986cd27251C624378CA75243e5fFF0B', // Home, HuobiChain Testnet
                    }

                }
            }
        },
        'ETH_HT': {
            bridgeMode: {
                multi_amb_erc_erc: {
                    'Ethereum': {
                        release: '0xC307D55a6855203d64FbDe6E50fe28797d90cCe9',  // Foreign, HuobiChain
                        mint: '0xafFf0f760BC03D262725A373727De2976470F1ec',  // Home, Ethereum
                    },
                    'HuobiChain': {
                        release: '0x8609de58295eDd21bE216C8FD13e270cB27adf05', // Foreign, Ethereum
                        mint: '0x373bfDafa7877C3713b600394E8cec4A8b740632', // Home, HuobiChain
                    }
                },
                amb_native_erc: {
                    'Ethereum': {
                        release: '0xdC841126328634220e01B98aeF2Ba1729f05C2f2', // Foreign, HuobiChain 
                        mint: '0xEb2aFC9BafD32319CC0c7Db0e117DE24A402054D', // Home, Ethereum
                    },
                    'HuobiChain': {
                        release: '0x22f3Acd2F30F7Ae79565c0fF91cDd3386893bD92', // Foreign, Ethereum
                        mint: '0x8609de58295eDd21bE216C8FD13e270cB27adf05', // Home, HuobiChain
                    }

                }
            }
        }
    }
}
