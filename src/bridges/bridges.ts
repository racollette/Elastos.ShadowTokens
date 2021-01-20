import ELA from "../assets/ela.png";
import ETH from "../assets/eth.png";
import HT from "../assets/ht.png";

export const BRIDGE_SYMBOL_MAP: { [key in string]: string } = {
    ela: "ELA",
    eth: "ETH",
    ht: "HT"
}
export const BRIDGE_NAME_MAP: { [key in string]: string } = {
    ela: "Elastos",
    eth: "Ethereum",
    ht: "Heco (Huobi)"
}

export const BRIDGE_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    ht: HT
}
