import CreateItem from "../../components/create/CreateItem";
// import Loading from 'components/loading/Loading';
// import Menu from 'components/menu/Menu';
// import Topbar from 'components/topbar/Topbar';
import { useState } from "react";
// import { useMediaQuery } from 'react-responsive';
import "./style.scss";

const CreateItemPage = (props: any) => {
  // const { user } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isTopLoading, setIsTopLoading] = useState(true);
  // const [sectionHeight, setSectionHeight] = useState("0vh");
  const [loadingHeight, setLoadingHeight] = useState(0);

  // const [menuOpen, setMenuOpen] = useState(false);

  // loading part
  window.onload = () => {
    setIsLoading(false);
    setIsTopLoading(false);
  };

  return (
    <>
      {/* <PageHeader pageHeader="Create Item" /> */}
      {/* <Topbar user={user} menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}  setIsLoading ={setIsTopLoading}/> */}
      {/* <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/> */}
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
        <div className="sections" style={{ width: "100%" }}>
          <div className="container">
            <h1 className="title" style={{ marginTop: "20px" }}>
              Create an Item
            </h1>
            <CreateItem />
          </div>
        </div>
        <img src="/assets/home_bg.jpg" alt="" className="bg1" />
      </div>
    </>
  );
};

export default CreateItemPage;
