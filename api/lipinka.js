import request from "@/utils/request";

/**
 * 公共方法
 * @param data object 公共方法
 */
export function lipinka(Url,method,data) {
	var options = {
		"url":Url,
		"method":method,
		"data":data,
	}
	return request(options,{});
}



	

