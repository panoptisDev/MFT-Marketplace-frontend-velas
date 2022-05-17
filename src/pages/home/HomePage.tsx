import Button from 'components/customButtons/Button';
import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './style.scss'
type propsType = {
    getUser : any,
    user : any,
    login : any,
}
export default function HomePage({getUser, user, login} : propsType) {
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
    }, [isLoading, isTabletOrMobile, isLandOrMobile,isTopLoading]);
	
    // loading part
    window.onload = ()=> {
        setIsLoading(false)
        setIsTopLoading(false)
    };
    // Loading part
    const [imgCount, setImgCount] = useState(0)
    const onImgLoad = () => {
        setImgCount(imgCount + 1)
    }
    useEffect(() => {
        if (imgCount === 4) {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }, [setIsLoading, imgCount]);
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page homePage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "vh", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                    <div className="container">
                    <h1 className="title" style={{marginTop: '20px'}}>
                        NFT Marketplace
                    </h1>
                    <h4>Unit of data stored on a digital ledger, called a blockchain,
                        that certifies a digital asset to be unique and therefore not interchangeable</h4>
                    <Button
                        className='outLineBtn'
                        link="/collections"
                        // rel="noopener noreferrer"
                    >
                        Browse All Collections
                    </Button>
                    <div className="homeLogoBox">
                        <img src={'assets/img/logos/velas.svg'} alt='' onLoad={onImgLoad} />
                        <img src={'assets/img/logos/celo.svg'} alt='' onLoad={onImgLoad}/>
                        <img src={'assets/img/logos/moonbeam.svg'} alt='' onLoad={onImgLoad}/>
                    </div>
                    </div>
                    
                </div>
                <img src="assets/home_bg.jpg" alt="" className="bg" onLoad={onImgLoad} />
            </div>
        </>
    )
}
