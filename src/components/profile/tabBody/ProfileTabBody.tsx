import { useEffect, useState } from "react";
import {
  ArrowForward,
  Block,
  Send,
  Storefront,
  VisibilityOff,
  Close,
} from "@material-ui/icons";
import Select from "react-select";
import axios from "axios";
import FormatsortOptionLabel from "../FormatsortOptionLabel";
import Button from "../../MoreComponents/Button";

import "./tabBodyStyle.scss";
import LeftFilterBox from "../leftFilterBox/LeftFilterBox";
import ActivitiesTable from "../activitiesTable/ActivitiesTable";
import DataCard from "../dataCard/DataCard";
import MyCollectionList from "../../collectionList/MyCollectionList";
import AuctionCard from "../../AuctionCard/AuctionCard";
// import MyCollectionList from "components/collectionList/MyCollectionList";

const ProfileTabBody = (props: any) => {
  const { tab, userAddress } = props;
  const options = [
    {
      value: "single_items",
      label: "Single items",
      customAbbreviation: "single_items",
    },
    { value: "all_items", label: "All items", customAbbreviation: "all_items" },
    { value: "bundles", label: "Bundles", customAbbreviation: "bundles" },
  ];
  const secondOptions = [
    {
      value: "recently_listed",
      label: "Recently Listed",
      customAbbreviation: "",
    },
    {
      value: "recently_created",
      label: "Recently Created",
      customAbbreviation: "",
    },
    { value: "recently_sold", label: "Recently Sold", customAbbreviation: "" },
    {
      value: "recently_received",
      label: "Recently Received",
      customAbbreviation: "",
    },
    { value: "ending_soon", label: "Ending Soon", customAbbreviation: "" },
  ];

  const [isShowSubMenu, setIsShowSubMenu] = useState(false);
  const [isShowLeftMenu, setIsShowLeftMenu] = useState(false);
  const [isShowMobileFilterMenu, setIsShowMobileFilterMenu] = useState(false);
  const [commandType, setCommandType] = useState("");
  const [selectedList, setSelectedList] = useState<any>([]);

  const [filterConditions, setFilterConditions] = useState<any>([]);

  const removeAllConditions = () => {
    setFilterConditions([...[]]);
  };

  const removeConditions: any = (value: any) => {
    const currentIndex = filterConditions.indexOf(value);
    const newChecked = [...filterConditions];
    newChecked.splice(currentIndex, 1);
    setFilterConditions(newChecked);
  };

  const handleClickToggleBtn = () => {
    setIsShowLeftMenu(!isShowLeftMenu);
  };

  // const handleCommand: any = (type: any, token: any) => {
  //   token = token + "";
  //   setIsShowSubMenu(true);
  //   setCommandType(type);
  //   setSelectedList([...token]);
  // };

  // const handleClickItem = (token) => {
  // 	token = token + '';
  // 	if (commandType !== "") {
  // 		if (selectedList.includes(token)) {
  // 			const data = selectedList;
  // 			let filtered = data.filter(function(value, index, arr){
  // 				return value !== token;
  // 			});
  // 			setSelectedList([...filtered]);
  // 		} else {
  // 			setSelectedList([...selectedList, token]);
  // 		}
  // 	}
  // };

  const handleClickCancel = () => {
    setIsShowSubMenu(false);
    setCommandType("");
    setSelectedList([]);
  };
  // const router = useHistory();
  const handleClickCommand = () => {
    if (selectedList.length > 0 && commandType !== "hide") {
      // router.push({
      // 	pathname: '/' + commandType,
      // 	query: { assets: selectedList },
      // })
    }
  };

  const [collections, setCollections] = useState(undefined);
  useEffect(() => {
    if (!collections) {
      if (userAddress && userAddress !== "") {
        axios
          .get(`/collection`, { params: { owner: userAddress } })
          .then((res) => {
            console.log(res.data.collections);
            setCollections(res.data.collections);
          });
      }
    }
  }, [collections]);

  const [createdCollections, setCreatedCollections] = useState(undefined);
  useEffect(() => {
    if (!createdCollections) {
      if (userAddress && userAddress !== "") {
        axios
          .get(`/collection`, { params: { creater: userAddress } })
          .then((res) => {
            setCreatedCollections(res.data.collections);
          });
      }
    }
  }, [createdCollections]);

  const [items, setItems] = useState([]);
  const [rate, setRate] = useState(0)
  useEffect(() => {
    if (items.length === 0){
      if (userAddress && userAddress !== "")
      axios.get(`/item`, { params: { owner: userAddress } }).then((res) => {
        setItems(res.data.items);
        setRate(res.data.rate);
      });
    }
  }, [items]);
  

  return (
    <>
      <div className="tabBody">
        {tab !== "favorites" && (
          <div
            className={"left-filter-bar" + (isShowLeftMenu ? " active" : "")}
          >
            {isShowLeftMenu ? (
              <LeftFilterBox
                handleChangeFilterCondition={setFilterConditions}
                filterConditions={filterConditions}
                handleClickToggleBtn={handleClickToggleBtn}
                tab={tab}
              />
            ) : (
              <div className="toggle-box" onClick={handleClickToggleBtn}>
                <ArrowForward className="toggle-btn" />
              </div>
            )}
          </div>
        )}
        {isShowMobileFilterMenu && (
          <div className="mobile-filter-bar">
            <LeftFilterBox
              handleChangeFilterCondition={setFilterConditions}
              filterConditions={filterConditions}
              handleClickToggleBtn={handleClickToggleBtn}
              tab={tab}
              hideMenu={() => setIsShowMobileFilterMenu(false)}
              isMobile={true}
            />
          </div>
        )}
        <div className="content-box">
          {/* {tab !== "activity" && (
            <div className="search-box">
              <input
                className="bordered-input m-r-5 flex-1"
                placeholder="Search"
              />
              <div className="flex-1 sort-box">
                <Select
                  defaultValue={options[0]}
                  formatOptionLabel={FormatsortOptionLabel}
                  options={options}
                  instanceId="chainSelect"
                  className="select-gray flex-1 m-r-5"
                />
                <Select
                  defaultValue={secondOptions[0]}
                  formatOptionLabel={FormatsortOptionLabel}
                  options={secondOptions}
                  instanceId="chainSelect"
                  className="select-gray flex-1 m-l-5"
                />
              </div>
              {!isShowSubMenu &&
                !isShowMobileFilterMenu &&
                tab !== "favorites" && (
                  <div className="filterButton">
                    <div
                      className="filter-btn"
                      onClick={() =>
                        setIsShowMobileFilterMenu(!isShowMobileFilterMenu)
                      }
                    >
                      Filter
                    </div>
                  </div>
                )}
            </div>
          )} */}
          {filterConditions.length > 0 && (
            <div className="filter-content">
              {filterConditions.map((label: any, key: any) => (
                <div className="filter-button" key={key}>
                  {label}
                  <Close
                    onClick={() => removeConditions(label)}
                    className="filter-close"
                  />
                </div>
              ))}
              <div className="clear-btn" onClick={removeAllConditions}>
                Clear All
              </div>
            </div>
          )}
        </div>
        {isShowSubMenu && (
          <div className="transferBox">
            <div className="cart-container">
              <div className="cart-box">
                {selectedList.map((item: any, key: any) => (
                  <div className="cart-item" key={key}>
                    <img
                      src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400"
                      className="cart-img"
                      alt="cart-img"
                    />
                  </div>
                ))}
                {selectedList.length === 0 && (
                  <p>
                    Select items to transfer. You can only sell bundles of items
                    with the same verification status.
                  </p>
                )}
              </div>
              <Button className="transfer-btn" onClick={handleClickCommand}>
                {commandType === "transfer" ? (
                  <Send />
                ) : commandType === "sell" ? (
                  <Storefront />
                ) : (
                  <VisibilityOff />
                )}
                {commandType === "transfer"
                  ? "Transfer"
                  : commandType === "sell"
                  ? "Sell"
                  : "Hide"}
              </Button>
              <Button
                className="transfer-cancel-btn"
                onClick={handleClickCancel}
              >
                <Block />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="profile-tab-body-cards">
        {(tab === "" || tab === "collections") && (
          <div className="profile-tab-body-cards-collections">
            <MyCollectionList {...props} collections={collections} />
          </div>
        )}
        {(tab === "created") && (
          <div className="profile-tab-body-cards-collections">
            {items && items.map((item: any, index: any) =>
                <AuctionCard
                  key={index}
                  item={item}
                  rate={rate}
                  TodayPick={true}
                />
              )
            }
          </div>
        )}
        {tab === "hidden" && <MyCollectionList collections={collections} />}
        {(tab === "favorites" || tab === "created_collections") && (
          <div className="profile-tab-body-cards-collections">
            <MyCollectionList collections={createdCollections} />
          </div>
        )}
        {tab === "activity" && <ActivitiesTable />}
        {(tab.includes("bids") || tab.includes("listings")) && <DataCard />}
      </div>
    </>
  );
};

export default ProfileTabBody;
