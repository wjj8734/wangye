<template>
	<view class="wdcontent">
		<view class="contentCons">
			<view class="dlxx flex-row">
				<image class="bjimg" src='../../static/img/bj1.png'>
			</view>
			<view class=" dlnr flex-row">
				<image class="txlogo" src='../../static/img/qq.png'>
				<view class="myindex">
					<view class="myname">
						{{user}}123
					</view>
					<view class="myjs">
						{{user}}123
					</view>
				</view>
			</view>
			<view class="indexnr">
				<view class="tiaojian">
					<view class="wddd">
						我的订单
					</view>
					<view class="xuanze flex-row">
						<view class="badge">
							<image class="ddflimg" src='../../static/img/qb.png'>
							</image>
							<view class="">
								全部
							</view>
						</view>
						<view class="badge">
							<u-badge count="1" :offset="[0, 0]"></u-badge>
							<image class="ddflimg" src='../../static/img/dfh.png'>
							<view class="">
								待发货
							</view>
						</view>
						<view class="badge">
							<u-badge count="1" :offset="[0, 0]"></u-badge>
							<image class="ddflimg" src='../../static/img/dsh.png'>
							<view class="">
								待收货
							</view>
						</view>
						<view class="badge">
							<u-badge count="1" :offset="[0, 0]"></u-badge>
							<image class="ddflimg" src='../../static/img/ywc.png'>
							<view class="">
								已完成
							</view>
						</view>
					</view>
				</view>
				<view class="jiange"></view>
				<view v-for="(item,index) in taocan" class="goodsdd">
					<view class="flex-row goodsbt">
						<view class="flex-row">
							<image class="fqkimg" src='../../static/img/fqk.png'>
							<view class="">
								{{item.name}}
							</view>
						</view>
						<view v-if="item.orderType == 0" class="jiaoyi">
							待收货
						</view>
						<view v-if="item.orderType == 1" class="jiaoyi">
							已发货
						</view>
						<view v-if="item.orderType == 2" class="jiaoyi">
							已完成
						</view>
						<view v-if="item.orderType == 3" class="jiaoyi">
							已退货
						</view>
					</view>
					<view class="fgx"></view>
					<view class="flex-row">
						<view class="goodsimg">
							<image class="goodsimg1" src='../../static/img/qq.png'>
						</view>
						<view class="goodsnr">
							<view class="fqknr">
								{{item.detailed}}
							</view>
							<view class="fqknr hs">
								收货地址:{{item.address}}
							</view>
							<view class="fqknr hs">
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
				taocan:[],
				xztext: [{
                    name: '全部',
					status: 0
                }, {
					name: '代发货',
					status: 1
				}, {
					name: '待收货',
					status: 2
				}, {
					name: '已完成',
					status: 3
				}],
				tab_index: 0,
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
			lists(openid){
				var openid = 'wjj8734';
				lipinka('/order/openid/list','GET',{'openid':openid}).then(res => {
					console.log(res)
					if (res.data.total > 0) {
						let result = res.data.rows;
						this.taocan = result;
					}
				})
			},
			tabs_change(e) {
				this.tab_index = e;
				if (e == 0) {
					this.qwe = 123
				}
				if (e == 1) {
					this.qwe = 321
				}
			},
			openinfo(url) {
			    uni.navigateTo({
			     url: url,
			    });
			},
			change(e) {
				this.fenlei = e;
			},
			
			
		}
	}
</script>

<style>
</style>
