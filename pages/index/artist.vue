<template>
	<view class="content">
		<view class='space'></view>
		<view class='artist-subject flex-row' @click='openinfo("/pages/index/artist_details")'>
			<image src='../../static/img/index2.png' class="tximg">
			<view class='artist-text'>
				韩国的著名插画家Echi，她的漫画多为温和、粉嫩的色泽，望上去一眼的明媚与温柔，主要以女孩为主，很清纯，清淡眼眉，柔软长发，纤细瘦弱，非常的恬静，echi让我们感觉自己就像生活在彩虹般的糖果世界里。其风格安静，柔美,温馨。
			</view>
		</view>
		<view class='artist-subject flex-row' @click='openinfo("/pages/index/artist_details")'>
			<image src='../../static/img/index3.png' class="tximg">
			<view class='artist-text'>
				诺曼·洛克威尔（Norman Rockwell）是美国在20世纪早期的重要画家及插画家，作品横跨商业宣传与爱国宣传领域。他一生中的绘画作品大都经由《周六晚报》刊出，其中最知名的系列作品是在1940和50年代出现的，如《四大自由》与《女子铆钉工》。
			</view>
		</view>
		<view class='artist-subject flex-row' @click='openinfo("/pages/index/artist_details")'>
			<image src='../../static/img/index5.png' class="tximg">
			<view class='artist-text'>
				任航，插画师，野兽派艺术家，中国国际工艺美术师协会[1]会员。师从著名国际插画师陈斌大师。苦心钻研哥特式插画艺术和野兽派艺术，在国际上略有名气。市级美术奖项12项，省级7项，国家级7项，国际奖项2项。其中2014年6月份与荷兰举办的国际插画大师称号竞赛获得银奖，并荣获前三名的国际荣誉称号---国际级插画大师。其野兽派画作被日本现代艺术家三屿先生赞誉。
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
