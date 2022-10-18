<template>
	<view class="content">
		<view class='containers'>
			<u-swiper :list="nblogo" :height='350' :radius="20"  ></u-swiper>
		</view>
		<view class="contentCons">
			<view class="xuanze">
				<u-subsection mode="subsection" activeColor="#5500ff" bgColor="#fff":list="xuanzetext" :current="0"></u-subsection>
			</view>
			<view class="c-content">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nblogo: [
					'../../static/img/1.jpg',
					'../../static/img/2.jpg',
					'../../static/img/3.jpg',
				], //轮播图
				xuanzetext: ['全部','插画','摄影', '动漫', '奇幻'],
				current: 0,
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
