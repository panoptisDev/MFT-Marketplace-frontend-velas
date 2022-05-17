import  { useEffect,  useState} from "react";
import {Edit, ViewList, Add, MoreVert} from '@material-ui/icons';
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";


import './unTitledStyle.scss'
import Topbar from "components/topbar/Topbar";
import Loading from "components/loading/Loading";
import { useMediaQuery } from "react-responsive";
import Menu from "components/menu/Menu";
import ProfileTabBody from "components/profile/tabBody/ProfileTabBody";
type propsType = {
    getUser : any,
    user : any,
    login : any,
}
export default function UnTitledCollectionPage({getUser, user, login} : propsType) {

	// const router = useHistory();

	// const { connectWallet, address, error } = useWeb3();
	const tab = "collection";
    // const tab = router.query.tab ? router.query.tab : "collection";
	const [ bannerFile, setBannerFile ] = useState(null);
	const [ avatarFile, setAvatarFile ] = useState(null);
	// const [anchorElTop, setAnchorElTop] = React.useState(null);

	const showMoreActions = (e) => {
		e.preventDefault();
		// setAnchorElTop(e.currentTarget);
	}

	const onChangeBannerFile =(e) => {
		if (e.target.files && e.target.files.length > 0) {
			setBannerFile(e.target.files[0]);
		}
	}

	const onChangeAvatarFile =(e) => {
		if (e.target.files && e.target.files.length > 0) {
			setAvatarFile(e.target.files[0]);
		}
	}

    const [isLoading, setIsLoading] = useState(false);
    const [isTopLoading, setIsTopLoading] = useState(false);
    const [sectionHeight, setSectionHeight] = useState("0vh");
    const [loadingHeight, setLoadingHeight] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "screen and (max-width: 450px) and (orientation:portrait)",});
    const isLandOrMobile = useMediaQuery({query: "screen and (max-height: 450px) and (orientation:landscape)",});
    useEffect(() => {
        if (isLoading || isTopLoading) {
            setLoadingHeight(100)
            setSectionHeight("0vh")
        }
        else{
            setLoadingHeight(0)
            setSectionHeight("100%")
        }

        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
    }, [isLoading, isTabletOrMobile, isLandOrMobile, isTopLoading]);
    
    window.onload = ()=> {
        setIsLoading(false)
        setIsTopLoading(false)

    };


	return (
        <>
        <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
        <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
        <div className='page collectionPage'>
            <div className="loding" style = {{width: "100%", height: loadingHeight + "%", display: loadingHeight === 0? 'none':'flex'}}>
                <Loading/>
            </div>
            <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                <div className="container">
                <label className="banner-box">
                    <input type="file" id="main_file_input" name="main_file" style={{ display: 'none' }}
                        accept=".jpg,.png,.gif,.svg" onChange={(e)=>{onChangeBannerFile(e)}} />
                    {
                        bannerFile
                            ? <img src={ URL.createObjectURL(bannerFile) } className="banner-img" alt = "" />
                            : <img src="/assets/img/bg7.jpg" className="banner-img"  alt = ""/>
                    }
                    <div className="hover-back">
                        <Edit className="edit-icon" />
                    </div>
                </label>
                <div className="sub-box">
                    <div className="watch-box">
                        <button className="watch-btn m-r-5 m-l-10"><Add />WatchList</button>
                        <button className="watch-btn m-l-5 icon-btn"><MoreVert /></button>
                    </div>
                    <div className="user-info-box">
                        <label className="avatar-box">
                            <input type="file" id="avatar_file" name="avatar_file" style={{ display: 'none' }}
                                accept=".jpg,.png,.gif,.svg" onChange={onChangeAvatarFile} />
                            <Edit className="edit-icon" />
                            <img src={avatarFile ? URL.createObjectURL(avatarFile) : "/assets/img/faces/avatar.jpg"} className="avatar-img"  alt = ""/>
                        </label>
                        <h2 className="user-name m-0">Untitled Collection</h2>
                        <h2 className="user-name m-0">#316120299</h2>
                    </div>
                    <div className="setting-box">
                        <button className="add-btn">Add Item</button>
                        <div className="setting-container">
                            <div className="share-btn" onClick={showMoreActions}>
                                <Edit />
                            </div>
                            <Link to="/collections/untitled-collection-316120299/payouts">
                                    <Tooltip
                                        id="tooltip-top"
                                        title="Creator Earnings"
                                        placement="top"
                                        classes={{ tooltip: "tooltip"}}
                                    >
                                        <div className="setting-btn">
                                            <ViewList />
                                        </div>
                                    </Tooltip>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mobile-func-box">
                    <div className="watch-box">
                        <button className="watch-btn m-r-5"><Add />WatchList</button>
                        <button className="watch-btn m-l-5 icon-btn"><MoreVert /></button>
                    </div>
                    <div className="setting-box">
                        <button className="add-btn">Add Item</button>
                        <div className="setting-container">
                            <div className="share-btn" onClick={showMoreActions}>
                                <Edit />
                            </div>
                            <Link to="/collections/untitled-collection-316120299/payouts">
                                    <Tooltip
                                        id="tooltip-top"
                                        title="Creator Earnings"
                                        placement="top"
                                        classes={{ tooltip: "tooltip"}}
                                    >
                                        <div className="setting-btn">
                                            <ViewList />
                                        </div>
                                    </Tooltip>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-box m-t-20">
                        <div className="detail-item item-1">
                            <p className="value-label">5</p>
                            <p className="m-0">items</p>
                        </div>
                        <div className="detail-item item-2">
                            <p className="value-label">1</p>
                            <p className="m-0">owner</p>
                        </div>
                        <div className="detail-item item-3">
                            <p className="value-label"><img src="/img/parts/ether.png" className="eth-icon"  alt = ""/>---</p>
                            <p className="m-0">floor price</p>
                        </div>
                        <div className="detail-item item-4">
                            <p className="value-label"><img src="/img/parts/ether.png" className="eth-icon" alt = "" />0.00</p>
                            <p className="m-0">volume traded</p>
                        </div>
                    </div>
                    <div style={{textAlign: "center"}} className="m-t-20">Welcome to the home of Untitled Collection #316120299 on OpenSea.</div>
                    <div style={{textAlign: "center"}}>Discover the best items in this collection.</div>
                </div>
                <div className="hline"></div>
                {/* <CollectionList/> */}
                <ProfileTabBody tab={tab}/>
			    {/* <ItemList tab={tab} /> */}
		</div>
        </div>
        <img src="/assets/home_bg.jpg" alt="" className="bg1" />
    </div>
    </>
	);
}

export async function getStaticProps({params}) {
	// TODO get items of collection from params.companyName, params.groupName
	const userInfo = {}
	return {
		props: {
			userInfo
		}
	}
}

export async function getStaticPaths() {
	// TODO get collection names from db.
	const paths =
		[
			{
				params: {
					id: "untitled-collection-316120299",
				}
			},
		]
	return {
		paths,
		fallback: false
	}
}
