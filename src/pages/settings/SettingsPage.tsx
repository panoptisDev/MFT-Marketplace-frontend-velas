import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Support from 'components/settings/accountSupport/Support';
import Earning from 'components/settings/earning/Earning';
import Offer from 'components/settings/offers/Offer';
import Payment from 'components/settings/payment/Payment';
import Notification from 'components/settings/notification/Notification';
import Profile from 'components/settings/profile/Profile';
import SideBar from 'components/settings/sideBar/SideBar';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './style.scss'
import { useLocation } from 'react-router-dom';

const SettingsPage = (props) => {
    const { user, login } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isTopLoading, setIsTopLoading] = useState(true);
    const [sectionHeight, setSectionHeight] = useState("0vh");
    const [loadingHeight, setLoadingHeight] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: "screen and (max-width: 450px) and (orientation:portrait)", });
    const isLandOrMobile = useMediaQuery({ query: "screen and (max-height: 450px) and (orientation:landscape)", });
    useEffect(() => {
        if (isLoading || isTopLoading) {
            setLoadingHeight(100)
            setSectionHeight("0vh")
        }
        else {
            setLoadingHeight(0)
            setSectionHeight("100%")
        }

        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
    }, [isLoading, isTabletOrMobile, isLandOrMobile, isTopLoading]);

    // loading part
    window.onload = () => {
        setIsLoading(false)
        setIsTopLoading(false)
    };
    const [tab, setTab] = useState('')

    const search = useLocation();
    useEffect(() => {
        const label = search.search.split('=')[1]
        setTab(label)

    }, [setTab, search]);

    const [isInfoUpdated, setInfoUpdated] = useState(false);

    let SettingsBody;
    switch (tab) {

        case 'profile':
            SettingsBody = () =>
                <Profile {...props} user={user} login={login} setInfoUpdated={setInfoUpdated}/>
            break;
        case 'notifications':
            SettingsBody = () =>
                <Notification />

            break;
        case 'offers':
            SettingsBody = () =>
                <Offer />
            break;
        case 'payment':
            SettingsBody = () =>
                <Payment />
            break;
        case 'support':
            SettingsBody = () =>
                <Support />
            break;
        case 'earnings':
            SettingsBody = () =>
                <Earning />
            break;
        default:
            SettingsBody = () =>
                <Profile {...props} user={user} login={login} setInfoUpdated={setInfoUpdated}/>
            break;
    }

    return (
        <>
            <Topbar {...props} user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setIsLoading={setIsTopLoading} setInfoUpdated={setInfoUpdated} isInfoUpdated = {isInfoUpdated}/>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className='page settingsPage'>
                <div className="loding" style={{ width: "100%", height: loadingHeight + "vh", display: loadingHeight === 0 ? 'none' : 'flex' }}>
                    <Loading />
                </div>
                <div className="sections" style={{ width: "100%", height: sectionHeight }}>
                    <div className="container">
                        <SideBar />
                        <SettingsBody />
                    </div>
                </div>
                <img src="/assets/img/bg8.jpg" alt="" className="bg2" />
            </div>
        </>
    )
}
export default SettingsPage;