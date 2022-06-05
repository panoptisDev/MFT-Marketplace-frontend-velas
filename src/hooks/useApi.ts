import { useEffect, useState } from "react";
import { baseApiUrl } from "../utils";

/* eslint-disable camelcase */

export interface NFTTranaction {
  timestamp?: number;
  txhash?: string;
  itemCollection?: string;
  tokenId?: number;
  from?: string;
  to?: string;
  price?: number;
}

export interface NFTItem {
  itemCollection?: string;
  tokenId?: number;

  timestamp?: number;
  owner?: string;
  itemOwner?: string;

  name?: string;
  description?: string;
  image?: string;

  bValid?: boolean;
  pairId?: string;
  price?: number;
  listTimestamp?: number;

  tranactions?: NFTTranaction[];

  Background?: string;
  Skin?: string;
  Outfit?: string;
  Hair?: string;
  Face?: string;
  Eyes?: string;
  Hands?: string;
  ["Rarity Score"]?: string;
  Rarity?: string;

  level?: number;
  prestige?: number;
  strength?: number;
  agility?: number;
  stamina?: number;
  intelligence?: number;
  productivity?: number;
}

export interface NFTMarketStatus {
  totalSales?: number;
  totalVolumn?: number;
  highestPrice?: number;

  CommonVolumn?: number;
  RareVolumn?: number;
  EpicVolumn?: number;
  ExceptionalVolumn?: number;
  LegendaryVolumn?: number;
}

export const useGetItemsOfOwner = (ownerAddress: string) => {
  const [data, setData] = useState<NFTItem[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ownerAddress && ownerAddress.length > 0) {
          const strUrl = `${baseApiUrl}/items/${ownerAddress}`;
          const response = await fetch(strUrl);
          if (response.status === 200) {
            const responseData = await response.json();
            const nftObjectList: NFTItem[] = responseData;
            setData(nftObjectList);
          }
        }
      } catch (error) {
        console.error("Unable to fetch data:", error);
      }
    };

    fetchData();
  }, [setData, ownerAddress]);

  return data;
};

export const useGetAllItems = () => {
  const [data, setData] = useState<NFTItem[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/items`;
        const response = await fetch(strUrl);
        if (response.status === 200) {
          const responseData = await response.json();
          const nftObjectList: NFTItem[] = responseData;
          setData(nftObjectList);
        }
      } catch (error) {
        console.error("Unable to fetch data:", error);
      }
    };

    fetchData();
  }, [setData]);

  return data;
};

export const useGetTranactions = (limit?: number) => {
  const [data, setData] = useState<NFTTranaction[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/tranactions?limit=${limit}`;
        const response = await fetch(strUrl);
        if (response.status === 200) {
          const responseData = await response.json();
          const nftObjectList: NFTTranaction[] = responseData;
          setData(nftObjectList);
        }
      } catch (error) {
        console.error("Unable to fetch data:", error);
      }
    };

    fetchData();
  }, [setData, limit]);

  return data;
};

export const useGetMarketStatus = () => {
  const [data, setData] = useState<NFTMarketStatus>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/marketStatus`;
        const response = await fetch(strUrl);
        if (response.status === 200) {
          const responseData = await response.json();
          const nftObjectList: NFTMarketStatus = responseData;
          setData(nftObjectList);
        }
      } catch (error) {
        console.error("Unable to fetch data:", error);
      }
    };

    fetchData();
  }, [setData]);

  return data;
};
