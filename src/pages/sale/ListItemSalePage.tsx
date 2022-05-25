import './ListItemSalePage.scss'

import { useCallback, useEffect, useState } from 'react';
import Button from 'components/customButtons/Button';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createAuction, listItem } from 'utils/contracts';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import moment from 'moment';
import FixedPrice from './FixedPrice';
import TimedAuction from './TimedAuction';
import SaleType from './SaleType';
import { ethers } from 'ethers';

const ListItemSalePage = (props) => {

	const { register, handleSubmit } = useForm();

	const { account, active, chainId, library } = useWeb3React();
    const [balance, setBalance] = useState(0)
	const fetchBalance = useCallback(async () => {
		if (!!account && !!library) {
			const rawBalance = await library.getBalance(account);
			const value = parseFloat(ethers.utils.formatEther(rawBalance));
			console.log(value);
			setBalance(value);         
		}
		return () => {
			setBalance(0)
		}
	},[]);
	useEffect(() => {
		fetchBalance();
    }, [account, chainId, library])

	const [item, setItem] = useState(null);
	const location = useLocation();
	useEffect(() => {
		const state = location.state;
        setItem(state && state["item"]);
	})

	const [saleType, setSaleType] = useState("FixedPrice");	

	const [listing, setListing] = useState(false);
	const onList = async updatedData =>{
		let startTimeStamp = 0;
		let endTimeStamp = 0;
		if (!account || !library) {
            toast.error('Please connect your wallet correctly!');
            return;
        }

		if (saleType === 'FixedPrice') {
            if (!updatedData.price) {
                toast.error("NFT Price is required!");
                return;
            }

            if (parseFloat(updatedData.price) <= 0) {
                toast.error("NFT price should be more than 0!");
                return;
            }
        } else if (saleType === 'TimedAuction') {
            if (!updatedData.price) {
                toast.error("NFT Price is required!");
                return;
            }

            if (parseFloat(updatedData.price) <= 0) {
                toast.error("NFT price should be more than 0!");
                return;
            }
            if (!updatedData.startTime) {
                toast.error("Starting Date is required!");
                return;
            }

            if (!updatedData.endTime) {
                toast.error("End Date is required!");
                return;
            }
			startTimeStamp = moment(updatedData.startTime).valueOf();
			endTimeStamp = moment(updatedData.endTime).valueOf();
			console.log(startTimeStamp);
			console.log(endTimeStamp);
            if (moment(updatedData.startTime).valueOf() >= moment(updatedData.endTime).valueOf()) {
                toast.error('End time should be late than start time!');
                return;
            }
        }
		setListing(true);
		const load_toast_id = toast.loading("Please wait...");
		const tokenId = saleType === "FixedPrice" ? 
		await listItem(
			item.itemCollection,
			account,
			item.tokenId,
			updatedData.price,
			chainId,
			library.getSigner()
		) : 
		await createAuction(
			item.itemCollection,
			account,
			item.tokenId,
			updatedData.price,
			startTimeStamp,
			endTimeStamp,
			chainId,
			library.getSigner()
		);
		console.log(tokenId);
		if (tokenId){
			axios.get('/sync_block')
			.then((res) => {
				console.log(res.data);
				toast.dismiss(load_toast_id);
				toast.success("Listed Successfully");
				setListing(false)
				props.history.goBack();				
			}).catch((err) => {
				console.log(err);
				toast.dismiss(load_toast_id);
				toast.error("Listing failed.");	
			})
		}else{
			toast.dismiss(load_toast_id);
			toast.error("Listing failed.");
		}

	}

	return (
		<form className='saleContainer' onSubmit={handleSubmit(onList)}>
			<div>
				<SaleType setSaleType={setSaleType}></SaleType>
				{saleType === 'FixedPrice' ? <FixedPrice register={register}/> : <></>}
            	{saleType === 'TimedAuction' ? <TimedAuction register={register} /> : <></>}
			</div>
			<Button className="listBtn outLineBtn"><strong>Complete Listing</strong></Button>
		</form>
	);
}

export default ListItemSalePage;
