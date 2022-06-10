import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Profile from "../../components/ProfilePerson/Profile";
import "./styles.css";
import { Col, Container, Nav, Row, Tab, Tabs } from "react-bootstrap";
import data from "../../utils/data";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Author = () => {
  return (
    <div className="author">
      {/* <PageHeader pageHeader="Author" /> */}
      <div className="author-page">
        <Profile />
      </div>
      <div className="profile-nav-items">
        <Tab.Container defaultActiveKey="all">
          <Nav className="nav-item-container">
            <Nav.Item>
              <Nav.Link eventKey="all" className="title-font">
                ALL
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="art" className="title-font">
                ART
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="music" className="title-font">
                MUSIC
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="collectibles" className="title-font">
                COLLECTIBLES
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sports" className="title-font">
                SPORTS
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="items-container-tabs">
            <Tab.Pane eventKey="all">
              <div className="author-data-collections">
                {data.map((item: any) => (
                  <EmptyCard item={item} />
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="art">
              <div className="author-data-collections">
                {data
                  .filter((item: any) => item.art)
                  .map((item: any) => (
                    <EmptyCard item={item} />
                  ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="music">
              <div className="author-data-collections">
                {data
                  .filter((item: any) => item.music)
                  .map((item: any) => (
                    <EmptyCard item={item} />
                  ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="collectibles">
              <div className="author-data-collections">
                {data
                  .filter((item: any) => item.collectibles)
                  .map((item: any) => (
                    <EmptyCard item={item} />
                  ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="sports">
              <div className="author-data-collections">
                {data
                  .filter((item: any) => item.sports)
                  .map((item: any) => (
                    <EmptyCard item={item} />
                  ))}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        {/* <div className="created-cards-container">
              {arr.map((item, indx) => (
                <div className="profile-cards">{item}</div>
              ))}
            </div> */}
      </div>
    </div>
  );
};

export default Author;
