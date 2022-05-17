import './app.scss';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { connectors, connectorLocalStorageKey } from './utils/connectors'
import { useEagerConnect } from "./hooks/useEagerConnect"
import { useInactiveListener } from "./hooks/useInactiveListener"
import { useAxios } from "./hooks/useAxios";
import { getErrorMessage } from "./utils/ethereum";

import HomePage from 'pages/home/HomePage';
import { Toaster } from 'react-hot-toast';
import CollectionsPage from 'pages/colloctions/CollectionsPage';
import MyNFTsPage from 'pages/myNfts/MyNFTsPage';
import LatestOffersPage from 'pages/latestOffer/LatestOffersPage';
import LatestTradePage from 'pages/latestTrade/LatestTradePage';
import CreateItemPage from 'pages/create/CreateItemPage';
import CreateCollectionPage from 'pages/create/CreateCollectionPage';
import AccountPage from 'pages/account/AccountPage';
import MyCollectionsPage from 'pages/myColloctions/MyCollectionsPage';
import SettingsPage from 'pages/settings/SettingsPage';
import UnTitledCollection from 'pages/colloctions/unTitledCollection/UnTitledCollection';
import VelasPage from 'pages/velas/VelasPage';
import VelasClubPage from 'pages/velas/vleasClub/VelasClubPage';
import DetailPage from 'pages/itemDetail/ItemDetailPage';
import { getUser, loginUser, useAuthDispatch, useAuthState } from 'context/authContext';
import { useWeb3React } from '@web3-react/core';
import { Button, Modal } from '@material-ui/core';
function App() {
  const [errorModalOpen, setErrorModalOpen] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  function getModalStyle() {
    const top = 50
    const left = 50  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 3),
    },
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  useAxios();

  const {account, library, active, connector} = useWeb3React();
  
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
          setActivatingConnector(undefined)
      }
  }, [activatingConnector, connector])

  // mount only once or face issues :P
  const [triedEager, triedEagerError] = useEagerConnect()
  const { activateError } = useInactiveListener(!triedEager || !!activatingConnector)

  // handling connection error
  if((triedEagerError || activateError) && errorModalOpen === null) {
      const errorMsg = getErrorMessage(triedEagerError || activateError);
      setNetworkError(errorMsg);
      setErrorModalOpen(true);
  }

  const dispatch = useAuthDispatch();
  const { user, token } = useAuthState();

  const login = async () => {
    if(!account || !library) {
      console.log('not connected to wallet')
      return;
    }
    if(!user) {
      console.log('fetching user')
      await getUser(dispatch, account);
    }
    if(!user?.nonce || token) {
      console.log('nonce is invalid or already logged in')
      return;
    }
    console.log(JSON.stringify(user));
    loginUser(dispatch, account, user?.nonce, library.getSigner())
  }

  useEffect(() => {      
    if (active && account){
      getUser(dispatch, account)
    }
  }, [active, account])

  const closeErrorModal = () => {
    window.localStorage.setItem(connectorLocalStorageKey, connectors[0].key);
    window.location.reload();
  }

  return (
    <React.Fragment>
      <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 3000,
            style: {
            } },
          error: { duration: 3000,
            style: {
            }  
          },
        }}
      />
      <Switch>
        <Route exact path="/" render={(props) => (<HomePage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/collections" render={(props) => (<CollectionsPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/myNfts" render={(props) => (<MyNFTsPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/offers" render={(props) => (<LatestOffersPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/trades" render={(props) => (<LatestTradePage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/create/item" render={(props) => (<CreateItemPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/create/collection" render={(props) => (<CreateCollectionPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/account" render={(props) => (<AccountPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/myCollections" render={(props) => (<MyCollectionsPage getUser={getUser} user={user} login={login}/>)} />
        {/* <Route exact path="/account/settings" component={SettingsPage} /> */}
        <Route exact path="/account/settings" render={(props) => (<SettingsPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/collections/untitled-collection-316120299" render={(props) => (<UnTitledCollection getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/velas/velas-apes-club" render={(props) => (<VelasPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/velas/velas-apes-club" render={(props) => (<VelasPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/velas/velas-apes-club/215" render={(props) => (<VelasClubPage getUser={getUser} user={user} login={login}/>)} />
        <Route exact path="/itemdetail" render={(props) => (<DetailPage getUser={getUser} user={user} login={login}/>)} />
      </Switch>
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
    </React.Fragment>
  );
}

export default App;
