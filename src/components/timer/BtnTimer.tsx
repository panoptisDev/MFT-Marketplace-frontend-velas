import "./btnDown.scss"
import { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";

type TimeNumber = {
    deadLine:number,
    setShowMint(value: boolean): void
};
export default function BtnTimer({ setShowMint, deadLine }: TimeNumber) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const { connector, library, chainId, account, active } = useWeb3React();
    useEffect(() => {
        let myInterval = setInterval(() => {
            const currentDate: any = Date.now()/1000;
            const diff = deadLine - currentDate;
            const dayNum = diff > 0 ? Math.floor(diff  / 60 / 60 / 24) : 0;
            const hourNum = diff > 0 ? Math.floor(diff  / 60 / 60) % 24 : 0;
            const minNum = diff > 0 ? Math.floor(diff  / 60) % 60 : 0;
            const secNum = diff > 0 ? Math.floor(diff ) % 60 : 0;
            
            if (currentDate < deadLine) {
                setDays(dayNum);
                setHours(hourNum);
                setMinutes(minNum);
                setSeconds(secNum);
            }
            else{
                setShowMint(true)
            }

        }, 100)
        return () => {
            clearInterval(myInterval);
        };

    }, [connector, library, account, active, chainId, deadLine, setShowMint]);

    return (
        <div className="btnTimer">
            <div className="timerNums">
            <span className="number">{days < 10 ? `0${days}` : days}d</span>
            <span className="number">{hours < 10 ? `0${hours}` : hours}:</span>
            <span className="number">{minutes < 10 ? `0${minutes}` : minutes}:</span>
            <span className="number">{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
        </div>
    )
}