import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import './connectModal.scss'

const ConnectModal = (props) => {

    const { showConnectModal, setShowConnectModal, setIsLoading} = props;
    const { login } = useAuth();

    const connectMetamask = () => {
        login(1);
        setShowConnectModal(false);
    }
    const connectWalletConnector = () => {
        login(2);
        setShowConnectModal(false);
    }
    
    const [imgCount, setImgCount] = useState(0)
    useEffect(() => {
        if (imgCount >= 3) {
            setIsLoading(false)
        }
    }, [imgCount, setIsLoading]);
    const onImgLoad = () => {
        setImgCount(imgCount + 1)

    }
    return (
        <div className={showConnectModal === true ? "connectModal active" : "connectModal"}>
            <div className="modelContent" >
                <div className="connectWalletHeader">

                    <h1 className="connectWalletTitle">Connect Wallet</h1>
                    <button className="connectModalCloseButton" onClick={() => { setShowConnectModal(false) }}><i className="fas fa-times"></i></button>

                </div>
                <div className="hline"></div>
                <div className="connectWalletWrapper">
                    <div className="metaMask" onClick={connectMetamask}>
                        <div className="left">
                            <div className="icon">
                                <img src="/assets/metamask.png" alt="" onLoad={onImgLoad} />
                            </div>

                        </div>
                        <div className="middle"><h2>Metamask</h2><p>Connect using browser wallet</p></div>
                        <div className="right"><button><i className="fas fa-chevron-right"></i></button></div>
                    </div>
                    <div className="wallet" onClick={connectWalletConnector}>
                        <div className="left">
                            <div className="icon"><img src="/assets/wallet-connect.png" alt="" onLoad={onImgLoad} /></div>
                        </div>
                        <div className="middle"><h2>Wallet Connect</h2><p>Connect using mobile wallet</p></div>
                        <div className="right"><button><i className="fas fa-chevron-right"></i></button></div>
                    </div>
                </div>

            </div>


        </div>
    )
}
export default ConnectModal;