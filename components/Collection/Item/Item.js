import React from "react";
import Image from "next/image";
import Link from "next/link";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/collectionListStyle";
import Button from "../../CustomButtons/Button";

const useStyles = makeStyles(styles);

export default function Item() {
	const classes = useStyles();

	const buyToken = () => {
		//	TODO do buy logic
		return;
	}

	return (
		<li className="verified">
			<Link href="/velas/velas-apes-club/215"><a>
				<div className="media">
					<Image src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" width={400} height={400} loading="lazy"/>
				</div>
				<div className="meta">
					<div className="name">Hamsters Gang #215</div>
					<div className="scores">
						Rarity Score: 161
					</div>
					<div className="buy-container">
						<Button
							color="primary"
							target="_blank"
							className="buy-btn"
							onClick={()=>buyToken("injected")}
						>
							Buy for 11 EWT
						</Button>
					</div>
				</div>
			</a></Link>
		</li>
	);
}

Item.propTypes = {};
