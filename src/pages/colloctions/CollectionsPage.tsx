// import Loading from 'components/loading/Loading';
// import Menu from 'components/menu/Menu';
// import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// import Filter from "../../";
import "./style.scss";
import CollectionList from "../../components/collectionList/CollectionList";
import axios from "axios";
// import { useWeb3React } from "@web3-react/core";
import SelectMenu from "../../components/MoreComponents/SelectMenu";

import {
  allArtWork,
  allCategories,
  allItems,
  buyNow,
  sortBy,
} from "../../utils/options";

const CollectionsPage = (props: any) => {
  // const { user } = props;
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

  window.onload = () => {
    setIsLoading(false);
    setIsTopLoading(false);
  };

  const [collections, setCollections] = useState<any>([]);
  useEffect(() => {
    axios
      .get(`/collection`)
      .then((res) => {
        setCollections(res.data.collections);
      })
      .catch((err) => {
        console.log("err: ", err.message);
        setCollections([]);
      });
  });

  return (
    <>
      {/* <PageHeader pageHeader="Collections" /> */}
      {/* <Topbar {...props} user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/> */}
      {/* <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/> */}
      <div className="page collectionPage">
        {/* <div className="loding" style = {{width: "100%", height: loadingHeight + "%", display: loadingHeight === 0? 'none':'flex'}}>
                    <Loading/>
                </div> */}
        <div
          className="sections"
          style={{ width: "100%", height: sectionHeight }}
        >
          <div className="container">
            {/* <Filter /> */}
            <div className="hline"></div>
            <h1 className="top">All Collections</h1>
            <div className="header-collection-page-title-filter">
              <div className="select-menu collection-page-title-filter">
                <div>
                  <SelectMenu
                    data={allCategories}
                    initialState="All categories"
                  />
                  <SelectMenu data={buyNow} initialState="Buy now" />
                  <SelectMenu data={allItems} initialState="All Items" />

                  <SelectMenu data={allArtWork} initialState="All Artwork" />
                  <SelectMenu data={sortBy} initialState="Sort by" />
                </div>
              </div>
              <div className="partTitle">
                <ul className="stats">
                  <li>
                    <div className="name">Collections</div>
                    <div className="value">{collections.length}</div>
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
            </div>

            <CollectionList
              {...props}
              collections={collections}
              collectionsListPage={true}
            />
          </div>
        </div>
        {/* <img src="assets/home_bg.jpg" alt="" className="bg1" /> */}
      </div>
    </>
  );
};
export default CollectionsPage;
