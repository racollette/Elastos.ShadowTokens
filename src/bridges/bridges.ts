import ELA from "../assets/ela.png";
import ETH from "../assets/eth.png";
import HT from "../assets/ht.png";
import BNB from "../assets/bnb.png";

export const BRIDGE_SYMBOL_MAP: { [key in string]: string } = {
    ela: "ELA",
    eth: "ETH",
    ht: "HT",
    bnb: "BNB"
}
export const BRIDGE_NAME_MAP: { [key in string]: string } = {
    ela: "Elastos",
    eth: "Ethereum",
    ht: "Heco (Huobi)",
    bnb: "Binance"
}

export const BRIDGE_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    ht: HT,
    bnb: BNB
}
