import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link'
import ConnectModal from '../connectModal/ConnectModal';
import { useHistory, useLocation } from "react-router-dom";
import './topbar.scss'
import Button from 'components/customButtons/Button';
import CustomDropdown from 'components/dropdown/CustomDropdown';
import { truncateWalletString } from 'utils';
import useAuth from 'hooks/useAuth';
import axios from 'axios';

const Topbar = (props) => {
    const { user, menuOpen, setMenuOpen, setIsLoading, isUserInfoUpdated } = props

    const { connector, library, chainId, account, active } = useWeb3React();
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
    }, [connector, library, account, active, chainId]);
    const { logout } = useAuth();

    const [logo, setLogo] = useState("");
    useEffect(() => {
        if (loginStatus || isUserInfoUpdated) {
            console.log("Fetching Item");
            axios.get(`/user/${account}`)
                .then(res => {
                    setLogo(res.data.user.logo_url);
                })
        }
    }, [loginStatus, isUserInfoUpdated]);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [navId, setNavId] = useState('mint')
    const search = useLocation();
    useEffect(() => {

        const label = search.pathname.replace('/', '')
        if (label.includes('create/')) {
            setNavId(label.split('/')[0])
        }
        else {
            setNavId(label)
        }

    }, [setNavId, search]);

    const router = useHistory();
    const goToPage = (url) => {
        if (!loginStatus) {
            return;
        }
        let href = "";
        if (url === "Collection" || url === "Item") {
            href = "/" + url.toLowerCase() + "/create";
        } else {
            href = "/" + url.toLowerCase();
        }
        router.push(href)
    };

    const goToProfilePage = (url) => {
        if (url === "Profile") {
            router.push({
                pathname: '/account',
                search: '?tab=collections',
                state: { address: account }
            })
        } else if (url === "Favorites") {
            router.push({
                pathname: '/account',
                search: '?tab=favorites',
                state: { address: account }
            })
        } else if (url === "Settings") {
            const href = "/account/settings";
            router.push(href)
        } else if (url === "My Collections") {
            const href = "/myCollections";
            router.push(href)
        } else if (url === "My Nfts") {
            const href = "/myNfts";
            router.push(href)
        } else if (url === "Log Out") {
            if (isUserInfoUpdated)router.push("/");
            logout();
        }

    };

    return (
        <div className="topbar">
            <div className="logo">
                <HashLink to="/#home" ><img src="/assets/img/logos/logo_white.png" alt="" onLoad={() => { setIsLoading(false) }} /></HashLink>
            </div>

            <div className="navList">
                <ul>
                    <li onClick={() => { setNavId('') }} className={navId === 'collections' ? "slected" : ""} >
                        <div onClick={() => goToPage("collections")} style={{ color: 'white', cursor: "pointer" }}>COLLECTIOONS</div>
                    </li>

                    <li onClick={() => { setNavId('bids') }} className={navId === 'bids' ? "slected" : ""} >
                        <div onClick={() => goToPage("bids")} style={{ color: 'white', cursor: "pointer" }}>LATEST BID</div>
                    </li>

                    {loginStatus && <li onClick={() => { setNavId('create') }} className={navId === 'create' ? "slected" : ""} >

                        <CustomDropdown
                            navDropdown
                            buttonText="Create"
                            onClick={(url) => {
                                goToPage(url);
                            }}
                            buttonProps={{
                                className: "navLink",
                                color: "transparent",

                            }}
                            dropdownList={[
                                "Collection",
                                "Item",
                            ]}
                        // className="activeLink"
                        />

                        {/* <HashLink to="/create/collection" smooth>Create</HashLink> */}
                    </li>}
                </ul>

            </div>

            <div className="btns">

                {loginStatus && <CustomDropdown
                    navDropdown
                    caret={false}

                    buttonText={
                        <>
                            <img
                                src={logo !== "" ? logo : "/assets/img/faces/avatar.jpg"}
                                className="img"
                                alt="profile"
                            />
                            <span className="mobileLabel">Account</span>
                        </>
                    }
                    onClick={(url) => {
                        goToProfilePage(url);
                    }}
                    buttonProps={{
                        className: "navLink imageDropdownButton",
                        color: "transparent",
                    }}
                    dropdownList={[
                        "Profile",
                        "Favorites",
                        "My Collections",
                        "My Nfts",
                        "Settings",
                        "Log Out",
                    ]}
                // className="activeLink"
                />}
                <Button
                    className='outLineBtn'
                    children={
                        <span>{loginStatus ? truncateWalletString(account) : "CONNECT WALLET"}
                        </span>
                    }
                    onClick={() => { !loginStatus && setShowConnectModal(true) }}
                />
            </div>

            <div className={(menuOpen ? "hamburger active" : "hamburger")} onClick={() => setMenuOpen(!menuOpen)}>
                <span className="line1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
            </div>
            <ConnectModal showConnectModal={showConnectModal} setShowConnectModal={setShowConnectModal} setIsLoading={setIsLoading} />
        </div>
    )
}
export default Topbar;