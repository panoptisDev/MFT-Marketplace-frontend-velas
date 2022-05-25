import { useState} from "react";
import {ArrowForward, Close} from '@material-ui/icons';

import './tabBodyStyle.scss'
import NFTItemList from "components/collectionList/NFTItemList";
import LeftFilterBox from "../leftFilterBox/LeftFilterBox";
import ActivitiesTable from "../activitiesTable/ActivitiesTable";

const CollectionTabBody = (props) => {
	const { tab , items } = props;
	// const options = [
	// 	{ value: "single_items", label: "Single items", customAbbreviation: "single_items" },
	// 	{ value: "all_items", label: "All items", customAbbreviation: "all_items" },
	// 	{ value: "bundles", label: "Bundles", customAbbreviation: "bundles" },
	// ];
	// const secondOptions = [
	// 	{ value: "recently_listed", label: "Recently Listed", customAbbreviation: "" },
	// 	{ value: "recently_created", label: "Recently Created", customAbbreviation: "" },
	// 	{ value: "recently_sold", label: "Recently Sold", customAbbreviation: "" },
	// 	{ value: "recently_received", label: "Recently Received", customAbbreviation: "" },
	// 	{ value: "ending_soon", label: "Ending Soon", customAbbreviation: "" },
	// ];

	// const [isShowSubMenu, setIsShowSubMenu] = useState(false);
	const [isShowLeftMenu, setIsShowLeftMenu] = useState(false);
	const [isShowMobileFilterMenu, setIsShowMobileFilterMenu] = useState(false);
	// const [commandType, setCommandType] = useState("");
	// const [selectedList, setSelectedList] = useState([]);

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

	// const handleCommand = (type, token) => {
	// 	token = token + '';
	// 	setIsShowSubMenu(true);
	// 	setCommandType(type);
	// 	setSelectedList([...token]);
	// };

	// const handleClickCancel = () => {
	// 	setIsShowSubMenu(false);
	// 	setCommandType("");
	// 	setSelectedList([]);
	// };
    // // const router = useHistory();
	// const handleClickCommand = () => {
	// 	if (selectedList.length > 0 && commandType !== "hide") {
	// 		// router.push({
	// 		// 	pathname: '/' + commandType,
	// 		// 	query: { assets: selectedList },
	// 		// })
	// 	}
	// };

	return (
		<div className="tabBody">
			{tab !== "favorites" &&
				<div className={"left-filter-bar" + (isShowLeftMenu ? " active" : "")}>
					{isShowLeftMenu
						? <LeftFilterBox handleChangeFilterCondition={setFilterConditions} filterConditions={filterConditions}
										 handleClickToggleBtn={handleClickToggleBtn} tab={tab} />
						: <div className="toggle-box" onClick={handleClickToggleBtn}>
							<ArrowForward className="toggle-btn"/>
						</div>
					}
				</div>
			}
			{isShowMobileFilterMenu &&
				<div className="mobile-filter-bar">
					<LeftFilterBox handleChangeFilterCondition={setFilterConditions} filterConditions={filterConditions}
								   handleClickToggleBtn={handleClickToggleBtn} tab={tab}
								   hideMenu={() => setIsShowMobileFilterMenu(false)} isMobile={true} />
				</div>
			}
			<div className="content-box">
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
				{ tab === "items" && items && <NFTItemList  {...props} items={items} />}
				{ tab === "activity" &&
					<ActivitiesTable />
				}
			</div>
			
		</div>
	);
}

export default CollectionTabBody;
