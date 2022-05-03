import React from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import {makeStyles} from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from 'next/router'

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import tooltipsStyle from "styles/jss/nextjs-material-kit/tooltipsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/myCollections";
import Button from "../components/CustomButtons/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {Dehaze, ErrorOutline} from "@material-ui/icons";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import ListItem from "@material-ui/core/ListItem";
const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyles, ...tooltipsStyle});

export default function MyCollections(props) {
	const classes = useStyles();
	const linkList = {
		"Import an existing smart contract": 'https://studio.manifold.xyz/',
		"Mint with Manifold Studio": 'https://studio.manifold.xyz/',
		"Mint on Rarible": 'https://rarible.com/create/start',
		"Mint on Mintbase": 'https://www.mintbase.io/',
		"Mint on Mintable": 'https://mintable.app/',
		"Mint on Zora": 'https://zora.co/',
	}
	const router = useRouter();
	const goToPage = (key) => {
		const href = key.toLowerCase();
		router.push(linkList[key]);
		// console.log(linkList[key]);
	};

	return (
		<div className={classes.container}>
			<GridContainer style={{ justifyContent: 'center' }}>
				<GridItem xs={12} sm={12} md={8} lg={9}>
					<div className={ classes.myCollections }>
						<h2 className="top">My Collections</h2>
						<div style={{ display: 'flex', margin: '25px 0 25px 0' }}>
							<span>Create, curate, and manage collections of unique NFTs to share and sell.</span>
							<Tooltip
								id="tooltip-top"
								title="Collections can be created either directly on OpenSea or imported
									from an existing smart contract. You can also mint on other services like
									Rarible or Mintable and import the items to OpenSea."
								placement="top"
								classes={{ tooltip: classes.tooltip }}
							>
								<ErrorOutline className="tooltip-icon" />
							</Tooltip>
						</div>
						{/*<div style={{ display: 'flex' }}>*/}
						<Button color={'info'}>Create a collection</Button>
						<div style={{ display: 'inline-block' }}>
							<CustomDropdown
								navDropdown
								buttonText=<Dehaze />
								onClick={(url) => {
									goToPage(url);
								}}
									buttonProps={{
									className: classes.dehazeBtn,
									color: "black",
								}}
									dropdownList={[
									"Import an existing smart contract",
									"Mint with Manifold Studio",
									"Mint on Rarible",
									"Mint on Mintbase",
									"Mint on Mintable",
									"Mint on Zora",
								]}
							/>
						</div>
							{/*<Button className={ classes.dehazeBtn }><Dehaze /></Button>*/}
						{/*</div>*/}
						<div className={ classes.collectionContainer }>
							<div className={ classes.collectionItem }>
								<Link href={'/collections/untitled-collection-316120299'}>
									<a>
										<img src={'/img/profile-bg.jpg'} style={{ height: '200px', width: '100%', borderRadius: '6px' }} />
										<div className={ classes.collectionInfo }>
											<img src={'/img/faces/camp.jpg'} style={{ height: '60px', width: '60px', borderRadius: '50%' }} />
											<br />
											<strong>etect V3</strong>
											<div>by you</div>
											<div style={{ margin: '25px 0' }}>Explore the etet V3 collection</div>
											<div style={{ marginBottom: '25px' }}>0 items</div>
										</div>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</GridItem>
			</GridContainer>
		</div>
	);
}
