import {useState} from "react";
import './style.scss'

export default function Theme() {
	const [ theme, setTheme ] = useState('contain');
	const themeHandle = (val = 'contain') => {
		setTheme(val)
	}
	return (
		<div className={'formControl'}>
			<h4><strong>Display theme</strong></h4>
			<div>

			</div>
			<p>Change how your items are shown.</p>
			<div className="themeGroup">
				{
					theme === 'padded' ?
						<div className={'item activeTheme'}>
							<img src={"/assets/img/theme/card-display-padded.svg"} alt={"padded"} style={{width: '100%', height: '100%'}}/>
							<h4>Padded</h4>
							<div>Recommended for assets with transparent background</div>
						</div> :
						<div className='item' onClick={() => themeHandle('padded')}>
							<img src={"/assets/img/theme/card-display-padded.svg"} alt={"padded"} style={{width: '100%', height: '100%'}}/>
							<h4>Padded</h4>
							<div>Recommended for assets with transparent background</div>
						</div>
				}
				{
					theme === 'contain' ?
						<div className={'item activeTheme'}>
							<img src={"/assets/img/theme/card-display-contain.svg"} alt={"Contain"} style={{width: '100%'}}/>
							<h4>Contained</h4>
							<div>Recommended for assets that are not a 1:1 ratio</div>
						</div> :
						<div className={'item'} onClick={() => themeHandle('contain')}>
							<img src={"/assets/img/theme/card-display-contain.svg"} alt={"Contain"} style={{width: '100%'}}/>
							<h4>Contained</h4>
							<div>Recommended for assets that are not a 1:1 ratio</div>
						</div>
				}
				{
					theme === 'cover' ?
						<div className={'item activeTheme'}>
							<img src={"/assets/img/theme/card-display-cover.svg"} alt={"Cover"} style={{width: '100%'}}/>
							<h4>Covered</h4>
							<div>Recommended for assets that can extend to the edge</div>
						</div> :
						<div className={'item'} onClick={() => themeHandle('cover')}>
							<img src={"/assets/img/theme/card-display-cover.svg"} alt={"Cover"} style={{width: '100%'}}/>
							<h4>Covered</h4>
							<div>Recommended for assets that can extend to the edge</div>
						</div>
				}
			</div>
		</div>
	);
}
