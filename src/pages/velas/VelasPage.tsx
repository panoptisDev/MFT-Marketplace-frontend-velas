// import Loading from 'components/loading/Loading';
// import Menu from 'components/menu/Menu';
// import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// import Filter from 'components/filter/Filter';
import "./style.scss";
import NFTItemList from "../../components/collectionList/NFTItemList";
import CopyBox from "../../components/copyBox/CopyBox";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdWidgets } from "react-icons/md";

const VelasPage = (props: any) => {
  // const { user } = props;

  const { connector, library, chainId, account, active }: any = useWeb3React();
  const [loginStatus, setLoginStatus] = useState(false);
  let newVariable: any = process.env.REACT_APP_NETWORK_ID;
  useEffect(() => {
    const isLoggedin: any =
      account && active && chainId === parseInt(newVariable, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const [isLoading, setIsLoading] = useState(false);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [sectionHeight, setSectionHeight] = useState("0vh");
  const [loadingHeight, setLoadingHeight] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({
    query: "screen and (max-width: 450px) and (orientation:portrait)",
  });
  const isLandOrMobile = useMediaQuery({
    query: "screen and (max-height: 450px) and (orientation:landscape)",
  });
  useEffect(() => {
    if (isLoading || isTopLoading) {
      setLoadingHeight(100);
      setSectionHeight("0vh");
    } else {
      setLoadingHeight(0);
      setSectionHeight("100%");
    }

    if (!isLandOrMobile && !isTabletOrMobile) {
      setMenuOpen(false);
    }
  }, [isLoading, isTabletOrMobile, isLandOrMobile, isTopLoading]);

  const data4: Array<any> = [
    { icon: <TbWorld />, link: "/" },
    { icon: <FaTwitter />, link: "/" },
    { icon: <FaTelegramPlane />, link: "/" },
    { icon: <MdWidgets />, link: "/" },
  ];

  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    if (loginStatus)
      axios
        .get(`/item`)
        .then((res) => {
          console.log(res.data.items);
          setItems(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loginStatus]);

  window.onload = () => {
    setIsLoading(false);
    setIsTopLoading(false);
  };

  return (
    <>
      {/* <Topbar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setIsLoading={setIsTopLoading} /> */}
      {/* <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> */}
      {/* <PageHeader pageHeader="VELAS" /> */}
      <div className="page velasPage">
        {/* <div className="loding" style={{ width: "100%", height: loadingHeight + "%", display: loadingHeight === 0 ? 'none' : 'flex' }}>
					<Loading />
				</div> */}
        <div
          className="sections"
          style={{ width: "100%", height: sectionHeight }}
        >
          <div className="container">
            {/* <Filter /> */}
            <div className="partTitle">
              <h1 className="top">
                NFTrees
                <img
                  src="/assets/img/verified.svg"
                  alt="..."
                  className="img-mark"
                />
              </h1>
              {loginStatus && <CopyBox value={account} />}
              <p className="desc">
                Grow NFTrees backed by Real Trees 🌳
                <br />
                Have Fun and make Real World Impact
              </p>
              <div className="other-site">
                {data4.map((item: any, index: number) => (
                  <div key={index} className="social-contact-item">
                    {item.icon}
                  </div>
                ))}
                {/* <Language className="site-item" />
                <Twitter className="site-item" />
                <Telegram className="site-item" />
                <Widgets className="site-item" /> */}
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
                    <img
                      src="/assets/img/parts/moonriver.svg"
                      alt="..."
                      className="img-mark-16"
                    />
                    &nbsp;993
                  </div>
                </li>
                <li>
                  <div className="name">MEDIUM PRICE</div>
                  <div className="value">
                    <img
                      src="/assets/img/parts/moonriver.svg"
                      alt="..."
                      className="img-mark-16"
                    />
                    &nbsp;993
                  </div>
                </li>
                <li>
                  <div className="name">MAX PRICE</div>
                  <div className="value">
                    <img
                      src="/assets/img/parts/moonriver.svg"
                      alt="..."
                      className="img-mark-16"
                    />
                    &nbsp;993
                  </div>
                </li>
                <li>
                  <div className="name">TRADES</div>
                  <div className="value label-blue">981</div>
                </li>
              </ul>
            </div>
            <NFTItemList {...props} items={items} />
          </div>
        </div>
        <img src="/assets/img/bg8.jpg" alt="" className="bg1" />
      </div>
    </>
  );
};

export default VelasPage;
