import {useState} from "react";
import {FilterList, ArrowBack, KeyboardArrowDown, KeyboardArrowUp, Check} from '@material-ui/icons';
import './leftFilterBox.scss'
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormatMoneyOptionLabel from "../FormatMoneyOptionLabel";

const LeftFilterBox = (props) => {
	const [isShowEvents, setIsShowEvents] = useState(false);
	const [isShowActivityCollections, setIsShowActivityCollections] = useState(false);

	const [isShowStatus, setIsShowStatus] = useState(false);
	const [isShowPrice, setIsShowPrice] = useState(false);
	const [isShowCollections, setIsShowCollections] = useState(false);
	const [isShowChains, setIsShowChains] = useState(false);
	const [isShowCategories, setIsShowCategories] = useState(false);
	const [isShowSale, setIsShowSale] = useState(false);
	const filterConditions = props.filterConditions;
	const [categoryCondition, setCategoryCondition] = useState("");

	const coinTypes = ["eth", "weth", "ash", "bat", "cube", "dai", "gala", "klay", "link"];
	const options = [
		{ value: "usd", label: "United Status Dollar (USD)", customAbbreviation: "" },
		{ value: "eth", label: "Ether (ETH)", customAbbreviation: "" },
		{ value: "sol", label: "Solana (SOL)", customAbbreviation: "" },
	];

	const handleClickButton = (value) => {
		const currentIndex = filterConditions.indexOf(value);
		const newChecked = [...filterConditions];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		props.handleChangeFilterCondition(newChecked);
	}

	return (
		<div className="leftFilterBox">
			{props.isMobile ?
			<div className="filter-header">
				<p onClick={() => props.handleChangeFilterCondition([])}
				   className="flex-1 header-label blue-label m-l-10">Clear All</p>
				<p onClick={props.hideMenu} className="flex-1 header-label blue-label m-r-10">Done</p>
			</div> :
			<div className="filter-header">
				<div className="toggle-box color-white">
					<FilterList />
				</div>
				<p className="flex-1 header-label">Filter</p>
				<div className="toggle-box" onClick={props.handleClickToggleBtn}>
					<ArrowBack className="toggle-btn"/>
				</div>
			</div>
			}

			{(props.tab === "activity" || props.tab.includes("bids") || props.tab.includes("listings")) &&
			<>
				<div className="filter-row" onClick={() => setIsShowEvents(!isShowEvents)}>
					<p className="filter-header-label">Event Type</p>
					<div className="toggle-more">
						{isShowEvents
							? <KeyboardArrowUp />
							: <KeyboardArrowDown />
						}
					</div>
				</div>
				{isShowEvents &&
				<div className="filter-bar">
					<div className={"filter-btn" + (filterConditions.includes("listings") ? " selected" : "")}
						 onClick={() => handleClickButton("listings")}>Listings</div>
					<div className={"filter-btn" + (filterConditions.includes("sales") ? " selected" : "")}
						 onClick={() => handleClickButton("sales")}>Sales</div>
					<div className={"filter-btn" + (filterConditions.includes("bids") ? " selected" : "")}
						 onClick={() => handleClickButton("bids")}>Bids</div>
					<div className={"filter-btn" + (filterConditions.includes("transfers") ? " selected" : "")}
						 onClick={() => handleClickButton("transfers")}>Transfers</div>
				</div>
				}
				<div className="filter-row" onClick={() => setIsShowActivityCollections(!isShowActivityCollections)}>
					<p className="filter-header-label">Collections</p>
					<div className="toggle-more">
						{isShowActivityCollections
							? <KeyboardArrowUp />
							: <KeyboardArrowDown />
						}
					</div>
				</div>
				{isShowActivityCollections &&
				<>
					<div className="filter-bar">
						<input className="bordered-input m-r-5 flex-1" placeholder="Search"/>
						<div className={"filter-btn w-100-pro p-50" + (filterConditions.includes("the meta kongz") ? " selected" : "")}
							 onClick={() => handleClickButton("the meta kongz")}>
							<div className="icon-30">
								<img src="/assets/img/parts/meta-kongs.png" alt = '' />
							</div>
							The Meta Kongz
						</div>
						<div className={"filter-btn w-100-pro p-50" + (filterConditions.includes("Mutant Kongz & G.rilla Official") ? " selected" : "")}
							 onClick={() => handleClickButton("Mutant Kongz & G.rilla Official")}>
							<div className="icon-30">
								<img src="/assets/img/parts/mutant_kongs.png" alt = ''/>
							</div>
							Mutant Kongz & G.rilla Official
						</div>
						<div className={"filter-btn w-100-pro p-50" + (filterConditions.includes("Happier Town Official") ? " selected" : "")}
							 onClick={() => handleClickButton("Happier Town Official")}>
							<div className="icon-30">
								<img src="/assets/img/parts/happier_town.gif" alt = ''/>
							</div>
							Happier Town Official
						</div>
						<div className={"filter-btn w-100-pro p-50" + (filterConditions.includes("Celpi Official") ? " selected" : "")}
							 onClick={() => handleClickButton("Celpi Official")}>
							<div className="icon-30">
								<img src="/assets/img/parts/celpi.png" alt = ''/>
							</div>
							Celpi Official
						</div>
					</div>
				</>
				}
			</>
			}


			{!(props.tab === "activity" || props.tab.includes("bids") || props.tab.includes("listings")) &&
			<>
				<div className="filter-row" onClick={() => setIsShowStatus(!isShowStatus)}>
					<p className="filter-header-label">Status</p>
					<div className="toggle-more">
						{isShowStatus
							? <KeyboardArrowUp />
							: <KeyboardArrowDown />
						}
					</div>
				</div>
				{isShowStatus &&
				<div className="filter-bar">
					<div className={"filter-btn" + (filterConditions.includes("buy_now") ? " selected" : "")}
						 onClick={() => handleClickButton("buy_now")}>Buy Now</div>
					<div className={"filter-btn" + (filterConditions.includes("on_auction") ? " selected" : "")}
						 onClick={() => handleClickButton("on_auction")}>On Auction</div>
					<div className={"filter-btn" + (filterConditions.includes("new") ? " selected" : "")}
						 onClick={() => handleClickButton("new")}>New</div>
					<div className={"filter-btn" + (filterConditions.includes("has_offer") ? " selected" : "")}
						 onClick={() => handleClickButton("has_offer")}>Has Offers</div>
				</div>
				}
				<div className="filter-row" onClick={() => setIsShowPrice(!isShowPrice)}>
					<p className="filter-header-label">Price</p>
					<div className="toggle-more">
						{isShowPrice
							? <KeyboardArrowUp />
							: <KeyboardArrowDown />
						}
					</div>
				</div>
				{isShowPrice &&
				<div className="filter-bar">
					<Select
						className="select-gray"
						defaultValue={options[0]}
						formatOptionLabel={FormatMoneyOptionLabel}
						options={options}
						instanceId='moneySelect'
					/>
					<span style={{display: "flex", flexDirection: "row", marginTop: "12px"}}>
						<input className="bordered-input flex-1" placeholder="Min"/>
						<span style={{lineHeight: "40px", width: "40px", fontSize: "20px", textAlign: "center"}}>to</span>
						<input className="bordered-input flex-1" placeholder="Min"/>
					</span>
					<div className={"filter-btn" + (filterConditions.includes("price") ? " selected" : "")}
						 onClick={() => handleClickButton("price")}>Apply</div>
					</div>
				}
				<div className="filter-row" onClick={() => setIsShowCollections(!isShowCollections)}>
					<p className="filter-header-label">Collections</p>
					<div className="toggle-more">
						{isShowCollections
							? <KeyboardArrowUp />
							: <KeyboardArrowDown />
						}
					</div>
				</div>
				{
					isShowCollections &&
					<div className="filter-bar">
						<input className="bordered-input m-r-5 flex-1" placeholder="Search"/>
					</div>
				}
			</>
			}
			<div className="filter-row" onClick={() => setIsShowChains(!isShowChains)}>
				<p className="filter-header-label">Chains</p>
				<div className="toggle-more">
					{isShowChains
						? <KeyboardArrowUp />
						: <KeyboardArrowDown />
					}
				</div>
			</div>
			{isShowChains &&
			<div className="filter-bar">
				<div className={"filter-btn p-0 tl" + (filterConditions.includes("ether") ? " selected" : "")}
					 onClick={() => handleClickButton("ether")}>
					<div className="icon-30">
						<img src="/assets/img/parts/eth.png" alt = ''/>
					</div>
					Ethereum
				</div>
				<div className={"filter-btn p-0 tl" + (filterConditions.includes("polygon") ? " selected" : "")}
					 onClick={() => handleClickButton("polygon")}>
					<div className="icon-30">
						<img src="/assets/img/parts/pol.svg" alt = ''/>
					</div>
					Polygon
				</div>
				<div className={"filter-btn p-0 tl" + (filterConditions.includes("klaytn") ? " selected" : "")}
					 onClick={() => handleClickButton("klaytn")}>
					<div className="icon-30">
						<img src="/assets/img/parts/klaytn.png" alt = ''/>
					</div>
					Klaytn
				</div>
				<div className={"filter-btn p-50 tl" + (filterConditions.includes("solana") ? " selected" : "")}
					 onClick={() => handleClickButton("solana")}>
					<div className="icon-30">
						<img src="/assets/img/parts/solana.svg" alt = ''/>
					</div>
					Solana
				</div>
			</div>
			}
			{!(props.tab === "activity" || props.tab.includes("bids") || props.tab.includes("listings")) &&
			<>
				<div className="filter-row" onClick={() => setIsShowCategories(!isShowCategories)}>
					<p className="filter-header-label">Categories</p>
					<div className="toggle-more">
						{isShowCategories
							? <KeyboardArrowUp />
							: <KeyboardArrowDown />
						}
					</div>
				</div>
				{isShowCategories &&
				<div className="filter-bar">
					<div className={"filter-btn w-100-pro p-0 tl" + (categoryCondition === "art" ? " selected" : "")}
						 onClick={() => {categoryCondition === "art" ? setCategoryCondition("") : setCategoryCondition("art")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/art-dark.svg" alt = ''/>
						</div>
						Art
					</div>
					<div className={"filter-btn w-100-pro p-0 tl" + (categoryCondition === "collectibles" ? " selected" : "")}
						 onClick={() => {categoryCondition === "collectibles" ? setCategoryCondition("") : setCategoryCondition("collectibles")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/collectibles-dark.svg"alt = '' />
						</div>
						Collectibles
					</div>
					<div className={"filter-btn w-100-pro p-0 tl" + (categoryCondition === "domains" ? " selected" : "")}
						 onClick={() => {categoryCondition === "domains" ? setCategoryCondition("") : setCategoryCondition("domains")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/domain-names-dark.svg"alt = '' />
						</div>
						Domain Names
					</div>
					<div className={"filter-btn w-100-pro p-50 tl" + (categoryCondition === "music" ? " selected" : "")}
						 onClick={() => {categoryCondition === "music" ? setCategoryCondition("") : setCategoryCondition("music")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/music-dark.svg"alt = '' />
						</div>
						Music
					</div>
					<div className={"filter-btn w-100-pro p-50 tl" + (categoryCondition === "photo" ? " selected" : "")}
						 onClick={() => {categoryCondition === "photo" ? setCategoryCondition("") : setCategoryCondition("photo")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/photography-category-dark.svg" alt = ''/>
						</div>
						Photography
					</div>
					<div className={"filter-btn w-100-pro p-50 tl" + (categoryCondition === "sport" ? " selected" : "")}
						 onClick={() => {categoryCondition === "sport" ? setCategoryCondition("") : setCategoryCondition("sport")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/sports-dark.svg" alt = ''/>
						</div>
						Sports
					</div>
					<div className={"filter-btn w-100-pro p-50 tl" + (categoryCondition === "tradings" ? " selected" : "")}
						 onClick={() => {categoryCondition === "tradings" ? setCategoryCondition("") : setCategoryCondition("tradings")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/trading-cards-dark.svg" alt = ''/>
						</div>
						Trading Cards
					</div>
					<div className={"filter-btn w-100-pro p-50 tl" + (categoryCondition === "utility" ? " selected" : "")}
						 onClick={() => {categoryCondition === "utility" ? setCategoryCondition("") : setCategoryCondition("utility")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/utility-dark.svg"alt = '' />
						</div>
						Utility
					</div>
					<div className={"filter-btn w-100-pro p-50 tl" + (categoryCondition === "v_world" ? " selected" : "")}
						 onClick={() => {categoryCondition === "v_world" ? setCategoryCondition("") : setCategoryCondition("v_world")}}>
						<div className="icon-30">
							<img src="/assets/img/parts/virtual-worlds-dark.svg"alt = '' />
						</div>
						Virtual Worlds
					</div>
				</div>
				}
				<div className="filter-row" onClick={() => setIsShowSale(!isShowSale)}>
					<p className="filter-header-label">On Sale In</p>
					<div className="toggle-more">
						{isShowSale
							? <KeyboardArrowUp />
							: <KeyboardArrowDown />
						}
					</div>
				</div>
				{isShowSale &&
				<div className="filter-bar">
					<input className="bordered-input w-100-pro flex-1" placeholder="Search"/>
					{
						coinTypes.map((item, key) =>
							<div className="filter-btn-full">
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={() => handleClickButton(item)}
											checkedIcon={<Check className="checkedIcon" />}
											icon={<Check className="uncheckedIcon"/>}
											classes={{
												checked: "checked",
												root: "checkRoot",
											}}
										/>
									}
									classes={{ label: "label", root: "labelRoot" }}
									label={item}
								/>
							</div>
						)
					}
				</div>
				}
			</>
			}
		</div>
	);
}

export default LeftFilterBox;
