import "./styles.css";
import { GoRocket } from "react-icons/go";
import { GiFiles } from "react-icons/gi";
import Button from "../MoreComponents/Button";
const Banner = () => {
  return (
    <div className="banner">
      <h1>
        Discover, and collect <br />
        <span>extraordinary</span> Monster NFTs
      </h1>
      <span>
        Marketplace for Monster Character Collections Non Fungible Token NFTs
      </span>
      <div className="banner-btns">
        <Button
          icon={<GoRocket />}
          label="Explore"
          bannerBtn={true}
          className="explore"
        />
        <Button
          icon={<GiFiles />}
          label="Create"
          bannerBtn={true}
          className="explore"
        />
      </div>
    </div>
  );
};

export default Banner;
