
export const MEDIATOR_CONTRACTS: any = {
    bridgeMode: {
        multi_amb_erc_erc: {
            'Ethereum': {
                release: '0xe6fd75ff38Adca4B97FBCD938c86b98772431867',  // Foreign, Elastos
                mint: '0xfBec16ac396431162789FF4b5f65F47978988D7f',  // Home, Ethereum
            },
            'Elastos': {
                release: '0x6Ae6B30F6bb361136b0cC47fEe25E44B7d58605c', // Foreign, Ethereum
                mint: '0x0054351c99288D37B96878EDC2319ca006c8B910', // Home, Elastos
            },
            'Kovan': {
                release: '0xf12d52246e86bbE26702aDe133262f94235507C6',  // Foreign, Elastos Testnet
                mint: '0xdCec1ca391101Db066e6819E9D50E2E688906717',  // Home, Kovan
            },
            'Elastos Testnet': {
                release: '', // Foreign, Kovan
                mint: '', // Home, Elastos Testnet
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
            },
            'Kovan': {
                release: '0x385d2C9291f7354bc54237DE26d0352eF651b797', // Foreign, Elastos Testnet 
                mint: '0x155f3c04d64B39BC756a14A1d017d9295D23F61b', // Home, Kovan
            },
            'Elastos Testnet': {
                release: '', // Foreign, Kovan
                mint: '', // Home, Elastos Testnet
            }
        }
    }

}


// Contract Config

// BRIDGE_MODE=AMB_ERC_TO_ERC

// DEPLOYMENT_ACCOUNT_PRIVATE_KEY=3ce6001b8d44c5efd7dcc7010e75c1e05e246ef43cef3983f6d8d32002be81e8
// DEPLOYMENT_GAS_LIMIT_EXTRA=0.2
// HOME_DEPLOYMENT_GAS_PRICE=10000000000
// FOREIGN_DEPLOYMENT_GAS_PRICE=10000000000
// GET_RECEIPT_INTERVAL_IN_MILLISECONDS=3000

// BRIDGEABLE_TOKEN_NAME=Main On Elastos
// BRIDGEABLE_TOKEN_SYMBOL=eMain
// BRIDGEABLE_TOKEN_DECIMALS=18

// HOME_RPC_URL=https://rpc.elaeth.io
// HOME_BRIDGE_OWNER=0x8905A41c79Ed1f5DC9a5baE50d447af186AcE252
// HOME_VALIDATORS_OWNER=0x8905A41c79Ed1f5DC9a5baE50d447af186AcE252
// HOME_UPGRADEABLE_ADMIN=0x8905A41c79Ed1f5DC9a5baE50d447af186AcE252
// HOME_DAILY_LIMIT=30000000000000000000000000
// HOME_MAX_AMOUNT_PER_TX=1500000000000000000000000
// HOME_MIN_AMOUNT_PER_TX=500000000000000000
// HOME_REQUIRED_BLOCK_CONFIRMATIONS=1
// HOME_GAS_PRICE=1000000000

// BLOCK_REWARD_ADDRESS=

// FOREIGN_RPC_URL=https://kovan.infura.io/v3/945c07d86744491cb15c4547227b2dfa
// FOREIGN_BRIDGE_OWNER=0x8905A41c79Ed1f5DC9a5baE50d447af186AcE252
// FOREIGN_VALIDATORS_OWNER=0x8905A41c79Ed1f5DC9a5baE50d447af186AcE252
// FOREIGN_UPGRADEABLE_ADMIN=0x8905A41c79Ed1f5DC9a5baE50d447af186AcE252
// FOREIGN_DAILY_LIMIT=15000000000000000000000000
// FOREIGN_MAX_AMOUNT_PER_TX=750000000000000000000000
// FOREIGN_MIN_AMOUNT_PER_TX=500000000000000000
// FOREIGN_REQUIRED_BLOCK_CONFIRMATIONS=8
// FOREIGN_GAS_PRICE=10000000000

