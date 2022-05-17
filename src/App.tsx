import './app.scss';
import { useEagerConnect } from "hooks/useEagerConnect";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
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
function App() {
  useEagerConnect();
  return (
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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/collections" component={CollectionsPage} />
        <Route exact path="/myNfts" component={MyNFTsPage} />
        <Route exact path="/offers" component={LatestOffersPage} />
        <Route exact path="/trades" component={LatestTradePage} />
        <Route exact path="/create/item" component={CreateItemPage} />
        <Route exact path="/create/collection" component={CreateCollectionPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/myCollections" component={MyCollectionsPage} />
        <Route exact path="/account/settings" component={SettingsPage} />
        <Route exact path="/collections/untitled-collection-316120299" component={UnTitledCollection} />
        <Route exact path="/velas/velas-apes-club" component={VelasPage} />
        <Route exact path="/velas/velas-apes-club" component={VelasPage} />
        <Route exact path="/velas/velas-apes-club/215" component={VelasClubPage} />
        <Route exact path="/itemdetail" component={DetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
