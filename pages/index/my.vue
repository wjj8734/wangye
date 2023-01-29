<template>
	<view class="wdcontent">
		<view class="contentCons">
			<view class='first-top'>
				<view class="dlxx flex-row">
					<image class="bjimg" src='../../static/img/bj1.png'>
				</view>
				<view class="flex-row my-top">
					<view class="my-top-text">
						我的
					</view>
					<view class="my-top-bj">
						编辑资料
					</view>
				</view>
				<view class="dlnr flex-row top">
					<image class="txlogo" src='../../static/img/qq.png'>
					<view class="myindex flex-column top">
						<view class="myname">
							{{user}}微信用户登陆123
						</view>
						<view class="myjs">
							Hi~欢迎来到{{userShop}}商店
						</view>
					</view>
				</view>
				<view class="order-tap">
					<view class="wddd">
						我的订单
					</view>
					<view class="xuanze flex-row center">
						<view class="badge" @click.shop="lists()">
							<image class="ddflimg" src='../../static/img/qb.png'>
							</image>
							<view class="">
								全部
							</view>
						</view>
						<view class="badge" @click.shop="lists(0)">
							<u-badge count="1" :offset="[0, 20]"></u-badge>
							<image class="ddflimg" src='../../static/img/dfh.png'>
							<view class="">
								待发货
							</view>
						</view>
						<view class="badge" @click.shop="lists(1)">
							<u-badge count="1" :offset="[0, 20]"></u-badge>
							<image class="ddflimg" src='../../static/img/dsh.png'>
							<view class="">
								待收货
							</view>
						</view>
						<view class="badge" @click.shop="lists(2)">
							<u-badge count="1" :offset="[0, 20]"></u-badge>
							<image class="ddflimg" src='../../static/img/ywc.png'>
							<view class="">
								已完成
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="indexnr">
				<view v-for="(item,index) in taocan" class="goodsdd">
					<view class="flex-row goodsbt">
						<view class="flex-row">
							<image class="fqkimg" src='../../static/img/fqk.png'>
							<view class="">
								{{item.name}}
							</view>
						</view>
						<view v-if="item.orderType == 0" class="jiaoyi">
							待发货
						</view>
						<view v-if="item.orderType == 1" class="jiaoyi">
							待收货
						</view>
						<view v-if="item.orderType == 2" class="jiaoyi">
							交易成功
						</view>
					</view>
					<view class="fgx"></view>
					<view class="flex-row">
						<view class="goodsimgs">
							<image class="goodsimg" src='../../static/img/qq.png'>
						</view>
						<view class="goodsnr">
							<view class="fqknr">
								{{item.detailed}}
							</view>
							<view class="fqknr1 hs">
								收货地址:{{item.address}}
							</view>
							<view class="fqknr1 hs">
								兑换时间:{{item.createTime}}
							</view>
						</view>
					</view>
					<view v-if="item.orderType == 0" class="flex-row goodscz">
						<view class="ckwl" @click="openinfo('')">
							查看物流
						</view>
						<view class="ckwl" @click="openinfo('')">
							确认收货
						</view>
					</view>
					<view v-if="item.orderType == 1" class="flex-row goodscz">
						<view class="ckwl" @click="openinfo('')">
							查看物流
						</view>
						<view class="ckwl" @click="openinfo('')">
							确认收货
						</view>
					</view>
				</view>
			</view>
			
			<view @click="openinfo()">
					<image class="shaoma" src='../../static/img/shaoma.png'>
			</view>
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
				user:'',
				userShop:'',
				taocan:[],
			}
		},
		onLoad() {
		},
		onShow(){
			this.init();
		},
		methods: {
			init(){
				this.lists()
			},
			lists(e){
				this.taocan = [];
				if(e!=null){
					var type = e;
				}
				console.log(type);
				var openid = 'wjj8734';
				var that = this;
				lipinka('/order/openid/list','GET',{'openid':openid,'orderType':type}).then(res => {
					if (res.data.total > 0) {
						let result = res.data.rows;
						that.taocan = result;
					}
				})
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
