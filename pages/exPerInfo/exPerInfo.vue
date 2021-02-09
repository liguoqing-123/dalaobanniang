<template>
	<view class="exper-info-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="exper-info-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view>推广人信息</view>
			<view class="side"></view>
		</view>
		<!-- 内容区 -->
		<view class="exper-info-container">
			<!-- 推广人信息 -->
			<view class="info-bar">
				<!-- top -->
				<view class="info-top">
					<view class="head">
						<image src="/static/head.png"></image>
					</view>
					<view class="base-info">
						<view class="base-top">
							<view>{{ userNickName }}</view>
						</view>
						<view class="base-bottom" v-if="userVavrot">
							<view>邀请码：<text>{{ userVavrot }}</text></view>
						</view>
					</view>
				</view>
				<!-- bottom -->
				<view class="info-bottom">
					<view class="bottom-item">
						<view class="total-num">{{ retailAmt }}</view>
						<view class="total-title">累计收益积分</view>
					</view>
					<view class="bottom-item">
						<view class="total-num">{{ retailIntegral }}</view>
						<view class="total-title">累计消费积分</view>
					</view>
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
				retailIntegral: '',
				retailAmt: '',
				userNickName: '',
				userVavrot: ''
			};
		},
		components: {
			uniIcons
		},
		onLoad() {
			this.$axios('/index/upUser', {
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
				this.retailIntegral = res.data.retailIntegral;
				this.retailAmt = res.data.retailAmt;
				this.userNickName = res.data.userNickName;
				this.userVavrot = res.data.userVavrot;
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

	.exper-info-page {
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

	.exper-info-nav {
		width: 100%;
		z-index: 999;
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
	.exper-info-container {
		padding: 20upx;
	}
	.info-bar {
		background-image: linear-gradient(#f75f78, #fd937b);
		border-radius: 12upx;
		padding: 20upx 20upx 23upx;
		display: flex;
		flex-direction: column;
		
		.info-top {
			height: 90upx;
			display: flex;
			align-items: flex-end;
			
			.head {
				height: 90upx;
				width: 90upx;
				border-radius: 50%;
				border: 2upx solid #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				-webkit-transfrom: rotate(0deg);
				margin-right: 30upx;
				
				image {
					height: 86upx;
					height: 86upx;
				}
			}
			.base-info {
				padding-bottom: 1upx;
				color: #FFFFFF;
				
				.base-top {
					display: flex;
					align-items: center;
					margin-bottom: 12upx;
					
					view {
						display: flex;
						align-items: center;
						letter-spacing: 2upx;
					}
					
					view:first-child {
						font-size: 28upx;
						line-height: 28upx;
						margin-right: 20upx;
					}
					view:last-child {
						font-size: 24upx;
						line-height: 24upx;
					}
				}
				.base-bottom {
					display: flex;
					align-items: center;
					
					view {
						display: flex;
						align-items: center;
						justify-content: center;
						height: 30upx;
						background-color: #f78491;
						letter-spacing: 4upx;
						padding: 0 10upx;
					}
					
					view:first-child {
						font-size: 20upx;
						margin-right: 10upx;
					}
					view:last-child {
						font-size: 20upx;
						text {
							font-size: 20upx;
							letter-spacing: 6upx;
						}
					}
				}
			}
		}
		.info-bottom {
			margin-top: 69upx;
			display: flex;
			height: 88upx;
			color: #FFFFFF;
			
			.bottom-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				border-right: 1upx solid #FFFFFF;
				
				&:last-child {
					border-right: none;
				}
				
				.total-num {
					font-size: 24upx;
				}
				
				.total-title {
					font-size: 26upx;
				}
			}
		}
	}
</style>
