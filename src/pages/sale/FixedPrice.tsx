import './fixedprice.scss'

export default function FixedPrice({register}) {
    return (
        <div className='fixedprice'>
            <div className="price">
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
            </div>            
        </div>
    )
}
