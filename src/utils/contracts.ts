import "@ethersproject/shims"
import { BigNumber, Contract, ethers } from "ethers";
import toast from "react-hot-toast";
import { currentNetwork, getContractObj, getCollectionContract, getContractInfo } from ".";
import { NFTMintEngineDetail, NFTTrainingEngineDetail, StakingEngineDetail, VotingEngineDetail } from "./typs";

import FreeMap from "./FreeMap.json";
import WhiteListMap from "./WhiteListMap.json";
import { RPC_URLS } from "./connectors";
import BoatsailMarketABI from 'contracts/BoatsailMarket.json'

export async function addItem(collection, uri, royalty, chainId, provider) {
    const collectionContract = getCollectionContract(collection, chainId, provider);
    const BoatsailNFTContractInfo = getContractInfo('BoatsailNFT', chainId);
    try {
        const tx = await collectionContract.addItem(uri,royalty)
        const receipt = await tx.wait(2);
        if(receipt.confirmations) {
            const interf = new ethers.utils.Interface(BoatsailNFTContractInfo.abi);
            const logs = receipt.logs;
            let tokenId = 0;
            for(let index = 0; index < logs.length; index ++) {
              const log = logs[index];
              if(collection.toLowerCase() === log.address.toLowerCase()) {
                tokenId = interf.parseLog(log).args.tokenId.toNumber();
                return tokenId;
              }
            }
        }
        return false;
    }catch(e) {
        console.log(e)
        return false;
    }        
}