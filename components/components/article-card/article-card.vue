<template>
	<view class="article-card">
		<view>
			<navigator v-for="(item,index) in tableData" v-bind:key="index" class="article_link clearfix" :url="getUrl(item)"
			 hover-class="none">
				<view class="item_detail">
					<h3 class='flex-1 flex-row start center'>
						<view v-if='Examine && item.type != 3'>
							<view v-if='item.status == 0 || item.status == -1' class='lineiconExamine2'>
								待审核
							</view>
							<view v-if='item.status == 1' class='lineiconExamine2-suess'>
								审核通过
							</view>
							<view v-if='item.status == 3' class='lineiconExamine2-loding'>
								初审通过
							</view>
							<view v-if='item.status == 99' class='lineiconExamine2-error'>
								审核不通过
							</view>
						</view>
						<view v-if='Examine && item.type == 3'>
							<view v-if='item.status == -1' class='lineiconExamine2-loding'>
								视频智能审核中
							</view>
						</view>
						<cover-image v-if="item.type == 2 || item.type == 3" class="portrait u-skeleton-circle" :src="getAvatar(item.avatar)" @click.stop="openinfo('/pages/my/otherinfo?uid='+item.releaseId)"></cover-image>
						<span class="lineName" v-if="item.type == 2 || item.type == 3">{{item.releaseName?item.releaseName:'匿名'}}</span>
						<cover-image v-if="item.type == 2 && item.releaseName  || item.type == 3 && item.releaseName" class="linevip"
						 :src="item.ImageUrl?item.ImageUrl:'../../static/images/icon/vip.png'"></cover-image>
						<span class="linetext" v-if="item.type == 0|| item.type == 1||item.type == 3 ||item.type == 4">{{Cettext(item.title,20)}}</span>
						<div class="lineicon" v-if="item.type == 0 || item.type == 1 && item.seconds != 1">词条</div>
						<div class="lineicon" v-if="item.type == 2">视频</div>
						<div class="lineicon" v-if="item.type == 3 && item.answerType != 1">问答</div>
						<div class="lineicon-seconds" v-if="item.type == 3 && item.answerType == 1">投票</div>
						<div class="lineicon-seconds" v-if="item.seconds == 1">秒懂</div>
						<view class='lineicon_shang' v-if="item.type == 3 && item.integral>0">
							<image class="lineimg" src="../../static/images/shang.png">
						</view>
						<div class="lineiconsd" v-if='Examine && item.categoryName'>
							<u-tag :text="item.categoryName" mode="light" size='mini' />
						</div>
						<view class="integral f5" v-if="item.type == 3 && item.integral>0">{{item.integral}}</view>
						<!-- <view class='lineiconExamine'>{{item.carModelsId}}</view>
						<view class='lineiconExamine'>{{item.categoryId}}</view> -->
						<image @tap.stop="getPopus(index)" class="lineother" v-if='!Examine' src="../../static/images/other.png">
						<chunLei-popups class='popups' v-model="item.popups" :popData="getpopData(item.type,item.focus)" @tapPopup="tapPopup($event,item)"
							 :x="342" :y="25" placement="top-end">
						</chunLei-popups>
					</h3>
					<view class="item_info">
						<text class="space">{{ getDate(item.releaseTime) }}</text>
						<text class="space" v-if='item.browseCount'>浏览量 {{item.browseCount}}</text>
					</view>
					<u-gap height="3" bg-color="#fff"></u-gap>
					<view class="item_info fl" v-if="item.type == 3">
						<view :class='item.playAuth?"play-btn":""'></view>
						<u-lazy-load class="answerImage u-skeleton-circle" loading-img='' img-mode='scaleToFill' height='190' v-if="item.answerImage || item.previewImage"
						 :image="item.playAuth&&item.previewImage?item.previewImage:item.previewImage?imgURL+item.previewImage:item.playAuth?item.answerImage:imgURL+(item.answerImage)">
						</u-lazy-load>
						<view class="fl answerContents">
							<rich-text v-if="item.contents" :nodes="Cettext(item.contents,100)"></rich-text>
						</view>
					</view>
					<view class="item_info fl voteclass" v-if="item.type == 4">
						<view class='flex-row'  v-for="(items,indexs) in item.sysVoteOptions" :key="index" >
							<view class='title'>{{items.title}}</view>
							<u-line-progress :percent="70" :show-percent="true"></u-line-progress>
						</view>
					</view>
					<!-- <view class="item_info alivideo" v-if="item.type == 2 && item.playAuth || item.type == 3 && item.playAuth" v-loading='getVideoInfo(item)'>
						<div class="prism-player" @click.stop='videoLn' :class='"J_prismPlayer"+item.id' :id='"J_prismPlayer"+item.id'></div>
					</view> -->
					<view class="item_info alivideo" v-if="item.type == 2 && item.videoImage || item.type == 2 && item.previewImage">
						<view :class='item.videoImage||item.previewImage?"big-play-btn":""'></view>
						<u-lazy-load class="videoImage u-skeleton-circle" loading-img='' img-mode='aspectFill' :height='350' v-if="item.videoImage || item.previewImage"
						 :image="item.videoImage?item.videoImage:item.previewImage">
						</u-lazy-load>
					</view>
					<view class="item_info" v-if="item.type == 0|| item.type == 1||item.type == 2" :class="item.type == 2?'item_jianjie':'item_count'">
						<rich-text v-if="item.contents" :nodes="Cettext(item.contents,100)"></rich-text>
					</view>
					
					<view class="item_info_examine" v-if='Examine && item.type != 3 && item.opinion'>
						<text>
							<view v-if='item.status == 1' class='success'>
								审核意见:{{item.opinion}}
							</view>
							<view v-if='item.status == 3' class='info'>
								审核意见:{{item.opinion}}                                       
							</view>
							<view v-if='item.status == 99' class='error'>
								审核意见:{{item.opinion}}
							</view>
						</text>
					</view>

					<view class="item_bottom flex-row start" v-if='!Config'>
						<div class='item_bottom_icon flex-row top' v-if="item.type == 2 || item.type == 3" @click.stop="clickThumbs(item,item.type)">
							    <image class="lineimg" :src="item.praise == 1?'../../static/images/gthumbs.png':'../../static/images/thumbs.png'">
								<text class="space">{{Number(item.giveCount)}}</text>
						</div>
						<div class='item_bottom_icon flex-row top' v-if="item.type == 2 || item.type == 3 ">
							    <image class="lineimg" src="../../static/images/answer.png">
								<text class="space">{{Number(item.commentsCount)}}</text>
						</div>
						<div class='item_bottom_icon flex-row top' @click.stop="clickColleCount(item,item.type,index)">
							<image class="lineimg" :src="item.collect == 1?'../../static/images/gstar.png':'../../static/images/star.png'">
							<text class="space">{{Number(item.colleCount)}}</text>
							<!-- 收藏 -->
						</div>
						<view class='item_bottom_icon flex-row top' v-if="item.type == 2 && !Release" @click.stop="getShang(item)">
							<image class="lineimg" src="../../static/images/shang.png">
							<!-- 打赏 -->
						</view>
					</view>
					
					<view class="item_bottom flex-row start" v-if='Collection'>
						<div class='item_bottom_icon flex-row top' @click.stop="clickColleNoCount(item,item.wikiType,index)">
							<image class="lineimg" :src="'../../static/images/gstar.png'">
						</div>
					</view>
				</view>
			</navigator>

			<u-popup v-model="popupShow" mode="center" border-radius="14" width="70%" height="300px" closeable>
				<view>
					<view class='popupTitle'>举报内容</view>
				</view>
				<view class="fenzhi-box flex-column">
					<view class="jucontent">
						<u-input maxlength="500" height='300' v-model="jucontent" placeholder="请输入举报内容" :auto-height='true'
						 type="textarea" />
					</view>
					<view class="fenzhi-btn">
						<u-button type="primary" @click='stymitJb()'>确定</u-button>
					</view>
				</view>
			</u-popup>

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
		videocategorygetid,
		videosharerecord
	} from "@/api/video";
	import {
		entrycollectrecord,
		cancelcollectrecord,
		apisubscsubscrecord,
		cancelsubscrecord,
		entrycentersharerecord
	} from "@/api/entry";
	import {
		answercollectrecord,
		cananswerInfoIdrecord,
		answerpraiserecord,
		cancelanswerpraiserecord,
		answerinforeportrecordadd,
		answersharesharerecord
	} from "@/api/answercenter";

	import {
		apisysfocusreluser,
		cancelapisysfocusreluser,
		sysinstmessagadd
	} from "@/api/user";

	export default {
		components: {
			chunLeiPopups
		},
		name: 'ArticleCard',
		props: {
			tableData: Array,
			Config: Boolean,
			Examine: Boolean,
			Release: Boolean,
			Collection: Boolean,
		},
		data() {
			return {
				jucontent: '',
				popupShow: false,
				tableDatas: this.tableData,
				loadingImg: '../../static/uView/loading.png',
				errorImg: '../../static/uView/load_error.png',
				x: 0,
				y: 0,
				noClick: true,
				answerInfoId: '',
				data1: [{
					title: '分享'
				}],
				data2: [{
					title: '分享'
				}, {
					title: '关注'
				}, {
					title: '举报'
				}],
				data3: [{
					title: '分享'
				}],
				data4: [{
					title: '分享'
				}, {
					title: '已关注'
				}, {
					title: '举报'
				}],
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
			getUrl(item) {
				let type = item.type;
				let id = item.id;
				let Url = ''
				if (this.Examine && !this.Release) {
					if (type == 0) {
						Url = "/pages/details/detailsupex?id=" + id
					}
					if (type == 1) {
						Url = "/pages/details/detailsex?id=" + id
					}
					if (type == 2) {
						Url = "/pages/details/detailsvideoex?id=" + id
					}
					if (type == 3) {
						Url = "/pages/details/detailsqzex?id=" + id
					}
				} else {
					if (type == 0) {
						Url = "/pages/details/details?id=" + id
					}
					if (type == 1) {
						Url = "/pages/details/details?id=" + id
					}
					if (type == 2) {
						if(item.videoImage || item.previewImage){
							Url = "/pages/details/detailsvideo?id=" + id;
						}else{
							Url = '#'
						}
					}
					if (type == 3) {
						if(item.status == '-1' || item.status == '99' ){
							Url = '#'
						}else{
							Url = "/pages/details/detailsqa?id=" + id;
						}
					}
				}
				return Url;
			},
			onClick() {
				this.$emit('click')
			},
			getpopData(type, focus) {
				if (type == 1) {
					if (focus == 1) {
						return this.data3;
					} else {
						return this.data1;
					}
				} else {
					if (focus == 1) {
						return this.data4;
					} else {
						return this.data2;
					}
				}
			},
			getAvatar(avatar){
				if(avatar){
					if(avatar.indexOf('scrm-app-web/') == -1 && avatar.indexOf('cawiki.changan.com.cn') == -1 ){
						avatar = 'http://scrm.changan.com.cn/scrm-app-web'+ avatar;
					}
					return avatar;
				}else{
					return '../../static/images/icon/memager.png';
				}
			},
			videoLn() {

			},
			tapPopup(val, item) {
				let id = item.id;
				let type = item.type;
				let rid = item.releaseId;

				if (val.title == '分享') {
					let device = '';
					let url = this.visitURL + this.getUrl(item);
					let desc = item.contents.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');;
					let title = item.title ? item.title : " ";
					let image = ''
					if (item.answerImage) {
						if (item.videoPath) {
							image = item.answerImage;
						} else {
							image = this.imgURL + item.answerImage;
						}
					}
					if (item.previewImage) {
						image = item.previewImage;
					}
					if (item.videoImage) {
						image = item.videoImage;
					}
					let obj = {
						url: url, //分享路径
						desc: desc, //分享的描述
						title: title, //分享的标题
						image: image //分享的图标
					}
					var myInfo = uni.getStorageSync('myInfo');
					let objs = {};
					objs.shareUserId = myInfo.id;
					objs.shareUser = myInfo.realname;
					objs.shareTime = this.getDates();
					if(myInfo){
						if(item.type == '1'){
							objs.entryInfoId = id;
							entrycentersharerecord(objs).then(res => {
								if (res.data.code == 200 && res.data.bizCode == '0000') {
									
								}
							})
						}else if(item.type == '2'){
							objs.videoInfoId = id;
							videosharerecord(objs).then(res => {
								if (res.data.code == 200 && res.data.bizCode == '0000') {
									
								}
							})
						}else if(item.type == '3'){
							objs.answerInfoId = id;
							answersharesharerecord(objs).then(res => {
								if (res.data.code == 200 && res.data.bizCode == '0000') {
									
								}
							})
						}
					} else {
						this.$emit('loginopen');
						return false;
					}
					switch (uni.getSystemInfoSync().platform) {
						case 'android':
							// console.log('运行Android上')
							device = 'Android';
							let data = returnRes(device, obj);
						break;
						case 'ios':
							// console.log('运行iOS上');
							device = 'Ios';
							let data2 = returnRes(device, obj);
						break;
					}
				}
				if (val.title == '关注' || val.title == '已关注') {
					var uid = uni.getStorageSync('uid');
					var myInfo = uni.getStorageSync('myInfo');
					let froms = {};
					if (uid) {
						if (uid == rid) {
							uni.showToast({
								icon: 'none',
								title: '您不能关注您自己哦',
							});
							return false;
						}
						froms.userId = rid;
						// console.log(1);
						if (item.focus == 1) {
							cancelapisysfocusreluser(froms).then(res => {
								if (res.data.code == 200 && res.data.bizCode == '0000') {
									let data = res.data.result;
									item.focus = 0;
									uni.showToast({
										icon: 'none',
										title: '已取消关注',
									});
									//通知消息-用户取消关注
										let messageObj = {};
										messageObj.title = myInfo.realname+'对你取消了关注';
										messageObj.content = '';
										messageObj.receUser = item.releaseName;
										messageObj.receUserId = item.releaseId;
										sysinstmessagadd(messageObj).then(res => {
											if (res.data.code == 200 && res.data.bizCode == "0000") {
											}
										})
									this.$forceUpdate();
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.message,
									});
								}
							})
						} else {
							apisysfocusreluser(froms).then(res => {
								if (res.data.code == 200) {
									let data = res.data.result;
									uni.showToast({
										icon: 'none',
										title: '关注成功',
									});
									// console.log(myInfo);
									//通知消息-用户关注
										let messageObj = {};
										messageObj.title = myInfo.realname+'关注你了';
										messageObj.content = '';
										messageObj.receUser = item.releaseName;
										messageObj.receUserId = item.releaseId;
										sysinstmessagadd(messageObj).then(res => {
											if (res.data.code == 200 && res.data.bizCode == "0000") {
											}
										})
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
					} else {
						this.$emit('loginopen');
					}
				}
				if (val.title == '举报') {
					var uid = uni.getStorageSync('uid');
					if (uid == rid) {
						uni.showToast({
							icon: 'none',
							title: '您不能举报您自己哦',
						});
						return false;
					}
					var myInfo = uni.getStorageSync('myInfo');
					if (myInfo) {
						this.popupShow = true;
						this.jucontent = '';
						this.answerInfoId = Number(item.id);
					} else {
						this.$emit('loginopen');
					}
				}
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
							froms.praiseUser = myInfo.realname;
							froms.praiseUserId = myInfo.id;
							froms.bePariseUserId = item.releaseId;
							froms.videoInfoId = item.id;
							froms.dataType = 0;
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
						} else {
							that.$emit('loginopen');
						}
						that.noClick = true;
					}, 1000);
				} else {
					// console.log("请稍后点击")
				}
			},
			getDate(time) {
				if (time) {
					var date = time.substring(0, 10);
					return date;
				}
			},
			videoImageload(){
				// console.log(121211111111111111111111111111111111111111);
			},
			Cettext(value, num) {
				if (value) {
					value = value.replace(/<\/?.+?>/g, '')
					value = value.replace(/\s|&nbsp;/gi, "")
					value = value.replace(/\s+/g, '')
					if (value.length > num) {
						return value.slice(0, num) + "...";
					}
					return value;
				}
			},
			toggleDescription(num) {
				this.showText = !this.showText;
			},
			clickColleNoCount(item, type, index) {
				//获取当前用户
				let that = this;
				if (that.noClick) {
					that.noClick = false;
					setTimeout(function() {
						var myInfo = uni.getStorageSync('myInfo');
						if (myInfo) {
							let froms = {};
							let canfroms = {};
							froms.praiseUser = myInfo.realname;
							froms.praiseUserId = myInfo.id;
							froms.bePariseUserId = item.releaseId;
							if (type == 2) { //收藏 反选
								canfroms.videoInfoId = item.id;
								cancelvideocollectrecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 0;
										if (item.colleCount > 0) {
											item.colleCount -= 1;
										}
										uni.showToast({
											icon: 'none',
											title: '已取消收藏'
										});
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 1) { //收藏 反选
								canfroms.entryInfoId = item.id;
								cancelcollectrecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 0;
										if (item.colleCount > 0) {
											item.colleCount -= 1;
										}
										uni.showToast({
											icon: 'none',
											title: '已取消收藏'
										});
										this.tableData[index] = Object.assign({}, this.tableData[index], item);
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 3) { //收藏 反选
								canfroms.answerInfoId = item.id;
								cananswerInfoIdrecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 0;
										if (item.colleCount > 0) {
											item.colleCount -= 1;
										}
										uni.showToast({
											icon: 'none',
											title: '已取消收藏'
										});
										this.tableData[index] = Object.assign({}, this.tableData[index], item);
										this.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							that.$emit('reload');
						} else {
							that.$emit('loginopen');
						}
						that.noClick = true;
					}, 500);
				} else {
					console.log("请稍后点击")
				}
			},
			clickColleCount(item, type, index) {
				//获取当前用户
				let that = this;
				if(item && item.status){
					if(item.status != 1){
						uni.showToast({
							icon: 'none',
							title: '未审核，不允许收藏'
						});
						return false;
					}
				}
				if(item && item.auditStatus){
					if(item.auditStatus != 1){
						uni.showToast({
							icon: 'none',
							title: '未审核，不允许收藏'
						});
						return false;
					}
				}
				if (that.noClick) {
					that.noClick = false;
					setTimeout(function() {
						var myInfo = uni.getStorageSync('myInfo');
						if (myInfo) {
							let froms = {};
							let canfroms = {};
							froms.praiseUser = myInfo.realname;
							froms.praiseUserId = myInfo.id;
							froms.bePariseUserId = item.releaseId;
							if (type == 2 && item.collect != 1) { //收藏 正选
								froms.videoInfoId = item.id;
								videopcolleccord(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 1;
										item.colleCount += 1;
										that.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 2 && item.collect == 1) { //收藏 反选
								canfroms.videoInfoId = item.id;
								cancelvideocollectrecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 0;
										if (item.colleCount > 0) {
											item.colleCount -= 1;
										}
										that.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 1 && item.collect != 1) { //收藏 正选
								froms.entryInfoId = item.id;
								entrycollectrecord(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 1;
										item.colleCount += 1;
										that.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 1 && item.collect == 1) { //收藏 反选
								canfroms.entryInfoId = item.id;
								cancelcollectrecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 0;
										if (item.colleCount > 0) {
											item.colleCount -= 1;
										}
										this.tableData[index] = Object.assign({}, this.tableData[index], item);
										that.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}

							if (type == 3 && item.collect != 1) { //收藏 正选
								froms.answerInfoId = item.id;
								answercollectrecord(froms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 1;
										item.colleCount += 1;
										this.tableData[index] = Object.assign({}, this.tableData[index], item);
										that.$forceUpdate();
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
										});
									}
								})
							}
							if (type == 3 && item.collect == 1) { //收藏 反选
								canfroms.answerInfoId = item.id;
								cananswerInfoIdrecord(canfroms).then(res => {
									if (res.data.code == 200) {
										let data = res.data.result;
										item.collect = 0;
										if (item.colleCount > 0) {
											item.colleCount -= 1;
										}
										this.tableData[index] = Object.assign({}, this.tableData[index], item);
										that.$forceUpdate();
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
					}, 500);
				} else {
					// console.log("请稍后点击")
				}
			},
			getPopus(indexs) {
				this.tableData.forEach((item, index) => {
					if (Number(index) == Number(indexs)) {
						item.popups = true;
					} else {
						item.popups = false;
					}
				})
			},
			getShang(item) {
				var myInfo = uni.getStorageSync('myInfo');
				if (myInfo) {
					this.$emit('setShang', item);
				} else {
					this.$emit('loginopen');
				}
			},
			clickAnswer(id) {
				console.log(id);
			},
			getVideoInfo(item) {
				let videoSid = 'J_prismPlayer' + item.id;
				// console.log(item.videoImage);
				this.$nextTick(() => {
					var player = new Aliplayer({
						id: videoSid,
						width: '100%',
						autoplay: true,
						//支持播放地址播放,此播放优先级最高
						source: item.videoPath,
						//播放方式二：点播用户推荐
						encryptType: '1',
						vid: item.videoId,
						playauth: item.playAuth,
						cover: item.videoImage,
						"width": "100%",
						"height": "200px",
						"autoplay": false,
						"isLive": false,
						"rePlay": false,
						"playsinline": true,
						"preload": false,
						"controlBarVisibility": "hover",
						"useH5Prism": true,
						"skinLayout": [{
								"name": "bigPlayButton",
								"align": "blabs"
							},
							{
								"name": "H5Loading",
								"align": "cc"
							},
							{
								"name": "errorDisplay",
								"align": "tlabs",
								"x": 0,
								"y": 0
							},
							{
								"name": "infoDisplay"
							},
							{
								"name": "thumbnail"
							},
							{
								"name": "controlBar",
								"align": "blabs",
								"x": 0,
								"y": 0,
								"children": [{
										"name": "progress",
										"align": "blabs",
										"x": 0,
										"y": 44
									},
									{
										"name": "playButton",
										"align": "tl",
										"x": 15,
										"y": 12
									},
									{
										"name": "fullScreenButton",
										"align": "tr",
										"x": 10,
										"y": 12
									}
								]
							}
						]
					}, function(player) {
						// console.log('播放器创建好了。')
					});
				});
			},
			openinfo(url) {
				uni.navigateTo({
					url: url,
				});
			},
			stymitJb() {
				//举报
				// console.log('举报');
				this.popupShow = false;
				var myInfo = uni.getStorageSync('myInfo');
				if (myInfo) {
					let data = {}
					data.content = this.jucontent;
					data.reportUser = myInfo.realname;
					data.reportUserId = myInfo.id;
					data.answerInfoId = this.answerInfoId;
					answerinforeportrecordadd(data).then(res => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: '举报成功',
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
							});
						}
					})
				} else {
					this.$emit('loginopen');
				}
			},
			throttle(func, delay) {
				var prev = Date.now();
				return function() {
					var context = this;
					var args = arguments;
					var now = Date.now();
					if (now - prev >= delay) {
						func.apply(context, args);
						prev = Date.now();
					}
				}
			},
			//日期转换
			getDates() {
				let date = new Date();
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			},
			handle() {
				// console.log(Math.random());
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
		-webkit-overflow-scrolling: touch;
		/*这句是为了滑动更顺畅*/
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
		margin-bottom: 5px;
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
		margin-bottom: 5px;
		width: 78%;
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
		text-align: left;
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

	.lineiconsd {
		width: 70px;
		height: 20px;
		font-size: 10px;
		padding: 0px;
		/* background-color: #DAB678; */
		color: #fff;
		border-radius: 3px;
		margin: 5px 0;
		text-align: center;
		float: left;
	}

	.lineicon-seconds {
		width: 25px;
		height: 20px;
		font-size: 10px;
		padding: 0 5px;
		background-color: #00aaff;
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
		margin-top: 6px;
		color: #999;
		margin-top: -1px;
	}

	.article-card .item_info_examine{
		overflow: hidden;
		font-size: 12px;
		margin-top: 6px;
		color: #fff;
		border-radius: 5px;
		margin-top: -1px;
	}
	
	.article-card .item_info_examine .error{
		background-color: #ff2f0b;
		padding: 5px 10px;
		word-wrap:break-word;
		word-break:normal; 
	}
	
	.article-card .item_info_examine .info{
		background-color: #ff9437;
		padding: 5px 10px;
		word-wrap:break-word;
		word-break:normal; 
	}
	
	.article-card .item_info_examine .success{
		background-color: #04cc0a;
		padding: 5px 10px;
		word-wrap:break-word;
		word-break:normal; 
	}

	.article-card .item_count {
		overflow: hidden;
		font-size: 14px;
		margin-top: 6px;
		color: #8a8989;
		height: 156upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
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
		margin-left: 5px;
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
		width: 65px;
		/* height: 80px; */
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
		max-width: 85%;
		line-height: 30px;
		font-size: 15px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
		height: 25vw;
		float: left;
		background-size: cover;
		border-radius: 5px !important;
		margin: 5px 5px 0 0;
	}

	.answerContents {
		height: 166upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		/* padding: 0 5px; */
		padding-top: 5px;
		font-size: 14px;
		color: #717171;
	}

	.jfsl {
		background-color: #90e2ff !important;
		color: #fff !important;
	}

	.integral {
		margin: 5px 0;
	}

	.lineiconExamine {
		border: #00aaff solid 1px;
		border-radius: 25px;
		font-size: 12px;
		padding: 1px 5px;
		color: #00aaff;
		position: absolute;
		right: 15px;
		margin-top: -2rpx;
	}

	.lineiconExamine2 {
		border: #00aaff solid 1px;
		border-radius: 25px;
		font-size: 12px;
		padding: 1px 5px;
		color: #00aaff;
		position: absolute;
		right: 45px;
		margin-top: -30px;
	}

	.lineiconExamine2-suess {
		position: absolute;
		border: #00aa00 solid 1px;
		border-radius: 25px;
		font-size: 12px;
		padding: 1px 5px;
		color: #00aa00;
		position: absolute;
		right: 45px;
		margin-top: -30px;
	}

	.lineiconExamine2-loding {
		position: absolute;
		border: #ff9437 solid 1px;
		border-radius: 25px;
		font-size: 12px;
		padding: 1px 5px;
		color: #ff9437;
		position: absolute;
		right: 45px;
		margin-top: -30px;
	}

	.lineiconExamine2-error {
		border: #ff0000 solid 1px;
		border-radius: 25px;
		font-size: 12px;
		padding: 1px 5px;
		color: #ff0000;
		position: absolute;
		right: 45px;
		margin-top: -30px;
	}

	/* 	.mask.mask-show {
		width: 100vw;
	} */

	.jucontent {
		margin: 5%;
		width: 90%;
		background-color: #f9f9f9;
	}

	.popupTitle {
		height: 40px;
		text-align: center;
		font-size: 15px;
		line-height: 40px;
	}

	.fenzhi-btn {
		width: 80%;
		margin: 0 auto;
		text-align: center;
		color: #acacac
	}
	.voteclass .title{
		margin-right: 5px;
	}
</style>
