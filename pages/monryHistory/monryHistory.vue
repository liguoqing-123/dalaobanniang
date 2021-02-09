<template>
	<view class="income-detail-page">
		<!-- 内容区 -->
		<view class="income-detail-container">
			<!-- 每一条记录 -->
			<view class="record" v-for="item in recordList" :key="item.id">
				<view class="time">{{ item.dataTime }}</view>
				<view class="bottom">
					<view class="price">提现金额：{{ item.price }}</view>
					<view class="status">{{ parseStatus(item.status) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordList: []
			};
		},
		onLoad() {
			this.$axios('/index/userTXList', {
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
			});
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			parseStatus(status) {
				if (status === '0') {
					return '申请中';
				} else if (status === '1') {
					return '同意';
				} else if (status === '2') {
					return '拒绝';
				}
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
		background-color: #efefef;
	}
	
	.income-detail-container {
		.record {
			margin-bottom: 10rpx;
			flex-direction: column;
			display: flex;
			margin: 20rpx;
			padding: 20rpx;
			background-color: white;
			border-radius: 12rpx;
			
			.time {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 24rpx;
				margin-bottom: 20rpx;
			}
			
			.bottom {
				display: flex;
				justify-content: space-between;
				
				.price {
					font-size: 28rpx;
				}
				
				.status {
					font-size: 28rpx;
				}
			}
		}
	}
</style>
