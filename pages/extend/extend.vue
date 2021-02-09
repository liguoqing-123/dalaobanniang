<template>
	<view class="extend-page">
		<view class="extend-bgimg">
			<!-- 导航栏 -->
			<view class="extend-nav">
				<uni-icons class="side" type="back" size="48" color="#FFFFFF" @tap="navBack"></uni-icons>
				<view>我的推广</view>
				<view class="side"></view>
			</view>
			<!-- 当前佣金 -->
			<view class="now-money">
				<!-- 当前佣金 -->
				<view class="now-top">
					<image src="/static/rmb.png"></image>
					<view>当前佣金</view>
				</view>
				<!-- 收益 -->
				<view class="now-middle">
					<view class="money">{{ retailAmt }}</view>
					<view class="money-bar">
						<view class="bar">
							<view class="bar1">{{ todayAmt }}</view>
							<view class="bar2">今日收益</view>
						</view>
					</view>
				</view>
				<!-- 按钮 -->
				<view class="now-bottom">
					<view class="btn1" @tap="navToPage('../getMoney/getMoney')">立即提现</view>
					<view class="btn2" @tap="navToPage('../monryHistory/monryHistory')">提现记录</view>
				</view>
			</view>
		</view>
		<!-- 其他 -->
		<view class="other">
			<view class="other-item" v-for="item in others" :key="item.id" @tap="navToPage(item.url)">
				<view class="other-title">{{ item.title }}</view>
				<uni-icons type="arrowright" size="28" color="#dcdcdc"></uni-icons>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				todayAmt: '',
				retailAmt: '',
				others: [{
					id: 1,
					title: '推广人统计',
					url: '../extendPerson/extendPerson'
				},{
					id: 2,
					title: '佣金明细',
					url: ''
				},{
					id: 3,
					title: '推广人信息',
					url: '../exPerInfo/exPerInfo'
				}]
			};
		},
		components: {
			uniIcons
		},
		onLoad() {
			this.$axios('/index/user', {
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
				this.todayAmt = res.data.todayAmt || 0;
				this.retailAmt = res.data.retailAmt || 0;
			}).catch(err => {
				console.log(err);
			});
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			navToPage(url) {
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}

	.extend-page {
		height: 100%;
		background-color: #efefef;
	}

	.extend-bgimg {
		padding-top: var(--status-bar-height);
		background-image: linear-gradient(to right, #f75f78, #fd937b);

		.extend-nav {
			height: 88upx;
			font-size: 32upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
			padding: 0 20upx;

			.side {
				width: 36upx;
				height: 36upx;
			}
		}

		.now-money {
			margin: 27upx 20upx 0;
			padding: 29upx 30upx 30upx;
			border-radius: 12upx;
			background-color: #FFFFFF;

			.now-top {
				display: flex;
				font-size: 24upx;
				line-height: 24upx;
				align-items: center;
				height: 24upx;

				image {
					width: 28upx;
					height: 24upx;
					margin-right: 14upx;
				}
			}

			.now-middle {
				height: 64upx;
				display: flex;
				justify-content: space-between;
				align-items: stretch;

				.money {
					padding: 23upx 0 5upx 42upx;
					font-size: 36upx;
					line-height: 36upx;
					color: #f75f78;
					letter-spacing: 6upx;
				}

				.money-bar {
					padding-top: 4upx;
					display: flex;

					.bar {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						margin-left: 44upx;

						.bar1 {
							font-size: 22upx;
							line-height: 22upx;
							color: #f75f78;
						}

						.bar2 {
							font-size: 24upx;
							line-height: 24upx;
							margin-top: 30upx;
							color: #000000;
						}
					}
				}
			}

			.now-bottom {
				height: 58upx;
				margin-top: 65upx;
				display: flex;
				justify-content: center;
				align-items: center;

				view {
					height: 58upx;
					font-size: 24upx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 29upx;
					padding: 0 36upx;
					margin: 0 30upx;
				}

				.btn1 {
					background-color: #f75f78;
					color: #FFFFFF;
				}

				.btn2 {
					border: 1upx solid #f75f78;
					background-color: #FFFFFF;
					color: #f75f78;
				}
			}
		}
	}

	.other {
		margin: 20upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
		
		.other-item {
			padding: 0 20upx;
			height: 88upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.other-title {
				font-size: 24upx;
				color: #000000;
			}
		}
	}
</style>
