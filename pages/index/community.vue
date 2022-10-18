<template>
	<view class="content">
		<view class='containers'>
			<image src='../../static/img/index1.png' class="xqimg">
		</view>
		<view class="contentCons">
			<view class="xuanze">
				<u-subsection mode="subsection" activeColor="#5500ff" :list="xuanzetext" :current="0"></u-subsection>
			</view>
		</view>
		<view class='space'></view>
		<view class="cm-subject">
			<view class="cm-subject-w">
				<view class="cm-subject-n1 flex-row">
					<image class="txlogo" radius="50px" src="https://cdn.uviewui.com/uview/album/1.jpg">
					<view class="cm-subject-t">
						蒸汽朋克，是否又卷土重来？
					</view>
				</view>
				<view class="cm-subject-n2 " @click='openinfo("/pages/index/community_details")'>
					<image class="htimg" radius="50px" src="../../static/img/index6.png">
				</view>
				<view class="cm-subject-n3 flex-row">
					<view class="al">
						评论
					</view>
					<view class="al">
						点赞
					</view>
				</view>
			</view>
			<view class="cm-subject-w">
				<view class="cm-subject-n1 flex-row">
					<image class="txlogo" radius="50px" src="https://cdn.uviewui.com/uview/album/1.jpg">
					<view class="cm-subject-t">
						少女漫画，不忍割舍的痛！
					</view>
				</view>
				<view class="cm-subject-n2 " @click='openinfo("/pages/index/community_details")'>
					<image class="htimg" radius="50px" src="../../static/img/index1.png">
				</view>
				<view class="cm-subject-n3 flex-row">
					<view class="al">
						评论
					</view>
					<view class="al">
						点赞
					</view>
				</view>
			</view>
		</view>
		<view class='publish' >
			<span class='p-Text'>
				发表
			</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xuanzetext: ['话题','精华','最新回复'],
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
