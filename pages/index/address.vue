<template>
	<view class="content">
		<view class='dzlist flex-row' v-for="(item,index) in dizhi" @click='openinfo("")'>
			<view >
				<image src='../../static/img/zb.png' class='dzlistimg'>
			</view>
			<view class='dzlistxx'>
				<view class=''>
					{{item.name}}
				</view>
				<view class='dzlistdz'>
					{{item.province}}{{item.city}}{{item.area}}{{item.street}}
				</view>
				<view class='dzlistdz'>
					{{item.address}}
				</view>
			</view>
			<view @click='openinfo("")'>
				<image src='../../static/img/mr.png' class='dzlistimg1'>
			</view>
			<view @click='openinfo("")'>
				<image src='../../static/img/bj.png' class='dzlistimg1'>
			</view>
		</view>
		<view @click="openinfo('/pages/index/addaddress')"  class='tjdz top center' >
				添加收货地址
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
				dizhi:[],
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init(){
				var openid = 'wjj8734';
				var that = this;
				lipinka('/wxuseraddress/openid/list','GET',{'openid':openid}).then(res => {
					if (res.data.total > 0) {
						let result = res.data.rows;
						that.dizhi = result;
					}
				});
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
