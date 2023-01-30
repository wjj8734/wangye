<template>
	<view class="content">
		<u-navbar :is-back="true" title="添加收货地址"
			title-color='#000000' 
			back-icon-color='#d5d5d5' 
		:background="{ background:'#f7f7f7'}">
		</u-navbar>
		<view class="shcontent">
			<view class="addnr flex-row">
				<view class="problem">
					收货人
				</view>
				<view class="addinput">
					<u-input
				    placeholder="姓名"
				    @border="none"
				    v-model="form.name"
					fontSize="20px"
				  ></u-input>
				</view>
			</view>
			<view class="fgx"></view>
			<view class="addnr flex-row">
				<view class="problem">
					联系电话
				</view>
				<view class="addinput">
					<u-input
				    placeholder="请输入电话号码"
				    @border="none"
				    v-model="form.telephone"
					fontSize="20px"
				  ></u-input>
				</view>
			</view>
			<view class="fgx"></view>
			<view class="addnr flex-row">
				<view class="problem">
					选择地区
				</view>
				<view class="addinput">
					<u-input 
				    placeholder="省、市、区、街道"
				    @border="none"
				    v-model="value"
					fontSize="20px"
					@click="show = true"
				  ></u-input>
				  <u-select v-model="show" mode="single-column" :list="columns" @confirm="confirm"></u-select>
				</view>
				<view >
					<image src='../../static/img/wz.png' class='dzlistimg1'>
				</view>
			</view>
			<view class="fgx"></view>
			<view class="addnr flex-row">
				<view class="problem">
					详细地址
				</view>
				<view class="addinput">
					<u-input
				    placeholder="小区楼栋/门牌号等"
				    @border="none"
				    v-model="form.address"
					fontSize="20px"
				  ></u-input>
				</view>
			</view>
		</view>
		<view @click="makePhoneCall(dh)"  class='tjdz top center' >
				保存
		</view>
	</view>
</template>

<script>
	import {
		lipinka
	} from '../../api/lipinka.js'
	export default {
		data() {
			return {
				xs:'',
				show: false,
				columns: [],
				form: {
					openid:'',
					name:'',
					telephone:'',
					address:'',
				},
			}
		},
		onLoad(data) {
			this.init(data.id);
		},
		methods: {
			init(id){
				this.form.openid = id;
				lipinka("/region/list", "GET",{'pid': 0}).then((res) => {
					console.log(res);
					if (res.data.total > 0) {
						let result = res.data.result.records;
						let arr = [];
						result.forEach((items, index, array) => {
							items.label = items.majorName;
							items.value = items.id;
							arr.push(items);
						});
						arr = this.getUnique(arr);
						this.majorClassificationList = arr;
					}
				});
			},
		}
	}
</script>

<style>
</style>
