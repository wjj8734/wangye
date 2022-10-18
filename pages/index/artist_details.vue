<template>
	<view class="content">
		<u-navbar :is-back="true" title=""
			title-color='#e4cea5' 
			back-icon-color='#fff' 
		:background="{ background:'#f7f7f7'}">
		</u-navbar>
		<view class=' flex-row'>
			<view class=''>
				<image src='../../static/img/index2.png' class="axqimg">
			</view>
			<view class='anniu'>
				关注
			</view>
		</view>
		<view class='introduce'>
			韩国的著名插画家Echi，她的漫画多为温和、粉嫩的色泽，望上去一眼的明媚与温柔，主要以女孩为主，很清纯，清淡眼眉，柔软长发，纤细瘦弱，非常的恬静，echi让我们感觉自己就像生活在彩虹般的糖果世界里。其风格安静，柔美,温馨。
		</view>
		<view class="ad-content">
			<view class="subject flex-row">
				<view class="s-content1">
					<view @click='openinfo("/pages/index/details")'>
						<image src='../../static/img/index2.png' class="img1">
					</view>	
					<view class="s-c-xx">
						<image src='../../static/tabbar/xx.png' class="img2">
					</view>
				</view>
				<view class="s-content2">
					<view @click='openinfo("/pages/index/details")'>
						<image src='../../static/img/index3.png' class="img1">
					</view>	
					<view class="s-c-xx">
						<image src='../../static/tabbar/xx.png' class="img2">
					</view>
				</view>
			</view>
			<view class="subject flex-row">
				<view class="s-content1">
					<view @click='openinfo("/pages/index/details")'>
						<image src='../../static/img/index4.png' class="img1">
					</view>	
					<view class="s-c-xx">
						<image src='../../static/tabbar/xx.png' class="img2">
					</view>
				</view>
				<view class="s-content2">
					<view @click='openinfo("/pages/index/details")'>
						<image src='../../static/img/index5.png' class="img1">
					</view>	
					<view class="s-c-xx">
						<image src='../../static/tabbar/xx.png' class="img2">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
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
