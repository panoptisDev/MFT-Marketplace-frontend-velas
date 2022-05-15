import "@ethersproject/shims"
import { BigNumber, Contract, ethers } from "ethers";
import toast from "react-hot-toast";
import { currentNetwork, getContractObj, getContractObjWithAddress } from ".";
import { NFTMintEngineDetail, NFTTrainingEngineDetail, StakingEngineDetail, VotingEngineDetail } from "./typs";

import FreeMap from "./FreeMap.json";
import WhiteListMap from "./WhiteListMap.json";
import { RPC_URLS } from "./connectors";
import ZoneABI from 'contracts/Zone.json'

/**------------------------- MINT -------------------------- */

export async function freeMint(chainId, provider, account, numberOfTokens) {
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        const index = FreeMap.claims[account]?.index;
        const amount = FreeMap.claims[account]?.amount;
        const proof = FreeMap.claims[account]?.proof;

        if (index === undefined || amount === undefined) {
            toast.error("You are not registered to free list.");
            return false;
        }

        var big_index: BigNumber = BigNumber.from(index);
        var big_amount: BigNumber = BigNumber.from(amount);

        const tx = await StreetBrawlerzContract.freeMint(numberOfTokens, big_index, big_amount, proof);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function whitelistMint(chainId, provider, account, numberOfTokens) {
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        var nftPrice: BigNumber = await StreetBrawlerzContract.WL_MINT_COST();

        const index = WhiteListMap.claims[account]?.index;
        const amount = WhiteListMap.claims[account]?.amount;
        const proof = WhiteListMap.claims[account]?.proof;

        if (index === undefined || amount === undefined) {
            toast.error("You are not registered to whitelist.");
            return false;
        }

        var big_index: BigNumber = BigNumber.from(index);
        var big_amount: BigNumber = BigNumber.from(amount);

        const tx = await StreetBrawlerzContract.whitelistMint(numberOfTokens, big_index, big_amount, proof, {
            value: nftPrice.mul(numberOfTokens)
        });
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function normalMint(chainId, provider, account, numberOfTokens) {
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        var nftPrice: BigNumber = await StreetBrawlerzContract.MINT_COST();

        const tx = await StreetBrawlerzContract.normalMint(numberOfTokens, {
            value: nftPrice.mul(numberOfTokens)
        });
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function changeBrawlerName(chainId, provider, account, tokenId, newName) {
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    const FightContract = getContractObj('Fight', chainId, provider);
    try {
        const curOwner = await StreetBrawlerzContract.ownerOf(tokenId);

        if (curOwner === account) return false;

        const ZoneContract = new Contract(curOwner, ZoneABI, provider);

        const updateNameFee = await StreetBrawlerzContract.nameFee();

        const fightAllowance: BigNumber = await FightContract.allowance(account, ZoneContract.address);

        if (fightAllowance.lt(updateNameFee)) {
            const tx1 = await FightContract.approve(ZoneContract.address, ethers.constants.MaxUint256);
            await tx1.wait(1);
        }

        const tx = await ZoneContract.changeBrawlerName(tokenId, newName, false);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function levelUp(chainId, provider, account, tokenId) {
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    const FightContract = getContractObj('Fight', chainId, provider);
    try {
        const curOwner = await StreetBrawlerzContract.ownerOf(tokenId);

        if (curOwner === account) return false;

        const ZoneContract = new Contract(curOwner, ZoneABI, provider);

        const brawler = await StreetBrawlerzContract.brawlers(tokenId);
        const curLevel = brawler.level;
        const levelUpCost = await ZoneContract.getLevelUpCost(curLevel);

        const fightAllowance: BigNumber = await FightContract.allowance(account, ZoneContract.address);

        if (fightAllowance.lt(levelUpCost)) {
            const tx1 = await FightContract.approve(ZoneContract.address, ethers.constants.MaxUint256);
            await tx1.wait(1);
        }

        const tx = await ZoneContract.levelUp(tokenId, false);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getLevelUpCost(currentLevel) {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);
    const ZoneContract = getContractObj('Aikido', currentNetwork, jsonProvider);
    try {
        const levelUpCost = await ZoneContract.getLevelUpCost(currentLevel);
        return parseFloat(ethers.utils.formatEther(levelUpCost));
    } catch (e) {
        console.log(e);
        return 0;
    }
}

export async function getNameUpdateCost() {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', currentNetwork, jsonProvider);
    try {
        const updateNameFee = await StreetBrawlerzContract.nameFee();
        return parseFloat(ethers.utils.formatEther(updateNameFee));
    } catch (e) {
        console.log(e);
        return 0;
    }
}

export async function getFightBalance(account) {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);
    const FightContract = getContractObj('Fight', currentNetwork, jsonProvider);
    try {
        const fightBalance = await FightContract.balanceOf(account);
        return parseFloat(ethers.utils.formatEther(fightBalance));
    } catch (e) {
        console.log(e);
        return 0;
    }
}


export async function getEngineInfo() {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', currentNetwork, jsonProvider);
    try {
        const [
            totalSupply,
            maxSupply,
            ownerAddress,
            cost,
            whitelistCost,
        ] = await Promise.all([
            StreetBrawlerzContract.brawlersLength(),
            StreetBrawlerzContract.MAX_SUPPLY(),
            StreetBrawlerzContract.owner(),
            StreetBrawlerzContract.MINT_COST(),
            StreetBrawlerzContract.WL_MINT_COST()
        ]);



        const nftMintDetail: NFTMintEngineDetail = {
            totalSupply: totalSupply.toNumber(),
            maxSupply: maxSupply.toNumber(),
            ownerAddress: ownerAddress.toString(),
            cost: parseFloat(ethers.utils.formatEther(cost)),
            whitelistCost: parseFloat(ethers.utils.formatEther(whitelistCost)),
        }

        return nftMintDetail;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**------------------------- MARKET -------------------------- */
export async function isNFTApprovedForMarket(collection: string, account: any, chainId: any, provider: ethers.Signer | ethers.providers.Provider) {
    const MarketContract = getContractObj('Market', chainId, provider);
    const nftToken = getContractObjWithAddress('StreetBrawlerz', chainId, provider, collection);

    return await nftToken.isApprovedForAll(account, MarketContract.address);
}
export async function setNFTApprovalForMarket(collection: string, approved: any, chainId: any, provider: ethers.Signer | ethers.providers.Provider) {
    const MarketContract = getContractObj('Market', chainId, provider);
    const nftToken = getContractObjWithAddress('StreetBrawlerz', chainId, provider, collection);
    try {
        const tx = await nftToken.setApprovalForAll(MarketContract.address, approved);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}


export async function scListToMarket(chainId, provider, account, collection, tokenId, price) {
    const MarketContract = getContractObj('Market', chainId, provider);
    try {
        let isApproved = await isNFTApprovedForMarket(collection, account, chainId, provider);
        if (!isApproved) {
            isApproved = await setNFTApprovalForMarket(collection, true, chainId, provider);
        }
        if (isApproved) {
            const tx = await MarketContract.list(collection, tokenId, price);
            await tx.wait(1);
        }

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


export async function scDelistFromMarket(chainId, provider, pairId) {
    const MarketContract = getContractObj('Market', chainId, provider);
    try {
        const tx = await MarketContract.delist(pairId);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function scUpdatePrice(chainId, provider, pairId, price) {
    const MarketContract = getContractObj('Market', chainId, provider);
    try {
        const tx = await MarketContract.updatePrice(pairId, price);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function scBuy(chainId, provider, pairId) {
    const MarketContract = getContractObj('Market', chainId, provider);
    try {
        const pair = await MarketContract.pairs(pairId);
        const pairPrice = pair.price;
        const tx = await MarketContract.buy(pairId, {
            value: pairPrice
        });
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**------------------------------ TRAINING (NFT STAKING) ---------------------------------- */


export async function getTrainingInfo(account) {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);

    const AikidoContract = getContractObj('Aikido', currentNetwork, jsonProvider);
    const BoxingContract = getContractObj('Boxing', currentNetwork, jsonProvider);
    const JiuJitsuContract = getContractObj('JiuJitsu', currentNetwork, jsonProvider);
    const KarateContract = getContractObj('Karate', currentNetwork, jsonProvider);
    const MuayThaiContract = getContractObj('MuayThai', currentNetwork, jsonProvider);
    const KravMagaContract = getContractObj('KravMaga', currentNetwork, jsonProvider);
    try {
        const [
            AikidoReward,
            BoxingReward,
            JiuJitsuReward,
            KarateReward,
            MuayThaiReward,
            KravMagaReward,
        ] = await Promise.all([
            account ? AikidoContract.claimable(account) : BigNumber.from(0),
            account ? BoxingContract.claimable(account) : BigNumber.from(0),
            account ? JiuJitsuContract.claimable(account) : BigNumber.from(0),
            account ? KarateContract.claimable(account) : BigNumber.from(0),
            account ? MuayThaiContract.claimable(account) : BigNumber.from(0),
            account ? KravMagaContract.claimable(account) : BigNumber.from(0),
        ]);


        const nftTrainingDetail: NFTTrainingEngineDetail = {
            AikidoReward: parseFloat(ethers.utils.formatEther(AikidoReward)),
            BoxingReward: parseFloat(ethers.utils.formatEther(BoxingReward)),
            JiuJitsuReward: parseFloat(ethers.utils.formatEther(JiuJitsuReward)),
            KarateReward: parseFloat(ethers.utils.formatEther(KarateReward)),
            MuayThaiReward: parseFloat(ethers.utils.formatEther(MuayThaiReward)),
            KravMagaReward: parseFloat(ethers.utils.formatEther(KravMagaReward)),

            AikidoAddress: AikidoContract.address,
            BoxingAddress: BoxingContract.address,
            JiuJitsuAddress: JiuJitsuContract.address,
            KarateAddress: KarateContract.address,
            MuayThaiAddress: MuayThaiContract.address,
            KravMagaAddress: KravMagaContract.address,
        }

        return nftTrainingDetail;
    } catch (e) {
        console.log(e);
        return null;
    }
}

////////// STAKING ///////////

export async function enterAikido(chainId, provider, account, tokenIds) {
    const AikidoContract = getContractObj('Aikido', chainId, provider);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        const isApproved: Boolean = await StreetBrawlerzContract.isApprovedForAll(account, AikidoContract.address);
        if (!isApproved) {
            const tx1 = await StreetBrawlerzContract.setApprovalForAll(AikidoContract.address, true);
            await tx1.wait(1);
        }
        const tx = await AikidoContract.enter(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function enterBoxing(chainId, provider, account, tokenIds) {
    const BoxingContract = getContractObj('Boxing', chainId, provider);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        const isApproved: Boolean = await StreetBrawlerzContract.isApprovedForAll(account, BoxingContract.address);
        if (!isApproved) {
            const tx1 = await StreetBrawlerzContract.setApprovalForAll(BoxingContract.address, true);
            await tx1.wait(1);
        }
        const tx = await BoxingContract.enter(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function enterJiuJitsu(chainId, provider, account, tokenIds) {
    const JiuJitsuContract = getContractObj('JiuJitsu', chainId, provider);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        const isApproved: Boolean = await StreetBrawlerzContract.isApprovedForAll(account, JiuJitsuContract.address);
        if (!isApproved) {
            const tx1 = await StreetBrawlerzContract.setApprovalForAll(JiuJitsuContract.address, true);
            await tx1.wait(1);
        }
        const tx = await JiuJitsuContract.enter(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function enterKarate(chainId, provider, account, tokenIds) {
    const KarateContract = getContractObj('Karate', chainId, provider);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        const isApproved: Boolean = await StreetBrawlerzContract.isApprovedForAll(account, KarateContract.address);
        if (!isApproved) {
            const tx1 = await StreetBrawlerzContract.setApprovalForAll(KarateContract.address, true);
            await tx1.wait(1);
        }
        const tx = await KarateContract.enter(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function enterMuayThai(chainId, provider, account, tokenIds) {
    const MuayThaiContract = getContractObj('MuayThai', chainId, provider);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        const isApproved: Boolean = await StreetBrawlerzContract.isApprovedForAll(account, MuayThaiContract.address);
        if (!isApproved) {
            const tx1 = await StreetBrawlerzContract.setApprovalForAll(MuayThaiContract.address, true);
            await tx1.wait(1);
        }
        const tx = await MuayThaiContract.enter(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function enterKravMaga(chainId, provider, account, tokenIds) {
    const KravMagaContract = getContractObj('KravMaga', chainId, provider);
    const StreetBrawlerzContract = getContractObj('StreetBrawlerz', chainId, provider);
    try {
        const isApproved: Boolean = await StreetBrawlerzContract.isApprovedForAll(account, KravMagaContract.address);
        if (!isApproved) {
            const tx1 = await StreetBrawlerzContract.setApprovalForAll(KravMagaContract.address, true);
            await tx1.wait(1);
        }
        const tx = await KravMagaContract.enter(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

////////// UNSTAKE ///////////

export async function exitAikido(chainId, provider, tokenIds) {
    const AikidoContract = getContractObj('Aikido', chainId, provider);
    try {
        const tx = await AikidoContract.exit(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function exitBoxing(chainId, provider, tokenIds) {
    const BoxingContract = getContractObj('Boxing', chainId, provider);
    try {
        const tx = await BoxingContract.exit(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function exitJiuJitsu(chainId, provider, tokenIds) {
    const JiuJitsuContract = getContractObj('JiuJitsu', chainId, provider);
    try {
        const tx = await JiuJitsuContract.exit(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function exitKarate(chainId, provider, tokenIds) {
    const KarateContract = getContractObj('Karate', chainId, provider);
    try {
        const tx = await KarateContract.exit(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function exitMuayThai(chainId, provider, tokenIds) {
    const MuayThaiContract = getContractObj('MuayThai', chainId, provider);
    try {
        const tx = await MuayThaiContract.exit(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function exitKravMaga(chainId, provider, tokenIds) {
    const KravMagaContract = getContractObj('KravMaga', chainId, provider);
    try {
        const tx = await KravMagaContract.exit(tokenIds);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

////////// CLAIM REWARD ///////////

export async function claimAikidoReward(chainId, provider) {
    const AikidoContract = getContractObj('Aikido', chainId, provider);
    try {
        const tx = await AikidoContract.claim();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function claimBoxingReward(chainId, provider) {
    const BoxingContract = getContractObj('Boxing', chainId, provider);
    try {
        const tx = await BoxingContract.claim();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function claimJiuJitsuReward(chainId, provider) {
    const JiuJitsuContract = getContractObj('JiuJitsu', chainId, provider);
    try {
        const tx = await JiuJitsuContract.claim();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function claimKarateReward(chainId, provider) {
    const KarateContract = getContractObj('Karate', chainId, provider);
    try {
        const tx = await KarateContract.claim();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function claimMuayThaiReward(chainId, provider) {
    const MuayThaiContract = getContractObj('MuayThai', chainId, provider);
    try {
        const tx = await MuayThaiContract.claim();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function claimKravMagaReward(chainId, provider) {
    const KravMagaContract = getContractObj('KravMaga', chainId, provider);
    try {
        const tx = await KravMagaContract.claim();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


/**------------------------------ TOKEN STAKING ---------------------------------- */

export async function getFightStakingInfo(account) {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);

    const FightContract = getContractObj('Fight', currentNetwork, jsonProvider);
    const veFightContract = getContractObj('veFight', currentNetwork, jsonProvider);

    try {
        const [
            FightStakable,
            FightStaked,
            veFightBalance,
            genDetails
        ] = await Promise.all([
            account ? FightContract.balanceOf(account) : BigNumber.from(0),
            account ? veFightContract.fightBalanceOf(account) : BigNumber.from(0),
            account ? veFightContract.balanceOf(account) : BigNumber.from(0),
            veFightContract.genDetails(),
        ]);

        const floatFightStaked = parseFloat(ethers.utils.formatEther(FightStaked));
        const veFightMaxEarn = floatFightStaked * genDetails.maxRatio.toNumber();
        const veFightEarnPerHour = floatFightStaked * genDetails.generationRateNumerator.toNumber() / 1000;

        const stakingDetail: StakingEngineDetail = {
            FightStakable: parseFloat(ethers.utils.formatEther(FightStakable)),
            FightStaked: floatFightStaked,
            veFightBalance: parseFloat(ethers.utils.formatEther(veFightBalance)),
            veFightMaxEarn: veFightMaxEarn,
            veFightEarnPerHour: veFightEarnPerHour,
        }

        return stakingDetail;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function depositFight(chainId, provider, account, amount) {
    const FightContract = getContractObj('Fight', chainId, provider);
    const veFightContract = getContractObj('veFight', chainId, provider);
    try {
        const fightAllowance: BigNumber = await FightContract.allowance(account, veFightContract.address);

        if (fightAllowance.lt(amount)) {
            const tx1 = await FightContract.approve(veFightContract.address, ethers.constants.MaxUint256);
            await tx1.wait(1);
        }

        const tx = await veFightContract.deposit(amount);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function withdrawFight(chainId, provider, amount) {
    const veFightContract = getContractObj('veFight', chainId, provider);
    try {
        const tx = await veFightContract.withdraw(amount);
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


/**------------------------------ VOTING ---------------------------------- */


export async function getVotingInfo() {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);

    const AikidoContract = getContractObj('Aikido', currentNetwork, jsonProvider);
    const BoxingContract = getContractObj('Boxing', currentNetwork, jsonProvider);
    const JiuJitsuContract = getContractObj('JiuJitsu', currentNetwork, jsonProvider);
    const KarateContract = getContractObj('Karate', currentNetwork, jsonProvider);
    const MuayThaiContract = getContractObj('MuayThai', currentNetwork, jsonProvider);
    const KravMagaContract = getContractObj('KravMaga', currentNetwork, jsonProvider);

    const BallotContract = getContractObj('Ballot', currentNetwork, jsonProvider);

    try {
        const [
            AikidoVotes,
            BoxingVotes,
            JiuJitsuVotes,
            KarateVotes,
            MuayThaiVotes,
            KravMagaVotes,
            countReward
        ] = await Promise.all([
            BallotContract.zonesVotes(AikidoContract.address),
            BallotContract.zonesVotes(BoxingContract.address),
            BallotContract.zonesVotes(JiuJitsuContract.address),
            BallotContract.zonesVotes(KarateContract.address),
            BallotContract.zonesVotes(MuayThaiContract.address),
            BallotContract.zonesVotes(KravMagaContract.address),
            BallotContract.countReward(),
        ]);

        const votingDetail: VotingEngineDetail = {
            AikidoVotes: parseFloat(ethers.utils.formatEther(AikidoVotes)),
            BoxingVotes: parseFloat(ethers.utils.formatEther(BoxingVotes)),
            JiuJitsuVotes: parseFloat(ethers.utils.formatEther(JiuJitsuVotes)),
            KarateVotes: parseFloat(ethers.utils.formatEther(KarateVotes)),
            MuayThaiVotes: parseFloat(ethers.utils.formatEther(MuayThaiVotes)),
            KravMagaVotes: parseFloat(ethers.utils.formatEther(KravMagaVotes)),
            countReward: parseFloat(ethers.utils.formatEther(countReward)),
        }

        return votingDetail;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function voteCount(chainId, provider) {
    const BallotContract = getContractObj('Ballot', chainId, provider);
    try {
        const tx = await BallotContract.count();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function vote(chainId, provider, category: string, amount, recount: boolean) {
    try {
        console.log(category, amount, recount);
        if (category === "Aikido") {
            const ZoneContract = getContractObj('Aikido', chainId, provider);
            const tx = await ZoneContract.vote(amount, recount);
            await tx.wait(1);
        } else if (category === "Boxing") {
            const ZoneContract = getContractObj('Boxing', chainId, provider);
            const tx = await ZoneContract.vote(amount, recount);
            await tx.wait(1);
        } else if (category === "JiuJitsu") {
            const ZoneContract = getContractObj('JiuJitsu', chainId, provider);
            const tx = await ZoneContract.vote(amount, recount);
            await tx.wait(1);
        } else if (category === "Karate") {
            const ZoneContract = getContractObj('Karate', chainId, provider);
            const tx = await ZoneContract.vote(amount, recount);
            await tx.wait(1);
        } else if (category === "MuayThai") {
            const ZoneContract = getContractObj('MuayThai', chainId, provider);
            const tx = await ZoneContract.vote(amount, recount);
            await tx.wait(1);
        } else if (category === "KravMaga") {
            const ZoneContract = getContractObj('KravMaga', chainId, provider);
            const tx = await ZoneContract.vote(amount, recount);
            await tx.wait(1);
        } else {
            return false;
        }

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


export async function unvote(chainId, provider, category: string, amount, recount: boolean) {
    try {
        if (category === "Aikido") {
            const ZoneContract = getContractObj('Aikido', chainId, provider);
            const tx = await ZoneContract.unvote(amount, recount);
            await tx.wait(1);
        } else if (category === "Boxing") {
            const ZoneContract = getContractObj('Boxing', chainId, provider);
            const tx = await ZoneContract.unvote(amount, recount);
            await tx.wait(1);
        } else if (category === "JiuJitsu") {
            const ZoneContract = getContractObj('JiuJitsu', chainId, provider);
            const tx = await ZoneContract.unvote(amount, recount);
            await tx.wait(1);
        } else if (category === "Karate") {
            const ZoneContract = getContractObj('Karate', chainId, provider);
            const tx = await ZoneContract.unvote(amount, recount);
            await tx.wait(1);
        } else if (category === "MuayThai") {
            const ZoneContract = getContractObj('MuayThai', chainId, provider);
            const tx = await ZoneContract.unvote(amount, recount);
            await tx.wait(1);
        } else if (category === "KravMaga") {
            const ZoneContract = getContractObj('KravMaga', chainId, provider);
            const tx = await ZoneContract.unvote(amount, recount);
            await tx.wait(1);
        } else {
            return false;
        }

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}