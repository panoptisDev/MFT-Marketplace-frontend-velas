import React from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import Title from "../Title/Title";
import "./styles.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import data from "../../utils/data";
import { Link } from "react-router-dom";

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

// interface AuctionDataType {
//   Data: {
//     likes: number;
//     name: string;
//     currency: string;
//     price: string;
//     creator: string;
//     time: number;
//   }[];
// }

const LiveAuctions = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: true,
    arrows: false,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
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

  return (
    <div className="live-auction">
      {window.location.pathname === "/Item-Details" ? (
        <div className="live-auction-second-header">
          <h1>Live Auctions</h1>
          <Link to="/">EXPLORE MORE</Link>
        </div>
      ) : (
        <Title title="Live Auctions" />
      )}
      <Slider className="slider-container" {...settings}>
        {data.map((item: any, index: any) => (
          <AuctionCard item={item} TodayPick={false} />
        ))}
      </Slider>
      {/* </div> */}
    </div>
  );
};

export default LiveAuctions;
