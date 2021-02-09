<template>
	<view class="food">
		<image :src="imgSrc"></image>
		<view class="decription">
			<view class="shop-name">{{ name }}</view>
			<view class="shop-info">
				<image class="shop-icon" src="/static/star.png"></image>
				<view class="shop-score">4.5分</view>
				<view class="shop-sell">月售8882</view>
				<view class="shop-long">3.2km</view>
				<view class="shop-time">20分钟</view>
			</view>
			<view class="send">
				<view class="send1">
					<text class="send-title1">起送</text>
					<text class="price-rmb">￥</text>
					<text class="price-num">{{ price }}</text>
				</view>
				<view class="send2">
					<text class="send-title2">人均</text>
					<text class="price-rmb">￥</text>
					<text class="price-num">{{ price }}</text>
				</view>
				<view class="send-free">免配送费</view>
			</view>
			<view class="extra-info">
				<view>自营</view>
				<view>满减</view>
			</view>

			<text class="user-say">"老客户了，挺不错的"</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Food',
		props: {
			name: {
				type: String,
				default() {
					return ''
				}
			},
			imgSrc: {
				type: String,
				default() {
					return ''
				}
			},
			price: {
				type: String,
				default() {
					return '0'
				}
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="less" scoped>
	.food {
		border-radius: 12upx;
		background-color: #FFFFFF;
		padding: 35upx 20upx 34upx 30upx;
		display: flex;
		align-items: center;
		letter-spacing: 2upx;

		image {
			border-radius: 12upx;
			width: 190upx;
			height: 190upx;
			margin-right: 30upx;
		}

		.decription {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.shop-name {
				font-size: 28upx;
				line-height: 28upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.shop-info {
				font-size: 24upx;
				line-height: 24px;
				display: flex;
				align-items: center;

				.shop-icon {
					width: 24upx;
					height: 24upx;
					margin-right: 10upx;
				}

				.shop-score {
					margin-right: 16upx;
				}

				.shop-sell {
					flex: 1;
				}

				.shop-long {
					margin-right: 16upx;
				}
			}

			.send {
				transform: translateY(-6px);
				font-size: 24upx;
				display: flex;
				line-height: 24px;

				.price-rmb {
					color: #d81e07;
					font-size: 18upx;
				}

				.price-num {
					color: #d81e07;
					font-size: 20upx;
				}

				.send-title2 {
					margin-right: 4upx;
				}

				.send1 {
					margin-right: 23upx;
				}

				.send2 {
					margin-right: 28upx;
				}

				.send-free {
					color: #FF0000;
				}
			}

			.extra-info {
				transform: translateY(-6px);
				display: flex;
				font-size: 26upx;
				flex-wrap: wrap;
				align-items: center;

				view {
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1upx solid #db1d05;
					border-radius: 3upx;
					margin-right: 17upx;
					padding: 0 8upx 0 8upx;
					color: #d71f05;
				}
			}

			.user-say {
				padding: 6upx 12upx;
				font-size: 24upx;
				line-height: 24upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #fef1eb;
				color: #ff8300;
				align-self: flex-start;
			}
		}
	}
</style>
