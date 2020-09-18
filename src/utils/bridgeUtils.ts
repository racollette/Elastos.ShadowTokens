import ELA from "../assets/ela.png"
import ETH from "../assets/eth.png";
import TRX from "../assets/tron.png";

// Bridge selection options
export const BRIDGE_SYMBOL_MAP: { [key in string]: string } = {
    ela: "ELA",
    eth: "ETH",
    trx: "TRX"
}
export const BRIDGE_NAME_MAP: { [key in string]: string } = {
    ela: "Elastos",
    eth: "Ethereum",
    trx: "Tron"
}
export const BRIDGE_ICON_MAP: { [key in string]: string } = {
    ela: ELA,
    eth: ETH,
    trx: TRX
}
