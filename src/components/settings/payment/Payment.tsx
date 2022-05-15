
//components
import Button from "components/customButtons/Button";
import {LooksOne, LooksTwo} from '@material-ui/icons';

// style
import './payment.scss'

export default function Offer() {

	return (
		<div className='settingContainer'>
			<h2>
				Payment Settings
			</h2>

			<div className='smallHead'>
				<h4>Accept card payments</h4>
				<div style={{ display: 'flex' }}>
					<span>Verification by &nbsp;</span>
					<img  src={'/assets/img/account/MoonpayLogo.svg'} width={96} height={17} alt = ''/>
				</div>
			</div>
			<p>Complete the verification steps below to accept card payments for your listings, using Moonpay.</p>
			<p>Moonpay is required to collect certain information to use their services. This information is not stored by OpenSea.</p>
			<div style={{ border: '1px solid #0eabff', borderRadius: '6px' }}>
				<div className='verify'>
					<div className={'main'}>
						<LooksOne />
						<div>
							<h4>Basic verification</h4>
							<span>Buy or sell up to $7,500 worth of NFTs through card payments with Moonpay.</span>
						</div>
						<Button className="outLineBtn" >Begin</Button>
					</div>
					<ul>
						<li>Name</li>
						<li>Date of birth</li>
						<li>residence</li>
					</ul>
				</div>
				<div className='verify' style={{ borderTop: '1px solid #0eabff' }} >
					<div className={'main'}>
						<LooksTwo />
						<div>
							<h4>Advanced verification</h4>
							<span>Buy or sell NFTs with no lifetime limits</span>
						</div>
						<Button className="outLineBtn" >Begin</Button>
					</div>
					<ul>
						<li>Advanced customer verification</li>
						<li>ID Verification</li>
					</ul>
				</div>
			</div>

		</div>
	);
}

Offer.propTypes = {};
