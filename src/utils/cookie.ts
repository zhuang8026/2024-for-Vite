export const setCookie = (c_name, value, expire = -1) => {
	let date;
	if (expire == -1) {
		date = new Date();
		date.setTime(date.getTime() + 3 * (24 * 60 * 60 * 1000)); // not setting expire time, then 3 day expired
	}
	else {
		date = new Date(expire * 1000); // expire form timestamp
		const expireTime = date.getTime() + 1000 * 36000;
		date.setTime(expireTime);
	}
	// date.setSeconds(date.getSeconds() + expire);
	// set cookie with expire time which format is iso8601
	eraseCookie(c_name);
	document.cookie = `${c_name}=${encodeURIComponent(value)};expires=${date.toUTCString()}`
}

export const getCookie = (cname) => {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export const eraseCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0`;
}
