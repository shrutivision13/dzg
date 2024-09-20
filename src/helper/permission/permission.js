import React from 'react'

function Permission() {
	let loginUser = JSON.parse(localStorage.getItem("login_details"));
	return loginUser;
}

export default Permission