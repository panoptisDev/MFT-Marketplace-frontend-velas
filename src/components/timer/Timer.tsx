import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./timer.css";
// import Mint from "../Mint/Mint";
import { ReactComponent as Flame } from "../../assets/icons/flame.svg";
import { spawn } from "child_process";

const RowContainer = styled.div`
  color: hsl(0, 0%, 100%);
  display: flex;
  justify-content: center;
`;

// const Heading = styled.h1`
//   color: #000000;
//   text-shadow: 0px 0px 10px rgb(0 0 0 / 30%);
//   font-family: "RocknRoll One", Sans-serif;
//   font-size: 32px;
// `;
// const Title = styled.p`
//   font-size: 16px;
//   line-height: 24px;
//   margin-bottom: 40px;
//   color: white;
// `;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20px;
  height: 30px;
`;

const ItemValue = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0px;
  text-align: center;
`;
// const ItemLabel = styled.p`
//   color: black;
//   font-size: 14px !important;
//   margin-bottom: 3px;
//   letter-spacing: 0;
// `;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Timer = ({ mintStartAt, itemDetails, downPhrase }: any) => {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerVisible, setTimerVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now() / 1000;
      if (now < mintStartAt) {
        setTitle(`Countdown`);
        setDays(Math.floor((mintStartAt - now) / (60 * 60 * 24)));
        setHours(Math.floor((mintStartAt - now) / (60 * 60)) % 24);
        setMinutes(Math.floor((mintStartAt - now) / 60) % 60);
        setSeconds(Math.floor(mintStartAt - now) % 60);
        setTimerVisible(true);
      } else {
        setTimerVisible(false);
      }
    }, 0);
    return () => clearInterval(timer);
  }, [mintStartAt]);

  return (
    <div
      className={
        itemDetails
          ? "timer-mint-container timer-item-details"
          : "timer-mint-container"
      }
    >
      <Card>
        {!itemDetails ? (
          <Flame className="flame-timer" />
        ) : (
          <span className="timer-item-details-span">
            {downPhrase ? "Sales end" : "Countdown"}
          </span>
        )}
        <RowContainer className="timer-container">
          <Item className="days-cirlce">
            <ItemValue id="days">
              {days.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </ItemValue>
          </Item>
          <span>:</span>
          <Item className="hours-cirlce">
            <ItemValue id="days">
              {hours.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </ItemValue>
          </Item>
          <span>:</span>
          <Item className="minutes-cirlce">
            <ItemValue id="days">
              {minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </ItemValue>
          </Item>
          <span>:</span>
          <Item className="seconds-cirlce">
            <ItemValue id="days">
              {seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </ItemValue>
          </Item>
        </RowContainer>
      </Card>
    </div>
  );
};

export default Timer;
