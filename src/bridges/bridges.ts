import ELA from "../assets/ela.png"
import ETH from "../assets/eth.png";
import HT from "../assets/ht.png";

// Bridge selection options
// export const BRIDGE_SYMBOL_MAP: { [key in string]: string } = {
//     ETH_ELA: "Ethereum to Elastos",
//     ETH_ELA_TESTNET: "Elastos Testnet to Ropsten",
//     HT_ELA: "HuobiChain to Elastos",
//     HT_ELA_TESTNET: "HuobiChain Testnet to Elastos",

// }

export const BRIDGE_SYMBOL_MAP: { [key in string]: string } = {
    ela: "ELA",
    eth: "ETH",
    ht: "HT"
}
export const BRIDGE_NAME_MAP: { [key in string]: string } = {
    ela: "Elastos",
    eth: "Ethereum",
    ht: "HuobiChain"
}

export const BRIDGE_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    ht: HT
}
