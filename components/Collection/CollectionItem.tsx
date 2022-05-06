import React from "react";
import Image from "next/image";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/collectionListStyle";

const useStyles = makeStyles(styles);

export default function CollectionItem() {
	const classes = useStyles();
	return (
		<li className="verified">
			<a href="/velas/velas-apes-club">
				<div className="media">
					<Image src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" width={400} height={400} loading="lazy"/>
				</div>
				<div className="meta">
					<div className="chain">
						<Image src="https://s.raregems.io/97/img/chains/velas.svg" width={16} height={16} loading="lazy"/>Velas
					</div>
					<div className="name">VelasApesClub</div>
					<div className="counters">
						1030 tokens,
						124 offers
					</div>
				</div>
			</a>
		</li>
	);
}

CollectionItem.propTypes = {};
