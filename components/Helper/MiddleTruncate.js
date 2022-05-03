import React from "react";

export default function MiddleTruncate(props) {
	const {text, start, end} = props;
	let result = text.substr(0, start) + '...' + text.substr(-end);
	return result;
}

MiddleTruncate.propTypes = {};
