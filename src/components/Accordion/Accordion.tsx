import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./styles.css";
import { SiOpslevel } from "react-icons/si";
import { ImStatsDots } from "react-icons/im";
import { AiFillPropertySafety } from "react-icons/ai";

const AccordionComponent = ({ loginStatus, account, item }: any) => {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <br />
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accordion-header">
          <SiOpslevel /> Levels
        </Accordion.Header>
        <Accordion.Body>
          <div className="col-div aic jcc w-100">
            {item.levels && item.levels.length > 0 ? (
              <div>
                {item.levels.map((level: any, key: any) => {
                  return (
                    <li key={key} className="with-border">
                      <div className="name">{level.name}</div>
                      <div className="value text-white">{level.value}</div>
                      <div className="value text-white">{level.total}</div>
                    </li>
                  );
                })}
              </div>
            ) : (
              <div />
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <ImStatsDots /> Stats
        </Accordion.Header>
        <Accordion.Body>
          <div className="col-div aic jcc w-100">
            {item.stats && item.stats.length > 0 ? (
              <div>
                {item.stats.map((stat: any, key: any) => {
                  return (
                    <li key={key} className="with-border">
                      <div className="name">{stat.name}</div>
                      <div className="value text-white">{stat.value}</div>
                      <div className="value text-white">{stat.total}</div>
                    </li>
                  );
                })}
              </div>
            ) : (
              <div />
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <AiFillPropertySafety /> Properties{" "}
        </Accordion.Header>
        <Accordion.Body>
          <div className="col-div aic jcc w-100">
            {item.properties && item.properties.length > 0 ? (
              <div>
                {item.properties.map((property: any, key: any) => {
                  return (
                    <li key={key} className="with-border">
                      <div className="name">{property.type}</div>
                      <div className="value text-white">{property.name}</div>
                    </li>
                  );
                })}
              </div>
            ) : (
              <div />
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <br />
    </Accordion>
  );
};

export default AccordionComponent;
