
export const MEDIATOR_CONTRACTS: any = {
    bridgeMode: {
        multi_amb_erc_erc: {
            Ethereum: {
                release: '0xf12d52246e86bbE26702aDe133262f94235507C6',  // Foreign, Elastos testnet source
                mint: '0xdCec1ca391101Db066e6819E9D50E2E688906717',  // Home, Kovan source
                minTx: 500000000000000000,
                maxTx: 750000000000000000000000,
            },
            Elastos: {
                release: '', // Foreign,  testnet source
                mint: '', // Home, Kovan source
                minTx: 500000000000000000,
                maxTx: 750000000000000000000000,
            }
        },
        amb_native_erc: {
            Ethereum: {
                release: '0x385d2C9291f7354bc54237DE26d0352eF651b797', // Foreign, Elastos testnet source
                mint: '0x155f3c04d64B39BC756a14A1d017d9295D23F61b', // Home, Kovan source
            },
            Elastos: {
                release: '', // Foreign, testnet source 
                mint: '', // Home, Kovan source
            }
        }
    }

}
