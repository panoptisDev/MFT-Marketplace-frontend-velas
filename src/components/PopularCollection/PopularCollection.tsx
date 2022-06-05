import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import Title from "../Title/Title";
import "./styles.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import avt from "../../assets/images/avt-15.jpg";
import collectionItem from "../../assets/images/collection-item.png";
import collectionImage from "../../assets/images/collection-image.jpg";
import Likes from "../Likes/Likes";

export const NextArrow = ({ onClick }: any) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight className="right-direction" name="angle right" />
    </div>
  );
};

export const PrevArrow = ({ onClick }: any) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft className="left-direction" name="angle left" />
    </div>
  );
};
const PopularCollection = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: true,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };
  const data = [
    { name: "Ralf Garraway" },
    { name: "Ralf Garraway" },
    { name: "Ralf Garraway" },
    { name: "Ralf Garraway" },
    { name: "Ralf Garraway" },
    { name: "Ralf Garraway" },
  ];
  return (
    <div className="popular-collection">
      <Title title="Popular Collection" />
      <div className="popular-collection-container">
        <Slider className="slider-container" {...settings}>
          {data.map((item, index) => (
            <div key={index} className="pop-collection-card">
              <div className="top-pop-card">
                <img src={collectionItem} alt="" />
              </div>
              <div className="middle-pop-card">
                <img src={collectionImage} alt="" />
                <img src={collectionImage} alt="" />
                <img src={collectionImage} alt="" />
              </div>
              <div className="bottom-pop-card">
                <div className="popular">
                  <img src={avt} alt="" />
                  <div>
                    <AiOutlineCheck />
                  </div>
                </div>
                <div className="likes-content">
                  <div className="content">
                    <Link to="/">Creative Art Collection</Link>
                    <div>
                      <span>Created by</span>
                      <Link to="/">{item.name}</Link>
                    </div>
                  </div>
                  <Likes popularCollection={true} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PopularCollection;
