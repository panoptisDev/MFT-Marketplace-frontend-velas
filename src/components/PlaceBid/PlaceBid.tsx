import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import avt from "../../assets/images/avt-8.jpg";
import Timer from "../timer/Timer";
import Button from "../MoreComponents/Button";
import { Col, Container, Nav, Row, Tab, Tabs } from "react-bootstrap";
import BidHistory from "../MoreComponents/BidHistory";
import BidModal from "../connectModal/BidModal";

const OwnedCreatedBy = ({ name, title, styles }: any) => {
  return (
    <div className="owned-created-by">
      <img src={avt} alt="" />
      <div>
        <span>{title}</span>
        <Link to="/">{name}</Link>
      </div>
    </div>
  );
};

const PlaceBid = () => {
  return (
    <div className="place-bid-on-item">
      <h1>“The Fantasy Flower illustration ”</h1>
      <div className="place-bid-top">
        <OwnedCreatedBy name="Ralf Garraway" title="Owned By" />
        <br />
        <OwnedCreatedBy name="Ralf Garraway" title="Created By" />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
        delectus, illum doloremque quos aspernatur odit optio aperiam, quod
        quisquam pariatur temporibus. Deleniti rerum omnis, minima consequatur
        cum maxime officia repudiandae.
      </p>
      <div className="countdown-bid-price">
        <div className="countdown-bid-price-div">
          <span>Current Bid</span>
          <span>
            <strong> 4.89 ETH </strong> <small> = $12.246</small>
          </span>
        </div>
        <Timer mintStartAt={1657886400} itemDetails={true} />
      </div>
      <br />
      <br />
      <BidModal />
      {/* <Button /> */}
      <div className="place-bid-nav-items">
        <Tab.Container defaultActiveKey="bid-history">
          <Nav className="place-bid-nav-item-container">
            <Nav.Item>
              <Nav.Link eventKey="bid-history" className="title-font">
                Bid History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="info" className="title-font">
                Info
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="provenance" className="title-font">
                Provenance
              </Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link eventKey="details" className="title-font">
                Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="about" className="title-font">
                About
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="properties" className="title-font">
                Properties
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stats" className="title-font">
                Stats
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="level" className="title-font">
                Level
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="items-container-tabs">
            <Tab.Pane eventKey="bid-history">
              <div className="place-bid-data-detail">
                <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="info">
              <div className="place-bid-data-detail">
                <BidHistory />
              </div>
            </Tab.Pane>
            {/* <Tab.Pane eventKey="provenance">
              <div className="place-bid-data-detail">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </Tab.Pane> */}
            <Tab.Pane eventKey="about">
              <div className="place-bid-data-detail">
                <p>About</p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="details">
              <div className="place-bid-data-detail">
                <p>Details</p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="stats">
              <div className="place-bid-data-detail">
                <p>Stats</p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="level">
              <div className="place-bid-data-detail">
                <p>Level</p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="properties">
              <div className="place-bid-data-detail">
                <p>Properties</p>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default PlaceBid;
