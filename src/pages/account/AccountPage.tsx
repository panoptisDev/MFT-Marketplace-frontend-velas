import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import './style.scss'
import { Edit, Facebook, Settings, Share } from '@material-ui/icons';
import { Popover } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import CopyBox from 'components/copyBox/CopyBox';
import ProfileTagList from 'components/profile/tagList/ProfileTagList';
export default function AccountPage( ) {
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

    // From API
	const [ bannerFile, setBannerFile ] = useState(null);
	const [ avatarFile, setAvatarFile ] = useState(null);
	const [anchorElTop, setAnchorElTop] = useState(null);

	const showMoreActions = (e) => {
		e.preventDefault();
		setAnchorElTop(e.currentTarget);
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
    const router = useHistory();
    const tab = router.location.search ? router.location.search : "collection";
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page accountPage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "%", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                    <div className="container">
                        <label className="banner-box">
                            <input type="file" id="main_file_input" name="main_file" style={{ display: 'none' }}
                                accept=".jpg,.png,.gif,.svg" onChange={onChangeBannerFile} />
                            {
                                bannerFile
                                    ? <img src={ URL.createObjectURL(bannerFile) } className="banner-img" alt = "" />
                                    : <img src="/assets/img/bg7.jpg" className="banner-img" alt = "" />
                            }
                            <div className="hover-back" >
                                <Edit className="edit-icon" />
                            </div>
                        </label>
                        <div className="sub-box">
                            <div className="empty-box" style={{flex: 1}} />
                            <div className="user-info-box" >
                                <label className="avatar-box">
                                    <input type="file" id="avatar_file" name="avatar_file" style={{ display: 'none' }}
                                        accept=".jpg,.png,.gif,.svg" onChange={onChangeAvatarFile} alt = "" />
                                    <Edit className="edit-icon" />
                                    <img src={avatarFile ? URL.createObjectURL(avatarFile) : "/assets/img/faces/avatar.jpg"} className="avatar-img" alt = "" />
                                </label>
                                <h2 className="user-name">Unnamed</h2>
                                <CopyBox value={"asdfasdfasdfasdfasdf"} />
                                <p className="joined-label">Joined April 2022</p>
                            </div>
                            <div className="setting-box">
                                <div className="setting-container">
                                    <div className="share-btn" onClick={showMoreActions}>
                                        <Share />
                                    </div>
                                    <Popover
                                        classes={{
                                            paper: "popover",
                                        }}
                                        open={Boolean(anchorElTop)}
                                        anchorEl={anchorElTop}
                                        onClose={() => setAnchorElTop(null)}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        style={{marginTop: "8px"}}
                                    >
                                        <div className="actionList">
                                            <div className="action-item" onClick={() => {
                                                setAnchorElTop(null);
                                                // props.handleClickCommand("sell", props.info.token);
                                            }}>
                                                <div className="action-icon">
                                                    {/* <Copyright /> */}
                                                </div>
                                                <div className="action-label">Copy Link</div>
                                            </div>
                                            <div className="action-item" onClick={() => {
                                                setAnchorElTop(null);
                                                // props.handleClickCommand("transfer", props.info.token);
                                            }}>
                                                <div className="action-icon">
                                                    <Facebook />
                                                </div>
                                                <div className="action-label">
                                                    Share on Facebook
                                                </div>
                                            </div>
                                            <div className="action-item" onClick={() => {
                                                setAnchorElTop(null);
                                                // props.handleClickCommand("hide", props.info.token);
                                            }}>
                                                <div className="action-icon">
                                                    {/* <Twitter /> */}
                                                </div>
                                                <div className="action-label">Share to Twitter</div>
                                            </div>
                                        </div>
                                    </Popover>
                                    <Link to="/account/settings">
                                            <div className="setting-btn">
                                                <Settings />
                                            </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <ProfileTagList tab={tab} />
                </div>
                <img src="assets/img/bg8.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
