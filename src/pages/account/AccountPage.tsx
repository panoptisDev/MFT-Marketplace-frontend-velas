import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import './style.scss'
import { Edit, Facebook, Settings, Share } from '@material-ui/icons';
import { Popover } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import CopyBox from 'components/copyBox/CopyBox';
import ProfileTagList from 'components/profile/tagList/ProfileTagList';
import { getIpfsHashFromFile } from 'utils/ipfs';
import toast from 'react-hot-toast';
import { useWeb3React } from '@web3-react/core';
const AccountPage = (props) => {
    const { user } = props;

    const { connector, library, chainId, account, active } = useWeb3React();
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
        
    }, [connector, library, account, active, chainId]);

    const [userProfile, setUserProfile] = useState(undefined);
    const location = useLocation();
    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        if (!userProfile) {
            getUser();
        }
    }, [user, userProfile]);

    function getUser() {
        const state = location.state;
        const userAddr = state && state["address"];
        if (userAddr && userAddr !== "") {
            setUserAddress(userAddr);
            axios.get(`/user/${userAddr}`)
                .then(res => {
                    setUserProfile(res.data.user)
                })
        }
    }
    // console.log(userProfile)

    const [isLoading, setIsLoading] = useState(false);
    const [isTopLoading, setIsTopLoading] = useState(false);
    const [sectionHeight, setSectionHeight] = useState("0vh");
    const [loadingHeight, setLoadingHeight] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: "screen and (max-width: 450px) and (orientation:portrait)", });
    const isLandOrMobile = useMediaQuery({ query: "screen and (max-height: 450px) and (orientation:landscape)", });
    useEffect(() => {
        if (isLoading || isTopLoading) {
            setLoadingHeight(100)
            setSectionHeight("0vh")
        }
        else {
            setLoadingHeight(0)
            setSectionHeight("100%")
        }

        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
    }, [isLoading, isTabletOrMobile, isLandOrMobile, isTopLoading]);

    window.onload = () => {
        setIsLoading(false)
        setIsTopLoading(false)

    };

    // From API
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [anchorElTop, setAnchorElTop] = useState(null);

    const showMoreActions = (e) => {
        e.preventDefault();
        setAnchorElTop(e.currentTarget);
    }

    const [isUserInfoUpdated, setUserInfoUpdated] = useState(false);
    const onChangeBannerFile = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setBannerFile(e.target.files[0]);
            const load_toast_id = toast.loading("Please wait...");
            let banner_hash = await getIpfsHashFromFile(e.target.files[0]);
            userProfile.banner_url = `https://boatsail_testing.mypinata.cloud/ipfs/${banner_hash}`;
            axios.post("/user/update/", userProfile)
                .then(res => {
                    setUserProfile(res.data.user);
                    toast.dismiss(load_toast_id);
                    setUserInfoUpdated(true);
                })
                .catch(err => {
                    setIsTopLoading(false);
                    toast.dismiss(load_toast_id);
                    setUserInfoUpdated(false);
                })
        }
    }

    const onChangeAvatarFile = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setAvatarFile(e.target.files[0]);
            const load_toast_id = toast.loading("Please wait...");
            let avatar_hash = await getIpfsHashFromFile(e.target.files[0]);
            userProfile.logo_url = `https://boatsail_testing.mypinata.cloud/ipfs/${avatar_hash}`;
            axios.post("/user/update/", userProfile)
                .then(res => {
                    setUserProfile(res.data.user);
                    toast.dismiss(load_toast_id);
                    setUserInfoUpdated(true);
                })
                .catch(err => {
                    toast.dismiss(load_toast_id);
                    setUserInfoUpdated(false);
                })
        }
    }

    const [tab, setTab] = useState("");
    useEffect(() => {
        setTab(location.search ? location.search.replace("?tab=", "") : "collections");
    });

    function switchTab(_tab) {
        setTab(_tab);
    }

    return (
        <>
            <Topbar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setIsLoading={setIsTopLoading} isUserInfoUpdated={isUserInfoUpdated} />
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className='page accountPage'>
                <div className="loding" style={{ width: "100%", height: loadingHeight + "%", display: loadingHeight === 0 ? 'none' : 'flex' }}>
                    <Loading />
                </div>
                <div className="sections" style={{ width: "100%", height: sectionHeight }}>
                    <div className="container">
                        <label className="banner-box">
                            <input type="file" id="main_file_input" name="main_file" style={{ display: 'none' }}
                                accept=".jpg,.png,.gif,.svg" onChange={onChangeBannerFile} />
                            {
                                bannerFile
                                    ? <img src={URL.createObjectURL(bannerFile) || "/assets/img/bg7.jpg"} className="banner-img" alt="" />
                                    : <img src={userProfile && userProfile.banner_url || "/assets/img/bg7.jpg"} className="banner-img" alt="" />
                            }
                            <div className="hover-back" >
                                <Edit className="edit-icon" />
                            </div>
                        </label>
                        <div className="sub-box">
                            <div className="empty-box" style={{ flex: 1 }} />
                            <div className="user-info-box" >
                                <label className="avatar-box">
                                    <input type="file" id="avatar_file" name="avatar_file" style={{ display: 'none' }}
                                        accept=".jpg,.png,.gif,.svg" onChange={onChangeAvatarFile} alt="" />
                                    <Edit className="edit-icon" />
                                    <img src={avatarFile ? URL.createObjectURL(avatarFile) : userProfile && userProfile.logo_url || "/assets/img/faces/avatar.jpg"} className="avatar-img" alt="" />
                                </label>
                                <h2 className="user-name">{userProfile && userProfile.name}</h2>
                                <CopyBox value={userProfile && userProfile.address} />
                            </div>
                            {
                                loginStatus ? <div className="setting-box">
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
                                            style={{ marginTop: "8px" }}
                                        >
                                            <div className="actionList">
                                                <div className="action-item" onClick={() => {
                                                    setAnchorElTop(null);
                                                }}>
                                                    <div className="action-icon">
                                                        {/* <Copyright /> */}
                                                    </div>
                                                    <div className="action-label">Copy Link</div>
                                                </div>
                                                <div className="action-item" onClick={() => {
                                                    setAnchorElTop(null);
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
                                </div> : <div className="setting-box"/>
                            }

                        </div>

                    </div>
                    {userAddress && <ProfileTagList
                        {...props}
                        userAddress={userAddress}
                        tab={tab}
                        switchTab={switchTab} />}
                </div>
                <img src="assets/img/bg8.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
export default AccountPage;