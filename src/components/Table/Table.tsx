import React from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { BsCalendar2EventFill, BsFillCartCheckFill } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { useWeb3React } from "@web3-react/core";

const ItemActivityTable = ({ item, loginStatus }: any) => {
  const { connector, library, chainId, account, active }: any = useWeb3React();

  return (
    <div>
      <Table style={{ color: "white" }} responsive>
        <thead>
          <tr>
            <th>Event</th>
            <th>Price</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {item.events.map((event: any, key: any) => {
            return (
              <div key={key}>
                <tr>
                  <td>{event.name}</td>
                </tr>
                <tr>
                  <td>
                    {/* //ethereum icon*/} {event.price}ETH
                  </td>
                </tr>
                <tr>
                  <td>
                    {event.from === account && loginStatus
                      ? "You"
                      : String(event.from).substring(2, 7).toUpperCase()}
                  </td>
                </tr>
                <tr>
                  <td>
                    {event.to === account && loginStatus
                      ? "You"
                      : String(event.to).substring(2, 7).toUpperCase()}
                  </td>
                </tr>
                <tr>
                  <td>
                    {Math.floor(new Date().getTime() / 1000) -
                      parseFloat(event.timestamp)}{" "}
                    days ago
                  </td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemActivityTable;
