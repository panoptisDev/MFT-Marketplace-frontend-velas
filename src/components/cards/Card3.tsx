import Popover from "@material-ui/core/Popover";
import { MoreVert, Send, Storefront, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import './card.scss'
type CardProps = {
	tokenID ? : string
	link ?: string
	handleClickCommand ? :(type : string, token : string)=>void
}

export default function Card3(
		{
			handleClickCommand, 
			tokenID,
			link
		}:CardProps) {

  const [anchorElTop, setAnchorElTop] = useState(null);
  const showMoreActions = (e) => {
		e.preventDefault();
		setAnchorElTop(e.currentTarget);
	}
	const router = useHistory();
	const gotToPage = (url:string)=>{
		router.push(url)
	}
  return (
    <div className='card'>
      <div className="imgContainer" onClick={()=>{gotToPage(link)}}>
      <img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" alt="" className="nft" />
        
      </div>
      <h4>code ID</h4>
      <h4> <img src="/assets/img/logos/velas.svg" alt="" />  velas</h4>
      <h3>Name of project</h3>

	  <div className="moreActionBox" onClick={showMoreActions}>
			<MoreVert />
		</div>
      <Popover
		classes={{
			paper: "popover",
		}}
		open={Boolean(anchorElTop)}
		anchorEl={anchorElTop}
		onClose={() => setAnchorElTop(null)}
		anchorOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		style={{marginRight: "8px"}}
	>
		<div className="popoverBody">
			<div className="actionList">
				<div className="action-item" onClick={() => {
					setAnchorElTop(null);
					handleClickCommand("sell", tokenID);
				}}>
					<div className="action-icon">
						<Storefront />
					</div>
					<div className="action-label">Sell</div>
				</div>
				<div className="action-item" onClick={() => {
					setAnchorElTop(null);
					handleClickCommand("transfer", tokenID);
				}}>
					<div className="action-icon">
						<Send />
					</div>
					<div className="action-label">
						Transfer
					</div>
				</div>
				<div className="action-item" onClick={() => {
					setAnchorElTop(null);
					handleClickCommand("hide", tokenID);
				}}>
					<div className="action-icon">
						<VisibilityOff />
					</div>
					<div className="action-label">Hide</div>
				</div>
			</div>
		</div>
	</Popover>
    </div>
  )
}
