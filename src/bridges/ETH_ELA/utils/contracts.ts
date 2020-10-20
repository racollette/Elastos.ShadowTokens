
export const USDT_ADDRESS_TEST = "0x1a37dd375096820a5fde14342720102c07100f26";


export const MEDIATOR_CONTRACTS: any = {
    bridgeMode: {
        erc_erc_amb: {
            Ethereum: {
                release: '0x7C8419cD3C7487408F6c545f7422d7d9E6e7e725', // Home, Elastos testnet source
                mint: '0xd267C0Ff3ff12622c8470E05b61a724201536c73', // Foreign, Kovan source
            },
            Elastos: {
                release: '', // Foreign,  Kovan source
                mint: '', // Home, testnet source
            }
        }
    }

}
