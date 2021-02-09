<template>
	<view class="set-page">
		<!-- status-bar -->
		<view class="status-bar"></view>
		<!--导航 -->
		<view class="set-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view class="nav-title">个人信息</view>
			<view class="side"></view>
		</view>
		<!-- 手机号、银行卡号 -->
		<view class="user-container">
			<view>手机号：<text>{{ phone }}</text></view>
			<view>银行卡号：<text>{{ accNum }}</text></view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				phone: '',
				accNum: ''
			};
		},
		onLoad() {
			this.phone = uni.getStorageSync('phone');
			this.accNum = uni.getStorageSync('defaultCard').accNum ||  '';
		},
		components: {
			uniIcons
		},
		methods: {
			navBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #efefef;
	}
	.set-page {
		margin-top: var(--status-bar-height);
		background-color: #efefef;
		padding-top: 88upx;
	}
	.status-bar {
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		width: 100%;
		height: var(--status-bar-height);
		z-index: 999;
	}
	.set-nav {
		width: 100%;
		position: fixed;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding: 0 20upx;
		align-items: center;
		height: 88upx;
		z-index: 999;
		top: var(--status-bar-height);
		left: 0;
		right: 0;
		
		.side {
			width: 200upx;
			height: 88upx;
			display: flex;
			align-items: center;
			transform: translateX(-10upx);
		}
		
		.nav-title {
			font-size: 32upx;
			color: #000000;
		}
	}
	.user-container {
		
		view {
			height: 88upx;
			margin-top: 10upx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 0 20upx;
			font-size: 28upx;
		}
	}
</style>
