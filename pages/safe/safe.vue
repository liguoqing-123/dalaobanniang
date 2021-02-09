<template>
	<view class="set-page">
		<!-- status-bar -->
		<view class="status-bar"></view>
		<!--导航 -->
		<view class="set-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view class="nav-title">账号与安全</view>
			<view class="side"></view>
		</view>
		<!-- 手机号、银行卡号 -->
		<view class="safe-container">
			<view @tap="changePwd">修改密码</view>
			<view @tap="forgetPwd">忘记密码</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				
			};
		},
		components: {
			uniIcons
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			forgetPwd() {
				uni.navigateTo({
					url: '../forgetPwd/forgetPwd'
				})
			},
			changePwd() {
				uni.navigateTo({
					url: '../changePwd/changePwd'
				})
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
	.safe-container {
		
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
