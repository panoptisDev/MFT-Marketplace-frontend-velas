import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import "./styles.css";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`/users`)
      .then((res) => {
        setSellers(res.data.users);
      })
      .catch((err) => {
        console.log("Err : ", err.message);
        setSellers([]);
      });
  });

  return (
    <div className="top-sellers">
      <Title title="Top Seller" />
      <div className="sellers">
        {sellers &&
          sellers.map((user, index) => (
            <div key={index} className="each-seller">
              <div className="seller-left">
                <img src={user.logo_url}></img>
              </div>
              <div className="seller-right">
                <Link to="/">
                  <h6>{user.name}</h6>
                </Link>
                <span>{"0"} ETH</span>
              </div>
              <div></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopSellers;
