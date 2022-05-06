import React from "react";
import Image from "next/image";
import {MoreVert, Storefront, Send, VisibilityOff} from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/collectionListStyle";

const useStyles = makeStyles(styles);

export default function MyNFTItem(props) {
	const classes = useStyles();
	const [anchorElTop, setAnchorElTop] = React.useState(null);

	const showMoreActions = (e) => {
		e.preventDefault();
		setAnchorElTop(e.currentTarget);
	}

	return (
		<li className={props.isSelected ? "selected" : ""}>
			<a href="/velas/velas-apes-club" onClick={(e) => {
				e.preventDefault();
				props.handleClickItem(props.info.token);
			}}>
				<div className="media">
					<Image src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" width={400} height={400} loading="lazy"/>
				</div>
				<div className="meta">
					<div className="counters">
						Code ID
					</div>
					<div className="chain">
						<Image src="https://s.raregems.io/97/img/chains/velas.svg" width={16} height={16} loading="lazy"/>Velas
					</div>
					<div className="name">Name of project</div>
				</div>
				<div className={classes.moreActionBox} onClick={showMoreActions}>
					<MoreVert />
				</div>
				<Popover
					classes={{
						paper: classes.popover,
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
					<div className={classes.popoverBody}>
						<div className={classes.actionList}>
							<div className="action-item" onClick={() => {
								setAnchorElTop(null);
								props.handleClickCommand("sell", props.info.token);
							}}>
								<div className="action-icon">
									<Storefront />
								</div>
								<div className="action-label">Sell</div>
							</div>
							<div className="action-item" onClick={() => {
								setAnchorElTop(null);
								props.handleClickCommand("transfer", props.info.token);
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
								props.handleClickCommand("hide", props.info.token);
							}}>
								<div className="action-icon">
									<VisibilityOff />
								</div>
								<div className="action-label">Hide</div>
							</div>
						</div>
					</div>
				</Popover>
			</a>
		</li>
	);
}

MyNFTItem.propTypes = {};
