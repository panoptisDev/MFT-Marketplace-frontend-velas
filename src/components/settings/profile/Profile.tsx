import { useState } from "react";

//components
import {Instagram, Language, Twitter, FileCopy, LibraryAddCheck} from '@material-ui/icons';


import Button from "components/customButtons/Button";
import './profile.scss'
export default function Profile() {

	const [ name, setName ] = useState("");
	const [ bio, setBio ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ site, setSite ] = useState("");
	const [ instagram, setInstagram ] = useState("");
	const wallet = "0x2c7af865dc845ccca1b3d4f64229811d498cbfba";
	const [ avatar, setAvatar ] = useState(null);
	const [ BannerImg, setBannerImg ] = useState(null);
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

		if (window.Clipboard ) {
			// Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
			// window.clipboardData.setData("Text", wallet);
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
				return prompt("Copy to clipboard: Ctrl+C, Enter");
			}
			finally {
				document.body.removeChild(textarea);
				setCopied(true);
			}
		}
	};

	return (
		<div className="settingContainer">
			<div className="header">
				<h2>Profile Settings</h2>
				<Button className="outLineBtn" ><strong>Preview</strong></Button>
			</div>
			<form className="form">
				<div>
					<div className="inputGroup">
						<div className="formControl">
							<h4><strong>Name</strong></h4>
							<input className={'textInput'} type="text" onChange={nameHandle} value={name} placeholder={'Example: Treasures of the Sea'} required />
						</div>
						<div className="formControl">
							<h4><strong>Bio</strong></h4>
							<textarea className={'textInput'} style={{ height: '85px' }} onChange={bioHandle} value={bio} placeholder={'Tell the world your story!'} required />
						</div>
						<div className="formControl">
							<h4><strong>Email Address</strong></h4>
							<input className={'textInput'} type="email" onChange={emailHandle} value={email} placeholder={'Enter Email'} required />
						</div>
						<div className="formControl">
							<h4><strong>Social Connections</strong></h4>
							<p>Customize your URL on OpenSea. Must only contain lowercase letters,numbers, and hyphens.</p>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Twitter />
									&nbsp;
									<h4 className="mb0" >Twitter</h4>
								</div>
								<Button className="outLineBtn" ><strong>Connect</strong></Button>
							</div>
						</div>
						<div className="formControl">
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
						<div className="formControl">
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
						<div className="formControl">
							<h4 style={{ textAlign: 'center' }}><strong>Profile image</strong></h4>
							<label className="avatarImgInput" htmlFor="avatarInput">
								<input type="file" id="avatarInput" name="avatarInput" accept="image/*" style={{ display: 'none' }} onChange={avatarHandle} />
								{ !avatar ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
									<i className="fa fa-image imgIcon" /> }
								{ avatar && <div className="avatarImg">
									<img src={ URL.createObjectURL(avatar) } width={160} height={160} alt = ''/>
								</div> }
							</label>
						</div>

						<div className="formControl">
							<h4 style={{ textAlign: 'center' }}><strong>Profile Banner</strong></h4>
							<div className="BannerImgInput">
								<label htmlFor="BannerInput">
									<input type="file" id="BannerInput" name="BannerInput" accept="image/*" style={{ display: 'none' }} onChange={BannerImgChange} />
									{ !BannerImg ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
										<i className="fa fa-image BannerImgIcon" /> }
									{ BannerImg && <div className="BannerImg">
										<img src={URL.createObjectURL(BannerImg)} width={160} height={160}alt = ''/>
									</div> }
								</label>
								{ BannerImg && <span className={'removeImg'} onClick={ removeBanner }>&times;</span>  }
							</div>
						</div>
					</div>
				</div>
				<Button className="saveBtn outLineBtn"><strong>Save</strong></Button>
			</form>
		</div>
	);
}

Profile.propTypes = {};
