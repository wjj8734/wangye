<template>
	<view class="content">
		<u-navbar :is-back="true" title=""
			title-color='#e4cea5' 
			back-icon-color='#fff' 
		:background="{ background:'#f7f7f7'}">
		</u-navbar>
		<view class="c-js flex-row">
			<view class=" c-tximg">
				<image class="txlogo" radius="50px" src="https://cdn.uviewui.com/uview/album/1.jpg">
			</view>
			<view class="c-name">
				<view class="c-dete zs">
					小拉色
				</view>
				<view class=" zs flex-row">
					<view class="">
						2022.10.20
					</view>
					<view class="dzs flex-row">
						<image class="remen" radius="50px" src="../../static/tabbar/hot3.png">
						3690
					</view>
				</view>
			</view>
			<view class='anniu'>
				关注
			</view>
		</view>
		<view class="c-tatle zs">
			标题
		</view>
		<view class=" ">
			<image class="c-img" radius="50px" src="../../static/img/index7.png">
		</view>
		<view class='c-comment '>
			<view class='c-comment-2'>
				赞
			</view>
		</view>
		
		<view class='c-comment-1 zs'>
			评论
		</view>
		<view class='comment'>
			<view class='comment-2'>
				奥维利亚：我觉得，我比她画的好。
			</view>
			<view class='comment-2'>
				迪比特：额，还是有很大进步空间的。
			</view>
			<view class='comment-2'>
				摇啊摇要出去了：再接再厉吧，我先睡了。
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
