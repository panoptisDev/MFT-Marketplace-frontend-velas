import { Contract } from '@ethersproject/contracts'
import BoatsailNFTAbI from 'contracts/BoatsailNFT.json'
import BoatsailMarketAbI from 'contracts/BoatsailMarket.json'
import BoatsailAuctionAbI from 'contracts/BoatsailAuction.json'

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    BoatsailNFT: {
      address: '0xee31073ffd87a89b74f416c249665927b09541d6',
      abi: BoatsailNFTAbI,
    },
    BoatsailMarket: {
      address: '0xbdd7EEa1952Fb1eA375314E076D06E9D6F93154F',
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
