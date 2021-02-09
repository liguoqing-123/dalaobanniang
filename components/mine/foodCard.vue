<template>
	<view class="food-card" :style="{height: `${ price ? '350rpx' : '320rpx' }` }">
		<image :src="img"></image>
		<view class="card">
			<view class="title">{{ name }}</view>
			<view class="buy" v-if="price">
				<view class="price">
					<view class="price-icon">￥</view>
					<view class="price-num">{{ price }}</view>
				</view>
				<image class="gwc" src="/static/cart.png" @tap.stop="addToCart"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'FoodCard',
		props: {
			id: {
				type: [String, Number],
				default() {
					return ''
				}
			},
			img: {
				type: String,
				default() {
					return ''
				}
			},
			name: {
				type: String,
				default() {
					return ''
				}
			},
			price: {
				type: String,
				default() {
					return ''
				}
			},
			merchCode: String,
			userId: String,
			token: String
		},
		data() {
			return {

			}
		},
		methods: {
			addToCart() {
				this.$axios('/store/addCar', {
					procId: this.id,
					merchCode: this.merchCode,
					userId: this.userId,
					token: this.token
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
					if (res.data.retCode === '000000') {
						uni.showToast({
							title: '添加成功',
							success: () => {
								uni.navigateTo({
									url: '../cart/cart'
								})
							}
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
	.food-card {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-radius: 10upx;
		overflow: hidden;
		width: 100%;

		image {
			width: 100%;
			height: 215upx;
		}

		.card {
			padding: 10upx 21upx 20upx 22upx;
			display: flex;
			flex-direction: column;
			height: 135rpx;

			.title {
				font-size: 26upx;
				line-height: 36upx;
				letter-spacing: 2upx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.buy {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				.price {
					color: #d81e05;
					display: flex;
					align-items: flex-end;

					.price-icon {
						font-size: 26upx;
						line-height: 26upx;
					}

					.price-num {
						font-size: 30upx;
						line-height: 30upx;
					}
				}
				.gwc {
					width: 30upx;
					height: 30upx;
				}
			}
		}
	}
</style>
