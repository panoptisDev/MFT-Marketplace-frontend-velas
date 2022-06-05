import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { currentNetwork } from "./index";
import getNodeUrl from "./getRpcUrl";
import Metamask from "../icons/Metamask";
import WalletConnect from "../icons/WalletConnect";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [+currentNetwork],
});

export function getConnector(connectorId: any) {
  switch (connectorId) {
    case "injectedConnector":
      return injectedConnector;
    case "walletconnect":
      return walletconnect;
    default:
      return injectedConnector;
  }
}

export const walletconnect = new WalletConnectConnector({
  rpc: `[+currentNetwork]: getNodeUrl()`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const connectorsByName = {
  Injected: injectedConnector,
  WalletConnect: walletconnect,
};

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: injectedConnector,
    key: "injectedConnector",
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: walletconnect,
    key: "walletconnect",
  },
];

export const connectorLocalStorageKey = "connectorId";
