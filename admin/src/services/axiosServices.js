import axios from "axios";
// const {address} = require("../configs/routeConfig");
const address = "http://fundoonotes.incubation.bridgelabz.com/api";
var token = localStorage.getItem("token");
export default class axiosServices {
	postMethod(data, target, isTokenReq) {
		 token = localStorage.getItem("token");

		return axios.post(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}

	getMethod(target) {
		token = localStorage.getItem("token");
		// token = "XmwhEcTzTdk3LzwMrtg1mM3IHbtvoGSwRqwlCgElbVoG6YRzjkVtzTRJuYrxfIQh";

		return axios.get(address + target, {
			headers: {
				'Authorization':token
			}
		});
	}

	putMethod(data, target, isTokenReq) {
		token = localStorage.getItem("token");
		
		return axios.put(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}

	deleteMethod(target) {
		return axios.delete(address + target);
	}
}
