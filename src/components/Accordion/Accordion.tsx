import Accordion from "react-bootstrap/Accordion";
import "./styles.css";
import { SiOpslevel } from "react-icons/si";
import { ImStatsDots } from "react-icons/im";
import { AiFillPropertySafety } from "react-icons/ai";
import LevelsTable from "./StatsTable";
import PropertiesTable from "./PropertiesTable";

const AccordionComponent = ({ loginStatus, account, item }: any) => {
  console.log(item.levels, "This is it buddy");
  console.log(item, "This is it buddy");
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
                <LevelsTable item={item} />
                {/* {item.levels.map((level: any, key: any) => {
                  return (
                    <div key={key} className="with-border">
                      <li className="name">
                        <span>Level name: </span>
                        <strong>{level.name}</strong>
                      </li>
                      <li className="value text-white">
                        <span>Level value: </span>
                        <strong>{level.value}</strong>
                      </li>
                      <li className="value text-white">
                        <span>Level Total: </span>
                        <strong>{level.total}</strong>
                      </li>
                    </div>
                  );
                })} */}
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
                <LevelsTable item={item} />
                {/* {item.stats.map((stat: any, key: any) => {
                  return (
                    <div key={key} className="with-border">
                      <li className="name">
                        <span>State name: </span>
                        <strong>{stat.name}</strong>
                      </li>
                      <li className="value text-white">
                        <span>State value: </span>
                        <strong>{stat.value}</strong>
                      </li>
                      <li className="value text-white">
                        <span>State total: </span>
                        <strong>{stat.total}</strong>
                      </li>
                    </div>
                  );
                })} */}
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
                <PropertiesTable item={item} />
                {/* {item.properties.map((property: any, key: any) => {
                  return (
                    <div key={key} className="with-border">
                      <li className="name">
                        <span>Property type: </span>
                        <strong>{property.type}</strong>
                      </li>
                      <li className="value text-white">
                        <span>Property name: </span>
                        <strong>{property.name}</strong>
                      </li>
                    </div>
                  );
                })} */}
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
