<template>
	<view class="bottom-item">
		<view class="item-img">
			<image :src="imgSrc"></image>
		</view>
		<view class="item-cont">
			<view class="item-price">￥<text>{{ num }}</text></view>
			<view class="item-title">{{ theme }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MyIncome',
		props: {
			num: {
				type: [Number, String],
				default() {
					return 0;
				}
			},
			theme: {
				type: String,
				default() {
					return '';
				}
			},
			imgSrc: {
				type: String,
				default() {
					return '';
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
	.bottom-item {
		width: 330upx;
		height: 160upx;
		background-color: #edeaff;
		border-radius: 10upx;
		display: flex;
		align-items: stretch;
		margin-top: 20upx;
		
		.item-img {
			width: 111upx;
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			
			image {
				width: 53upx;
				height: 60upx;
			}
		}
		
		.item-cont {
			flex: 1;
			display: flex;
			justify-content: center;
			flex-direction: column;
			
			.item-price {
				font-size: 28upx;
				line-height: 28upx;
				padding-left: 22upx;
				letter-spacing: 5upx;
				color: #000000;
			}
			.item-title {
				letter-spacing: 2upx;
				font-size: 22upx;
				line-height: 22upx;
				color: #808080;
				margin-top: 20upx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
