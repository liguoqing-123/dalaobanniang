<template>
	<view class="pay-page">
		<!-- 内容区 -->
		<view class="pay-container">
			<!-- shop -->
			<view class="shop box">
				<image src="/static/address.png"></image>
				<view class="shop-info">
					<view>{{ merchName }}</view>
				</view>
			</view>
			<!-- main -->
			<view class="main box">
				<!-- 食物列表 -->
				<view class="food" v-for="food in array" :key="food.carId">
					<image :src="food.procImg || food.storeImg"></image>
					<view class="food-center">
						<view class="food-name">{{ food.procName || food.storeName }}</view>
						<view class="food-num">×1</view>
					</view>
					<view class="food-price">￥{{ food.procPrice || food.storePrice }}</view>
				</view>
				<!-- 餐具费 -->
				<view class="canju">
					<view class="canju-left">餐具费</view>
					<view class="canju-right">￥0</view>
				</view>
				<!-- 优惠内容 -->
				<view class="cheaper">
					<view class="cheaper-left">优惠内容</view>
					<view class="cheaper-right">-￥0</view>
				</view>
				<!-- total -->
				<view class="total-pay">
					<view class="total-top total">
						已优惠
						<text>￥0</text>
					</view>
					<view class="total-bottom total">
						合计
						<text>￥{{ orderAmt }}</text>
					</view>
				</view>
			</view>
			<!-- 支付方式 -->
			<view class="pay-method box" @tap="nothing">
				<view class="title">支付方式</view>
				<view class="pay-right">
					<image src="/static/weixinpay.png"></image>
					<view>微信支付</view>
					<uni-icons type="arrowright" size="38" color="#b3b3b3" @tap="navBack"></uni-icons>
				</view>
			</view>
			<!-- 用餐方式 -->
			<view class="get-method box" @tap="nothing">
				<view class="title">用餐方式</view>
				<view class="get-right">
					<label class="radio">
						<radio disabled="true" /><text>店内用餐</text>
					</label>
					<label class="radio">
						<radio disabled="true" /><text>打包外卖</text>
					</label>
				</view>
			</view>
			<!-- 备注 -->
			<view class="other-info box" @tap="showPopup">
				<view class="other-title">订单备注</view>
				<uni-icons type="arrowright" size="32" color="#7e7e7e"></uni-icons>
			</view>
			<!-- 弹出层 -->
			<uniPopup type="bottom" ref="popup">
				<view class="popup">
					<!-- 标题 -->
					<view class="title-bar">
						<view class="side"></view>
						<view class="title">订单备注</view>
						<view class="side"  @tap="closePopup">
							<image src="/static/close.png"></image>
						</view>
					</view>
					<!-- 输入框 -->
					<textarea v-model="remark" placeholder="输入备注内容" class="textarea" />
					<!-- 确定按钮 -->
					<view class="makesure" @tap="closePopup">确定</view>
				</view>
			</uniPopup>
			<!-- bottom -->
			<view class="bottom">
				<view class="bottom-left">
					<view class="left1 left">已优惠<text>￥0</text></view>
					<view class="left2 left">合计<text>￥{{ orderAmt }}</text></view>
				</view>
				<view class="bottom-right" @tap="payNow">立即结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import uniPopup from '@/components/uni/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				remark: '',
				procId: '',
				orderAmt: '',
				array: [],
				merchName: ''
			};
		},
		components: {
			uniIcons,
			uniPopup
		},
		onLoad(options) {
			this.procId = options.procId;
			this.orderAmt = options.orderAmt;
			this.merchName = options.merchName;
			this.array = JSON.parse(decodeURIComponent(options.array));
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			showPopup() {
				this.$refs.popup.open();
			},
			closePopup() {
				this.$refs.popup.close();
			},
			nothing() {
				uni.showToast({
					icon: 'none',
					title: '敬请期待'
				})
			},
			payNow() {
				this.$axios('/pay/AddOrder', {
					userId: this.$userId,
					token: this.$token,
					orderAmt: this.orderAmt,
					procId: this.procId,
					remark: this.remark
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
					uni.navigateTo({
						url: '../finishPay/finishPay'
					})
				}).catch(err => {
					console.log(err);
				})
			}
		},
		computed: {
			pagePadTop() {
				let statusHeight;
				uni.getSystemInfo({
					success(res) {
						statusHeight = res.statusBarHeight;
					}
				});
				return uni.upx2px(88) + statusHeight + 'px';
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #efefef;
	}
	
	.box {
		margin: 20upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
	}
	
	.shop {
		height: 88upx;
		display: flex;
		align-items: center;
		
		image {
			height: 50upx;
			width: 50upx;
			border-radius: 50%;
			margin: 0 20upx;
		}
		
		.shop-info {
			display: flex;
			flex-direction: column;
			
			
			view:first-child {
				font-size: 24upx;
				line-height: 24upx;
				color: #000000;
				letter-spacing: 2upx;
			}
		}
	}
	
	.main {
		padding: 20upx;
		
		.food {
			margin-bottom: 30upx;
			height: 98upx;
			display: flex;
			align-items: stretch;
			justify-content: space-between;
			
			image {
				width: 98upx;
				height: 98upx;
				margin-right: 22upx;
				flex-shrink: 0;
				border-radius: 8upx;
			}
			
			.food-center {
				height: 98upx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				letter-spacing: 3upx;
				
				.food-name {
					font-size: 24upx;
					line-height: 24upx;
					color: #000000;
				}
				.food-num {
					font-size: 22upx;
					line-height: 22upx;
					color: #b3b3b3;
				}
			}
			.food-price {
				height: 98upx;
				flex-shrink: 0;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				font-size: 28upx;
				letter-spacing: 2upx;
			}
		}
		.canju {
			display: flex;
			height: 36upx;
			align-items: center;
			justify-content: space-between;
			font-size: 22upx;
			
			.canju-left {
				letter-spacing: 2upx;
			}
			.canju-right {
				letter-spacing: 5upx;
				font-size: 22upx;
			}
		}
		.cheaper {
			height: 58upx;
			border-bottom: 1upx solid #b3b3b3;
			font-size: 22upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.cheaper-left {
				letter-spacing: 2upx;
				color: #000000;
			}
			.cheaper-right {
				letter-spacing: 5upx;
				font-size: 22upx;
				color: #eb472c;
			}
		}
		.total-pay {
			height: 67upx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-end;
			
			.total {
				color: #000000;
				display: flex;
				align-items: center;
				
				text {
					color: #ec482f;
				}
				
				&.total-top {
					font-size: 18upx;
					line-height: 18upx;
					letter-spacing: 1upx;
					
					text {
						font-size: 18upx;
					}
				}
				
				&.total-bottom {
					font-size: 24upx;
					line-height: 24upx;
					margin-top: 8upx;
					letter-spacing: 2upx;
					
					text {
						font-size: 24upx;
					}
				}
			}
		}
	}
	
	.pay-method {
		height: 88upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20upx;
		font-size: 26upx;
		color: #000000;
		
		.pay-right {
			display: flex;
			align-items: center;
			transform: translateX(6upx);
			
			&>view {
				margin: 0 12upx 0 20upx;
			}
			
			image {
				width: 44upx;
				height: 44upx;
				border-radius: 8upx;
			}
		}
	}
	
	.get-method {
		height: 88upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20upx;
		font-size: 26upx;
		color: #000000;
		
		.get-right {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			
			.radio {
				margin-left: 56upx;
				
				&:first-child {
					margin-left: 0;
				}
				
				radio {
					transform: scale(0.7);
				}
			}
		}
	}
	
	.other-info {
		height: 88upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20upx;
		
		.other-title {
			font-size: 26upx;
			color: #000000;
		}
	}
	
	.popup {
		height: 426upx;
		width: 710upx;
		margin: 0 20upx 88upx;
		background-color: #FFFFFF;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		overflow: hidden;
		-webkit-transform: rotate(0deg);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		
		.title-bar {
			height: 88upx;
			background-color: #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			padding: 0 20upx;
			
			.title {
				font-size: 28upx;
				color: #000000;
			}
			.side {
				width: 88upx;
				height: 88upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				image {
					width: 24upx;
					height: 24upx;
				}
			}
		}
			
		.textarea {
			height: 200upx;
			margin: 20upx 40upx;
			background-color: #efefef;
			font-size: 22upx;
			color: #808080;
			padding: 20upx;
			box-sizing: border-box;
			width: 630upx;
			border-radius: 10upx;
		}
		
		.makesure {
			margin: 0 40upx;
			background-color: #f75f78;
			font-size: 28upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			border-radius: 10upx;
			height: 88upx;
		}
	}
	
	.bottom {
		height: 88upx;
		background-color: #FFFFFF;
		width: 100%;
		z-index: 9999;
		position: fixed;
		padding: 0 20upx;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	
		.bottom-left {
			display: flex;
			flex-direction: column;
			color: #000000;
			
			.left {
				display: flex;
				align-items: center;
				
				text {
					color: #e9492f;
				}
				
				&.left1 {
					font-size: 18upx;
					line-height: 18upx;
					margin-bottom: 8upx;
					
					text {
						color: #e9492f;
						font-size: 18upx;
					}
				}
				&.left2 {
					font-size: 24upx;
					line-height: 24upx;
					margin-bottom: 8upx;
					
					text {
						font-size: 24upx;
					}
				}
			}
		}
		
		.bottom-right {
			height: 58upx;
			background-color: #f75f78;
			color: #FFFFFF;
			font-size: 24upx;
			padding: 0 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 8upx;
		}
	}
</style>
