import { useState } from 'react';
import './SaleType.scss'
type SaleType = {
    setSaleType(vlaue:string):void;
};
export default function MarketPlaceType({setSaleType}:SaleType) {
    const [selected, setSelected] = useState('FixedPrice')
    const clickHandle=(value:any)=>{
        setSaleType(value)
        setSelected(value)
    }
    return (
        <div className="saleType">
            <div className="fixedPrice" 
                onClick={()=>{clickHandle('FixedPrice')}} 
                style={{border:`${selected==='FixedPrice'? "2px #0eabff solid": "2px #aaa solid"}`}}
            >
                <i className="saleIcon fas fa-tag"></i>
                <p>Fixed Price</p>
                <p></p>
            </div>
            <div className="timedAuction" 
                onClick={()=>{clickHandle('TimedAuction')}} 
                style={{border:`${selected==='TimedAuction'? "2px #0eabff solid": "2px #aaa solid"}`}}
            >
                <i className="saleIcon far fa-clock"></i>
                <p>Timed Auction</p>
                <p></p>
            </div>
        </div>
    )
}
