<template>
	<view class="get-money-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="get-money-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view>余额提现</view>
			<view class="side"></view>
		</view>
		<!-- 内容区 -->
		<view class="get-money-container">
			<view class="get-bar">
				<view class="gray-bar" @tap="navToPage('../chooseCard/chooseCard')">
					<view class="gray-left">到账银行卡</view>
					<view class="gray-center">
						<view ref="aaa">{{ cardInfo ? cardInfo.accBank : '请选择默认银行卡' }}</view>
						<view>2小时到帐</view>
					</view>
					<uni-icons class="gray-right" type="arrowright" size="36" color="#7f7f7f"></uni-icons>
				</view>
				<view class="main-bar">
					<view class="main-title">提现金额</view>
					<view class="key-num">
						￥<input type="number" v-model="money" />
					</view>
					<view class="get-all">零钱余额￥<text>{{ lastMoney }}</text>
						<text class="button" @tap="getAll">全部提现</text>
					</view>
					<view class="main-btn button" @tap.stop="getMoney">提现</view>
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
				// 银行卡信息
				cardInfo: null,
				// 提现金额
				money: '',
				lastMoney: ''
			};
		},
		// onLoad 中加载银行卡信息
		onLoad(options) {
			this.lastMoney = options.lastMoney;
			if (options.card) {
				const card = JSON.parse(options.card);
				this.cardInfo = card;
				return;
			}
			// 未传递参数就使用默认银行卡
			uni.getStorage({
				key: 'defaultCard',
				success: res => {
					this.cardInfo = res.data;
				},
				fail: () => {
					this.cardInfo = null;
				}
			})
		},
		components: {
			uniIcons
		},
		methods: {
			getAll() {
				this.money = this.lastMoney;
			},
			navBack() {
				uni.navigateBack()
			},
			navToPage(url) {
				uni.navigateTo({
					url
				})
			},
			getMoney() {
				if (!this.money) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					});
					return;
				}
				this.$axios('/index/userTX', {
					price: this.money,
					accId: this.cardInfo.accId,
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
					console.log(res);
					if (res.data.retCode === '000000') {
						uni.showToast({
							title: '提现成功'
						});
					} else {
						uni.showToast({
							title: '提现异常',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err);
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}
	.get-money-page {
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
	.get-money-nav {
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
	.get-money-container {
		padding: 20upx;
	}
	.get-bar {
		border-radius: 12upx;
		overflow: hidden;
		-webkit-transfrom: rotate(0deg);
		letter-spacing: 2upx;
		
		.gray-bar {
			height: 98upx;
			background-color: #cccccc;
			display: flex;
			padding: 20upx;
			align-items: stretch;
			
			.gray-left {
				font-size: 22upx;
				line-height: 22upx;
				color: #000000;
				margin-right: 60upx;
			}
			
			.gray-center {
				flex: 1;
				font-size: 28upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				view:last-child {
					color: #7f7f7f;
					font-size: 22upx;
				}
			}
			.gray-right {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
		.main-bar {
			height: 384upx;
			background-color: #FFFFFF;
			display: flex;
			padding: 20upx 20upx 30upx;
			box-sizing: border-box;
			flex-direction: column;
			align-items: stretch;
			
			.main-title {
				font-size: 24upx;
				line-height: 24upx;
				color: #000000;
				margin-bottom: 6upx;
			}
			.key-num {
				border-bottom: 2upx solid #efefef;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 44upx;
				font-weight: bold;
				
				input {
					width: 100%;
					font-size: 44upx;
					font-weight: bold;
				}
			}
			.get-all {
				height: 24upx;
				line-height: 24upx;
				font-size: 24upx;
				color: #808080;
				margin-top: 28upx;
				
				text:last-child {
					margin-left: 30upx;
					color: #f75f78;
				}
			}
			.main-btn {
				height: 88upx;
				font-size: 32upx;
				color: #FFFFFF;
				background-color: #f75f78;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 12upx;
				margin-top: 60upx;
			}
		}
	}
</style>
