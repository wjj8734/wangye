<template>
	<view class="uni-popup-release">
		<view class="uni-share-content">
			<view class="uni-share-content-box">
				<view class="uni-share-content-item" @click='toUrl(item.url)' v-for="(item,index) in bottomData" :key="index"
				 @click.stop="select(item,index)">
					<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
					<text class="uni-share-text f6">{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="uni-share-button-box">
			<uni-icons class="uni-share-button" type="clear" size="40" color="#0d92ea" @click="close"></uni-icons>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		name: 'UniPopupShare',
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		inject: ['popup'],
		data() {
			return {
				bottomData: [{
						text: '写词条',
						icon: '../../static/images/icon/entry.png',
						name: 'wx',
						url: '/pages/details/sentry'
					},
					{
						text: '提问',
						icon: '../../static/images/icon/qa.png',
						name: 'wx',
						url: '/pages/details/quiz'
					},
					{
						text: '发视频',
						icon: '../../static/images/icon/video.png',
						name: 'qq',
						url: '/pages/details/svideo'
					},
					// {
					// 	text: '投票',
					// 	icon: '../../static/images/icon/vote.png',
					// 	name: 'qq',
					// 	url: '/pages/details/svote'
					// },
					{
						text: '草稿箱',
						icon: '../../static/images/icon/draft.png',
						name: 'sina',
						url: '/pages/my/draft'
					}
				]
			}
		},
		created() {},
		methods: {
			/**
			 * 选择内容
			 */
			select(item, index) {
				// this.$emit('select', {
				// 	item,
				// 	index
				// }, () => {
				// 	this.popup.close()
				// })
			},
			toUrl(url) {
				var myInfo = uni.getStorageSync('myInfo');
				if (myInfo) {
					uni.navigateTo({
						url: url,
					});
					this.popup.close()
				} else {
					this.$emit("loginopen",true);
				}
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-release {
		background-color: #fff;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}
	.uni-share-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
	}
	.uni-share-title-text {
		font-size: 14px;
		color: #666;
	}
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 10px;
	}

	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		width: 100vw;
	}

	.uni-share-content-item {
		width: 25%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
		align-items: center;
	}

	.uni-share-content-item:active {
		background-color: #f5f5f5;
	}

	.uni-share-image {
		width: 30px;
		height: 30px;
	}

	.uni-share-text {
		margin-top: 10px;
		font-size: 12px;
		color: #3B4144;
	}

	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 2px 15px;
		// margin-bottom: 15px;
	}

	.uni-share-button {
		flex: 1;
		border-radius: 50px;
		color: #666;
		font-size: 16px;
	}

	.uni-share-button::after {
		border-radius: 50px;
	}
</style>
