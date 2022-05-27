import { useEffect, useState} from "react";
import {ArrowForward, Close} from '@material-ui/icons';
import { useWeb3React } from '@web3-react/core';

import './tabBodyStyle.scss'
import NFTItemList from "components/collectionList/NFTItemList";
import LeftFilterBox from "../leftFilterBox/LeftFilterBox";
import ActivitiesTable from "../activitiesTable/ActivitiesTable";

const CollectionTabBody = (props) => {
	const { tab , items } = props;

	const { connector, library, chainId, account, active } = useWeb3React();
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
    }, [connector, library, account, active, chainId]);

	const [isShowLeftMenu, setIsShowLeftMenu] = useState(false);
	const [isShowMobileFilterMenu, setIsShowMobileFilterMenu] = useState(false);

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
