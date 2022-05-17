import { useHistory } from 'react-router-dom';
import './card.scss'
type CardProps = {
	collection? : any
}
export default function Card1(
  {
    collection
  }:CardProps
) {

  const router = useHistory();
	const gotToPage = (url:string)=>{
		//router.push(url)
	}
  return (
    <div className='card' onClick={()=>{gotToPage(collection.address)}}>
      <div className="imgContainer">
      <img src={collection.logo_uri} alt="" className="nft" />
        
      </div>
      <h4> <img src={collection.logo_uri} alt="" />{collection.name}</h4>
      <h3>{collection.description}</h3>
      <div className='stateVals'>
      <p>1030 <span>tokens</span></p>
      <p>124 <span>offers</span></p>
      </div>
    </div>
  )
}
