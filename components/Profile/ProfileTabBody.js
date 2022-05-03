import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowForward, Block, Send, Storefront, VisibilityOff, Close} from '@material-ui/icons';
import styles from "styles/jss/nextjs-material-kit/components/profile/tagBodyStyle.js";
const useStyles = makeStyles(styles);
import Select from "react-select";

import formatsortOptionLabel from "components/Profile/formatsortOptionLabel";
import LeftFilterBox from "components/Profile/LeftFilterBox";
import MyNFTsList from "../myNFTList/MyNFTsList";
import ActivitiesTable from "components/Profile/ActivitiesTable";
import DataCard from "components/Profile/dataCard";
import Button from "../CustomButtons/Button";

const ProfileTagList = (props) => {
	const classes = useStyles();
	const options = [
		{ value: "single_items", label: "Single items", customAbbreviation: "single_items" },
		{ value: "all_items", label: "All items", customAbbreviation: "all_items" },
		{ value: "bundles", label: "Bundles", customAbbreviation: "bundles" },
	];
	const secondOptions = [
		{ value: "recently_listed", label: "Recently Listed", customAbbreviation: "" },
		{ value: "recently_created", label: "Recently Created", customAbbreviation: "" },
		{ value: "recently_sold", label: "Recently Sold", customAbbreviation: "" },
		{ value: "recently_received", label: "Recently Received", customAbbreviation: "" },
		{ value: "ending_soon", label: "Ending Soon", customAbbreviation: "" },
	];

	const [isShowSubMenu, setIsShowSubMenu] = useState(false);
	const [isShowLeftMenu, setIsShowLeftMenu] = useState(false);
	const [isShowMobileFilterMenu, setIsShowMobileFilterMenu] = useState(false);
	const [commandType, setCommandType] = useState("");
	const [selectedList, setSelectedList] = useState([]);

	const [filterConditions, setFilterConditions] = useState([]);

	const removeAllConditions = () => {
		setFilterConditions([...[]]);
	};

	const removeConditions = (value) => {
		const currentIndex = filterConditions.indexOf(value);
		const newChecked = [...filterConditions]
		newChecked.splice(currentIndex, 1);
		setFilterConditions(newChecked);
	};

	const handleClickToggleBtn = () => {
		setIsShowLeftMenu(!isShowLeftMenu);
	};

	const handleCommand = (type, token) => {
		token = token + '';
		setIsShowSubMenu(true);
		setCommandType(type);
		setSelectedList([...token]);
	};

	const handleClickItem = (token) => {
		token = token + '';
		if (commandType !== "") {
			if (selectedList.includes(token)) {
				const data = selectedList;
				let filtered = data.filter(function(value, index, arr){
					return value !== token;
				});
				setSelectedList([...filtered]);
			} else {
				setSelectedList([...selectedList, token]);
			}
		}
	};

	const handleClickCancel = () => {
		setIsShowSubMenu(false);
		setCommandType("");
		setSelectedList([]);
	};

	const handleClickCommand = () => {
		if (selectedList.length > 0 && commandType !== "hide") {
			router.push({
				pathname: '/' + commandType,
				query: { assets: selectedList },
			})
		}
	};

	return (
		<div className={classes.container}>
			{props.tab !== "favorites" &&
				<div className={"left-filter-bar" + (isShowLeftMenu ? " active" : "")}>
					{isShowLeftMenu
						? <LeftFilterBox handleChangeFilterCondition={setFilterConditions} filterConditions={filterConditions}
										 handleClickToggleBtn={handleClickToggleBtn} tab={props.tab} />
						: <div className="toggle-box" onClick={handleClickToggleBtn}>
							<ArrowForward className="toggle-btn"/>
						</div>
					}
				</div>
			}
			{isShowMobileFilterMenu &&
				<div className="mobile-filter-bar">
					<LeftFilterBox handleChangeFilterCondition={setFilterConditions} filterConditions={filterConditions}
								   handleClickToggleBtn={handleClickToggleBtn} tab={props.tab}
								   hideMenu={() => setIsShowMobileFilterMenu(false)} isMobile={true} />
				</div>
			}
			<div className="content-box">
				{!(props.tab === "activity" || props.tab.includes("bids") || props.tab.includes("listings")) &&
					<div className="search-box">
						<input className="bordered-input m-r-5 flex-1" placeholder="Search"/>
						<div className="flex-1 sort-box">
							<Select
								defaultValue={options[0]}
								formatOptionLabel={formatsortOptionLabel}
								options={options}
								instanceId='chainSelect'
								className="select-gray flex-1 m-r-5"
							/>
							<Select
								defaultValue={secondOptions[0]}
								formatOptionLabel={formatsortOptionLabel}
								options={secondOptions}
								instanceId='chainSelect'
								className="select-gray flex-1 m-l-5"
							/>
						</div>
					</div>
				}
				{filterConditions.length > 0 &&
					<div className="filter-content">
						{
							filterConditions.map((label, key) =>
								<div className="filter-button" key={key}>
									{label}
									<Close onClick={() => removeConditions(label)} className="filter-close" />
								</div>
							)
						}
						<div className="clear-btn" onClick={removeAllConditions}>Clear All</div>
					</div>
				}
				{(props.tab === "collection" || props.tab === "created" || props.tab === "created_collection"
					|| props.tab === "hidden") &&
					<MyNFTsList handleCommand={handleCommand} handleClickItem={handleClickItem}
								selectedList={selectedList} isDoingCommand={false} />
				}
				{props.tab === "favorites" &&
					<MyNFTsList handleCommand={handleCommand} handleClickItem={handleClickItem}
								selectedList={selectedList} isDoingCommand={false} hasAction={false} />
				}
				{props.tab === "activity" &&
					<ActivitiesTable />
				}
				{(props.tab.includes("bids") || props.tab.includes("listings")) &&
					<DataCard />
				}
			</div>
			{
				isShowSubMenu &&
				<div className={classes.transferBox}>
					<div className="cart-container">
						<div className="cart-box">
							{
								selectedList.map((item, key) =>
									<div className="cart-item" key={key}>
										<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400"
											 className="cart-img" alt="cart-img" />
									</div>
								)
							}

							{
								selectedList.length === 0 &&
								<p>Select items to transfer. You can only sell bundles of items with the same
									verification status.</p>
							}
						</div>
						<Button color="info" className="transfer-btn" onClick={handleClickCommand}>
							{commandType === "transfer" ? <Send /> : (commandType === "sell" ? <Storefront /> : <VisibilityOff />)}
							{commandType === "transfer" ? "Transfer" : (commandType === "sell" ? "Sell" : "Hide")}
						</Button>
						<Button className="transfer-cancel-btn" onClick={handleClickCancel}><Block />Cancel</Button>
					</div>
				</div>
			}
			{
				!isShowSubMenu && !isShowMobileFilterMenu && props.tab !== "favorites" &&
				<div className={classes.filterButton}>
					<div className="filter-btn" onClick={() => setIsShowMobileFilterMenu(!isShowMobileFilterMenu)}>
						Filter
					</div>
				</div>
			}
		</div>
	);
}

export default ProfileTagList;
