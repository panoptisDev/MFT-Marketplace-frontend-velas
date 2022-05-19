import Button from "components/customButtons/Button";
import { useHistory } from "react-router-dom";
import './card.scss'

const Card4 = (props) => {
  const { item } = props;
  const gotoDetail = () => {
	  props.history.push(`/itemdetail/${item.itemCollection}/${item.tokenId}`)
  }
  return (
    <div className='card'>
      <div className="imgContainer">
      <img src={item && item.assetUrl} alt="" className="nft" />
        
      </div>
	  <h3>{item.name}</h3>
      <p className="socre">{item.description}</p>
	  <div className="btns">
		<Button className="buyBtn" onClick={gotoDetail}>Bid</Button>
	  </div>
	 
    </div>
  )
}
export default Card4;
