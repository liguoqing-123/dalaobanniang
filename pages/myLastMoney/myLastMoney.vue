<template>
	<view class="last-page">
		<view class="status-bar"></view>
		<view class="last-nav">
			<uni-icons type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view class="last-title">我的余额</view>
			<view class="side"></view>
		</view>
		<view class="last-content">
			<!-- 总资产 -->
			<view class="total-money">
				<view class="total-top">
					<view class="top-left">
						<view class="left1">总资产（元）</view>
						<view class="left2">0</view>
					</view>
					<view class="top-right">
						<uni-icons type="help" size="32" color="#FFFFFF"></uni-icons>
						<view class="right1">积分兑换</view>
					</view>
				</view>
				<view class="total-bottom">
					<view class="bottom1 bottom">
						<view class="bottom-num">{{ 0 }}</view>
						<view class="bottom-desc">今日消费</view>
					</view>
					<view class="bottom2 bottom">
						<view class="bottom-num">{{ myIncomes[0].incomes[0].num }}</view>
						<view class="bottom-desc">今日奖励</view>
					</view>
					<view class="bottom2 bottom">
						<view class="bottom-num">{{ 0 }}</view>
						<view class="bottom-desc">取消奖励</view>
					</view>
				</view>
				<view class="move">
					<view>转出</view>
					<view>转入</view>
				</view>
			</view>
			<!-- 我的收益 -->
			<view class="income">
				<view class="title">
					<view>我的收益</view>
					<view @click="navTo('../incomeDetail/incomeDetail')">查看详细</view>
				</view>
				<view class="income-box" v-for="item in myIncomes" :key="item.id">
					<IncomeBar :title="item.title">
						<template v-slot:income>
							<view v-for="income in item.incomes" :key="income.id">
								<MyIncome :num="income.num" :theme="income.theme" :imgSrc="income.imgSrc" />
							</view>
						</template>
					</IncomeBar>
				</view>
			</view>
		</view>
		<!-- 提现 -->
		<view class="get-money button" @click="navTo('../getMoney/getMoney')">提现</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import IncomeBar from '@/components/mine/incomeBar.vue'
	import MyIncome from '@/components/mine/myIncome.vue'
	import TeamIncome from '@/components/mine/teamIncome.vue'
	export default {
		data() {
			return {
				tx: '',
				// 我的收益
				myIncomes: [{
					id: 1,
					title: '今日收益',
					incomes: [{
						id: 1,
						num: 857.00,
						theme: '我的今日现金收益',
						imgSrc: '/static/income1.png'
					}, {
						id: 2,
						num: 857.00,
						theme: '我的今日积分收益',
						imgSrc: '/static/income2.png'
					}]
				}, {
					id: 2,
					title: '累计收益',
					incomes: [{
						id: 1,
						num: 857.00,
						theme: '累计现金收益',
						imgSrc: '/static/income3.png'
					}, {
						id: 2,
						num: 857.00,
						theme: '累计积分收益',
						imgSrc: '/static/income4.png'
					}]
				}],
			};
		},
		components: {
			uniIcons,
			IncomeBar,
			MyIncome,
			TeamIncome
		},
		onLoad() {
			this.$axios('/index/myBalance', {
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
				console.log(res.data)
				this.myIncomes[0].incomes[0].num = res.data.todayAmt || 0;
				this.myIncomes[0].incomes[1].num = res.data.todayIntegral || 0;
				this.myIncomes[1].incomes[0].num = res.data.retailAmt || 0;
				this.myIncomes[1].incomes[1].num = res.data.retailIntegral || 0;
				this.tx = res.data.tx;
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			navTo(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}

	.last-page {
		height: 100%;
		background-color: #efefef;
		margin-top: var(--status-bar-height);
		position: relative;
		padding-top: 88upx;
	}

	.status-bar {
		width: 100%;
		position: fixed;
		top: 0;
		height: var(--status-bar-height);
		background-color: #FFFFFF;
		z-index: 999;
	}

	.last-nav {
		box-sizing: content-box;
		z-index: 999;
		padding-top: var(--status-bar-height);
		height: 88upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		padding: 0 20upx;
		top: var(--status-bar-height);
		width: 710upx;


		.side {
			width: 36upx;
			height: 36upx;
		}

		.last-title {
			font-size: 32upx;
			color: #000000;
		}
	}

	.last-content {
		display: flex;
		flex-direction: column;
	}

	.total-money {
		margin: 20upx 16upx 0 24upx;
		padding: 40upx 30upx 39upx;
		background-image: linear-gradient(#f75f78, #fd937b);
		border-radius: 10upx;

		.total-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 50upx;

			.top-left {
				color: #FFFFFF;

				.left1 {
					font-size: 30upx;
					line-height: 30upx;
				}

				.left2 {
					font-size: 32upx;
					line-height: 32upx;
					margin-top: 18upx;
					letter-spacing: 3upx;
				}
			}

			.top-right {
				color: #FFFFFF;
				display: flex;
				align-items: center;

				.help {
					width: 30upx;
					height: 30upx;
				}

				.right1 {
					font-size: 24upx;
					margin-left: 10upx;
				}
			}
		}

		.total-bottom {
			height: 100upx;
			display: flex;
			justify-content: space-around;

			.bottom {
				padding-bottom: 16upx;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				height: 100upx;
				color: #FFFFFF;
				box-sizing: border-box;
				flex: 1;
			}
			
			.bottom-num {
				font-size: 30upx;
				line-height: 30upx;
				margin-bottom: 20upx;
				letter-spacing: 2upx;
				text-align: center;
			}

			.bottom-desc {
				font-size: 30upx;
				line-height: 30upx;
				white-space: nowrap;
				text-align: center;
			}
		}
	}

	.income {
		margin: 20upx 20upx 0;
		border-radius: 10upx;
		padding: 28upx 20upx 0;
		background-color: #FFFFFF;

		&:last-child {
			margin-bottom: 72upx;
		}

		.title {
			font-size: 32upx;
			line-height: 32upx;
			color: #000000;
			margin-bottom: 41upx;
			display: flex;
			justify-content: space-between;
			
			& > view:last-child {
				font-size: 24upx;
			}
		}

		.income-box {

			&:last-of-type {
				padding-top: 32upx;
				border-top: 1upx solid #b3b3b3;
			}

			&:first-of-type {
				padding-top: 0;
				border-top: none;
			}
		}
	}

	.get-money {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32upx;
		color: #FFFFFF;
		background-color: #f75f78;
	}
	.move {
		display: flex;
		justify-content: space-around;
		align-items: center;
		
		view {
			background-color: #FFFFFF;
			height: 66rpx;
			width: 40%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 12rpx;
			
			&:nth-child(1) {
				background-color: #f75f78;
				color: #FFFFFF;
			}
			
			&:nth-child(2) {
				color: #f75f78;
			}
		}
	}
</style>