// #for bridge erc_to_erc and erc_to_native mode
// ERC20_TOKEN_ADDRESS=0x41c16473b12211892c813f52815f700440471aa0
// # Only for for erc_to_erc mode
// ERC20_EXTENDED_BY_ERC677=false

// REQUIRED_NUMBER_OF_VALIDATORS=1
// #If several validators are used, list them separated by space without quotes
// #E.g. VALIDATORS=0x 0x 0x
// VALIDATORS=0xF16aFa5bd816C84844864ed1109F21144eF49aA4
// #Set to ONE_DIRECTION or BOTH_DIRECTIONS if fee will be charged on home side, set to false otherwise
// HOME_REWARDABLE=false
// # Valid only for rewards on erc_to_native mode. Supported values are BRIDGE_VALIDATORS_REWARD and POSDAO_REWARD
// HOME_FEE_MANAGER_TYPE=
// #Set to ONE_DIRECTION or BOTH_DIRECTIONS if fee will be charged on foreign side, set to false otherwise
// FOREIGN_REWARDABLE=false
// #If HOME_REWARDABLE or FOREIGN_REWARDABLE set to true, list validators accounts were rewards should be transferred separated by space without quotes
// #E.g. VALIDATORS_REWARD_ACCOUNTS=0x 0x 0x
// VALIDATORS_REWARD_ACCOUNTS=0x

// # Fee to be taken for every transaction directed from the Home network to the Foreign network
// # E.g. 0.1% fee
// HOME_TRANSACTIONS_FEE=0.001
// # Fee to be taken for every transaction directed from the Foreign network to the Home network
// FOREIGN_TRANSACTIONS_FEE=0.001

// #If HOME_REWARDABLE is not false, list of accounts where rewards should be transferred separated by space without quotes
// #E.g. HOME_MEDIATOR_REWARD_ACCOUNTS=0x 0x 0x
// HOME_MEDIATOR_REWARD_ACCOUNTS=0x

// #If FOREIGN_REWARDABLE is not false, list of accounts where rewards should be transferred separated by space without quotes
// #E.g. FOREIGN_MEDIATOR_REWARD_ACCOUNTS=0x 0x 0x
// FOREIGN_MEDIATOR_REWARD_ACCOUNTS=0x

// #for bridge native_to_erc, erc_to_erc mode
// DEPLOY_REWARDABLE_TOKEN=false
// DPOS_STAKING_ADDRESS=

// #If decimals are different between foreign and home chain, number of decimals shift required to adjust the amount of tokens bridged. Default value is 0.
// FOREIGN_TO_HOME_DECIMAL_SHIFT=

// # For AMB mediators
// HOME_AMB_BRIDGE=0x7c68fccd8eA7231D6F647f5Ae5B59DDb3b5626a8
// FOREIGN_AMB_BRIDGE=0x0575b0b760197207529eB826bE2abbad2167b825

// HOME_MEDIATOR_REQUEST_GAS_LIMIT=8000000
// FOREIGN_MEDIATOR_REQUEST_GAS_LIMIT=8000000

// # Supported explorers: Blockscout, etherscan
// HOME_EXPLORER_URL=https://testnet.elaeth.io/api
// HOME_EXPLORER_API_KEY=

// # Supported explorers: Blockscout, etherscan
// FOREIGN_EXPLORER_URL=https://api-kovan.etherscan.io/api
// FOREIGN_EXPLORER_API_KEY=3HHGNXDBAFXGCU52DI2DYABPNF18QQ8UBS

// # for bridge erc_to_native mode
// # specifies if deployment of interest receiver contract is needed
// DEPLOY_INTEREST_RECEIVER=false
// # if DEPLOY_INTEREST_RECEIVER set to true, address of interest receiver contract owner should be specified
// FOREIGN_INTEREST_RECEIVER_OWNER=0x

// # for stake token mediators
// HOME_STAKE_TOKEN_ADDRESS=0x
// FOREIGN_STAKE_TOKEN_ADDRESS=0x

// # for multi-amb-erc20-to-erc677 mediators
// HOME_ERC677_TOKEN_IMAGE=0x