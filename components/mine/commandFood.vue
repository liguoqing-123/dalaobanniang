<template>
	<view class="command-food">
		<image :src="imgSrc"></image>
		<text class="food-name">{{ name }}</text>
		<view class="price">
			<text class="price-rmb">￥</text>
			<text class="price-num">{{ price }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CommandFood',
		props: {
			imgSrc: {
				type: String,
				default() {
					return '/static/commandfood.png';
				}
			},
			name: {
				type: String,
				default() {
					return '阳澄湖鲜...';
				}
			},
			price: {
				type: String,
				default() {
					return '89.9';
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
	.command-food {
		display: flex;
		flex-direction: column;
		letter-spacing: 2upx;
		
		image {
			width: 135upx;
			height: 109upx;
		}
		
		.food-name {
			font-size: 26upx;
			line-height: 26upx;
			margin-top: 14upx;
			color: #666666;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		
		.price {
			margin-top: 12upx;
			color: #FF0000;
			
			.price-rmb {
				font-size: 22upx;
			}
			
			.price-num {
				font-size: 26upx;
				line-height: 26upx;
			}
		}
	}
</style>
