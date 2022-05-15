import {Done, FileCopy} from "@material-ui/icons";
import {useRef, useState} from "react";
import './copyBoxStyle.scss'

type PropType = {
	value ?: string
}
export default function CopyBox({value}:PropType) {
	const [copySuccess, setCopySuccess] = useState('');
	const tokenInputRef = useRef(null);

	function copyToClipboard(e) {
		if (copySuccess !== "Copied!") {
			tokenInputRef.current.select();
			document.execCommand('copy');
			e.target.focus();
			setCopySuccess('Copied!');
		} else {
			setCopySuccess('');
		}
	};

	return (
		<div className="copyBox">
			<img src="/assets/img/parts/moonriver.svg" alt="..." className="img-mark-16" />
			<input ref={tokenInputRef} value={value || '0x3fA4fFb85f0e528882Df600a600CFaB391Aa658b'} className="label-token"  read-only = {true} onChange = {()=>{}}/>
			{
				copySuccess !== "Copied!" &&
				<FileCopy onClick={copyToClipboard} className="img-copy" />
			}
			{
				copySuccess === "Copied!" && <Done onClick={copyToClipboard} className="img-copy" />
			}
		</div>
	);
}
