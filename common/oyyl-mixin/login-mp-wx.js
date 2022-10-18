import {
	request
} from '@/common/oyyl-js/request'
export default {
	data() {
		return {
			mpWxCode: ''
		}
	},
	onShow() {
		this.getMpWxCode();
	},
	methods: {
		// 微信小程序登录
		mpWxLogin(userInfoData) {
			this.mpWxGetUserInfo(userInfoData, () => {
				this.$util.msg('登陆成功');
				setTimeout(() => {
					uni.navigateBack();
				}, 1000)
			})
		},
		// 获取用户信息
		mpWxGetUserInfo(userInfoData, callbackFn = function() {}) {
			if (!userInfoData.detail.userInfo) {
				return;
			}
			this.$util.throttle(async () => {
				const [err, userData] = await uni.getUserInfo();
				console.log(userData)
				const res = await request('oyyl-user', 'loginByWeixin', {
					code: this.mpWxCode,
					encryptedData: userData.encryptedData,
					iv: userData.iv,
					userInfo: JSON.parse(userData.rawData)
				}, {
					showLoading: true
				});
				if (res.status === 0) {
					this.$util.msg(res.msg);
					console.log(12121);
					return;
				} else {
					this.$store.dispatch('setUserData', res.userInfo);
					console.log(222222);
					callbackFn()
				}
			})
		},
		//获取code
		getMpWxCode() {
			uni.login({
				provider: 'weixin',
				success: res => {
					this.mpWxCode = res.code;
				}
			})
		}
	}
}
