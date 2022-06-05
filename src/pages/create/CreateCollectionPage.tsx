import CreateCollection from "../../components/create/CreateCollection";
// import Loading from 'components/loading/Loading';
// import Menu from 'components/menu/Menu';
// import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import "./style.scss";
import PageHeader from "../../components/PageHeader/PageHeader";

const CreateCollectionPage = (props: any) => {
  const { user } = props;
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

  // loading part
  window.onload = () => {
    setIsLoading(false);
    setIsTopLoading(false);
  };
  const location = useLocation();
  const isCreate = location.pathname.split("/")[2] === "create";
  const collectionName = location.pathname.split("/")[3];

  return (
    <>
      {/* <Topbar user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/> */}
      {/* <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/> */}
      <PageHeader pageHeader="Create Collection" />
      <div className="page createPage">
        <div
          className="loding"
          style={{
            width: "100%",
            height: loadingHeight + "vh",
            display: loadingHeight === 0 ? "none" : "flex",
          }}
        >
          {/* <Loading/> */}
        </div>
        <div
          className="sections"
          style={{ width: "100%", height: sectionHeight }}
        >
          <div className="container">
            <h1 className="title" style={{ marginTop: "20px" }}>
              {isCreate ? "Create a Collection" : "Edit My Collection"}
            </h1>

            <CreateCollection
              {...props}
              isCreate={isCreate}
              collectionName={collectionName}
            />
          </div>
        </div>
        <img src="/assets/home_bg.jpg" alt="" className="bg1" />
      </div>
    </>
  );
};
export default CreateCollectionPage;
