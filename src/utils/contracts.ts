import "@ethersproject/shims"
import { BigNumber, ethers } from "ethers";
import { getContractObj, getCollectionContract, getContractInfo } from ".";

export function isAddress(address) {
    try {
        ethers.utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}

export function toEth(amount) {
  return ethers.utils.formatEther(String(amount));
}

export function toWei(amount) {
  return ethers.utils.parseEther(String(amount));
}
/**
 * NFT Contract Management
 */
 export async function isNFTApprovedForMarket(collection, account, chainId, provider) {
    const marketContract = getContractObj('BoatsailMarket', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, marketContract.address);
}
export async function isNFTApprovedForAuction(collection, account, chainId, provider) {
    const auctionContract = getContractObj('BoatsailAuction', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, auctionContract.address);
}

export async function setNFTApprovalForMarket(collection, approved, chainId, provider) {
    const marketContract = getContractObj('BoatsailMarket', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.setApprovalForAll(marketContract.address, approved);
        await tx.wait(1);
        return true;
    }catch(e) {
        console.log(e)
    }
    return false;
}
export async function setNFTApprovalForAuction(collection, approved, chainId, provider) {
    const auctionContract = getContractObj('BoatsailAuction', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.setApprovalForAll(auctionContract.address, approved);
        await tx.wait(1);
        return true;
    }catch(e) {
        console.log(e)
    }
    return false;
}

export async function addItem(collection, uri, royalty, chainId, provider) {
    const collectionContract = getCollectionContract(collection, chainId, provider);
    const BoatsailNFTContractInfo = getContractInfo('BoatsailNFT', chainId);
    try {
        const tx = await collectionContract.mintTo(uri,royalty)
        // const receipt = await tx.wait(2);
        // if(receipt.confirmations) {
        //     const interf = new ethers.utils.Interface(BoatsailNFTContractInfo.abi);
        //     const logs = receipt.logs;
        //     let tokenId = 0;
        //     for(let index = 0; index < logs.length; index ++) {
        //       const log = logs[index];
        //       if(collection.toLowerCase() === log.address.toLowerCase()) {
        //         tokenId = interf.parseLog(log).args.tokenId.toNumber();
        //         return tokenId;
        //       }
        //     }
        // }
        return true;
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



export async function listItem(collection, owner, token_id, price, chainId, provider) {
    const marketContract = getContractObj('BoatsailMarket', chainId, provider);
    const marketContractInfo = getContractInfo('BoatsailMarket', chainId);
    if (!marketContract || !marketContractInfo) return false
    try {
        let isApproved = await isNFTApprovedForMarket(collection, owner, chainId, provider);
        if(!isApproved) {
            isApproved = await setNFTApprovalForMarket(collection, true, chainId, provider);            
        }
        if (isApproved) {
            const tx =  await marketContract.list(collection, token_id, '0x0', ethers.utils.parseEther(price));
            const receipt = await tx.wait(2);
            if(receipt.confirmations) {
                const interf = new ethers.utils.Interface(marketContractInfo.abi);
                const logs = receipt.logs;
                let pairId  = 0;
                for(let index = 0; index < logs.length; index ++) {
                    const log = logs[index];
                    if(marketContractInfo.address.toLowerCase() === log.address.toLowerCase()) {
                        pairId = interf.parseLog(log).args.id.toString();
                        return pairId;
                    }
                }
            }
        }               
        return false;
    }catch(e) {
        console.log(e);
        return false;
    }
}

export async function delistItem(id, chainId, provider) {
    const marketContract = getContractObj('BoatsailMarket', chainId, provider);
    if (!marketContract) return false
    try {
      const tx = await marketContract.delist(id)
      await tx.wait(2)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
}


/**
 * Auction Contract Management
 */
 export async function createAuction(collection, owner, token_id, startPrice, startTime, endTime, chainId, provider) {
    const auctionContract = getContractObj('BoatsailAuction', chainId, provider);
    const auctionContractInfo = getContractInfo('BoatsailAuction', chainId);
    if (!auctionContract || !auctionContractInfo) return false
    try {
        let isApproved = await isNFTApprovedForAuction(collection, owner, chainId, provider);
        if(!isApproved) {
            isApproved = await setNFTApprovalForAuction(collection, true, chainId, provider);            
        }
        if (isApproved) {
            const tx =  await auctionContract.createAuction(collection, token_id, "0x0", ethers.utils.parseEther(startPrice),startTime,endTime);
            const receipt = await tx.wait(2);
            if(receipt.confirmations) {
                return true
            }
        }               
        return false;
    }catch(e) {
        console.log(e);
        return false;
    }
}

export async function finalizeAuction(id, chainId, provider) {
    const auctionContract = getContractObj('BoatsailAuction', chainId, provider)
    if (!auctionContract) return false
    try {
      const tx = await auctionContract.finalizeAuction(id)
      await tx.wait(2)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
}
  
export async function bidOnAuction(account, id, price, chainId, provider) {
    const auctionContract = getContractObj('BoatsailAuction', chainId, provider)
    try {
        const tx = await auctionContract.bidOnAuction(id, ethers.utils.parseEther(price))
        await tx.wait(2)
        return true      
    } catch (e) {
      console.log(e)
      return false
    }
}