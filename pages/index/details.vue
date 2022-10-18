<template>
	<view class="content">
		<u-navbar :is-back="true" title="" 
			title-color='#e4cea5' 
			back-icon-color='#fff' 
		:background="{ background:'#f7f7f7'}">
		</u-navbar>
		<view class='containers'>
			<image src='../../static/img/index8.png' class="xqlogo">
		</view>
		<view class='d-first flex-row'>
			<view class='d-name'>
				闻录之美
			</view>
			<view class="d-button flex-row">
				<view class="al">
					评论
				</view>
				<view class="al">
					点赞
				</view>
			</view>
		</view>
		<view class='d-second'>
			作者：Olaf Hajek
		</view>
		<view class='d-third'>
			2022.10.21
		</view>
		<view class='comment-1'>
			评论
		</view>
		<view class='comment'>
			<view class='comment-2'>
				小拉色：用色十分大胆，是我爱的风格。
			</view>
			<view class='comment-2'>
				OFRIYA：就喜欢这种虎躯一震的设计方式。
			</view>
			<view class='comment-2'>
				QQ达达:绝对的大神之作，我要好好努力
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
