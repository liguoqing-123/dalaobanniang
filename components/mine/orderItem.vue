<template>
	<view class="order-food">
		<view class="top" v-if="index === 0">{{ getStatus }}</view>
		<!-- 下半部分 -->
		<view class="order-container">
			<!-- 选择图标 -->
			<!-- circle / checkbox-filled -->
			<view class="order-icon" @tap.stop="toggleChoose" v-if="chooseBtn">
				<radio value="" :checked="isChoosed" color="#f75f78" />
			</view>
			<!-- 食品 -->
			<view class="food">
				<image :src="storeImg"></image>
				<view class="food-info">
					<view>
						<view class="food-name">{{ storeName }}</view>
					</view>
					<view class="price">
						<view>
							<text class="price-icon">￥</text>
							<text class="price-num">{{ storePrice }}</text>
						</view>
						<view class="date" v-if="index + 1 === length">
							{{ dataTime }}
						</view>
					</view>
					<view v-if="index + 1 === length">
						<view class="buttons" v-if="status == 0">
							<div class="button active" @tap.stop="payOne">确认付款</div>
						</view>
						<view class="buttons" v-if="status == 1">
							<!-- 商家登录会显示 -->
							<div class="button" @tap.stop="finish">完成</div>
						</view>
						<view class="buttons" v-if="status == 2">
							<div class="button active" @tap.stop="evalute">评价</div>
							<div class="button" @tap.stop="getAgain">再来一单</div>
						</view>
						<view class="buttons" v-if="status == 3">
							<div class="button" @tap.stop="getAgain">再来一单</div>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'OrderFood',
		props: {
			orderIndex: [String, Number],
			orderAmt: String,
			remark: String,
			userId: String,
			token: String,
			procId: String,
			merchCode: String,
			navBarType: [Number, String],
			storePrice: String,
			storeImg: String,
			storeName: String,
			dataTime: String,
			status: String,
			merchName: String,
			orderId: String,
			food: Object,
			index: Number,
			length: Number
		},
		data() {
			return {
				isChoosed: false
			}
		},
		methods: {
			clickBtn(text) {
				let url;
				// 点击评价按钮
				if (text === '评价') {
					url = '../../pages/evaluate/evaluate';
				} else if (text === '确认付款') {
					url = '../../pages/pay/pay';
				}
				uni.navigateTo({
					url
				});
			},
			// 评价
			evalute() {
				uni.navigateTo({
					url: `../../pages/evaluate/evaluate?merchCode=${this.merchCode}&orderId=${this.orderId}`
				})
			},
			// 再来一单
			getAgain() {
				this.$emit('getAgain', this.orderId)
			},
			toggleChoose() {
				this.isChoosed = !this.isChoosed;
				let price = this.isChoosed ? Number(this.storePrice) : - Number(this.storePrice);
				this.$emit('changeMoney', price);
			},
			// 确认付款
			payOne() {
				this.$emit('pay', this.orderIndex)
				
			}
		},
		computed: {
			chooseBtn() {
				return this.navBarType == 1;
			},
			getStatus() {
				const status = this.status;
				if (status == 0) {
					return '待付款';
				} else if (status == 1) {
					return '待完成';
				} else if (status == 2) {
					return '待评论';
				} else if (status == 3) {
					return '已完成'
				} else {
					return '错误';
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.order-food {
		background-color: #FFFFFF;
		padding: 20upx 20upx 30upx 0;
		display: flex;
		flex-direction: column;
		
		.top {
			font-size: 28rpx;
			color: #666;
			display: flex;
			justify-content: flex-end;
		}

		.shop {
			height: 40upx;
			margin-bottom: 24upx;
			display: flex;
			align-items: center;
			padding-left: 43upx;

			.shop-right {
				font-size: 24upx;
				color: #808080;
			}
		}

		.order-container {
			display: flex;
			width: 100%;
			align-items: center;
			height: 198upx;
			justify-content: space-between;
			position: relative;

			.order-icon {
				width: 51upx;
				height: 51upx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				radio {
					transform: scale(0.7) translateX(6upx);
				}
			}

			.food {
				height: 198upx;
				display: flex;
				align-items: stretch;
				position: absolute;
				left: 51upx;
				width: 650upx;

				image {
					height: 190upx;
					width: 190upx;
					margin-right: 22upx;
					border-radius: 8upx;
					align-self: flex-end;
					flex-shrink: 0;
				}

				.food-info {
					padding-right: 2upx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.food-name {
						flex: 1;
						font-size: 30upx;
						line-height: 36upx;
						letter-spacing: 1upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.price {
						flex: 1;
						color: #db1e0a;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.price-icon {
							font-size: 24upx;
						}

						.price-num {
							font-weight: bold;
							font-size: 32upx;
							line-height: 32upx;
						}
					}

					.food-bottom {
						flex: 1;
						height: 44upx;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.date {
		font-size: 26rpx;
		color: #666666;
	}
	.buttons {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.button {
		align-self: flex-end;
		height: 56upx;
		min-width: 130upx;
		border: 1upx solid #808080;
		color: #808080;
		font-size: 26upx;
		display: flex;
		white-space: nowrap;
		justify-content: center;
		align-items: center;
		margin-left: 10upx;
		border-radius: 8upx;
	}
	.active {
		background-color: #f75f78;
		border: none;
		color: #FFFFFF;
	}
</style>
