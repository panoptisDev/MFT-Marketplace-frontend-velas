import { Contract } from '@ethersproject/contracts'
import StreetBrawlerzABI from 'contracts/StreetBrawlerz.json'
import MarketABI from 'contracts/Market.json'
import FightABI from 'contracts/Fight.json'
import veFightABI from 'contracts/veFight.json'
import BallotABI from 'contracts/Ballot.json'
import ZoneABI from 'contracts/Zone.json'

export const Networks = {
  CronosMainNet: 25,
  AvaxMainNet: 43114,
  FujiTestNet: 43113,
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.AvaxMainNet]: {
    StreetBrawlerz: {
      address: '0x5bC703955043ECd9AF18eD77b174AA8C248783C9',
      abi: StreetBrawlerzABI,
    },
    Market: {
      address: '0xEE017D7E5Ef9623fEF73AcDA40acbc1117e1AaD3',
      abi: MarketABI,
    }
  },


  [Networks.FujiTestNet]: {
    StreetBrawlerz: {
      address: '0x2C6e5B4b91980adF9Fa242B8d9797C0c12fE4Cbd',
      abi: StreetBrawlerzABI,
    },
    Market: {
      address: '0xE672543468ec68600030CcDda4B82Bd942Db4c3c',
      abi: MarketABI,
    },
    Fight: {
      address: '0xEbd6914f43dd8A8685A5532A585FF9440d75Bb20',
      abi: FightABI,
    },
    veFight: {
      address: '0x04A914F05faE2693E762109801517a99022d9761',
      abi: veFightABI,
    },
    Ballot: {
      address: '0x7579Aa46D82Ad066d40683544418FfF1eC9d462D',
      abi: BallotABI,
    },

    Aikido: {
      address: '0xF8422cb1D37A981D70b802F6CcE475eA20599408',
      abi: ZoneABI,
    },
    Boxing: {
      address: '0xb964C4DAB5967A27E48C5A252b0252b1E96Ddfda',
      abi: ZoneABI,
    },
    JiuJitsu: {
      address: '0x1048D1D50Eda3D5774aE25D39159C46A78Cfb57C',
      abi: ZoneABI,
    },
    Karate: {
      address: '0x3378110dAe9d0654EfBA45946a4a3cD1a40e241A',
      abi: ZoneABI,
    },
    MuayThai: {
      address: '0x698C4af7E44B051a6Ac56F6BB0cE9F096323F12F',
      abi: ZoneABI,
    },
    KravMaga: {
      address: '0xC57Ba904953c075B169Cb134e1cd020ee4d4C029',
      abi: ZoneABI,
    },
  },

  [Networks.CronosMainNet]: {
    StreetBrawlerz: {
      address: '0x1AE0695cBC1B820A34Bf6E661C3472C0b3ab34D0',
      abi: StreetBrawlerzABI,
    },
    Market: {
      address: '0x6B65EA106E97DA4dFffF5caa9fDcBb2aB396232A',
      abi: MarketABI,
    },
    Fight: {
      address: '0xaA69bA1F1929B9938Cf375736c016F16DCa1E7B1',
      abi: FightABI,
    },
    veFight: {
      address: '0x5bC703955043ECd9AF18eD77b174AA8C248783C9',
      abi: veFightABI,
    },
    Ballot: {
      address: '0xEE017D7E5Ef9623fEF73AcDA40acbc1117e1AaD3',
      abi: BallotABI,
    },

    Aikido: {
      address: '0x17674FEF0DfAcBF3D094CAB66DF9Ade745781C42',
      abi: ZoneABI,
    },
    Boxing: {
      address: '0xECcCAbe93b7Fd881d7F2b4BeC130f80eA4455F25',
      abi: ZoneABI,
    },
    JiuJitsu: {
      address: '0x51fb80E5f58Bd8cf4D2a2164392be42A152ff5D6',
      abi: ZoneABI,
    },
    Karate: {
      address: '0x39c4D6404Ea1722d8445Be36E99249E5D23eBF42',
      abi: ZoneABI,
    },
    MuayThai: {
      address: '0xa11baE0D8335eAA2AaED809D9BF567F03AA1ED47',
      abi: ZoneABI,
    },
    KravMaga: {
      address: '0xbca58370c5475564bbA9ee56dbe222E996243e77',
      abi: ZoneABI,
    }
  }
}

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

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

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getContractObjWithAddress(name, chainId, provider, contractAddress) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(contractAddress, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
