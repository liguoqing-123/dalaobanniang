<template>
	<view class="choose-item">
		<image :src="imgSrc"></image>
		<view>{{ text }}</view>
	</view>
</template>

<script>
	export default {
		name: 'ChooseItem',
		props: {
			imgSrc: {
				type: String,
				default() {
					return '/static/choose.png'
				}
			},
			text: {
				type: String,
				default() {
					return '美食'
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
	.choose-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #000000;
		letter-spacing: 0;
		
		image {
			margin-bottom: 12upx;
			width: 97upx;
			height: 97upx;
			border-radius: 50%;
		}
		
		view {
			font-size: 26upx;
			line-height: 57upx;
			white-space: nowrap;
		}
	}
</style>
