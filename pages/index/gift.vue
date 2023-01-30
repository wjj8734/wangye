<template>
	<view class="lpcontent">
		<view class='containers'>
			<image src='../../static/img/lpk.png' class="xqlogo">
		</view>
		<view class='lpxq'>
			<view class="flex-row">
				<image src='../../static/img/wdsp.png' class="lpimg">
				<view class='lpqxbt'>礼品详情</view>
			</view>
			<view class="fgx"></view>
			<view class='flex-row start'>
				<view v-for="(item,index) in goods" class="flex-row lpxqlist">
					<image src='../../static/img/dui.png' class="lpxqlistimg">
					<view class="lpxqlist1">{{item.quantity}}{{item.unit}}{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class='lpjs'>
			<view class="flex-row">
				<image src='../../static/img/wdsp.png' class="lpimg">
				<view class='lpqxbt'>礼品介绍</view>
			</view>
			<view class="fgx"></view>
			<image src='../../static/img/shangpin.png' class="lpjsimg">
		</view>
		<view @click="makePhoneCall(dh)"  class='qddh top center' >
				确定兑换
		</view>
	</view>
</template>

<script>
	import {
		lipinka
	} from '../../api/lipinka.js'
	export default {
		data() {
			return {
				taocan:[],
				goods:[],
			}
		},
		onLoad() {
			this.init();
			bindGetUserInfo();
			uni.hideTabBar();
		},
		methods: {
			init(){
				var id = 1;
				var url = '/detailed/openid/'+id;
				lipinka(url,'GET',{}).then(res => {
					if (res.data.data != null) {
						let result = res.data.data;
						this.taocan = result;
						var gid = result.id;
						var gurl = '/commodity/openid/list';
						lipinka(gurl,'GET',{'ascription':gid}).then(res => {
							if (res.data.total > 0) {
								let result = res.data.rows;
								this.goods = result;
							}
						});
					}
				});
			},
			bindGetUserInfo(e) {
				let that = this;
				this.popupShow = false;
			    if (e.detail.userInfo){
					let WxUserInfo = e.detail.userInfo;
					//使用登录注册接口
					let userInfo = {};
					userInfo.avatarUrl = WxUserInfo.avatarUrl;
					userInfo.nickName = WxUserInfo.nickName;
					uni.login({
						provider: 'weixin',
						success: function(res) {
						let appid = 'wx63de0441a912a4fb'
						let secret = '6b312124a657bc08759ebdc4f5e73b7c'
						let url = 'https://akxh.akxhjx.com/wx/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
							res.code + '&grant_type=authorization_code';
						uni.request({
							url: url, // 请求路径
								success: result => {
									uni.showToast({
										icon: 'none',
										title: '授权成功',
									});
									userInfo.openid = result.data.openid;
									//查询是否注册
									AkxhHd('/catalyzer/AkxhUser/page','GET',{'openid':userInfo.openid}).then(res => {
										if (res.data.code == 200) {
											let result = res.data.result.records;
											if(result.length>0){
												//已有账户-保存本地缓存
												uni.setStorage({
													key: "userInfo",
													data: userInfo,
												});
												that.isLogin = false;
											}else{
												AkxhHd('/catalyzer/AkxhUser/add','POST',userInfo).then(res => {
													if (res.data.code == 200) {
														//添加用户成功-保存本地缓存
														uni.setStorage({
															key: "userInfo",
															data: userInfo,
														});
														AkxhHd('/catalyzer/AkxhXqwfjl/add','POST',userInfo).then(res => {
															if (res.data.code == 200) {
																let result2 = res.data.result;
															}
														})
													}
												})
												that.isLogin = false;
											}
										}
									})
								},
								
							});
						}
					});
			    } else {
					uni.showToast({
						icon: 'none',
						title: '授权失败',
					});
					return false;
			        //用户按了拒绝按钮
			    }
			},
			openinfo(url) {
			    uni.navigateTo({
			     url: url,
			    });
			},
		}
	}
</script>

<style>
</style>
