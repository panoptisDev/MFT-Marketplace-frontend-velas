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
            <div className="fixedPrice" onClick={()=>{clickHandle('FixedPrice')}} style={{border:`${selected==='FixedPrice'? "3px blue solid": "1px black solid"}`}}>
                <i className="saleIcon fas fa-tag"></i>
                <p>Fixed</p>
                <p>Price</p>
            </div>
            <div className="timedAuction" onClick={()=>{clickHandle('TimedAuction')}} style={{border:`${selected==='TimedAuction'? "3px blue solid": "1px black solid"}`}}>
                <i className="saleIcon far fa-clock"></i>
                <p>Timed</p>
                <p>Auction</p>
            </div>
        </div>
    )
}
