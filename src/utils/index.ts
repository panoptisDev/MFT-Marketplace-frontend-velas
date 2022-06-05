import { Contract } from "@ethersproject/contracts";
import BoatsailNFTAbI from "../contracts/BoatsailNFT.json";
import BoatsailMarketAbI from "../contracts/BoatsailMarket.json";
import BoatsailAuctionAbI from "../contracts/BoatsailAuction.json";

export const currentNetwork: any = process.env.REACT_APP_NETWORK_ID;

export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    BoatsailNFT: {
      address: "0xd2760748eddba1402236fcf4ba524b3ec44dc6b5",
      abi: BoatsailNFTAbI,
    },
    BoatsailMarket: {
      address: "0x74d759207a4049e6ba517fe04cf2c76556276eea",
      abi: BoatsailMarketAbI,
    },
    BoatsailAuction: {
      address: "0x81c702fa13a6c14a7bb4b982d03991c29184199d",
      abi: BoatsailAuctionAbI,
    },
  },
};

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name: any, chainId: any) {
  if (!chainId) chainId = currentNetwork;

  const contracts: any = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function getContractObj(name: any, chainId: any, provider: any) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getCollectionContract(
  address: any,
  chainId: any,
  provider: any
) {
  const info = getContractInfo("BoatsailNFT", chainId);
  return !!info && new Contract(address, info.abi, provider);
}

export function truncateWalletString(walletAddress: any) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + "..." + endStr;
}

export function truncateHashString(txhash: any) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + "..." + endStr;
}

export const shorter = (str: any) =>
  str?.length > 8 ? str.slice(0, 6) + "..." + str.slice(-4) : str;
