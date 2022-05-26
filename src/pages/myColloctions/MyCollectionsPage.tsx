import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Dehaze, ErrorOutline } from '@material-ui/icons';
import Button from 'components/customButtons/Button';
import CustomDropdown from 'components/dropdown/CustomDropdown';
import Card2 from 'components/cards/Card2';
import './style.scss'

const MyCollectionsPage = (props) => {

    const { user } = props;
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
    const [loginStatus, setLoginStatus] = useState(false);
    const { connector, library, chainId, account, active } = useWeb3React();

    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
        if(!loginStatus){
            console.log(loginStatus)
        }
    }, [connector, library, account, active, chainId, loginStatus]);

    const [ myCollections, setMyCollections ] = useState([]);
    
    useEffect(() => {
        if (loginStatus && !myCollections){
            axios.get(`/collection`, {params : {owner : account}})
            .then(res => {
                setMyCollections(res.data.collections);
            });            
        }
    });

    const linkList = {
		"Import an existing smart contract": 'https://studio.manifold.xyz/',
		"Mint with Manifold Studio": 'https://studio.manifold.xyz/',
		"Mint on Rarible": 'https://rarible.com/create/start',
		"Mint on Mintbase": 'https://www.mintbase.io/',
		"Mint on Mintable": 'https://mintable.app/',
		"Mint on Zora": 'https://zora.co/',
	}
    const router = useHistory();
	const goToPage = (key) => {
		// const href = key.toLowerCase();
		router.push(linkList[key]);
	};

    const onCreateCollection = () => {
		router.push("/collection/create");
    };

    return (
        <>
            <Topbar user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page myCollectionPage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "%", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                    <div className="container">
                        <h2 className="top">My Collections</h2>
                        <div className='desc'>
                            <span>Create, curate, and manage collections of unique NFTs to share and sell.</span>
                            <Tooltip
                                id="tooltip-top"
                                title="Collections can be created either directly on OpenSea or imported
                                    from an existing smart contract. You can also mint on other services like
                                    Rarible or Mintable and import the items to OpenSea."
                                placement="top"
                                classes={{ tooltip: "tooltip" }}
                            >
                                <ErrorOutline className="tooltip-icon" />
                            </Tooltip>
                        </div>
                        <div className="btns">
                            <Button className='outLineBtn' onClick={onCreateCollection}>Create a collection</Button>
                            <div style={{ display: 'inline-block' }}>
                                <CustomDropdown
                                    navDropdown
                                    buttonText={<Dehaze />}
                                    onClick={(url) => {
                                        goToPage(url);
                                    }}
                                    buttonProps={{
                                        className: "dehazeBtn",
                                        color: "black",
                                    }}
                                    dropdownList={[
                                        "Import an existing smart contract",
                                        "Mint with Manifold Studio",
                                        "Mint on Rarible",
                                        "Mint on Mintbase",
                                        "Mint on Mintable",
                                        "Mint on Zora",
                                    ]}
                                />
                            </div>
                        </div>
                        
                        <div className="collectionContainer">
                            {
                                myCollections && myCollections.map((collection, index) => {
                                    return <Card2 key = {index}{...props} collection = {collection}/>
                                })
                            }
						</div>
                    </div>
                    
                </div>
                <img src="assets/img/bg8.jpg" alt="" className="bg2" />
            </div>
        </>
    )
}
export default MyCollectionsPage;