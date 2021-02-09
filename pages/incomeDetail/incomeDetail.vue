<template>
	<view class="income-detail-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="income-detail-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view>收益明细</view>
			<view class="side"></view>
		</view>
		<!-- 内容区 -->
		<view class="income-detail-container">
			<!-- 每一条记录 -->
			<view class="record" v-for="item in recordList" :key="item.id">
				<view class="record-title">
					{{ item.userNickName }}给您带来{{ item.amt }}元消费奖励，{{ item.integral }}积分
				</view>
				<view class="record-time">{{ item.dataTime }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				recordList: []
			};
		},
		components: {
			uniIcons
		},
		onLoad() {
			this.$axios('/index/amtDateil', {
				userId: this.$userId,
				token: this.$token
			}).then(res => {
        if (res.data.retCode === '0000033') {
					uni.showToast({
						title: '登录超时，请重新登陆',
						icon: 'none',
						success: () => {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					})
					return;
				}
				this.recordList = res.data.array;
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			navBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}
	.income-detail-page {
		height: 100%;
		margin-top: var(--status-bar-height);
		background-color: #efefef;
		position: relative;
		padding-top: 88upx;
	}
	.status-bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
	}
	.income-detail-nav {
		width: 100%;
		height: 88upx;
		font-size: 32upx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #000000;
		padding: 0 20upx;
		position: fixed;
		top: var(--status-bar-height);
	
		.side {
			width: 36upx;
			height: 36upx;
		}
	}
	.income-detail-container {
		.record {
			height: 88upx;
			display: flex;
			background-color: #FFFFFF;
			border-top: 1upx solid #efefef;
			padding: 0 20upx;
			justify-content: space-between;
			align-items: center;
			
			.record-title {
				font-size: 22upx;
				color: #333333;
			}
			
			.record-time {
				font-size: 20upx;
				color: #b3b3b3;
			}
		}
	}
</style>
