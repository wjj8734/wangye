<template>
	<view class="article-card">
		<view>
			<navigator v-for="(item,index) in tableData" v-bind:key="index" class="article_link clearfix" :url="getUrl(item.type,item.id)"
			 hover-class="none">
				<view class="item_detail">
					<view class="item_info flex-row start top">
						<view class='dates fl'>
							<text class="space f8b">
							{{ getDatesDay(item.releaseTime)}}
							</text>
							<text class="space f7bs" style='position: absolute;width:40px;margin-top: 13px;'>
							{{ getDateMonth(item.releaseTime)}}
							</text>
						</view>
						<view class="item_info fl"  v-if="item.type == 2 && item.previewImage || item.type == 3 && item.answerImage  || item.type == 3 && item.previewImage">
							<view :class='item.playAuth?"mini-play-btn":""'></view>
							<u-lazy-load 
							height='120'
							img-mode='scaleToFill'
							class="answerImage u-skeleton-circle" 
							 :image="item.previewImage && item.type == 2?item.previewImage:item.previewImage && item.type == 3?imgURL+item.previewImage:item.playAuth?item.answerImage:imgURL+(item.answerImage)" threshold="50">
							</u-lazy-load>
						</view>
						<view class="flex-1 answerContents flex-column top start ">
							<span class="linetext f6b" v-if="item.type == 1 && item.title || item.type == 3 && item.title">{{ item.title }}</span>
							<rich-text :class="item.title?'linecontents':'linecontents_all'" v-if="item.contents" :nodes="item.contents.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ')"></rich-text>
							<view class="right linetext-l" >
								<text class="space" v-if='item.browseCount'>浏览量 {{item.browseCount}}</text>
							</view>
						</view>
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
	} from "@/api/video";
	import {
		entrycollectrecord,
		cancelcollectrecord,
		apisubscsubscrecord,
		cancelsubscrecord,
	} from "@/api/entry";
	
	import {
		answercollectrecord,
		cananswerInfoIdrecord,
		answerpraiserecord,
		cancelanswerpraiserecord
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
			Config:Boolean,
		},
		data() {
			return {
				tableDatas: this.tableData,
				loadingImg: '../../static/uView/loading.png',
				errorImg: '../../static/uView/load_error.png',
				x: 0,
				y: 0,
				data1: [{title: '分享'}],
				data2: [{title: '分享'},{title: '关注'},{title: '举报'}],
				data3: [{title: '分享'}],
				data4: [{title: '分享'},{title: '已关注'},{title: '举报'}],
				data5: [{
					title: '复制',
					disabled: true
				}, {
					title: '转发'
				}, {
					title: '回复'
				}, {
					title: '删除'
				}],
			}
		},
		methods: {
			getUrl(type, id) {
				let Url = ''
				if (type == 0) {
					Url = "/pages/details/detailsup?id=" + id
				}
				if (type == 1) {
					Url = "/pages/details/details?id=" + id
				}
				if (type == 2) {
					Url = "/pages/details/detailsvideo?id=" + id
				}
				if (type == 3) {
					Url = "/pages/details/detailsqa?id=" + id
				}
				return Url;
			},
			onClick() {
				this.$emit('click')
			},
			getpopData(type,focus){
				if(type == 1){
					if(focus == 1){
						return this.data3;
					}else{
						return this.data1;
					}
				}else{
					if(focus == 1){
						return this.data4;
					}else{
						return this.data2;
					}
				}
			},
			tapPopup(val,item){
				let id = item.id;
				let type = item.type;
				let rid = item.releaseId;
				
				if(val.title == '分享'){
					this.$emit('Cnshare',id);
				}
				if(val.title == '关注' || val.title == '已关注'){
					    var uid = uni.getStorageSync('uid');
						let froms = {};
						if(uid){
							if(uid == rid){
								uni.showToast({
									icon: 'none',
									title:'您不能关注您自己哦',
								});
								return false;
							}
							froms.userId = rid;
							// console.log(1);
							if(item.focus == 1){
								cancelapisysfocusreluser(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.focus = 0;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}else{
								apisysfocusreluser(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.focus = 1;
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
						}else {
							this.$emit('loginopen');
						}
				}
				if(val.title == '举报'){
					uni.showToast({
						icon: 'none',
						title: '举报成功',
					});
				}
			},
			clickThumbs(item,type,index) {
				//获取当前用户
				var myInfo = uni.getStorageSync('myInfo');
				if (myInfo) {
					let froms = {};
					let canfroms = {};
					froms.praiseUser = myInfo.realname;
					froms.praiseUserId = myInfo.id;
					froms.bePariseUserId = item.releaseId;
					froms.videoInfoId = item.id;
				
					if (type == 3 && item.praise != 1) {//点赞 正选
						froms.answerInfoId = item.id;
						answerpraiserecord(froms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.praise = 1;
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
					if (type == 3 && item.praise == 1) {//点赞 反选
						canfroms.answerInfoId = item.id;
						cancelanswerpraiserecord(canfroms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.praise = 0;
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
				
				
					if (type == 2 && item.praise != 1) {//点赞 正选
						froms.videoInfoId = item.id;
						videopraiserecord(froms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.praise = 1;
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
					if (type == 2 && item.praise == 1) {//点赞 反选
						canfroms.videoInfoId = item.id;
						cancelvideopraiserecord(canfroms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.praise = 0;
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
					this.$emit('loginopen');
				}
			},
			getDateMonth(time) {
				if (time) {
					var date = time.substring(5, 7)+"月";
					return date;
				}
			},
			getDatesDay(time) {
				if (time) {
					var date = time.substring(8, 10);
					return date;
				}
			},
			toggleDescription(num) {
				this.showText = !this.showText;
			},
			clickColleCount(item,type,index) {
				//获取当前用户
				var myInfo = uni.getStorageSync('myInfo');
				if (myInfo) {
					let froms = {};
					let canfroms ={};
					froms.praiseUser = myInfo.realname;
					froms.praiseUserId = myInfo.id;
					froms.bePariseUserId = item.releaseId;
					if (type == 2 && item.collect != 1) {//收藏 正选
						froms.videoInfoId = item.id;
						videopcolleccord(froms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.collect = 1;
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
					if (type == 2 && item.collect == 1) {//收藏 反选
						canfroms.videoInfoId = item.id;
						cancelvideocollectrecord(canfroms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.collect = 0;
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
					if (type == 1 && item.collect != 1) {//收藏 正选
						froms.entryInfoId = item.id;
						entrycollectrecord(froms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.collect = 1;
								this.tableData[index] = Object.assign({},this.tableData[index],item);
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
					if (type == 1 && item.collect == 1) {//收藏 反选
						canfroms.answerInfoId = item.id;
						cancelcollectrecord(canfroms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.collect = 0;
								this.tableData[index] = Object.assign({},this.tableData[index],item);
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
					
					if (type == 3 && item.collect != 1) {//收藏 正选
						froms.answerInfoId = item.id;
						answercollectrecord(froms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.collect = 1;
								this.tableData[index] = Object.assign({},this.tableData[index],item);
								this.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								});
							}
						})
					}
					if (type == 3 && item.collect == 1) {//收藏 反选
						canfroms.answerInfoId = item.id;
						cananswerInfoIdrecord(canfroms).then(res => {
							if (res.data.code == 200) {
								let data = res.data.result;
								item.collect = 0;
								this.tableData[index] = Object.assign({},this.tableData[index],item);
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
					this.$emit('loginopen');
				}
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
			getShang() {

			},
			clickAnswer(id) {
				// console.log(id);
			},
			getplayerOptions(srcUrl){
				//视频加载
				let playerOptions = {
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoplay: false, //如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: "zh-CN",
					aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						// type: "video/webm", // ok,用ogg也可打开
						type: "video/ogg", // ok,用webm也可打开
						type: "video/3gp", //ok
						type: "video/mp4", // ok
						src: srcUrl,
						// src: 'http://39.105.175.173:666/202010/1602600980214.mp4'//本地测试url地址
						// src: 'http://www.html5videoplayer.net/videos/madagascar3.mp4'//url地址
					}],
					poster: "", //你的封面地址
					// width: document.documentElement.clientWidth, //播放器宽度
					notSupportedMessage: "视频无法播放", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true  //全屏按钮
					}
				}
				return playerOptions;
			},
			//展示视频封面
			videoLoad(o, url) {
				// console.log(o,url);
				//获取video标签
				// let video = document.getElementById(o.id_ + '_html5_api');
				// //定义缩放比例
				// let scale = 1;
				// //创建canvas画布
				// let canvas = document.createElement("canvas");
				// //canvas宽高为video宽高*缩放比例
				// canvas.width = video.videoWidth * scale;
				// canvas.height = video.videoHeight * scale;
				// //canvas画出视频封面
				// canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
				// //canvas转base64
				// let src = canvas.toDataURL("image/png");
				//赋值到playerOptions.poster
				// this.playerOptions.poster = src;
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

<style  linecontents>
	.article-card {
		/* #ifndef APP-NVUE */
		/* display: flex; */
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
		/* display: block;
		position: relative; */
		padding: 1px 0px;
		height: 72px;
		font-size: 0px;
		text-decoration: none;
		background-color: #fff;
		width: 100vw;
		margin-bottom: 1px;
	}

	.article-card .item_detail {
		width: 95vw;
		margin: auto;
		/* padding: 5px 0px; */
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
		min-width: 55%;
		margin: 5px;
		height: 32px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-left: 5px;
	}

	.lineicon {
		width: 25px;
		height: 20px;
		font-size: 10px;
		padding: 0 5px;
		background-color: #DAB678;
		color: #fff;
		border-radius: 3px;
		margin: 5px;
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
		width: 16px;
		height: 16px;
		overflow: display;
		position: absolute;
		right: 5%;
		bottom: 5;
		margin-top: -15px;
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
		/* margin-top: 6px; */
		color: #999;
	}

	.article-card .item_count {
		overflow: hidden;
		font-size: 14px;
		margin-top: 6px;
		color: #717171;
		height: 160upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.article-card .item_jianjie {
		overflow: hidden;
		font-size: 14px;
		margin-top: 6px;
		color: #717171;
		height: 80upx;
	}

	.article-card .item_bottom {
		overflow: hidden;
		font-size: 12px;
		margin-top: 6px;
		color: #999;
		float: right;
	}

	.article-card .item_bottom .item_bottom_icon {
		margin-left: 15px;
		float: right;
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
		margin-right: 5px;
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
		width: 55px;
		/* height: 40px; */
		font-size: 12px;
		top: 8px;
		left: 4px;
		z-index: 2;
	}

	.portrait {
		width: 30px;
		height: 30px;
		margin: 0 5px;
		border-radius: 50%;
		text-align: center;
		float: left;
	}

	.lineName {
		float: left;
		max-width: 75%;
		line-height: 30px;
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
	/deep/ .video-js .vjs-mute-control,/deep/ .video-js .vjs-control{
		color: #fff;
		background-color: #1e242c;
		border: 0;
	}
/* 	/deep/ .video-js .vjs-big-play-button{
	
		margin-top: -25px;
	} */
	/deep/ .video-js .vjs-icon-placeholder{
		color:#fff;
		background-color: #1e242c00;
	}
	/deep/ .vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate{
		color: #fff;
		background-color: #1e242c;
		border: 0;
	}
	/deep/ .vjs-paused,.vjs-icon-placeholder{
		border: 0;
	}
	
	/deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
		background-color: rgba(0,0,0,0.45);
		font-size: 1.5em;
		border-radius: 50%;
		height: 2.5em !important;
		line-height: 2.5em !important;
		margin-top: -2em !important;
		width: 2.2rem !important;
	}
	/*点击按钮时不显示金色边框*/
	/deep/ .vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control{
	  outline: none;
	}
	.answerImage{
		/* width: 25vw; */
		width: 70px;
		float: left;
		margin: 5px 0;
	}
	.answerContents{
		/* margin-left: 28vw; */
		max-width: 85%;
	}
	.integral{
		margin: 3px 0;
	}
	.dates{
		max-width: 22%;
		min-width: 22%;
	}
	.linecontents_all{
		height: 130upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		overflow: hidden;
		margin-left: 5px;
	}
	.linecontents{
		height: 70upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-left: 5px;
	}
	/deep/ .linecontents{
		font-size: 12px !important;
	}
	.linetext-l{
		margin-top: -15px;
		position: absolute;
		/* top: 14%; */
		right: 15px;
		
	}
</style>
