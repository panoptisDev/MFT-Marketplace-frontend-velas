import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

import './style.scss'
import ItemDetail from 'components/itemDetail/ItemDetail';
import { useLocation } from 'react-router-dom';

const VelasClubPage = (props) => {
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

    const [ item, setItem ] =useState(null);
    const [ rate, setRate ] = useState(0);
    const location = useLocation();

    function fetchItem(){
        const urlData = location.pathname.toString();
        const len = urlData.split("/").length;
        const collectionAddress = urlData.split("/")[len - 2];
        const tokenId = urlData.split("/")[len - 1];
        axios.get(`/item/${collectionAddress}/${tokenId}`)
        .then(res => {
            console.log(res.data.item);
          setItem(res.data.item) 
          setRate(res.data.rate)          
        })
        .catch(err => {
          //show an error page that the item doesnt exist
          setItem(undefined)
          setRate(0)
        })
    }
    useEffect(() => {
        if(!item) {
            fetchItem();
        }
    }, [item])

    return (
        <>
            <Topbar user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className='page velasPage'>
                <div className="loding" style = {{width: "100%", height: loadingHeight + "%", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div>
                <div className="sections" style = {{width: "100%", height: sectionHeight}}>
                    <div className="container">
                        {item && <ItemDetail {...props} item = {item} fetchItem = {fetchItem}/>}
                    </div>
                    
                </div>
                <img src="/assets/img/bg8.jpg" alt="" className="bg1" />
            </div>
        </>
    )
}
export default VelasClubPage;