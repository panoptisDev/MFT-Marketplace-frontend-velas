import { Tooltip } from '@material-ui/core'
import { ErrorOutline } from '@material-ui/icons'
import './fixedprice.scss'
import SaleType from './SaleType'
import Select from "react-select";
import FormatsortOptionLabel from 'components/itemDetail/FormatsortOptionLabel';
import FormatMoneyOptionLabel from 'components/profile/FormatMoneyOptionLabel';
import { useState } from 'react';

export default function FixedPrice({register, balance}) {
    const options = [
		{ value: "usd", label: "USD", customAbbreviation: "" },
		{ value: "eth", label: "ETH", customAbbreviation: "" },
		{ value: "sol", label: "SOL", customAbbreviation: "" },
	];

    const methodOptions = [
		{ value: "highest_bidder", label: "Sell to highest bidder", customAbbreviation: "" },
		{ value: "lowest_bidder", label: "Sell to lowest bidder", customAbbreviation: "" },
	];

  const options1 = [
		{ value: "1d", label: "1 day", customAbbreviation: "1d" },
		{ value: "2d", label: "2 days", customAbbreviation: "2d" },
		{ value: "3d", label: "3 days", customAbbreviation: "3d" },
		{ value: "7d", label: "7 days", customAbbreviation: "7d" },
		{ value: "1m", label: "Bundles", customAbbreviation: "1m" },
	];

    const [fixedPrice, setFixedPrice] = useState(0);
  const onChangePrice = value => {
    console.log(parseFloat(value.target.value))
    setFixedPrice(parseFloat(value.target.value));
  };
    return (
        <div className='fixedprice'>

            

          <p className="space-between mb-1 mt-1">
                Method
                
                <Tooltip
                    id="tooltip-top"
                    title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores earum fuga unde laboriosam molestias deleniti tempora obcaecati harum aperiam iusto quae quo quisquam,"
                    placement="top"
                    classes={{ tooltip: 'tooltip' }}
                    className='myTooltip'
                >
                    <ErrorOutline className="tooltip-icon" />
                </Tooltip>
          </p>
          <div className="row-div">
            <Select
              defaultValue={methodOptions[0]}
              formatOptionLabel={FormatsortOptionLabel}
              options={methodOptions}
              instanceId='chainSelect'
              className="select-gray flex-1 radius1"
            />
          </div>
          <p className='flex-start'>Price</p>
          <div className="placeContainer">
            <Select
              defaultValue={options[0]}
              formatOptionLabel={FormatMoneyOptionLabel}
              options={options}
              instanceId='chainSelect'
              className="select-gray flex-1 m-r-5"
            />
            <input className='price' name="price" onChange={onChangePrice} placeholder="Amount" />
            <span className='usd'>$0.00</span>
          </div>

          <div className="balance">
            <p> Available: {balance.toFixed(3)} ETH</p>
          </div>
          <p className='flex-start'>Duration</p>
          <div className="row-div">
            <Select
              defaultValue={options1[0]}
              formatOptionLabel={FormatsortOptionLabel}
              options={options1}
              instanceId='chainSelect'
              className="select-gray radius2 flex-1"
            />
          </div>
          <p className="space-between mb-1 mt-1">
                Fees
                
                <Tooltip
                    id="tooltip-top"
                    title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores earum fuga unde laboriosam molestias deleniti tempora obcaecati harum aperiam iusto quae quo quisquam,"
                    placement="top"
                    classes={{ tooltip: 'tooltip' }}
                    className='myTooltip'
                >
                    <ErrorOutline className="tooltip-icon" />
                </Tooltip>
          </p>
          <p className="space-between">
               <span> Service Fee</span>
               <span>2.5%</span>
          </p>
          
            {/* <div className="price">
                <span className="label">Price</span>
                <div className="inputPart">
                    <input {...register("price")} type="number" step=".001" placeholder="Enter price for on piece" />
                    <div className="tokenType">
                        <select>
                            <option value="eth">ETH</option>
                        </select>     
                    </div>
                </div>
                <div className="bellow">
                    <p>Service fee 2.5%</p>
                    <p>You will receive 0ETH</p>
                </div>
            </div>             */}
        </div>
    )
}
