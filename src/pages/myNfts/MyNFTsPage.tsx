import { Block, Send, Storefront, VisibilityOff } from '@material-ui/icons';
import { useWeb3React } from '@web3-react/core';
import MyCollectionList from 'components/collectionList/MyCollectionList';
import Button from 'components/customButtons/Button';
import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import API from 'utils/api';
// import { useHistory } from 'react-router-dom';
import './style.scss'
export default function MyNFTsPage( ) {
    const [isLoading, setIsLoading] = useState(false);
    const [isTopLoading, setIsTopLoading] = useState(true);
    const [sectionHeight, setSectionHeight] = useState("0vh");
    const [loadingHeight, setLoadingHeight] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "screen and (max-width: 450px) and (orientation:portrait)",});
    const isLandOrMobile = useMediaQuery({query: "screen and (max-height: 450px) and (orientation:landscape)",});

	const { library, chainId, account } = useWeb3React();
	const [ items,  setItems ] = useState<any>([])
	useEffect(() => {
		if (!account)API.getWithParams(`/item`, account)
		.then(res =>{
			setItems(res["items"]);
		});		
	}, [account]);

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

    // const router = useHistory();
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const [commandType, setCommandType] = useState("");

    const handleCommand = (type, token) => {
		token = token + '';
		setIsShowSubMenu(true);
		setCommandType(type);
		setSelectedList([...token]);
	};

	// const handleClickItem = (token) => {
	// 	token = token + '';
	// 	if (commandType !== "") {
	// 		if (selectedList.includes(token)) {
	// 			const data = selectedList;
	// 			let filtered = data.filter(function(value, index, arr){
	// 				return value !== token;
	// 			});
	// 			setSelectedList([...filtered]);
	// 		} else {
	// 			setSelectedList([...selectedList, token]);
	// 		}
	// 	}
	// };

	const handleClickCancel = () => {
		setIsShowSubMenu(false);
		setCommandType("");
		setSelectedList([]);
	};

	const handleClickCommand = () => {
		if (selectedList.length > 0 && commandType !== "hide") {
			// router.push({
			// 	pathname: '/' + commandType,
			// 	query: { assets: selectedList },
			// })
		}
	};
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
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
                    <MyCollectionList  items={items}/>
                    {
				isShowSubMenu &&
				<div className="transferBox">
					<div className="cart-container">
						<div className="cart-box">
							{
								selectedList.map((item, key) =>
									<div className="cart-item" key={key}>
										<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400"
											 className="cart-img" alt="cart-img" />
									</div>
								)
							}

							{
								selectedList.length === 0 &&
								<p>Select items to transfer. You can only sell bundles of items with the same
									verification status.</p>
							}
						</div>
						<Button className="transfer-btn" onClick={handleClickCommand}>
							{commandType === "transfer" ? <Send /> : (commandType === "sell" ? <Storefront /> : <VisibilityOff />)}
							{commandType === "transfer" ? "Transfer" : (commandType === "sell" ? "Sell" : "Hide")}
						</Button>
						<Button className="transfer-cancel-btn" onClick={handleClickCancel}><Block />Cancel</Button>
					</div>
				</div>
			}
                </div>
                </div>
                <img src="assets/home_bg_01.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
