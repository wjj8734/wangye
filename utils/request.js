// let baseURL='https://akxh.akxhjx.com/api/chase'
// let baseURL='http://localhost/dev-api/system'
 let baseURL='http://sup.chrray.com:8090/system'

function request(options,token,urlencoded){
	let headers={}
	var Token =uni.getStorageSync('access_token');
	headers['X-Access-Token'] = Token;
	headers["Content-Type"] = "application/json";
	if(urlencoded)headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
	return new Promise((res,rej)=>{
		uni.request({
			url:baseURL + options.url,
			method:options.method || 'GET',
			data:options.data,
			header:headers,
			success(data) {
				res(data);
				if(data.data.code == 501){
					uni.removeStorageSync('access_token');
					uni.removeStorageSync('ssoToken');
					uni.removeStorageSync('uid');
					uni.removeStorageSync('myInfo');
				}
			},
			fail() {
				rej()
				uni.showToast({
					icon: 'none',
					title: '网络异常',
				});
			}
		})
	})
}
export default request;