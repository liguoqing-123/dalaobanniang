<template>
	<view class="set-page">
		<!-- status-bar -->
		<view class="status-bar"></view>
		<!--导航 -->
		<view class="set-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view class="nav-title">设置</view>
			<view class="side"></view>
		</view>
		<!-- 个人信息、账号安全 -->
		<view class="set-bar" v-for="bar in setList" :key="bar.id">
			<view
				class="bar-item"
				v-for="item in bar.list"
				:key="item.id"
				@tap="navToPage(item.title)"
			>
				<view class="bar-title">{{ item.title }}</view>
				<uni-icons class="side" type="arrowright" size="24" color="#b3b3b3"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				setList: [{
					id: 1,
					list: [{
						id: 1,
						title: '个人信息'
					},{
						id: 2,
						title: '账号与安全'
					}]
				},{
					id: 2,
					list: [{
						id: 1,
						title: '通用'
					}]
				},{
					id: 3,
					list: [{
						id: 1,
						title: '用户协议手册'
					}]
				},{
					id: 4,
					list: [{
						id: 1,
						title: '关于大老板娘'
					}]
				}]
			};
		},
		components: {
			uniIcons
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			navToPage(title) {
				let url;
				if (title === '个人信息') {
					url = '../userInfo/userInfo';
				} else if (title === '账号与安全') {
					url = '../safe/safe';
				} else if (title === '通用') {
					url = '../commonSet/commonSet'
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
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
	.set-bar {
		margin-top: 20upx;
		display: flex;
		flex-direction: column;
		
		.bar-item {
			background-color: #FFFFFF;
			padding: 0 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: #000000;
			height: 88upx;
			margin-bottom: 1upx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
