import Button from "components/customButtons/Button";
import './card.scss'
type CardProps = {
	tokenID ? : string
	handleClickCommand ? :(type : string, token : string)=>void
}

export default function Card4(
		{
			handleClickCommand, 
			tokenID
		}:CardProps) {

//   const [anchorElTop, setAnchorElTop] = useState(null);
//   const showMoreActions = (e) => {
// 		e.preventDefault();
// 		setAnchorElTop(e.currentTarget);
// 	}
  return (
    <div className='card'>
      <div className="imgContainer">
      <img src="/assets/8cf6b8695ae6dbe3745551c218d62202.jpg" alt="" className="nft" />
        
      </div>
	  <h3>Name of project</h3>
      <p className="socre">Rarity Score : 161</p>
	  <div className="btns">
		<Button className="buyBtn" link="/velas/velas-apes-club/215">Buy For 11 EWT</Button>
	  </div>
	 
    </div>
  )
}
