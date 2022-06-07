import "./styles.css";
import { GoRocket } from "react-icons/go";
import { GiFiles } from "react-icons/gi";
import Button from "../MoreComponents/Button";
import { useHistory } from "react-router-dom";
const Banner = () => {
  const history = useHistory();
  const goToCreate = () => {
    history.push("/Collection/Create");
  };
  const goToExplore = () => {
    history.push("/Explore");
  };
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
          onClick={goToExplore}
          icon={<GoRocket />}
          label="Explore"
          bannerBtn={true}
          className="explore"
        />
        <Button
          icon={<GiFiles />}
          onClick={goToCreate}
          label="Create"
          bannerBtn={true}
          className="explore"
        />
      </div>
    </div>
  );
};

export default Banner;
