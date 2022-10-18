import {
	msg
} from './util'

/**
 * @param {String} module  
 * @param {String} operation  操作类型（增删改查）
 * @param {Object} data 请求参数
 * @param {Object} ext 附加参数
 * @param {Number} ext.cache 数据缓存时间，秒
 */
export const request = (module, operation, data = {}, ext = {}) => {
	return new Promise((resolve, reject) => {
		if (ext.showLoading !== false) {
			uni.showLoading()
		}
		const cloudFnName = module;
		uniCloud.callFunction({
			name: cloudFnName,
			data: {
				operation,
				data
			}
		}).then(res => {
			if (res.result) {
				const code = res.result.code;
				//token无效
				if (code === 30201 || code === 30202 || code === 30203 || code === 30204) {
					msg('登录信息已过期，请重新登录');
					reject('无效的登录信息');
					return;
				} else if (code === 10001) {
					msg('用户已被禁用，请联系客服处理');
					reject('用户被禁用');
					return;
				}
			}
			if (ext.showLoading !== false) {
				uni.hideLoading()
			}
			resolve(res.result.data);
		}).catch((err) => {
			if (ext.showLoading !== false) {
				uni.hideLoading()
			}
			reject(err);
		})
	})
}
