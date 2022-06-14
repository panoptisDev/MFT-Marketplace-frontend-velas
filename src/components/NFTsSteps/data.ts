import wallet from "../../assets/images/wallet.png";
import menu from "../../assets/images/menu.png";
import image from "../../assets/images/image.png";
import tag from "../../assets/images/tag.png";

interface DataTypes {
  data: {
    head: string;
    img?: string;
    title?: string;
  }[];
}
export const data: DataTypes["data"] = [
  {
    head: "Set Up Your Wallet",
    img: wallet,
    title:
      "Once you’ve set up your wallet of choice, connect it to Boatsail by clicking the NFT Marketplacein the top right corner.",
  },
  {
    head: "Create Your Collection",
    img: menu,
    title: `Click Create and set up your collection. Add social links, a description, profile & banner images, and
  set a secondary sales fee.`,
  },
  {
    head: "Add Your NFTs",
    img: image,
    title: `Upload your work (image, video, audio, or 3D art), add a title and description, and customize your
  NFTs with properties, stats`,
  },
  {
    head: "List Them For Sale",
    img: tag,
    title: `Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs!`,
  },
];
