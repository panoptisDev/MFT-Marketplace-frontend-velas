import { useHistory } from 'react-router-dom';
import './card.scss'
type CardProps = {
	link ?: string
}
export default function Card1(
  {
    link
  }:CardProps
) {

  const router = useHistory();
	const gotToPage = (url:string)=>{
		router.push(url)
	}
  return (
    <div className='card' onClick={()=>{gotToPage(link)}}>
      <div className="imgContainer">
      <img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" alt="" className="nft" />
        
      </div>
      <h4> <img src="/assets/img/logos/velas.svg" alt="" />  velas</h4>
      <h3>VelasApesClub</h3>
      <div className='stateVals'>
      <p>1030 <span>tokens</span></p>
      <p>124 <span>offers</span></p>
      </div>
    </div>
  )
}
