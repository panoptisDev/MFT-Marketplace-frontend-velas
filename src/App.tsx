import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import Author from "./pages/Authors/Authors";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Activity from "./pages/Activity/Activity";
import Explore from "./pages/Explore/Explore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { connectors, connectorLocalStorageKey } from "./utils/connectors";
import { useEagerConnect } from "./hooks/useEagerConnect";
import { useInactiveListener } from "./hooks/useInactiveListener";
import { useAxios } from "./hooks/useAxios";
import { getErrorMessage } from "./utils/ethereum";
import { Toaster } from "react-hot-toast";
import { getUser, useAuthDispatch, useAuthState } from "./context/authContext";
import { useWeb3React } from "@web3-react/core";
import { Button, Modal } from "@material-ui/core";
import CreateItemPage from "./pages/Create/CreateItemPage";
import CreateCollectionPage from "./pages/Create/CreateCollectionPage";
import AccountPage from "./pages/account/AccountPage";
import SettingsPage from "./pages/settings/SettingsPage";
import CollectionsPage from "./pages/colloctions/CollectionsPage";
import VelasPage from "./pages/velas/VelasPage";
import MyCollectionsPage from "./pages/myColloctions/MyCollectionsPage";
import MyNFTsPage from "./pages/myNfts/MyNFTsPage";
import CollectionDetailPage from "./pages/colloctions/CollectionDetailPage/CollectionDetailPage";
import VelasClubPage from "./pages/velas/vleasClub/VelasClubPage";
import LatestTradePage from "./pages/latestTrade/LatestTradePage";
import LatestOffersPage from "./pages/latestOffer/LatestOffersPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTopLoading, setIsTopLoading] = useState(true);

  const [errorModalOpen, setErrorModalOpen] = useState<any>(null);
  const [networkError, setNetworkError] = useState<any>(null);

  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 3),
    },
  }));

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useAxios();

  const { connector, library, chainId, account, active } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // mount only once or face issues :P
  const [triedEager, triedEagerError] = useEagerConnect();
  const { activateError } = useInactiveListener(
    !triedEager || !!activatingConnector
  );

  // handling connection error
  if ((triedEagerError || activateError) && errorModalOpen === null) {
    const errorMsg = getErrorMessage(triedEagerError || activateError);
    setNetworkError(errorMsg);
    setErrorModalOpen(true);
  }

  const dispatch = useAuthDispatch();
  const { user }: any = useAuthState();

  // const login = async () => {
  //   if(!account || !library) {
  //     console.log('not connected to wallet')
  //     return;
  //   }
  //   if(!user) {
  //     console.log('fetching user')
  //     await getUser(dispatch, account)
  //   }
  //   if(!user?.nonce || token) {
  //     console.log('nonce is invalid or already logged in')
  //     return;
  //   }
  //   loginUser(dispatch, account, user?.nonce, library.getSigner())
  // }
  window.onload = () => {
    setIsLoading(false);
    setIsTopLoading(false);
  };
  // Loading part
  const [imgCount, setImgCount] = useState(0);
  const onImgLoad = () => {
    setImgCount(imgCount + 1);
  };
  useEffect(() => {
    if (imgCount === 4) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [setIsLoading, imgCount]);
  useEffect(() => {
    if (active && account) {
      getUser(dispatch, account);
    }
  }, [active, account, dispatch]);

  const closeErrorModal = () => {
    window.localStorage.setItem(connectorLocalStorageKey, connectors[0].key);
    window.location.reload();
  };

  return (
    // <div className="App">
    //   <Router>
    //     <ScrollToTop />
    //     <Navbar setIsLoading={setIsTopLoading} user={user} />
    //     <Routes>
    //     {/* <Route exact path="/account" render={(props) => (<AccountPage {...props} user={user} />)} /> */}
    //       <Route path="/" component={<Home />} />
    //       <Route path="/Contact" component={<Contact />} />
    //       <Route path="/Authors" component={<Author />} />
    //       <Route path="/Item-Details" component={<ItemDetails />} />
    //       <Route path="/Activity" component={<Activity />} />
    //       <Route path="/Explore" component={<Explore />} />
    //       <Route path="/Item/Create" component={<CreateItemPage />} />
    //       <Route path="/Collection/Create" component={<CreateCollectionPage />} />
    //       <Route path="/Account"render={(props) => (<AccountPage {...props} user={user} />)} />
    //       <Route path="/Account/Settings" component={<SettingsPage />} />
    //     </Routes>
    //     <Footer />
    //   </Router>
    // </div>
    <div className="App">
      <Router>
        <ScrollToTop />
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              duration: 3000,
              style: {},
            },
            error: {
              duration: 3000,
              style: {},
            },
          }}
        />
        <Navbar setIsLoading={setIsTopLoading} user={user} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} user={user} />}
          />
          <Route exact path="/Contact" render={(props) => <Contact />} />
          <Route exact path="/Authors" render={(props) => <Author />} />
          <Route exact path="/Activity" render={(props) => <Activity />} />
          <Route exact path="/Explore" render={(props) => <Explore />} />
          <Route
            exact
            path="/offers"
            render={(props) => <LatestOffersPage {...props} user={user} />}
          />
          <Route
            exact
            path="/trades"
            render={(props) => <LatestTradePage {...props} user={user} />}
          />
          <Route
            exact
            path="/Item/Create"
            render={(props) => <CreateItemPage {...props} user={user} />}
          />
          <Route
            exact
            path="/Collection/Create"
            render={(props) => <CreateCollectionPage {...props} user={user} />}
          />
          <Route
            exact
            path="/collection/edit/:name"
            render={(props) => <CreateCollectionPage {...props} user={user} />}
          />
          <Route
            exact
            path="/Item-Details"
            render={(props) => <ItemDetails />}
          />

          <Route
            exact
            path="/Account"
            render={(props) => <AccountPage {...props} user={user} />}
          />
          <Route
            exact
            path="/Account/Settings"
            render={(props) => <SettingsPage {...props} user={user} />}
          />
          <Route
            exact
            path="/NFTs"
            render={(props) => <VelasPage {...props} user={user} />}
          />
          <Route
            exact
            path="/myNfts"
            render={(props) => <MyNFTsPage {...props} user={user} />}
          />
          <Route
            exact
            path="/myCollections"
            render={(props) => <MyCollectionsPage {...props} user={user} />}
          />
          <Route
            exact
            path="/collections"
            render={(props) => <CollectionsPage {...props} user={user} />}
          />
          <Route
            exact
            path="/collections/:name"
            render={(props) => <CollectionDetailPage {...props} user={user} />}
          />
          <Route
            exact
            path="/item/:collection_address/:tokenId"
            render={(props) => <VelasClubPage {...props} user={user} />}
          />
          {/* <Route exact path="/account/settings" render={(props) => (<SettingsPage {...props} user={user} />)} />
         <Route exact path="/collections/:name" render={(props) => (<CollectionDetailPage {...props} user={user} />)} />
         <Route exact path="/NFTs" render={(props) => (<VelasPage {...props} user={user} />)} />
         <Route exact path="/item/:collection_address/:tokenId" render={(props) => (<VelasClubPage {...props} user={user} />)} /> */}
        </Switch>
        <Footer />
      </Router>
      <Modal
       open={!!errorModalOpen && !active}
       onClose={(event, reason) => {
         if (reason === "backdropClick") {
           return false;
         }
         if (reason === "escapeKeyDown") {
           return false;
         }
         setErrorModalOpen(false)
       }}
       aria-labelledby="simple-modal-title"
       aria-describedby="simple-modal-description"
     >
       <div style={modalStyle} className={`${classes.paper} modal-div`}>
         <p>{networkError}</p>
         <Button className="" onClick={closeErrorModal} variant="contained" color="primary">Close</Button>
       </div>
     </Modal>
    </div>
  );
}

export default App;
