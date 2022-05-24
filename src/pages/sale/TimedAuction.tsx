import './timedauction.scss'

export default function TimedAuction({ register }) {
    return (
        <div className='timedauction'>
            <div className="minimumBid">
                <span className="label">Minimum Bid</span>
                <div className="inputPart">
                    <input  {...register("price")} type="number" step=".001" placeholder="Enter Minimum bid" />
                    <div className="tokenType">
                        <select  {...register("currency")}>
                            <option className="item" value="eth">ETH</option>
                        </select>
                    </div>
                </div>
                <div className="bellow">
                    <p>Bids below this amount won't be allowed</p>
                </div>
            </div>
            <div className="date">
                <div className="startingDate">
                    <span className="label">Starting Date</span>
                    <div className="inputPart selectPart">
                        <div className="select">
                            <input {...register("startTime")} type="datetime-local" />
                        </div>
                    </div>
                </div>
                <div className="expreationDate">
                    <span className="label">Expiration Date</span>
                    <div className="inputPart selectPart">
                        <div className="select">
                            <input  {...register("endTime")} type="datetime-local" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="dateBellow">
                <p>Any Bid placed in the last 10minutes extends auction by 10minutes</p>
                <a href="/">Learn more how timed auctioins work</a>
            </div>
        </div>
    )
}
