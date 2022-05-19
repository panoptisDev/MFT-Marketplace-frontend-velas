import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link'
import ConnectModal from '../connectModal/ConnectModal';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import './topbar.scss'
import Button from 'components/customButtons/Button';
import CustomDropdown from 'components/dropdown/CustomDropdown';
import { truncateWalletString } from 'utils';
import useAuth from 'hooks/useAuth';

const Topbar = (props) => {
    const { user, menuOpen, setMenuOpen, setIsLoading, setInfoUpdated, isInfoUpdated } = props
    const [showConnectModal, setShowConnectModal] = useState(false);

    const [loginStatus, setLoginStatus] = useState(false);
    const { logout } = useAuth();
    const { connector, library, chainId, account, active } = useWeb3React();
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
    }, [connector, library, account, active, chainId]);

    useEffect(() => {
        if (loginStatus || isInfoUpdated){
            //fetchUser();
        }
    });

    const [ logo, setLogo ] = useState("");
    function fetchUser(){
        axios.get(`/user/${account}`)
            .then((res) => {
                setLogo(res.data.user.logo_url);
                setInfoUpdated(false);
            }).catch((err) => {
                setLogo("");
            })
    }

    const [navId, setNavId] = useState('mint')
    const search = useLocation();
    useEffect(() => {
        const label = search.pathname.replace('/', '')
        if(label.includes('create/')){
            setNavId(label.split('/')[0])
        }
        else{
            setNavId(label)
        }
        
    }, [setNavId, search]);

    const router = useHistory ();
	const goToPage = (url) => {
		const href = "/create/" + url.toLowerCase();
		router.push(href)
	};
    
    const goToProfilePage = (url) => {
		if (url === "Profile") {
			router.push({
                pathname : '/account',
                search : '?tab=collections',
                state: { address : account}
            })
		} else if (url === "Favorites") {
			router.push({
                pathname : '/account',
                search : '?tab=favorites',
                state: { address : account}
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
		} else if (url === "Log Out"){
            logout();
        }
		
	};

    return (
        <div className="topbar">
            <div className="logo">
                <HashLink to="/#home" ><img src="/assets/img/logos/logo_white.png" alt="" onLoad={()=>{setIsLoading(false)}} /></HashLink>
            </div>

            <div className="navList">
                <ul>
                    <li onClick={() => { setNavId('') }} className={navId === 'collections' ? "slected" : ""} ><HashLink to="/collections" smooth>COLLECTIOONS</HashLink></li>

                    <li onClick={() => { setNavId('offers') }} className={navId === 'offers' ? "slected" : ""} >
                        <HashLink to="/offers" smooth>LATEST OFFER</HashLink>
                    </li>

                    <li onClick={() => { setNavId('trades') }} className={navId === 'trades' ? "slected" : ""} >
                        <HashLink to="/trades" smooth>LATEST TRADE</HashLink>
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
                    caret = {false}
                            
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
                    children = {
                        <span>{loginStatus ? truncateWalletString(account) : "CONNECT WALLET"}
                        </span>
                    }
                    onClick={() => { !loginStatus && setShowConnectModal(true)}}
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