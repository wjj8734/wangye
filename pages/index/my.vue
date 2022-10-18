<template>
	<view class="my-content">
		<view class="my-introduce flex-row">
			<image class="txlogo" radius="50px" src="https://cdn.uviewui.com/uview/album/1.jpg">
			<view class="my-name">
				 用户名
			</view>
		</view>
		<view class="my-list">
			<view class="biaoge flex-row">
				<view class="">
					关注
				</view>
				<view class="">
					<image class="jt" radius="50px" src="../../static/tabbar/jt.png">
				</view>
			</view>
			<view class="jiange"></view>
			<view class="biaoge flex-row">
				<view class="">
					收藏列表
				</view>
				<view class="">
					<image class="jt" radius="50px" src="../../static/tabbar/jt.png">
				</view>
			</view>
			<view class="jiange"></view>
			<view class="biaoge flex-row">
				<view class="">
					浏览记录
				</view>
				<view class="">
					<image class="jt" radius="50px" src="../../static/tabbar/jt.png">
				</view>
			</view>
			<view class="jiange"></view>
			<view class="biaoge flex-row">
				<view class="">
					我的发布
				</view>
				<view class="">
					<image class="jt" radius="50px" src="../../static/tabbar/jt.png">
				</view>
			</view>
			<view class="jiange"></view>
			<view class="biaoge flex-row">
				<view class="">
					退出
				</view>
				<view class="">
					<image class="jt" radius="50px" src="../../static/tabbar/jt.png">
				</view>
			</view>
			<view class="jiange"></view>
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
