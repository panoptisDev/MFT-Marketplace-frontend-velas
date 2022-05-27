import './profile.scss'
import { useEffect, useState } from "react";
//components
import { Instagram, Language, Twitter, FileCopy, LibraryAddCheck } from '@material-ui/icons';

import Button from "components/customButtons/Button";

import { useWeb3React } from "@web3-react/core";
import toast from "react-hot-toast";
import { getIpfsHashFromFile } from "utils/ipfs";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
	const [isFirst, setFirst] = useState(true); //is used for displaying user data when enter in this screen.
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [email, setEmail] = useState("");
	const [site, setSite] = useState("");
	const [instagram, setInstagram] = useState("");
	const [twitter, setTwitter] = useState("");
	const [avatar_url, setAvatarUrl] = useState("");
	const [banner_url, setBannerUrl] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [banner, setBanner] = useState(null);
	const [copied, setCopied] = useState(false);
	const [update, setUpdating] = useState(false);

	const router = useHistory ();

	const { connector, library, chainId, account, active } = useWeb3React();
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
    }, [connector, library, account, active, chainId]);

	useEffect(() => {
		//if (!!user) login();
	}, [account, library])

	useEffect(() => {
		if (isFirst && loginStatus){
			axios.get(`/user/${account}`)
            .then(res => {                
                setProfile(res.data.user)                
				setFirst(false);
            })
		}		
	})

	function setProfile(_user){
		if (_user){
			setName(_user.name);
			setBio(_user.bio);
			setEmail(_user.email);
			setSite(_user.site_link);
			setTwitter(_user.social_twitter_link);
			setInstagram(_user.social_instagram_link);
			setBannerUrl(_user.banner_url);
			setAvatarUrl(_user.logo_url)
		}
	}

	const avatarHandle = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setAvatar(e.target.files[0]);
			setAvatarUrl("");
		}
	}
	const BannerImgChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setBanner(e.target.files[0]);
			setBannerUrl("");
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
		setAvatar(null);
	};
	const removeBanner = () => {
		setBanner(null);
	};
	const copyHandle = () => {
		if (!loginStatus){
			toast.error("Please connect your wallet.")
			return;
		}
		if (window.Clipboard) {
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

	async function onSave() {
		if (!loginStatus) {
			toast.error("Please connect to your wallet");
			return;
		}
		setUpdating(true);
		let load_toast_id = toast.loading("Please wait...");
		let avatar_temp_url = avatar_url;
		if (avatar) {
			let avatar_hash = await getIpfsHashFromFile(avatar);
			avatar_temp_url = `https://boatsail_testing.mypinata.cloud/ipfs/${avatar_hash}`;
		}
		let banner_temp_url = banner_url;
		if (banner) {
			let banner_hash = await getIpfsHashFromFile(banner);
			banner_temp_url = `https://boatsail_testing.mypinata.cloud/ipfs/${banner_hash}`;
		}
		const data = {
			address: account,
			name: name || "NoName",
			bio: bio || "",
			email: email || "",
			site_link: site || "",
			social_twitter_link: twitter || "",
			social_instagram_link: instagram || "",
			logo_url : avatar_temp_url,
			banner_url : banner_temp_url,
			// logo_url: "https://boatsail_testing.mypinata.cloud/ipfs/QmdkB2xajtJA9GmuqEpTuwTzpMLVj7Ym4YhToyp43DDCnv",
			// banner_url: "https://boatsail_testing.mypinata.cloud/ipfs/QmW6bqSEvgr4tFScBdkpQ2SjUuu2QSJ7WVdxfkN2AHGkYf"
		}
		axios.post(`/user/update/`, data)
			.then(res => {
				removeBanner();
				removeLogo();
				setProfile(res.data.user);
				setUpdating(false);
				toast.dismiss(load_toast_id);
				toast.success("Profile is updated successfully.");
				props.history.push({
					pathname : '/account',
					search : '?tab=collections',
					state: { address : account}
				})
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
								<input type="text" value={loginStatus && account} readOnly />
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
								{(avatar_url === "" || !avatar) ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
									<i className="fa fa-image imgIcon" />}
								{avatar && <div className="avatarImg">
									<img src={URL.createObjectURL(avatar)} width={160} height={160} alt='' />
								</div>}
								{avatar_url !== "" && <div className="avatarImg">
									<img src={avatar_url} width={160} height={160} alt='' />
								</div>}
							</label>
						</div>

						<div className="formControl">
							<h4 style={{ textAlign: 'center' }}><strong>Profile Banner</strong></h4>
							<div className="BannerImgInput">
								<label htmlFor="BannerInput">
									<input type="file" id="BannerInput" name="BannerInput" accept="image/*" style={{ display: 'none' }} onChange={BannerImgChange} />
									{(banner_url === "" || !banner)  ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
										<i className="fa fa-image BannerImgIcon" />}
									{banner && <div className="BannerImg">
										<img src={URL.createObjectURL(banner)} width={160} height={160} alt='' />
									</div>}
									{banner_url !== "" && <div className="BannerImg">
										<img src={banner_url} width={160} height={160} alt='' />
									</div>}
								</label>
								{banner && <span className={'removeImg'} onClick={removeBanner}>&times;</span>}
							</div>
						</div>
					</div>
				</div>
				{
					!update && <Button className="saveBtn outLineBtn" onClick={() => onSave()}><strong>Save</strong></Button>
				}
			</form>
		</div>
	);
}

export default Profile;
