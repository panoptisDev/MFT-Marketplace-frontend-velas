import CreateItem from 'components/create/CreateItem';
import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './style.scss'
type propsType = {
    user : any
}
export default function CreateItemPage({user} : propsType) {
    const [isLoading, setIsLoading] = useState(false);
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
    
    return (
        <>
            <Topbar user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page createPage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "vh", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                    <div className="container">
                        <h1 className="title">
                        Create New Item
                        </h1>
                        <CreateItem/>
                    </div>
                </div>
                <img src="/assets/home_bg.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
