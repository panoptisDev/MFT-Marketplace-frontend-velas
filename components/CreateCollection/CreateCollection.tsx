import React, { useState } from "react";

//components
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "components/CustomButtons/Button";
import Select from "react-select";
import PaymentTokens from "./PaymentTokens";
import Dropdown from "components/Dropdown/Dropdown";
import Theme from "./Theme"
import formatOptionLabel from "../Create/Item/FormatOptionLabel";
import Logo from "./Logo";
import Tooltip from "@material-ui/core/Tooltip";
import {ErrorOutline} from "@material-ui/icons";

// style
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/createCollectionStyle";
import javascriptStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles";

const useStyles = makeStyles({...styles, ...javascriptStyles});


const options = [
	{ value: "ethereum", label: "Ethereum", customAbbreviation: "an open-source blockchain that powers most NFT sails" },
	{ value: "polygon", label: "Polygon", customAbbreviation: "A fast gas-free blockchain experience that works with Ethereum" },
];

export default function CreateCollection() {
	const classes = useStyles();
	const [ logo, setLogo ] = useState("");
	const [ FeaturedImg, setFeaturedImg ] = useState("");
	const [ BannerImg, setBannerImg ] = useState("");
	const [ name, setName ] = useState("");
	const [ url, setUrl ] = useState("https://opensea.io/collection/");
	const [ description, setDescription ] = useState("");
	const [ category, setCategory ] = useState("");
	const [ yourSite, setYourSite ] = useState("");
	const [ discord, setDiscord ] = useState("https://discord.gg/");
	const [ instagram, setInstagram ] = useState("https://www.instagram.com/");
	const [ medium, setMedium ] = useState("https://www.medium.com/@");
	const [ tme, setTme ] = useState("https://t.me/");
	const [ fee, setFee ] = useState("");
	const [ blockchain, setBlockchain ] = useState([]);
	const [ isExplicit, setIsExplicit] = useState(false);
	const logoChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setLogo(e.target.files[0]);
		}
	};
	const FeaturedImgChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFeaturedImg(e.target.files[0]);
		}
	};
	const BannerImgChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setBannerImg(e.target.files[0]);
		}
	};
	const removeImg = (img) => {
		switch (img) {
			case 'BannerImg':
				setBannerImg('');
				break;
			case 'FeaturedImg':
				setFeaturedImg('');
		}
	};
	const nameHandle = (e) => {
		setName(e.target.value);
	}
	const urlHandle = (e) => {
		setUrl(e.target.value);
	}
	const descriptionHandle = (e) => {
		setDescription(e.target.text);
	}
	const categoryHandle = (value) => {
		setDescription(value);
	}
	const feeHandle = (e) => {
		setFee(e.target.value);
	}
	const yourSiteHandle = (e) => {
		setYourSite(e.target.value);
	}
	const discordHandle = (e) => {
		setDiscord(e.target.value);
	}
	const instagramHandle = (e) => {
		setInstagram(e.target.value);
	}
	const mediumHandle = (e) => {
		setMedium(e.target.value);
	}
	const tmeHandle = (e) => {
		setTme(e.target.value);
	}
	const blockchainHandle = (val) => {
		setBlockchain(val);
	}
	return (
		<form className={ classes.form }>

			<p><span style={{ color: 'red' }}>*</span> Required fields</p>

			<Logo onChange={(e)=>logoChange(e)} />

			<div className={'formControl'}>
				<h4><strong>Featured image</strong></h4>
				<p>This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.</p>
				<div className="FeaturedImgInput">
					<label htmlFor="FeaturedInput">
						<input type="file" id="FeaturedInput" name="FeaturedInput" accept="image/*" style={{ display: 'none' }} onChange={FeaturedImgChange} />
						{ !FeaturedImg ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
							<i className="fa fa-image FeaturedImgIcon" /> }
						{ FeaturedImg && <div className="FeaturedImg">
							<img src={URL.createObjectURL(FeaturedImg)} width={300} height={200}/>
						</div> }
					</label>
					{ FeaturedImg && <span className={'removeImg'} onClick={ () => removeImg('FeaturedImg') }>&times;</span>  }
				</div>
			</div>

			<div className={'formControl'}>
				<h4><strong>Banner image</strong></h4>
				<p>This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended.recommended</p>
				<div className="BannerImgInput">
					<label htmlFor="BannerInput">
						<input type="file" id="BannerInput" name="BannerInput" accept="image/*" style={{ display: 'none' }} onChange={BannerImgChange} />
						{ !BannerImg ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
							<i className="fa fa-image BannerImgIcon" /> }
						{ BannerImg && <div className="BannerImg">
							<img src={ URL.createObjectURL(BannerImg) } width={700} height={200} />
						</div> }
					</label>
					{ BannerImg && <span className={'removeImg'} onClick={ () => removeImg('BannerImg') }>&times;</span> }
				</div>

			</div>

			<div className={'formControl'}>
				<h4><strong>Name</strong></h4>
				<input className={'textInput'} type="text" onChange={nameHandle} value={name} placeholder={'Example: Treasures of the Sea'} required />
			</div>

			<div className={'formControl'}>
				<h4><strong>URL</strong></h4>
				<p>Customize your URL on OpenSea. Must only contain lowercase letters,numbers, and hyphens.</p>
				<input className={'textInput'} type="text" onChange={urlHandle} placeholder={'Example: Treasures of the Sea'} value={url} required />
			</div>

			<div className={'formControl'}>
				<h4><strong>Description</strong></h4>
				<p><a target={'_blank'} href={"https://www.markdownguide.org/cheat-sheet/"} style={{color: 'rgb(32, 129, 226)'}}>Markdown</a> syntax is supported. 0 of 1000 characters used.</p>
				<textarea className={'textareaInput'} rows="4" onChange={descriptionHandle} required value={description}/>
			</div>

			<div className={'formControl'}>
				<h4><strong>Category</strong></h4>
				<p>Adding a category will help make your item discoverable on OpenSea.</p>
				<p>You can select a maximum of one category.</p>
				<Dropdown
					navDropdown
					buttonText="Add Category"
					buttonProps={{
						className: classes.navLink,
						color: "transparent",
					}}
					onChangeHandle={(val) => (categoryHandle(val))}
					dropdownList={[
						{ divider: true },
						"Art",
						{ divider: true },
						"Collectibles",
						{ divider: true },
						"Something else here",
						{ divider: true },
						"Separated link",
						{ divider: true },
						"One more separated link",
						{ divider: true },
					]}
				/>
			</div>

			<div className={'formControl'}>
				<h4><strong>Links</strong></h4>
				<div style={{ background: '#353840' }}>
					<div className={"linkInput"} style={{ borderRadius: '6px 6px 0 0' }}>
						<i className="fa fa-globe"/>
						<input type={"text"} onChange={yourSiteHandle} value={yourSite} placeholder={'yoursite.io'} />
					</div>
					<div className={"linkInput"}>
						<i className="fa fa-globe"/>
						<input type={"text"} onChange={discordHandle} value={discord} />
					</div>
					<div className={"linkInput"}>
						<i className="fa fa-globe"/>
						<input type={"text"} onChange={instagramHandle} value={instagram}  />
					</div>
					<div className={"linkInput"}>
						<i className="fa fa-globe"/>
						<input type={"text"} onChange={mediumHandle} value={medium} />
					</div>
					<div className={"linkInput"} style={{ borderRadius: '0 0 6px 6px', borderBottomWidth: '1px' }}>
						<i className="fa fa-globe"/>
						<input type={"text"} onChange={tmeHandle} value={tme} />
					</div>
				</div>
			</div>

			<div className={'formControl'}>
				<h4><strong>Creator Earnings</strong></h4>
				<p>Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing.</p>
				<p><a target={'_blank'} href={"https://support.opensea.io/hc/en-us/articles/1500009575482"} style={{color: 'rgb(32, 129, 226)'}}>Learn more about creator earnings.</a></p>
				<p><strong>Percentage fee</strong></p>
				<input className={'textInput'} type="text" onChange={feeHandle} value={fee} placeholder={'e.g. 2.5'} required />
			</div>

			<div className={'formControl'}>
				<h4><strong>Blockchain</strong></h4>
				<p>Select the blockchain where you'd like new items from this collection to be added by default.</p>
				<Select
					defaultValue={options[0]}
					formatOptionLabel={formatOptionLabel}
					options={options}
					className={classes.mySelect}
					instanceId='blockChainSelect'
				/>
			</div>

			<PaymentTokens />

			<Theme />

			<div className={'formControl'}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
						<h4><strong>Explicit & sensitive content</strong></h4>
						<div style={{ display: 'flex' }}>
							<p>Set this collection as explicit and sensitive content.</p>
							<Tooltip
								id="tooltip-top"
								title="Once locked, your content cannot be edited or removed as it is
										permanently stored in decentralized file storage, which will be accessible for
										other clients to view and use."
								placement="top"
								classes={{ tooltip: classes.tooltip }}
							>
								<ErrorOutline className="tooltip-icon" />
							</Tooltip>
						</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<FormControlLabel
							control={
								<Switch
									checked={isExplicit}
									onChange={(event) => setIsExplicit(event.target.checked)}
									value={"false"}
									classes={{
										switchBase: classes.switchBase,
										checked: classes.switchChecked,
										thumb: classes.switchIcon,
										track: classes.switchBar,
									}}
								/>
							}
							classes={{
								label: classes.label,
							}}
							label="Set"
						/>
					</div>
				</div>
			</div>


			<Button color="actionButton" type={'submit'}><strong>Create</strong></Button>

		</form>
	);
}

CreateCollection.propTypes = {};
