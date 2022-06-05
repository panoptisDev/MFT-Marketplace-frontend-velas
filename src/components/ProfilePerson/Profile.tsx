import React, { useState } from "react";
import "./styles.css";
import author from "../../assets/images/author.jpg";

import {
  FaCopy,
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Button from "../MoreComponents/Button";

const Profile = () => {
  const [first, setfirst] = useState("Dweqwfqweqghtrjasfajtrsaweq");

  return (
    <div className="profile">
      <div style={{ display: "flex" }}>
        <img src={author} alt="" />
        <div className="author-details">
          <span>Author Profile</span>
          <h2>Trista Francis</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis culpa vitae praesentium tempora repudiandae nemo officia
            repellat ex,
          </p>
          <div className="input-copy-address">
            <input type="text" readOnly placeholder={first} />
            <FaCopy onClick={() => navigator.clipboard.writeText(first)} />
          </div>
        </div>
      </div>
      <div className="author-social-contact">
        <Button className="follow-btn-btn" label="Follow" />

        <div className="author-social-icon">
          <FaTwitter />
        </div>
        <div className="author-social-icon">
          <FaTelegramPlane />
        </div>
        <div className="author-social-icon">
          <FaYoutube />
        </div>
        <div className="author-social-icon">
          <FaTiktok />
        </div>
      </div>
    </div>
  );
};

export default Profile;
