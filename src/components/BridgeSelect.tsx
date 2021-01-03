import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { withStyles } from "@material-ui/styles";
import OutsideClickHandler from "react-outside-click-handler";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { switchOriginChain } from "../bridges/EVM/utils/txUtils";
import ETH from "../assets/eth.png";
import ELA from "../assets/ela.png";
import HT from "../assets/ht.png";

const SUPPORTED_MAINNETS = [
  "ETH_ELA",
  "HT_ELA",
  "ETH_HT",
];

const SUPPORTED_TESTNETS = [
  "ETH_ELA_TESTNET",
  "HT_ELA_TESTNET",
  "ETH_HT_TESTNET",
];

const BRIDGE_ICONS: any = {
  ETH_ELA: [ETH, ELA],
  HT_ELA: [HT, ELA],
  ETH_HT: [ETH, HT],
  ETH_ELA_TESTNET: [ETH, ELA],
  HT_ELA_TESTNET: [HT, ELA],
  ETH_HT_TESTNET: [ETH, HT],
};

const codeToBridge = (code: any) => {
  switch (code) {
    case "ETH_ELA":
      return ["Ethereum", "Elastos"];
    case "HT_ELA":
      return ["Heco (Huobi)", "Elastos"];
    case "ETH_HT":
      return ["Ethereum", "Heco (Huobi)"];
    case "ETH_ELA_TESTNET":
      return ["Ropsten", "Elastos Testnet"];
    case "ETH_HT_TESTNET":
      return ["Ropsten", "Heco (Huobi) Testnet"];
    case "HT_ELA_TESTNET":
      return ["Heco (Huobi) Testnet", "Elastos Testnet"];
    default:
      return ["Ethereum", "Elastos"];
  }
};

const BridgeSelect = ({ isVisible, store }: any) => {
  const open = store.get("bridgesOpen");
  const selectedBridge = store.get("selectedBridge");
  const selectedDirection = store.get("selectedDirection");
  const [bridgeList, setBridgeList] = React.useState(SUPPORTED_MAINNETS);
  const [bridgeText, setBridgeText] = React.useState('View Testnet Bridges');

  if (!isVisible) return null;
  return (
    <div>
      <BridgeButton onClick={() => store.set("bridgesOpen", true)}>
        <BridgeImage src={BRIDGE_ICONS[selectedBridge][0]}></BridgeImage>
        <Hidden smDown>{codeToBridge(selectedBridge)[0]}</Hidden>
        &nbsp;
        <SwapHorizIcon />
        &nbsp;
        <BridgeImage src={BRIDGE_ICONS[selectedBridge][1]}></BridgeImage>
        <Hidden smDown>{codeToBridge(selectedBridge)[1]}</Hidden>
      </BridgeButton>
      <OutsideClickHandler
        onOutsideClick={() => store.set("bridgesOpen", false)}
      >
        {open && (
          <Wrapper>
            <Bridges>
              {bridgeList.map((bridge) => {
                return (
                  <BridgeElement
                    key={bridge}
                    onClick={() => {
                      store.set("selectedBridge", bridge);
                      switchOriginChain(
                        selectedDirection,
                        codeToBridge(bridge)[0]
                      );
                      store.set("bridgesOpen", false);
                    }}
                  >
                    <BridgeImage src={BRIDGE_ICONS[bridge][0]}></BridgeImage>
                    <BridgeText>{codeToBridge(bridge)[0]}</BridgeText>
                    &nbsp;
                    <SwapHorizIcon />
                    &nbsp;
                    <BridgeImage src={BRIDGE_ICONS[bridge][1]}></BridgeImage>
                    <BridgeText>{codeToBridge(bridge)[1]}</BridgeText>
                  </BridgeElement>
                );
              })}
              <SwitchBridgesButton
                fullWidth
                onClick={()=> {
                  switch (bridgeList) {
                    case SUPPORTED_MAINNETS:
                      setBridgeList(SUPPORTED_TESTNETS)
                      setBridgeText('View Mainnet Bridges')
                      break;
                    case SUPPORTED_TESTNETS:
                      setBridgeList(SUPPORTED_MAINNETS)
                      setBridgeText('View Testnet Bridges')
                      break;
                    default:
                      setBridgeList(SUPPORTED_MAINNETS)
                      setBridgeText('View Testnet Bridges')
                  }
                }}
              >
                {bridgeText}
              </SwitchBridgesButton>
            </Bridges>
          </Wrapper>
        )}
      </OutsideClickHandler>
    </div>
  );
};

const Wrapper = styled.div`
  margin-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  padding: 8px;
  background-color: rgb(36, 36, 36);
  border: 1px solid rgb(66, 66, 66);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 0rem;
  z-index: 100;
`;

const Bridges = styled.ul`
  padding: 0;
  margin: 0;
`;

const BridgeElement = styled.li`
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  position: relative;
  color: #fff;
  &:hover {
    background-color: rgb(60, 60, 60);
    color: #fff;
    cursor: pointer;
    & p {
      color: #fff;
    }
  }
`;

const BridgeImage = styled.img`
  height: 16px;
  margin-right: 5px;
`;

const BridgeText = styled.p`
  color: #c3c5cb;
  font-size: 0.85rem;
`;

const BridgeButton = withStyles({
  root: {
    position: "relative",
    marginLeft: 6,
    height: 38,
    minWidth: 48,
    textTransform: "none",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: 8,
    backgroundColor: "rgb(200, 83, 103, 0.2)",
    paddingTop: 5,
    paddingBottom: 5,
    "&:hover": {
      backgroundColor: "rgb(200, 83, 103, 0.45)",
    },
  },
})(Button);

const SwitchBridgesButton = withStyles({
  root: {
    textTransform: "none",
    border: "1px solid rgb(66, 66, 66)",
    borderRadius: 8,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    "&:hover": {
      border: "1px solid " + theme.palette.primary.main,
      backgroundColor: "rgb(13, 129, 207, 0.45)",
    },
  },
})(Button);

export default BridgeSelect;
