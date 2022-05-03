import React, {Component, useState} from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import CollectionFilter from "../components/CollectionFilter/CollectionFilter";
import CollectionList from "../components/Collection/CollectionList";
import {makeStyles} from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/collections";
import Button from "../components/CustomButtons/Button";
const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyles});

export default function Index(props) {
	const classes = useStyles();
	const [isShowFilter, setIsShowFilter] = useState(false);

	const showFilter = () => {
		setIsShowFilter(!isShowFilter);
	}

	return (
		<div className={classes.container}>
			<GridContainer>
				<GridItem xs={12} sm={12} md={4} lg={3} className={'text-center ' + classes.gridFilterContainer + (isShowFilter ? ' ' + classes.showFilter : '')}>
					<CollectionFilter/>
				</GridItem>
				<GridItem xs={12} sm={12} md={8} lg={9}>
					<div className={classes.partTitle}>
						<h1 className="top">All Collections</h1>
						<ul className="stats">
							<li>
								<div className="name">Collections</div>
								<div className="value">190</div>
							</li>
							<li>
								<div className="name">Tokens</div>
								<div className="value">1&nbsp;088&nbsp;993</div>
							</li>
							<li>
								<div className="name">Owners</div>
								<div className="value">184&nbsp;981</div>
							</li>
						</ul>
					</div>

					<CollectionList/>
				</GridItem>

				<div className={classes.mobileFilterButton}>
					<Button color="info" size="sm" onClick={showFilter}>
						{isShowFilter ? 'Apply Filter' : 'Filter'}
					</Button>
				</div>
			</GridContainer>
		</div>
	);
}
