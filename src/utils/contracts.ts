import "@ethersproject/shims"
import { ethers } from "ethers";
import { getContractObj, getCollectionContract, getContractInfo } from ".";

/**
 * NFT Contract Management
 */
export async function addItem(collection, uri, royalty, chainId, provider) {
    const collectionContract = getCollectionContract(collection, chainId, provider);
    const BoatsailNFTContractInfo = getContractInfo('BoatsailNFT', chainId);
    try {
        const tx = await collectionContract.mintTo(uri,royalty)
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

/**
 * Market Contract Management
 */

 export async function createNewCollection(bPublic, chainId, provider) {
  const marketContract = getContractObj('BoatsailMarket', chainId, provider);
  const marketContractInfo = getContractInfo('BoatsailMarket', chainId);
  try {
      const tx =  await marketContract.createCollection(bPublic);
      const receipt = await tx.wait(2);
      if(receipt.confirmations) {
          const interf = new ethers.utils.Interface(marketContractInfo.abi);
          const logs = receipt.logs;
          let collectionAddress = "";
          for(let index = 0; index < logs.length; index ++) {
            const log = logs[index];
            if(marketContractInfo.address.toLowerCase() === log.address.toLowerCase()) {
              collectionAddress = interf.parseLog(log).args.collection_address.toLowerCase();
              return collectionAddress;
            }
          }
      }
      return "";
  }catch(e) {
      console.log(e);
      return "";
  }
}