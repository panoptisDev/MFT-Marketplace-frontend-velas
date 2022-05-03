import React, {Component, useRef, useState} from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CollectionFilter from "components/CollectionFilter/CollectionFilter";
import ItemDetail from "components/Collection/Item/ItemDetail";
import {makeStyles} from "@material-ui/core/styles";
import {FileCopy, Done, Twitter, Telegram, Widgets, Language} from '@material-ui/icons';

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/collections/itemStype.js";
import Button from "components/CustomButtons/Button";
import Image from "next/image";

const useStyles = makeStyles({ ...styles, ...basicsStyles, ...pageStyles});

export default function Detail({item}) {
	const classes = useStyles();

	return (
		<div className={classes.container + " " + classes.detailContainer}>
			<GridContainer className="detail-div">
				<GridItem xs={12} sm={12} md={7} lg={8} className="height-full">
					<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" alt="icon"
						 className="detail-img" />
				</GridItem>
				<GridItem xs={12} sm={12} md={5} lg={4} className="detail-contain">
					<ItemDetail />
				</GridItem>
			</GridContainer>
		</div>
	);
}

export async function getStaticProps({params}) {
	// TODO get item's detail of collection from params.companyName, params.groupName, params.id
	const item = []
	return {
		props: {
			item
		}
	}
}

export async function getStaticPaths() {
	// TODO get collection's item list from db.
	const paths =
		[
			{
				params: {
					companyName: "velas",
					groupName: 'velas-apes-club',
					id: '216'
				}
			},
			{
				params: {
					companyName: "velas",
					groupName: 'velas-apes-club',
					id: '215'
				}
			}
		]
	return {
		paths,
		fallback: false
	}
}
