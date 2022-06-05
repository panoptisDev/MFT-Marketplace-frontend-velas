import { useState } from "react";

//components
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MonetizationOn,
} from "@material-ui/icons";

// style
import "./support.scss";

export default function Offer() {
  const [activated, setActivated] = useState<any>([]);
  const clickHandle: any = (value: any) => {
    const currentIndex = activated.indexOf(value);
    const newActivated: any = [...activated];

    if (currentIndex === -1) {
      newActivated.push(value);
    } else {
      newActivated.splice(currentIndex, 1);
    }
    setActivated(newActivated);
  };
  return (
    <div className="settingContainer">
      <h2>Account Support</h2>
      <div>If you need help related to your account, we can help you.</div>
      <div style={{ marginTop: "50px" }}>
        <div className="helpItem">
          <div
            className="expand"
            aria-label="Notifications"
            aria-haspopup="true"
            onClick={() => clickHandle(1)}
          >
            <span className="buttonText">General Help</span>
            {activated.indexOf(1) === -1 ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowUp />
            )}
          </div>
          {activated.indexOf(1) === -1 ? (
            ""
          ) : (
            <div className={"itemDesc"}>
              Visit our help center to learn how to get started with buying,
              selling, and creating.
            </div>
          )}
        </div>
        <div className="helpItem">
          <div
            className="expand"
            aria-label="Notifications"
            aria-haspopup="true"
            onClick={() => clickHandle(2)}
          >
            <span className="buttonText">Contact OpenSea Support</span>
            {activated.indexOf(2) === -1 ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowUp />
            )}
          </div>
          {activated.indexOf(2) === -1 ? (
            ""
          ) : (
            <div className={"itemDesc"}>
              Can't find the answers you’re looking for? You can submit a
              request here.
            </div>
          )}
        </div>
        <div className="helpItem">
          <div
            className="expand"
            aria-label="Notifications"
            aria-haspopup="true"
            onClick={() => clickHandle(3)}
          >
            <span className="buttonText">Help with a compromised account</span>
            {activated.indexOf(3) === -1 ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowUp />
            )}
          </div>
          {activated.indexOf(3) === -1 ? (
            ""
          ) : (
            <div className={"itemDesc"}>
              If you believe your account has been compromised, let us know and
              we can lock your account. This will disable items in your wallet
              from being bought, sold, or transferred using OpenSea. Learn more.
            </div>
          )}
        </div>
        <div className="helpItem" style={{ borderBottomWidth: "1px" }}>
          <div className="expand" onClick={() => clickHandle(4)}>
            <span className="buttonText">
              Cancel all Ethereum listings and offers
            </span>
            {activated.indexOf(4) === -1 ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowUp />
            )}
          </div>
          {activated.indexOf(4) === -1 ? (
            ""
          ) : (
            <>
              <div className={"itemDesc"}>
                You currently do not have any listings or offers to cancel.
              </div>
              <div className="textBox">
                <MonetizationOn />
                <div>
                  This wallet address does not have any creator earnings from
                  sales using OpenSea in 2021.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Offer.propTypes = {};
