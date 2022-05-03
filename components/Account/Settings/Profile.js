import React, { useState } from "react";

//components
import Button from "components/CustomButtons/Button.js";
import {Instagram, Language, Twitter, FileCopy, LibraryAddCheck} from '@material-ui/icons';


// style
import {makeStyles} from "@material-ui/core/styles";
import javascriptStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
import styles from "styles/jss/nextjs-material-kit/components/account/settings/profileStyle";

const useStyles = makeStyles({...styles, ...javascriptStyles});

export default function Profile() {
	const classes = useStyles();

	const [ name, setName ] = useState("");
	const [ bio, setBio ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ site, setSite ] = useState("");
	const [ instagram, setInstagram ] = useState("");
	const [ wallet, setWallet ] = useState("0x2c7af865dc845ccca1b3d4f64229811d498cbfba");
	const [ avatar, setAvatar ] = useState('');
	const [ BannerImg, setBannerImg ] = useState("");
	const [ copied, setCopied ] = useState(false);
	const avatarHandle = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setAvatar(e.target.files[0]);
		}
	}
	const BannerImgChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setBannerImg(e.target.files[0]);
		}
	};
	const nameHandle = (e) => {
		setName(e.target.value);
	}
	const bioHandle = (e) => {
		setBio(e.target.value);
	}
	const emailHandle = (e) => {
		setEmail(e.target.value);
	}
	const siteHandle = (e) => {
		setSite(e.target.value);
	}
	const instagramHandle = (e) => {
		setInstagram(e.target.value);
	}

	const removeBanner = () => {
		setBannerImg('');
	};
	const copyHandle = () => {

		if (window.clipboardData && window.clipboardData.setData) {
			// Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
			window.clipboardData.setData("Text", wallet);
			return setCopied(true);

		}
		else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
			let textarea = document.createElement("textarea");
			textarea.textContent = wallet;
			textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
			document.body.appendChild(textarea);
			textarea.select();
			try {
				return document.execCommand("copy");  // Security exception may be thrown by some browsers.
			}
			catch (ex) {
				console.warn("Copy to clipboard failed.", ex);
				return prompt("Copy to clipboard: Ctrl+C, Enter", text);
			}
			finally {
				document.body.removeChild(textarea);
				setCopied(true);
			}
		}
	};

	return (
		<div>
			<div className={classes.header}>
				<h2>Profile Settings</h2>
				<Button color="actionButton" type={'button'}><strong>Preview</strong></Button>
			</div>
			<form className={ classes.form }>
				<div>
					<div className={classes.inputGroup}>
						<div className={ classes.formControl }>
							<h4><strong>Name</strong></h4>
							<input className={'textInput'} type="text" onChange={nameHandle} value={name} placeholder={'Example: Treasures of the Sea'} required />
						</div>
						<div className={ classes.formControl }>
							<h4><strong>Bio</strong></h4>
							<textarea className={'textInput'} style={{ height: '85px' }} onChange={bioHandle} value={bio} placeholder={'Tell the world your story!'} required />
						</div>
						<div className={ classes.formControl }>
							<h4><strong>Email Address</strong></h4>
							<input className={'textInput'} type="email" onChange={emailHandle} value={email} placeholder={'Enter Email'} required />
						</div>
						<div className={ classes.formControl }>
							<h4><strong>Social Connections</strong></h4>
							<p>Customize your URL on OpenSea. Must only contain lowercase letters,numbers, and hyphens.</p>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Twitter />
									&nbsp;
									<h4>Twitter</h4>
								</div>
								<Button color="info" type={'button'}><strong>Connect</strong></Button>
							</div>
						</div>
						<div className={ classes.formControl }>
							<h4><strong>Links</strong></h4>
							<div style={{ background: '#353840' }}>
								<div className={"linkInput"} style={{ borderRadius: '6px 6px 0 0' }}>
									<Instagram />
									<input type={"text"} onChange={siteHandle} value={site} placeholder={'your site url'} />
								</div>
								<div className={"linkInput"} style={{ borderRadius: '0 0 6px 6px', borderBottomWidth: '1px' }}>
									<Language />
									<input type={"text"} onChange={instagramHandle} value={instagram} placeholder={'https://www.instagram.com/'} />
								</div>
							</div>
						</div>
						<div className={ classes.formControl }>
							<h4><strong>Wallet Address</strong></h4>
							<div className={'iconInput'}>
								<input type="text" value={wallet} readOnly />
								{
									copied ? <LibraryAddCheck onClick={copyHandle} style={{ cursor: 'pointer' }} />
										: <FileCopy onClick={copyHandle} style={{ cursor: 'pointer' }} />
								}
							</div>
						</div>
					</div>
					<div>
						<div className={ classes.formControl }>
							<h4 style={{ textAlign: 'center' }}><strong>Profile image</strong></h4>
							<label className={ classes.avatarImgInput } htmlFor="avatarInput">
								<input type="file" id="avatarInput" name="avatarInput" accept="image/*" style={{ display: 'none' }} onChange={avatarHandle} />
								{ !avatar ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
									<i className="fa fa-image imgIcon" /> }
								{ avatar && <div className="avatarImg">
									<img src={ URL.createObjectURL(avatar) } width={160} height={160} />
								</div> }
							</label>
						</div>

						<div className={ classes.formControl }>
							<h4 style={{ textAlign: 'center' }}><strong>Profile Banner</strong></h4>
							<div className={ classes.BannerImgInput }>
								<label htmlFor="BannerInput">
									<input type="file" id="BannerInput" name="BannerInput" accept="image/*" style={{ display: 'none' }} onChange={BannerImgChange} />
									{ !BannerImg ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
										<i className="fa fa-image BannerImgIcon" /> }
									{ BannerImg && <div className="BannerImg">
										<img src={URL.createObjectURL(BannerImg)} width={160} height={160}/>
									</div> }
								</label>
								{ BannerImg && <span className={'removeImg'} onClick={ removeBanner }>&times;</span>  }
							</div>
						</div>
					</div>
				</div>
				<Button color="actionButton" type={'submit'} className={ classes.saveBtn }><strong>Save</strong></Button>
			</form>
		</div>
	);
}

Profile.propTypes = {};
