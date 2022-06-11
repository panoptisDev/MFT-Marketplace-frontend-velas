import { Link } from "react-router-dom";
import { data } from "./data";
import "./styles.css";

const NFTsSteps = () => {
  return (
    <div className="NFTsSteps-container">
      <div className="NFTsSteps">
        {data.map((item, index) => (
          <div key={index} className="detailed-item">
            <img src={item.img} alt="" />
            <Link to="/">{item.head}</Link>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTsSteps;
