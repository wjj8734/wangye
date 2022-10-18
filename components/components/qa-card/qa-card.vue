<template>
	<view class="article-card">
		<view>
			<navigator v-for="(item,index) in tableData" v-bind:key="index" class="article_link clearfix" hover-class="none">
				<view class="item_detail">
					<view class='flex-1 flex-row start center'>
						<cover-image class="portrait u-skeleton-circle" :src="getAvatar(item.avatar)" @click.stop="openinfo('/pages/my/otherinfo?uid='+item.reviewUserId)"></cover-image>
						<view class="flex-1 flex-column start left">
							<view class="lineNames">
								<view class="lineName">{{ item.reviewUser }}</view>
								<view class="lineicon" v-if='item.adopt ==1'>已被采纳</view>
							</view>
							<view class="item_info">{{item.reviewTime }}</view>
						</view>
						<view class="lineiconbfu" v-if='adopts !=1 && item.adopt !=1 && getpopData(item)' @click="adoptPopup(item)">采纳</view>
						<view class="lineicondel" v-if='item.adopt !=1 && getpopData2(item)' @click="delPopup(item,type)">删除评论</view>
					</view>
					<view class="item_info" :class="'item_count'">
						<rich-text v-if="item.contents" :nodes="item.contents"></rich-text>
					</view>
					<view class="item_reply flex-row" @click.stop="getcomment(item)">
						<span class='f6bl'>回复</span>
						<div class='item_bottom_icon flex-row fr' @click.stop="clickThumbs(item,item.type)">
							    <image class="lineimg" :src="item.praise == 1?'../../static/images/gthumbs.png':'../../static/images/thumbs.png'">
								<text class="space">{{item.giveCount}}</text>
						</div>
					</view>
					<view class="item_bottom flex-row">
						<u-collapse class='Qacount' v-if='item.level == 0 && item.repliesCount>0'>
							<u-collapse-item :title="'查看'+item.repliesCount+'条回复'">
								<view class="item_detail" v-for="(items, indexs) in item.cNdata" :key="indexs">
									<view class='flex-1 flex-row start center'>
										<cover-image class="portrait u-skeleton-circle" :src="getAvatar(items.avatar)" @click.stop="openinfo('/pages/my/otherinfo?uid='+items.reviewUserId)"></cover-image>
										<view class="flex-1 flex-column start left">
											<view class="lineNames">
												<view class="lineName">{{ items.reviewUser }}</view>
											</view>
											<view class="item_info">{{items.reviewTime }}</view>
										</view>
										<view class="lineicondel" v-if='getpopData2(items)' @click="delPopup(items,type)">删除评论</view>
									</view>
									<view class="item_info" :class="'item_count'">
										<rich-text v-if="items.contents" :nodes="'回复:@'+item.reviewUser +' '+items.contents"></rich-text>
									</view>
									<view class="item_reply  flex-row" @click.stop="getcomment(items)">
										<span class='f6bl'>回复</span>
										<div class='item_bottom_icon flex-row fr' @click.stop="clickThumbs(items,items.type)">
											<image class="lineimg" :src="items.praise == 1?'../../static/images/gthumbs.png':'../../static/images/thumbs.png'">
												<text class="space">{{items.giveCount}}</text>
										</div>
									</view>
									<view class="cn-bottom-textarea flex-row" v-if='items.btextarea'>
										<u-input class='s-input' height='47' :placeholder="'回复:@ '+items.reviewUser" :focus="true" v-model="speak"
										 type="textarea" :auto-height='true' :border='true' border-color='#43b7ff' />
										<u-button :ripple="true" class='primary-btn' type="primary" size='mini' @click='sRelease(items,type)'>发布</u-button>
									</view>
								</view>
							</u-collapse-item>
						</u-collapse>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	import {
		videoinfopraisepage,
		videoinfoapicollectpage,
		videopraiserecord,
		videopcolleccord,
		cancelvideocollectrecord,
		cancelvideopraiserecord,
		delvideocommentssrecord,
	} from "@/api/video";
	import {
		entrycollectrecord,
		cancelcollectrecord,
		apisubscsubscrecord,
		cancelsubscrecord,
		apicommentsrecord,
		entrypraiserecord,
		cancelentrypraiserecord,
		delentrycommentssrecord
	} from "@/api/entry";
	import {
		answercollectrecord,
		cananswerInfoIdrecord,
		answerpraiserecord,
		cancelanswerpraiserecord,
		answercommentsrecord,
		delanswercommentsrecord,
		answercommentsadopt
	} from "@/api/answercenter";

	import {
		apisysfocusreluser,
		cancelapisysfocusreluser
	} from "@/api/user";

	export default {
		components: {
			chunLeiPopups
		},
		name: 'ArticleCard',
		props: {
			tableData: Array,
			Config: Boolean,
			type: String,
			releaseId: String,
			adopts:Number,
		},
		data() {
			return {
				tableDatas: this.tableData,
				loadingImg: '../../static/uView/loading.png',
				errorImg: '../../static/uView/load_error.png',
				x: 0,
				y: 0,
				speak: '',
				noClick:true,
				data: [{
					title: '举报'
				}],
				data1: [{
					title: '举报'
				}],
				data2: [{
					title: '采纳'
				}, {
					title: '举报'
				}, {
					title: '删除评论'
				}],
				data3: [{
					title: '删除评论'
				}],
				data4: [{
					title: '举报'
				}, {
					title: '删除评论'
				}],
				uid:''
				// data4: [{title: '分享'},{title: '已关注'},{title: '举报'}],
			}
		},
		methods: {
			getUrl(type, id) {
				let Url = ''
				if (type == 1) {
					Url = "/pages/details/details?id=" + id
				}
				if (type == 2) {
					Url = ""
				}
				if (type == 3) {
					Url = "/pages/details/detailsqa?id=" + id
				}
				return Url;
			},
			onClick() {
				this.$emit('click')
			},
			getpopData(item) {
				var uid = uni.getStorageSync('uid');
				if (this.releaseId == uid && item.reviewUserId != uid) {
					return true;
				}else{
					return false;
				}
			},
			getpopData2(item) {
				var uid = uni.getStorageSync('uid');
				if (item.reviewUserId == uid) {
					return true;
				}else{
					return false;
				}
			},
			openinfo(url) {
				uni.navigateTo({
					url: url,
				});
			},
			adoptPopup(item){
				let datas = item;
				let that = this;
				if(item.reviewUserId == this.releaseId) {
					uni.showToast({
						icon: 'none',
						title: '您不能采纳您自己哦',
					});
					return false;
				}
				uni.showModal({
					title: '',
					content: '确定采纳该评论',
					success: function(res) {
						if (res.confirm) {
							answercommentsadopt(datas).then(res => {
								if (res.data.code == 200 && res.data.bizCode == '0000') {
									uni.showToast({
										icon: 'none',
										title: '采纳成功'
									});
									datas.adopt = 1;
									this.adopts = 1;
									that.clickReply();
									that.$forceUpdate();
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.message,
									});
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			delPopup(item,type){
				let id = item.id;
				let that = this;
				uni.showModal({
					title: '',
					content: '确定删除该评论',
					success: function(res) {
						if (res.confirm) {
							if(type == 2){
								delvideocommentssrecord(id).then(res => {
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										});
										that.clickReply();
										that.$forceUpdate();
								})
							}else if(type == 3){
								delanswercommentsrecord(id).then(res => {
									if (res.data.code == 200) {
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										});
										that.clickReply();
										that.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}else if(type == 1){
								delentrycommentssrecord(id).then(res => {
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										});
										that.clickReply();
										that.$forceUpdate();
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			clickThumbs(item, type, index) {
				//获取当前用户
				let that = this;
				if (that.noClick) {
					that.noClick = false;
					setTimeout(function() {
						var myInfo = uni.getStorageSync('myInfo');
						if (myInfo) {
							let froms = {};
							let canfroms = {};
							let type = that.type;
							froms.praiseUser = myInfo.realname;
							froms.praiseUserId = myInfo.id;
							froms.bePariseUserId = item.releaseId;
							froms.dataType = 1;
							if (type == 3 && item.praise != 1) { //点赞 正选
								froms.answerInfoId = item.id;
								answerpraiserecord(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.praise = 1;
										item.giveCount += 1;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 3 && item.praise == 1) { //点赞 反选
								canfroms.answerInfoId = item.id;
								cancelanswerpraiserecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.praise = 0;
										if(item.giveCount>=0)item.giveCount -= 1;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							// console.log(type);
				
							if (type == 2 && item.praise != 1) { //点赞 正选
								froms.videoInfoId = item.id;
								videopraiserecord(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.praise = 1;
										item.giveCount += 1;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 2 && item.praise == 1) { //点赞 反选
								canfroms.videoInfoId = item.id;
								cancelvideopraiserecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.praise = 0;
										if(item.giveCount>=0)item.giveCount -= 1;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							
							if (type == 1 && item.praise != 1) { //点赞 正选
								froms.entryInfoId = item.id;
								// console.log(froms)
								entrypraiserecord(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.praise = 1;
										item.giveCount += 1;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 1 && item.praise == 1) { //点赞 反选
								canfroms.entryInfoId = item.id;
								cancelentrypraiserecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.praise = 0;
										if(item.giveCount>=0)item.giveCount -= 1;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
						} else {
							that.$emit('loginopen');
						}
						that.noClick = true;
					}, 1000);
				} else {
					console.log("请稍后点击")
				}
			},
			getDate(time) {
				if (time) {
					var date = time.substring(0, 10);
					return date;
				}
			},
			toggleDescription(num) {
				this.showText = !this.showText;
			},
			getPopus(id) {
				this.tableData.forEach((item, index) => {
					if (item.id == id) {
						item.popups = true;
					} else {
						item.popups = false;
					}
				})
			},
			getAvatar(avatar){
				if(avatar){
					if(avatar.indexOf('scrm-app-web/') == -1){
						avatar = 'http://scrm.changan.com.cn/scrm-app-web'+ avatar;
					}
					return avatar;
				}else{
					return '../../static/images/icon/memager.png';
				}
			},
			getcomment(val, indexs, indexss, arr) {
				this.speak = '';
				this.$emit('getcomment', val);
			},
			sRelease(item, type) {
				if (this.speak) {
					item.btextarea = false;
					let data = {};
					if (item.parentId) {
						data.parentId = Number(item.parentId);
					} else {
						data.parentId = Number(item.id);
					}
					data.level = 2;
					data.contents = '回复:@' + item.reviewUser + '：' + this.speak;
					if (type == '1') {
						data.entryInfoId = Number(item.entryInfoId);
						apicommentsrecord(data).then(res => {
							if (res.statusCode = 200) {
								uni.showToast({
									icon: 'none',
									title: '发布成功',
								});
								this.clickReply();
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						});
					} else if (type == '2') {
						data.answerInfoId = Number(item.answerInfoId);
					} else if (type == '3') {
						data.answerInfoId = Number(item.answerInfoId);
						answercommentsrecord(data).then(res => {
							if (res.statusCode = 200) {
								uni.showToast({
									icon: 'none',
									title: '发布成功',
								});
								this.clickReply();
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						});
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请发表您的评论',
					});
				}
			},
			clickReply(item) {
				this.$emit('showComments', item);
			},
			showComments(item) {
				this.mescroll.resetUpScroll();
			},
			getShang() {

			},
			clickAnswer(id) {
				console.log(id);
			},
			Simg(img) {
				//图片点击事件
				imgH = img.height; //获取图片的高度
				imgW = img.width; //获取图片的宽度
				if (flag) {
					//图片为正常状态,设置图片宽高为现在宽高的2倍
					// this.flag = false;//把状态设为放大状态
					img.height = imgH * 2;
					img.width = imgW * 2;
				} else {
					//图片为放大状态,设置图片宽高为现在宽高的二分之一
					// flag = true;//把状态设为正常状态
					img.height = imgH / 2;
					img.width = imgW / 2;
				}
			}
		}
	}
</script>

<style scoped>
	.article-card {
		/* #ifndef APP-NVUE */
		display: flex;
		flex: 1;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		/* #endif */
		/* margin: 0px 15px; */
		padding: 0;
		background-color: #f3f3f3;
		position: relative;
		-webkit-transition: all 1s ease-in-out;
		width: 100vw;
	}

	.article-card .article_link {
		display: block;
		position: relative;
		padding: 16px 0px;
		min-height: 42px;
		font-size: 0px;
		text-decoration: none;
		background-color: #fff;
		/* -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1); */
		width: 100vw;
		/* border-bottom: 5px solid rgba(221, 221, 221, 0.6); */
		margin-bottom: 1.5px;
	}

	.article-card .item_detail {
		width: 90vw;
		margin: auto;
	}

	.article-card .article_link h3 {
		color: #222;
		font-size: 17px;
		line-height: 21px;
		font-weight: normal;
		overflow: hidden;
		font-weight: 700;
	}

	.article-card .article_link:visited h3 {
		color: #aaa;
		float: left;
	}

	.article-card .line3 {
		overflow: hidden;
		-webkit-line-clamp: 3;
		margin-left: 0;
	}

	.linetext {
		float: left;
		max-width: 75%;
		margin: 5px;
	}

	.lineicon {
		width: 60px;
		line-height: 22px;
		height: 22px;
		font-size: 10px;
		padding: 0 5px;
		background-color: #00aaff;
		color: #fff;
		border-radius: 3px;
		margin: 0 5px;
		text-align: center;
		float: left;
	}
	
	.lineiconbfu{
		width: 50px;
		line-height: 20px;
		height: 22px;
		font-size: 10px;
		padding: 0 5px;
		background-color: #fff;
		color: #23baff;
		border: #23baff 1px solid;
		border-radius: 3px;
		margin: 0 5px;
		text-align: center;
		float: left;
	}
	
	.lineicondel{
		width: 60px;
		line-height: 20px;
		height: 22px;
		font-size: 10px;
		padding: 0 5px;
		background-color: #fff;
		color: #ff0000;
		border: #ff0000 1px solid;
		border-radius: 3px;
		margin: 0 5px;
		text-align: center;
		float: left;
	}

	.lineicon_shang {
		width: 25px;
		height: 20px;
		font-size: 10px;
		padding: 0 5px;
		color: #fff;
		border-radius: 3px;
		margin: 5px 0px 5px 5px;
		text-align: center;
		float: left;
		line-height: 28px;
	}

	.lineother {
		width: 23px;
		height: 23px;
		overflow: display;
		position: absolute;
		right: 5%;
		bottom: 5;
		margin-top: -5px;
	}

	.lineimg {
		width: 16px;
		height: 16px;
	}

	.article-card .dotdot {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.article-card .image-margin-right {
		margin-right: 12px;
	}

	.article-card .item_info {
		overflow: hidden;
		font-size: 12px;
		color: #b9b9b9;
	}

	.article-card .item_count {
		overflow: hidden;
		font-size: 14px;
		margin-top: 6px;
		color: #8a8989;
		/* height: 80upx; */
	}

	.article-card .item_jianjie {
		overflow: hidden;
		font-size: 14px;
		margin-top: 6px;
		color: #333;
		height: 80upx;
	}

	.article-card .item_bottom {
		overflow: hidden;
		font-size: 12px;
		margin-top: 12px;
		color: #999;
		/* float: right; */
		/* width: 95%; */
	}

	.article-card .item_bottom .item_bottom_icon {
		/* margin-left: 15px; */
		/* float: right; */
	}

	.article-card .item_bottom .item_bottom_icon .space {
		/* margin-left: 5px; */
	}

	.article-card .item_count .space {
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 4;
		/** 显示的行数 **/
	}

	.article-card .list_image {
		margin-top: 6px;
	}

	.article-card .list_image view {
		display: block;
		margin: 0;
		padding: 0;
		list-style-type: none;
		font-size: 0;
		text-align: center;
	}

	.article-card .list_image view view {
		display: inline-block;
		overflow: hidden;
		width: 33.3%;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.article-card .list_image view view:first-child {
		float: left;
		padding-right: 2px;
	}


	.article-card .list_image view view:last-child {
		float: right;
		padding-left: 2px;
	}

	.article-card .list_img_holder {
		height: 4rem;
		position: relative;
		background: url(//s3b.pstatp.com/growth/mobile_list/image/toutiaoicon_loading_textpage@3x_f7c130ce.png) #efefef no-repeat center center;
		background-size: 50%;
	}

	.article-card .list_img_holder image {
		border: none;
		display: block;
		width: 100%;
		height: 100%;
		-webkit-transition: opacity 300ms ease;
		-moz-transition: opacity ease .3s;
		pointer-events: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-user-select: none;
		text-decoration: none;
	}

	.article-card .middle_mode .list_img_holder {
		height: 100%;
		overflow: hidden;
		width: 33%;
		display: inline-block;
		vertical-align: middle;
	}

	.article-card .list_img_holder_large {
		background: url(data:image/gif;base64,R0lGODlh7AA5AIAAAOHh4f///yH5BAEAAAEALAAAAADsADkAAAL/jI+py+0Po5y02ouz3hv4D4YhR2YiWAbnmJrry3bwTNdeRFNwWbeYPeMAh0SAJHd8kYpMZbIZ+0GnUUcP59RQt8/tzeWdTq6PnTYMxaK/l3V6HISYpe6iHKjCt+t2XdyaZcHHVKZnYOg3iNi1Uti4pzgESIYgmXjS8genqTBXQQmJtLBYSTqJmcLJ+DgauOkZKlpq4wh6KpIJ+8ra6aqme2mbR3tHXIzKA7yK28rrE6t6aMpgWcuc7BuMPLstaHwryx1+PN7rLJP9LF7l/Z1A1FCtrXxAD82uvo4iRCpvLjyMzbtp0s6dSZcv4DV+xOCBS2fQn74PuRBO3LeMYio+/wkLdsP28aDBfyOpWaTjpaPHkAxZonQ50F5MmCLfdARYEx+YkiRp1juJro9KhTxf6jR6tBlQohjz2bxZLujClj4vNjVZNCchqNGkJm2XdeZJmUjFOI2qVSPIqmJpkv006OxbuJFwPkw695eiZ1291g2rtGTeu3Ga+Fh67+/UeToHB3bHFHLOhIrRkouI+LHdp0OXVHbcdnFkgbskY3XYmernr3wzewacmutq0bJpy2UbbzZQ0IRJD+W903ZG3UassWastnNfdcB/Ehe+8njpo885Vb9O0Dluvbaxf/QOfrfry9TDJ49uHjz5836vWiWuGXtsu+jZp7Vfv3r86/Mt5+wvvlZ35p2mnnKmWVURbIll9x98vx2I4Ebj0SUUZRP251+EAUq3IH29hZZcc2VtJ2JPHFJoGFjdeLLcYRDuB+BrCk63FXIx/gcifi5mCGOC2w03Ao/vmcheiev9qB10KCq5JCtC4kikby3exySBJx7pG5VNeQhllDc2yNyLxunmoy9CKoPmhb1dCaNiY3LR5pdeWtmYkUnayd+bZsUpp4ajCahmjlViGQmQNdKJlyselshgk3/RmKKeOsLC45S5cWljXJBWuGaWugxmqZdsEuqGipxJ6qmZM/5paqCdohFbrMAgGWuttt6Ka2wFAAA7) #efefef no-repeat center center;
		background-size: 54px;
		overflow: hidden;
		width: 100%;
		position: relative;
		margin-top: 6px;
		min-height: 3.75rem;
	}

	.article-card .list_img_holder_large image {
		border: none;
		display: block;
		width: 100%;
		pointer-events: none;
	}

	.article-card .list_img_holder_large_fix {
		height: 9.5rem;
	}

	.article-card .desc {
		display: inline-block;
		width: 67%;
		vertical-align: middle;
	}

	.space {
	   margin:0 3px;
	   font-size: 13px;
	   color: #c1c1c1;
	}

	.clearfix::after {
		content: "";
		display: block;
		clear: both;
		visibility: hidden;
		height: 0;
		font-size: 0;
	}

	/deep/ .popups {
		position: absolute;
		width: 90px;
		/* height: 40px; */
		font-size: 12px;
		top: 8px;
		left: 4px;
		z-index: 2;
	}

	.portrait {
		width: 35px;
		height: 35px;
		margin: 0 5px;
		border-radius: 50%;
		text-align: center;
		float: left;
	}

	.lineName {
		float: left;
		max-width: 75%;
		line-height: 18px;
		color: #747474;
		font-size: 15px;
	}

	.linevip {
		width: 20px;
		height: 20px;
		float: left;
		line-height: 10px;
		margin: 5px
	}

	/* 	.videoImg {
		width: 100%;
		height: 288upx;
	} */
	/deep/ .video-js .vjs-icon-placeholder {
		width: 100%;
		height: 100%;
		display: block;
		color: #fff;
		background-color: #1e242c;
		border: 0;
	}

	/deep/ .video-js .vjs-mute-control,
	/deep/ .video-js .vjs-control {
		color: #fff;
		background-color: #1e242c;
		border: 0;
	}

	/* 	/deep/ .video-js .vjs-big-play-button{
	
		margin-top: -25px;
	} */
	/deep/ .video-js .vjs-icon-placeholder {
		color: #fff;
		background-color: #1e242c00;
	}

	/deep/ .vjs-custom-skin>.video-js .vjs-control-bar .vjs-playback-rate {
		color: #fff;
		background-color: #1e242c;
		border: 0;
	}

	/deep/ .vjs-paused,
	.vjs-icon-placeholder {
		border: 0;
	}

	/deep/ .vjs-custom-skin>.video-js .vjs-big-play-button {
		background-color: rgba(0, 0, 0, 0.45);
		font-size: 1.5em;
		border-radius: 50%;
		height: 2.5em !important;
		line-height: 2.5em !important;
		margin-top: -2em !important;
		width: 2.2rem !important;
	}

	/*点击按钮时不显示金色边框*/
	/deep/ .vjs-custom-skin>.video-js .vjs-control-bar .vjs-play-control {
		outline: none;
	}

	.answerImage {
		width: 25vw;
		float: left;
	}

	.answerContents {
		margin-left: 28vw;
	}

	.item_reply {
		padding-top: 5px;
	}

	.integral {
		margin: 5px 0;
	}

	.bottom-textarea {
		width: 90vw;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 6px 0px;
	}

	.cn-bottom-textarea {
		width: 80vw;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 6px 0px;
	}

	.primary-btn {
		width: 55px;
		position: relative;
		right: 0px;
		height: 35px;
		margin-left: 15px;
	}

	.porlinkicon {
		height: 17px;
		line-height: 17px;
		text-align: center;
	}

	.item_bottom .fr {
		position: relative;
		right: 15px;
	}

	.mask.mask-show {
		width: 100vw;
	}

	/deep/ .u-collapse-head {
		width: 190upx;
		font-size: 24upx;
		color: #8b8b8b;
	}

	.Qacount {
		/* width: 80vw; */
		margin-left: 2vw;
	}

	.Qacount .item_detail {
		width: 88vw;
		padding: 5px 0;
	}
</style>
