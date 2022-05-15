export interface NFTMintEngineDetail {
    totalSupply: number;
    maxSupply: number;
    ownerAddress: string;
    cost: number;
    whitelistCost: number;
}

export interface NFTTrainingEngineDetail {
    AikidoReward: number;
    BoxingReward: number;
    JiuJitsuReward: number;
    KarateReward: number;
    MuayThaiReward: number;
    KravMagaReward: number;

    AikidoAddress: string;
    BoxingAddress: string;
    JiuJitsuAddress: string;
    KarateAddress: string;
    MuayThaiAddress: string;
    KravMagaAddress: string;
}

export interface StakingEngineDetail {
    FightStakable: number;
    FightStaked: number;
    veFightBalance: number;
    veFightMaxEarn: number;
    veFightEarnPerHour: number;
}

export interface VotingEngineDetail {
    AikidoVotes: number;
    BoxingVotes: number;
    JiuJitsuVotes: number;
    KarateVotes: number;
    MuayThaiVotes: number;
    KravMagaVotes: number;

    countReward: number;
}