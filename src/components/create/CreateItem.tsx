import { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { FormatListBulleted, AddSharp, Star, BarChart, LockOpen, Warning, ErrorOutline } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import './createItem.scss'
import UploadFile from './uploadFile/UploadFile'
import Select from "react-select";
import FormatOptionLabel from './item/FormatOptionLabel';
import PropertyModal from './item/PropertyModal';
import Switch from '@material-ui/core/Switch';
import Button from 'components/customButtons/Button';

import axios from 'axios';
import toast from "react-hot-toast";

import { useWeb3React } from '@web3-react/core';
import { getIpfsHash, getIpfsHashFromFile } from 'utils/ipfs';
import { addItem } from "utils/contracts";

export default function CreateItem() {
    const history = useHistory();
    const [isShowProModal, setIsShowProModal] = useState(false);
    const [proData, setProData] = useState([]);
    const [isShowLvlModal, setIsShowLvlModal] = useState(false);
    const [lvlData, setLvlData] = useState([]);
    const [isShowStatsModal, setIsShowStatsModal] = useState(false);
    const [statsData, setStatsData] = useState([]);

    const [isUnlockable, setUnlockable] = useState(false);
    const [lockContent, setLockContent] = useState("");
    const [isSensitive, setSensitive] = useState(false);

    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);

    const [nameItem, setItemName] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [description, setDescription] = useState("");

    const [fileSrc, setFileSrc] = useState("");
    const [fileType, setFileType] = useState("")

    const { library, chainId, account } = useWeb3React();
    const [creatingItem, setCreatingItem] = useState(false);

    useEffect(() => {
        if (collections.length === 0) fetchCollections();
    }, [selectedCollection]);

    function fetchCollections() {
        axios.get(`/collection`)
            .then(res => {
                setCollections(res.data.collections);
                res.data.collections.forEach((item, i) => {
                    if (item.isPublic) {
                        setSelectedCollection(item);
                    }
                });
            })
            .catch((err) => {
                console.log("err: ", err.message);
                setCollections([]);
            });
    }

    async function onCreateItem() {
        if (!account || !library) {
            toast.error('Please connect your wallet correctly!');
            return;
        }
        if (!fileSrc) { 
            toast.error("NFT Art Image is required."); 
            return;
        }
        if (!nameItem) {
            toast.error("Name is required.");
            return;
        } 
        if (!description) {
            toast.error("Description is required.");
            return;
        } 
        if (!selectedCollection) {
            toast.error("Please select collection!");
        }
        const load_toast_id = toast.loading("Please wait...");
        try{
            let hash = await getIpfsHashFromFile(fileSrc);
            const assetUrl = `https://boatsail_testing.mypinata.cloud/ipfs/${hash}`;
            let metaData = {
                assetType : fileType,
                assetUrl : assetUrl,
                name : nameItem,
                description : description,
                external_link : externalLink,
                properties : proData,
                levels : lvlData,
                stats : statsData,
                unlockable : isUnlockable,
                lockContent : lockContent,
                sensitive : isSensitive,
                itemCollection : selectedCollection.address
            }
            setCreatingItem(true);   
            const metaDataHash = await getIpfsHash(metaData);
            const tokenUri = `https://boatsail_testing.mypinata.cloud/ipfs/${metaDataHash}`;
            let isCreated = await addItem(selectedCollection.address, tokenUri, 0, chainId, library.getSigner());
            if (isCreated){
                toast.success("NFT Product is created successfully");
                await axios.get(`/sync_block`);
                toast.dismiss(load_toast_id);
                history.push("/")
                setCreatingItem(false);
            }

        }catch(error){
            console.log(error);
            toast.dismiss(load_toast_id);
            toast.error("NFT Artist Create Failed!")
        }
    }

    return (
        <div className='craeteItemContainer'>
            <p><span style={{ color: 'red' }}>*</span> Required fields</p>
            <p className="text-label">Image, Video, Audio, or 3D Model<span className="text-danger">*</span></p>
            <p>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
            <UploadFile setFileSrc={setFileSrc} setFileType={setFileType} />

            <p className="text-label">Name<span className="text-danger">*</span></p>
            <input className="bordered-input" placeholder="Item name" onChange={event => setItemName(event.target.value)} />

            <p className="text-label">External link</p>
            <p>Botsail will include a link to this URL on this item's detail page, so that users can click to learn
                more about it. You are welcome to link to your own webpage with more details.</p>
            <input className="bordered-input" placeholder="https://yoursite.io/item/123" onChange={event => setExternalLink(event.target.value)} />

            <p className="text-label">Description<span className="text-danger">*</span></p>
            <p>The description will be included on the item's detail page underneath its image.
                <span className="text-blue">Markdown</span> syntax is supported.</p>
            <textarea className="bordered-input height-3x" rows={3}
                placeholder="Provide a detailed description of your item." onChange={event => setDescription(event.target.value)} />

            <p className="text-label">Collection</p>
            <p className="display-flex">
                <span>This is the collection where your item will appear.</span>
                <Tooltip
                    id="tooltip-top"
                    title="Moving items to a different collection may take up to 30 minutes."
                    placement="top"
                    classes={{ tooltip: 'tooltip' }}
                    className='myTooltip'
                >
                    <ErrorOutline className="tooltip-icon" />
                </Tooltip>
            </p>
            <Select
                className="select-gray"
                defaultValue={selectedCollection}
                formatOptionLabel={FormatOptionLabel}
                options={collections}
                instanceId='collectionSelect'
                onChange={(e) => setSelectedCollection(e)}
            />

            <div className="modal-box m-t-15">
                <div className="box-header">
                    <div className="content-box">
                        <FormatListBulleted />
                        <div style={{ marginLeft: "15px" }}>
                            <p className="text-label">Properties</p>
                            <p>Textual traits that show up as rectangles</p>
                        </div>
                    </div>
                    <div className="round-border" onClick={() => setIsShowProModal(true)}>
                        <AddSharp />
                    </div>
                    <PropertyModal target="property" isShow={isShowProModal}
                        handleClose={(data: any) => {
                            setIsShowProModal(false);
                            if (data) {
                                setProData(data);
                            }
                        }} />
                </div>
                <div className="pro-item-list">
                    {
                        proData.map((item, key) =>
                            <div className="pro-item" key={key}>
                                <div className="pro-item-type">{item.type}</div>
                                <div className="pro-item-name">{item.name}</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="hline"></div>
            <div className="modal-box">
                <div className="box-header">
                    <div className="content-box">
                        <Star />
                        <div style={{ marginLeft: "15px" }}>
                            <p className="text-label">Levels</p>
                            <p>Numerical traits that show as a progress bar</p>
                        </div>
                    </div>
                    <div className="round-border" onClick={() => setIsShowLvlModal(true)}>
                        <AddSharp />
                    </div>
                    <PropertyModal target="level" isShow={isShowLvlModal}
                        handleClose={(data) => {
                            setIsShowLvlModal(false);
                            if (data) {
                                setLvlData(data);
                            }
                        }} />
                </div>
                <div className="lvl-item-list">
                    {
                        lvlData.map((item, key) =>
                            <div className="lvl-item" key={key}>
                                <div className="lvl-item-info">
                                    <span>{item.name}</span>
                                    <span>{item.value} of {item.total}</span>
                                </div>
                                <div className="lvl-item-bar">
                                    <div className="lvl-item-content" style={{ width: (100 * item.value) / item.total + "%" }} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="hline"></div>
            <div className="modal-box">
                <div className="box-header">
                    <div className="content-box">
                        <BarChart />
                        <div style={{ marginLeft: "15px" }}>
                            <p className="text-label">Stats</p>
                            <p>Numerical traits that just show as numbers</p>
                        </div>
                    </div>
                    <div className="round-border" onClick={() => setIsShowStatsModal(true)}>
                        <AddSharp />
                    </div>
                    <PropertyModal target="stats" isShow={isShowStatsModal}
                        handleClose={(data) => {
                            setIsShowStatsModal(false);
                            if (data) {
                                setStatsData(data);
                            }
                        }} />
                </div>
                <div className="lvl-item-list">
                    {
                        statsData.map((item, key) =>
                            <div className="lvl-item" key={key}>
                                <div className="lvl-item-info">
                                    <span>{item.name}</span>
                                    <span>{item.value} of {item.total}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="hline"></div>
            <div className="modal-box">
                <div className="box-header">
                    <div className="content-box">
                        <LockOpen />
                        <div style={{ marginLeft: "15px" }}>
                            <p className="text-label">Unlockable Content</p>
                            <p>Include unlockable content that can only be revealed by the owner of the item.</p>
                        </div>
                    </div>
                    <div className="check-box">
                        <Switch
                            checked={isUnlockable}
                            onChange={(event) => setUnlockable(event.target.checked)}
                            classes={{
                                switchBase: "switchBase",
                                checked: "switchChecked",
                                thumb: "switchIcon",
                                track: "switchBar",
                            }}
                        />
                    </div>
                </div>
                {
                    isUnlockable &&
                    <>
                        <textarea className="bordered-input height-3x" rows={3}
                            placeholder="Enter content." onChange={event => setLockContent(event.target.value)} />
                        <p><span className="text-blue">Markdown</span> syntax is supported.</p>
                    </>
                }
            </div>
            <div className="hline"></div>
            <div className="modal-box">
                <div className="box-header">
                    <div className="content-box">
                        <Warning />
                        <div style={{ marginLeft: "15px" }}>
                            <p className="text-label">Explicit & Sensitive Content</p>
                            <p className="display-flex">
                                Set this item as explicit and sensitive content
                                <Tooltip
                                    id="tooltip-top"
                                    title="Setting your asset as explicit and sensitive content, like pornography and other not safe
                                    for work (NSFW) content, will protect users with safe search while browsing us."
                                    placement="top"
                                    classes={{ tooltip: 'tooltip' }}
                                    className='myTooltip'
                                >
                                    <ErrorOutline className="tooltip-icon" />
                                </Tooltip>
                            </p>
                        </div>
                    </div>
                    <div className="check-box">
                        <Switch
                            checked={isSensitive}
                            onChange={(event) => setSensitive(event.target.checked)}
                            classes={{
                                switchBase: "switchBase",
                                checked: "switchChecked",
                                thumb: "switchIcon",
                                track: "switchBar",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="hline"></div>
            {/* <p className="text-label">Supply</p>
            <p className="display-flex">
                The number of items that can be minted. No gas cost to you!
                <Tooltip
                    id="tooltip-top"
                    title='Minting is an action that brings an item into existence on the blockchain, and costs gas
                to do so. The maximum supply ("hard cap") of your NFT will be encoded in its ID.'
                    placement="top"
                    classes={{ tooltip: 'tooltip' }}
                    className='myTooltip'
                >
                    <ErrorOutline className="tooltip-icon" />
                </Tooltip>
            </p>
            <input className="bordered-input" placeholder="1" onChange={event => setSupply(event.target.value)} /> */}

            {/* <p className="text-label">Blockchain</p>
            <Select
                defaultValue={options[0]}
                formatOptionLabel={FormatOptionLabel}
                options={options}
                instanceId='chainSelect'
                className="select-gray"
                onChange={(e) => setChainId(e.chainId)}
            /> */}

            <p className="text-label display-flex">
                Freeze metadata
                <Tooltip
                    id="tooltip-top"
                    title="Once locked, your content cannot be edited or removed as it is
                                permanently stored in decentralized file storage, which will be accessible for
                                other clients to view and use."
                    placement="top"
                    classes={{ tooltip: 'tooltip' }}
                    className='myTooltip'
                >
                    <ErrorOutline className="tooltip-icon" />
                </Tooltip>
            </p>
            <p>Freezing your metadata will allow you to permanently lock and store all of this item's content in
                decentralized file storage.</p>
            <input className="bordered-input" type="text" disabled
                placeholder="To freeze your metadata, you must create your item first." />
            <br />
            <br />
            <Button className="outLineBtn" onClick={() => onCreateItem()}>Create</Button>
        </div>
    )
}
