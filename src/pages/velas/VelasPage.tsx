import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Filter from 'components/filter/Filter';
import './style.scss'
import VelasCollectionList from 'components/collectionList/VelasCollectionList';
// import { useHistory } from 'react-router-dom';
import CopyBox from 'components/copyBox/CopyBox';
import { Language, Telegram, Twitter, Widgets } from '@material-ui/icons';
export default function VelasPage( ) {
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
    // const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    // const [selectedList, setSelectedList] = useState([]);
    // const [commandType, setCommandType] = useState("");

    const handleCommand = (type, token) => {
		token = token + '';
		// setIsShowSubMenu(true);
		// setCommandType(type);
		// setSelectedList([...token]);
	};

    const address = "";
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

	// const handleClickCancel = () => {
	// 	setIsShowSubMenu(false);
	// 	setCommandType("");
	// 	setSelectedList([]);
	// };

	// const handleClickCommand = () => {
	// 	if (selectedList.length > 0 && commandType !== "hide") {
	// 		// router.push({
	// 		// 	pathname: '/' + commandType,
	// 		// 	query: { assets: selectedList },
	// 		// })
	// 	}
	// };
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page velasPage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "%", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                    <div className="container">
                        <Filter/>
                        <div className="partTitle">
						<h1 className="top">
							NFTrees
							<img src="/assets/img/verified.svg" alt="..." className="img-mark" />
						</h1>
						{
							address &&
							<CopyBox value={address} />
						}
						<p className="desc">
							Grow NFTrees backed by Real Trees 🌳<br/>
							Have Fun and make Real World Impact
						</p>
						<div className="other-site">
							<Language className="site-item"/>
							<Twitter className="site-item"/>
							<Telegram className="site-item"/>
							<Widgets className="site-item"/>
						</div>
						<ul className="stats">
							<li>
								<div className="name">TOKENS</div>
								<div className="value">123&nbsp;190</div>
							</li>
							<li>
								<div className="name">OWNERS</div>
								<div className="value">123&nbsp;190</div>
							</li>
							<li>
								<div className="name">OFFERS</div>
								<div className="value">993</div>
							</li>
							<li>
								<div className="name">MIN PRICE</div>
								<div className="value">
									<img src="/assets/img/parts/moonriver.svg" alt="..." className="img-mark-16" />&nbsp;993
								</div>
							</li>
							<li>
								<div className="name">MEDIUM PRICE</div>
								<div className="value">
									<img src="/assets/img/parts/moonriver.svg" alt="..." className="img-mark-16" />&nbsp;993
								</div>
							</li>
							<li>
								<div className="name">MAX PRICE</div>
								<div className="value">
									<img src="/assets/img/parts/moonriver.svg" alt="..." className="img-mark-16" />&nbsp;993
								</div>
							</li>
							<li>
								<div className="name">TRADES</div>
								<div className="value label-blue">981</div>
							</li>
						</ul>
					</div>
                        <VelasCollectionList  handleCommand={handleCommand}/>
                    </div>
                    
                </div>
                <img src="/assets/img/bg8.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
