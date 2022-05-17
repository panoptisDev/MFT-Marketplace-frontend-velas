import './profile.scss'
import { useState } from "react";
//components
import {Instagram, Language, Twitter, FileCopy, LibraryAddCheck} from '@material-ui/icons';

import Button from "components/customButtons/Button";

import { useWeb3React } from "@web3-react/core";
import toast from "react-hot-toast";
import { getIpfsHashFromFile } from "utils/ipfs";
import axios from 'axios';

export default function Profile() {

	const [ name, setName ] = useState("");
	const [ bio, setBio ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ site, setSite ] = useState("");
	const [ instagram, setInstagram ] = useState("");
	const [ twitter, setTwitter ] = useState("");
	const [ avatar, setAvatar ] = useState(null);
	const [ banner, setBanner ] = useState(null);
	const [ copied, setCopied ] = useState(false);
	const [ update, setUpdating ] = useState(false);

	const { library, chainId, account } = useWeb3React();
	//useEffect(() => {},[account, library])

	const avatarHandle = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setAvatar(e.target.files[0]);
		}
	}
	const BannerImgChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setBanner(e.target.files[0]);
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
	const twitterHandle = (e) => {
		setTwitter(e.target.value);
	}
	const removeLogo = () => {
		setAvatar('');
	};
	const removeBanner = () => {
		setBanner('');
	};
	const copyHandle = () => {

		if (window.Clipboard ) {
			// Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
			// window.clipboardData.setData("Text", wallet);
			return setCopied(true);

		}
		else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
			let textarea = document.createElement("textarea");
			textarea.textContent = account;
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

	async function onSave(){
		if (!account || !library){
			toast.error("Please connect to your wallet");
			return;
		}
		setUpdating(true);
		let load_toast_id = toast.loading("Please wait...");
		let avatar_url = "";
		if (avatar){
			let avatar_hash = await getIpfsHashFromFile(avatar);
			avatar_url = `https://boatsail_testing.mypinata.cloud/ipfs/${avatar_hash}`;
		}
		
		let banner_url = "";
		if (banner){
			let banner_hash = await getIpfsHashFromFile(banner);
			banner_url = `https://boatsail_testing.mypinata.cloud/ipfs/${banner_hash}`;
		}
		const data : any = {
			address : account,
			name : name || "NoName",
			bio : bio || "",
			email : email || "",
			site_link : site || "",
			social_twitter_link : twitter || "",
			social_instagram_link : instagram || "",
			//logo_url : avatar_url || "",
			//bannerr_url : banner_url || "",
			logo_url : "https://boatsail_testing.mypinata.cloud/ipfs/QmdkB2xajtJA9GmuqEpTuwTzpMLVj7Ym4YhToyp43DDCnv",
			banner_url : "https://boatsail_testing.mypinata.cloud/ipfs/QmW6bqSEvgr4tFScBdkpQ2SjUuu2QSJ7WVdxfkN2AHGkYf"
		}
		axios.post("/user/update", data)
			.then(res => {
				setAvatar('');
				setBanner('');
				setUpdating(false);
				toast.dismiss(load_toast_id);
				toast.success("Profile is updated successfully.");
			})
			.catch(err => {
				setUpdating(false);
				toast.dismiss(load_toast_id);
				toast.error("Profile Updating is failed.")
			})

	}

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
							<h4><strong>Links</strong></h4>
							<div style={{ background: '#353840' }}>
								<div className={"linkInput"} style={{ borderRadius: '0 0 6px 6px', borderBottomWidth: '1px' }}>
									<Language />
									<input type={"text"} onChange={siteHandle} value={site} placeholder={'Your Site URL'} />
								</div>
								<div className={"linkInput"} style={{ borderRadius: '6px 6px 0 0' }}>
									<Twitter />
									<input type={"text"} onChange={twitterHandle} value={twitter} placeholder={'https://www.twitter.com/'} />
								</div>
								<div className={"linkInput"} style={{ borderRadius: '6px 6px 0 0' }}>
									<Instagram />
									<input type={"text"} onChange={instagramHandle} value={instagram} placeholder={'https://www.instagram.com/'} />
								</div>
							</div>
						</div>
						<div className="formControl">
							<h4><strong>Wallet Address</strong></h4>
							<div className={'iconInput'}>
								<input type="text" value={account} readOnly />
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
									{ !banner ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
										<i className="fa fa-image BannerImgIcon" /> }
									{ banner && <div className="BannerImg">
										<img src={URL.createObjectURL(banner)} width={160} height={160}alt = ''/>
									</div> }
								</label>
								{ banner && <span className={'removeImg'} onClick={ removeBanner }>&times;</span>  }
							</div>
						</div>
					</div>
				</div>
				{
					!update && <Button className="saveBtn outLineBtn" onClick={()=>onSave()}><strong>Save</strong></Button>
				}
			</form>
		</div>
	);
}

Profile.propTypes = {};
