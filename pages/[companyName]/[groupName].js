import React, {Component, useRef, useState} from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CollectionFilter from "components/CollectionFilter/CollectionFilter";
import ItemList from "components/Collection/Item/ItemList";
import CopyBox from "components/Collection/Item/CopyBox";
import {makeStyles} from "@material-ui/core/styles";
import {FileCopy, Done, Twitter, Telegram, Widgets, Language} from '@material-ui/icons';

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/collections/groupStype.js";
import Button from "components/CustomButtons/Button";
import {useWeb3} from "@3rdweb/hooks";

const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyles});

export default function Group({items}) {
	const classes = useStyles();
	const [isShowFilter, setIsShowFilter] = useState(false);
	const { connectWallet, address, error } = useWeb3();

	const showFilter = () => {
		setIsShowFilter(!isShowFilter);
	}

	return (
		<div className={classes.container}>
			<GridContainer>
				<GridItem xs={12} sm={12} md={4} lg={3}
						  className={'text-center ' + classes.gridFilterContainer + (isShowFilter ? ' ' + classes.showFilter : '')}>
					<CollectionFilter/>
				</GridItem>
				<GridItem xs={12} sm={12} md={8} lg={9}>
					<div className={classes.partTitle}>
						<h1 className="top">
							NFTrees
							<img src="/img/verified.svg" alt="..." className="img-mark" />
						</h1>
						{
							address &&
							<CopyBox value={address} />
						}
						<p className="desc">
							Grow NFTrees backed by Real Trees 🌳<br/>
							Have Fun and make Real World Impact
						</p>
						<div className="other-site">
							<Language className="site-item"/>
							<Twitter className="site-item"/>
							<Telegram className="site-item"/>
							<Widgets className="site-item"/>
						</div>
						<ul className="stats">
							<li>
								<div className="name">TOKENS</div>
								<div className="value">123&nbsp;190</div>
							</li>
							<li>
								<div className="name">OWNERS</div>
								<div className="value">123&nbsp;190</div>
							</li>
							<li>
								<div className="name">OFFERS</div>
								<div className="value">993</div>
							</li>
							<li>
								<div className="name">MIN PRICE</div>
								<div className="value">
									<img src="/img/parts/moonriver.svg" alt="..." className="img-mark-16" />&nbsp;993
								</div>
							</li>
							<li>
								<div className="name">MEDIUM PRICE</div>
								<div className="value">
									<img src="/img/parts/moonriver.svg" alt="..." className="img-mark-16" />&nbsp;993
								</div>
							</li>
							<li>
								<div className="name">MAX PRICE</div>
								<div className="value">
									<img src="/img/parts/moonriver.svg" alt="..." className="img-mark-16" />&nbsp;993
								</div>
							</li>
							<li>
								<div className="name">TRADES</div>
								<div className="value label-blue">981</div>
							</li>
						</ul>
					</div>

					<ItemList/>
				</GridItem>

				<div className={classes.mobileFilterButton}>
					<Button color="actionButton" size="sm" onClick={showFilter}>
						{isShowFilter ? 'Apply Filter' : 'Filter'}
					</Button>
				</div>
			</GridContainer>
		</div>
	);
}

export async function getStaticProps({params}) {
	// TODO get items of collection from params.companyName, params.groupName
	const items = []
	return {
		props: {
			items
		}
	}
}

export async function getStaticPaths() {
	// TODO get collection names from db.
	const paths =
		[
			{
				params: {
					companyName: "velas",
					groupName: 'velas-apes-club'
				}
			},
			{
				params: {
					companyName: "velas",
					groupName: 'velas-apes-club'
				}
			},
		]
	return {
		paths,
		fallback: false
	}
}
