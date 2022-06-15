import Accordion from "react-bootstrap/Accordion";
import "./styles.css";
import { SiOpslevel } from "react-icons/si";
import { ImStatsDots } from "react-icons/im";
import { AiFillPropertySafety } from "react-icons/ai";
import LevelsTable from "./StatsTable";
import PropertiesTable from "./PropertiesTable";
import { ReactComponent as Levels } from "../../assets/level.svg";
import { ReactComponent as Stats } from "../../assets/stats.svg";
import { ReactComponent as Properties } from "../../assets/properties.svg";

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
                <div className="properties-stats-levels-container">
                  {item.levels.map((level: any, key: any) => {
                    return (
                      <div className="properties-stats-levels" key={key}>
                        <span>{level.name}</span>
                        <span>{level.value}</span>
                        <span className="properties-stats-levels-span-last">
                          {level.total}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* <LevelsTable item={item} /> */}
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
              <div className="no-levels-yet">
                <Levels />
                <p>No Levels yet</p>
              </div>
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
                <div>
                  {item.stats.length > 0 ? (
                    <div className="properties-stats-levels-container">
                      {item.stats.map((stat: any, key: any) => {
                        return (
                          <div className="properties-stats-levels" key={key}>
                            <span>{stat.name}</span>
                            <span>{stat.value}</span>
                            <span className="properties-stats-levels-span-last">
                              {stat.total}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : undefined}
                </div>

                {/* <LevelsTable item={item} /> */}
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
              <div className="no-levels-yet">
                <Stats />
                <p>No Stats yet</p>
              </div>
              // <div />
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
          <div>
            {item.properties && item.properties.length > 0 ? (
              <div>
                {/* <PropertiesTable item={item} /> */}
                <div>
                  {item.properties.length > 0 ? (
                    <div className="properties-stats-levels-container">
                      {item.properties.map((property: any, key: any) => {
                        return (
                          <div className="properties-stats-levels" key={key}>
                            <span>{property.name}</span>
                            <span className="properties-stats-levels-span">
                              {property.type}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : undefined}
                </div>
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
              <div className="no-levels-yet">
                <Properties />
                <p>No Properties yet</p>
              </div>
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <br />
    </Accordion>
  );
};

export default AccordionComponent;
