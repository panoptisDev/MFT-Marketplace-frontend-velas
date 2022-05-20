import { Contract } from '@ethersproject/contracts'
import BoatsailNFTAbI from 'contracts/BoatsailNFT.json'
import BoatsailMarketAbI from 'contracts/BoatsailMarket.json'
import BoatsailAuctionAbI from 'contracts/BoatsailAuction.json'

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    BoatsailNFT: {
      address: '0xB170437c192fB49A35930809fE68932feC888508',
      abi: BoatsailNFTAbI,
    },
    BoatsailMarket: {
      address: '0x669c5a51d7e32cce27755c71038aa25ca47df477',
      abi: BoatsailMarketAbI,
    },
    BoatsailAuction: {
      address: '0x276249441d45a0498505E576feFB98AE4579B221',
      abi: BoatsailAuctionAbI,
    }
  }
}

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getCollectionContract(address, chainId, provider) {
  const info = getContractInfo('BoatsailNFT', chainId);
  return !!info && new Contract(address, info.abi, provider);
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
