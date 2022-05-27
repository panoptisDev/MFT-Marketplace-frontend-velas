import Select from "react-select";
import Tooltip from '@material-ui/core/Tooltip';
import { useEffect, useState } from 'react'
import {ErrorOutline} from "@material-ui/icons";
import Button from 'components/customButtons/Button';
import './createCollection.scss'
import Logo from './collection/Logo';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Dropdown from "components/dropdown/Dropdown";

import { useWeb3React } from '@web3-react/core';
import { getIpfsHash, getIpfsHashFromFile } from 'utils/ipfs';
import axios from 'axios';
import toast from "react-hot-toast";
import { createNewCollection } from "utils/contracts";

const options = [
	{ value: "ethereum", label: "Ethereum", customAbbreviation: "an open-source blockchain that powers most NFT sails" },
	{ value: "polygon", label: "Polygon", customAbbreviation: "A fast gas-free blockchain experience that works with Ethereum" },
];
const CreateCollection = (props) => {
    
    const { isCreate, collectionName } = props;

    const { connector, library, chainId, account, active } = useWeb3React();
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
    }, [connector, library, account, active, chainId]);

    const [collection, setCollection] = useState(null);
    let tempName = collectionName;
    useEffect(() => {
        if (!collection &&  !isCreate && collectionName) {
            fetchCollection();
        }
    }, [collection]);

    function fetchCollection() {
        axios.get(`/collection/detail/${tempName}`)
            .then(res => {
                setCollection(res.data.collection);
            })
            .catch((err) => {
                setCollection(null);
            });
    }

    useEffect(() => {
        if (collection && !isLoaded){
            setName(collection.name);
            setDescription(collection.description);
            setYourSite(collection.social_my_link);
            setDiscord(collection.social_discord_link);
            setInstagram(collection.social_instagram_link);
            setMedium(collection.social_medium_link);
            setTme(collection.social_telegram_link);
            setLogoUri(collection.logo_uri);
            setBannerUri(collection.banner_uri);
            setFeaturedUri(collection.featured_uri);
            setCategory(collection.category[0]);
            setIsExplicit(collection.category[1] === "sensitive");
            setFee(collection.royalty);
            setIsLoaded(true);
        }
    });

	const [ logo, setLogo ] = useState<any>("");
    const [ logo_uri, setLogoUri ] = useState("");
	const [ FeaturedImg, setFeaturedImg ] = useState<any>("");
    const [ featured_uri, setFeaturedUri ] = useState("");
    const [ banner_uri, setBannerUri ] = useState("");
	const [ BannerImg, setBannerImg ] = useState<any>("");
	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
    const [ category, setCategory] = useState("");
	const [ yourSite, setYourSite ] = useState("");
	const [ discord, setDiscord ] = useState("https://discord.gg/");
	const [ instagram, setInstagram ] = useState("https://www.instagram.com/");
	const [ medium, setMedium ] = useState("https://www.medium.com/@");
	const [ tme, setTme ] = useState("https://t.me/");
	const [ fee, setFee ] = useState("");
	// const [ blockchain, setBlockchain ] = useState([]);
	const [ isExplicit, setIsExplicit] = useState(false);
    const [ isLoaded, setIsLoaded] = useState(false);
	const logoChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setLogo(e.target.files[0]);
            setLogoUri("");
		}
	};
	const FeaturedImgChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFeaturedImg(e.target.files[0]);
            setFeaturedUri("");
		}
	};
	const BannerImgChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setBannerImg(e.target.files[0]);
            setBannerUri("");
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
	const descriptionHandle = (e) => {
		setDescription(e.target.value);
	}
	const categoryHandle = (value) => {
		setCategory(value);
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
	// const blockchainHandle = (val) => {
	// 	setBlockchain(val);
	// }

    async function onCreateCollection(){
        if (!loginStatus) {
            toast.error('Please connect your wallet correctly!');
            return;
        }
        if (isCreate)
        if ((isCreate && !logo) || (!isCreate && (!collection.logo_uri || !logo)) ){
            toast.error("Logo Image is required!");
            return;
        }
        if (!name){
            toast.error("Collection Name is required");
            return;
        }
        const load_toast_id = toast.loading("Please wait...");
        try{
            let logo_uri = isCreate ? ""  : collection.logo_uri;
            if (logo !== ""){
                let logo_hash = await getIpfsHashFromFile(logo);
                logo_uri = `https://boatsail_testing.mypinata.cloud/ipfs/${logo_hash}`;
            }
            let banner_uri = isCreate ? ""  : collection.banner_uri;
            if (BannerImg !== ""){
                let banner_hash = await getIpfsHashFromFile(BannerImg);
                banner_uri = `https://boatsail_testing.mypinata.cloud/ipfs/${banner_hash}`;
            }
            let featured_uri = isCreate ? ""  : collection.featured_uri;
            if (FeaturedImg !== ""){
                let featured_hash = await getIpfsHashFromFile(FeaturedImg);
                featured_uri = `https://boatsail_testing.mypinata.cloud/ipfs/${featured_hash}`;
            }
            let collection_address = "";
            if (isCreate){
                collection_address = await createNewCollection(true, chainId,library.getSigner());
            }else{
                collection_address = collection.address;
            }
            let metaData = {
                address : collection_address,
                logo_uri : logo_uri,
                banner_uri : banner_uri,
                featured_uri : featured_uri,
                name : name,
                description : description,
                category : isExplicit ? category === "" ? ["sensitive"] : [category, "sensitive"] : [],
                social_my_link : yourSite,
                social_discord_link : discord,
                social_instagram_link : instagram,
                social_medium_link : medium,
                social_telegram_link : tme,
                royalty : fee
            }
            await axios.post(`/collection/update/`, metaData)
                .then(res => {
                    tempName = name;
                    setCollection(res.data.collection);
                    const msg = isCreate ? "Created" : "Updated";
                    toast.success("NFT Collection is " + msg + " Successfully");
                    toast.dismiss(load_toast_id);
                    if (isCreate)props.history.push(`/collections`);
                })
                .catch(err => {
                    console.log(err);
                    toast.dismiss(load_toast_id);
                })

        }catch(err){
            console.log(err);
            toast.dismiss(load_toast_id);
            toast.error("NFT Collection Creation is failed!")
        }
    }
  return (
    <div className='createCollectionContainer'>
        <p><span style={{ color: 'red' }}>*</span> Required fields</p>

        <Logo logoUri={logo_uri} onChange={(e)=>logoChange(e)} />

        <div className='formControl'>
            <h4><strong>Featured image</strong></h4>
            <p>This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.</p>
            <div className="FeaturedImgInput">
                <label htmlFor="FeaturedInput">
                    <input type="file" id="FeaturedInput" name="FeaturedInput" accept="image/*" style={{ display: 'none' }} onChange={FeaturedImgChange} />
                    { !FeaturedImg && featured_uri  !== ""? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
                        <i className="fa fa-image FeaturedImgIcon" /> }
                    { FeaturedImg && featured_uri ===  "" && <div className="FeaturedImg">
                        <img src={URL.createObjectURL(FeaturedImg) } width={300} height={200}alt=''/>
                    </div> }
                    { featured_uri && !FeaturedImg && <div className="FeaturedImg">
                        <img src={featured_uri} width={300} height={200}alt=''/>
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
                    { !BannerImg && banner_uri !== "" ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
                        <i className="fa fa-image BannerImgIcon" /> }
                    { BannerImg && banner_uri === "" && <div className="BannerImg">
                        <img src={URL.createObjectURL(BannerImg)} width={700} height={200} alt='' />
                    </div> }
                    { banner_uri && !BannerImg && <div className="BannerImg">
                        <img src={banner_uri} width={700} height={200} alt='' />
                    </div> }
                </label>
                { BannerImg && <span className={'removeImg'} onClick={ () => removeImg('BannerImg') }>&times;</span> }
            </div>

        </div>

        <div className={'formControl'}>
            <h4><strong>Name</strong><span style={{ color: 'red' }}>*</span></h4>
            <input className={'textInput'} type="text" onChange={nameHandle} value={name} placeholder={'Example: Treasures of the Sea'} required />
        </div>

        <div className={'formControl'}>
            <h4><strong>Description</strong></h4>
            <p><a target={'_blank'}rel="noreferrer" href={"https://www.markdownguide.org/cheat-sheet/"} style={{color: 'rgb(32, 129, 226)'}}>Markdown</a> syntax is supported. 0 of 1000 characters used.</p>
            <textarea className={'textareaInput'} rows={4} onChange={descriptionHandle} required value={description} placeholder={'Write briefly about this collection'}/>
        </div>

        <div className={'formControl'}>
            <h4><strong>Category</strong></h4>
            <p>Adding a category will help make your item discoverable on OpenSea.</p>
            <p>You can select a maximum of one category.</p>
            <Dropdown
                navDropdown
                buttonText="Add Category"
                buttonProps={{
                    className: "navLink",
                    color: "transparent",
                }}
                onChangeHandle={(val) => (categoryHandle(val))}
                dropdownList={[
                    { divider: true },
                    "Art",
                    { divider: true },
                    "Collectibles",
                    { divider: true },
                ]}
                defaultValue={category}
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
            <p><a target={'_blank'}rel="noreferrer" href={"https://support.opensea.io/hc/en-us/articles/1500009575482"} style={{color: 'rgb(32, 129, 226)'}}>Learn more about creator earnings.</a></p>
            <p><strong>Percentage fee</strong></p>
            <input className={'textInput'} type="text" onChange={feeHandle} value={fee} placeholder={'e.g. 2.5'} required />
        </div>

        <div className={'formControl'}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h4><strong>Explicit & sensitive content</strong></h4>
                    <div style={{ display: 'flex', justifyContent : 'center', marginBottom: '1rem'}}>
                        <p style={{marginBottom : 0}}>Set this collection as explicit and sensitive content.</p>
                        <Tooltip
                            id="tooltip-top"
                            title="Once locked, your content cannot be edited or removed as it is
                                    permanently stored in decentralized file storage, which will be accessible for
                                    other clients to view and use."
                            placement="top"
                            classes={{ tooltip: "tooltip" }}
                            className = "myTooltip"
                        >
                            <ErrorOutline className="tooltip-icon" />
                        </Tooltip>
                    </div>
                </div>
                <div className="check-box" style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isExplicit}
                                onChange={(event) => setIsExplicit(event.target.checked)}
                                value={"false"}
                                classes={{
                                    switchBase: "switchBase",
                                    checked: "switchChecked",
                                    thumb: "switchIcon",
                                    track: "switchBar",
                                }}
                            />
                        }
                        classes={{
                            label: "label",
                        }}
                        label=""
                    />
                </div>
            </div>
        </div>

        <Button className="outLineBtn" onClick={() => onCreateCollection()} ><strong>{isCreate ? "Create" : "Save"}</strong></Button>
    </div>
  )
}
export default CreateCollection;