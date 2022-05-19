import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

// import { useWeb3React } from '@web3-react/core';
import Filter from 'components/filter/Filter';
import './style.scss'
import CollectionList from 'components/collectionList/CollectionList';
const ItemDetailPage = (props) => {
    const { user } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [isTopLoading, setIsTopLoading] = useState(true);
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
    // const [loginStatus, setLoginStatus] = useState(false);
    // const { connector, library, chainId, account, active } = useWeb3React();

    // useEffect(() => {
    //     const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    //     setLoginStatus(isLoggedin);
    //     if(!loginStatus){
    //         console.log(loginStatus)
    //     }
    // }, [connector, library, account, active, chainId, loginStatus]);

    return (
        <>
            <Topbar user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page collectionPage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "%", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                    <div className="container">
                    <Filter/>
                    <div className="partTitle">
						<h1 className="top">All Collections</h1>
						<ul className="stats">
							<li>
								<div className="name">Collections</div>
								<div className="value">190</div>
							</li>
							<li>
								<div className="name">Tokens</div>
								<div className="value">1&nbsp;088&nbsp;993</div>
							</li>
							<li>
								<div className="name">Owners</div>
								<div className="value">184&nbsp;981</div>
							</li>
						</ul>
					</div>
                    <CollectionList/>
                    </div>
                    
                    {/* <Market 
                        setIsLoading = {setIsLoading} 
                        nftData = {nftItems} 
                        transaction = {nftLastTranactions}
                        marketState = {nftMarketStatus}
                        onBuy = {buy}
                    /> */}
                </div>
                <img src="assets/img/bg8.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
export default ItemDetailPage;