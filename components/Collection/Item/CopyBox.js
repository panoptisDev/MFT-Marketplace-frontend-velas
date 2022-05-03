import {Done, FileCopy} from "@material-ui/icons";
import React, {useRef, useState} from "react";

import styles from "styles/jss/nextjs-material-kit/components/copyBoxStyle";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

export default function CopyBox(props) {
	const classes = useStyles();
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
		<div className={classes.copyBox}>
			<img src="/img/parts/moonriver.svg" alt="..." className="img-mark-16" />
			<input ref={tokenInputRef} value={props.value} className="label-token" />
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
