import { useWeb3React } from '@web3-react/core';
import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import './style.scss'
import NFTItemList from 'components/collectionList/NFTItemList';
import toast from 'react-hot-toast';

const MyNFTsPage = (props) => {
	const { user } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isTopLoading, setIsTopLoading] = useState(true);
    const [sectionHeight, setSectionHeight] = useState("0vh");
    const [loadingHeight, setLoadingHeight] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "screen and (max-width: 450px) and (orientation:portrait)",});
    const isLandOrMobile = useMediaQuery({query: "screen and (max-height: 450px) and (orientation:landscape)",});

	const { connector, library, chainId, account, active } = useWeb3React();
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
		if (!isLoggedin)toast.error("Please connect your wallet.")
    }, [connector, library, account, active, chainId]);

	const [ items,  setItems ] = useState<any>([])
	useEffect(() => {
		if (loginStatus)axios.get(`/item`,{params : {owner : account}})
		.then(res =>{
			setItems(res.data.items);
		});		
	}, [loginStatus]);

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
    }, [isLoading, isTabletOrMobile, isLandOrMobile,isTopLoading]);
	
    // loading part
    window.onload = ()=> {
        setIsLoading(false)
        setIsTopLoading(false)
    };

    return (
        <>
            <Topbar user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page myNftsPage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "vh", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                <div className="container">
                    <div className="partTitle">
						<h1 className="top">My NFTs</h1>
						<ul className="stats">
							<li>
								<div className="name">TOKENS</div>
								<div className="value">190</div>
							</li>
							<li>
								<div className="name">FOR SALE</div>
								<div className="value">1&nbsp;088&nbsp;993</div>
							</li>
							<li>
								<div className="name">HIDDEN</div>
								<div className="value">184&nbsp;981</div>
							</li>
						</ul>
					</div>
                    <NFTItemList  {...props} items={items} />
                </div>
                </div>
                <img src="assets/home_bg_01.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
export default MyNFTsPage;