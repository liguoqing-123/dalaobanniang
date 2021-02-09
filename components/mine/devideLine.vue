<template>
	<view class="devide-line">
		<view class="line"></view>
		<view class="title">{{ title }}</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		name: 'DevideLine',
		props: {
			title: {
				type: String,
				default() {
					return '精品推荐';
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
	.devide-line {
		height: 93upx;
		color: #f75e7a;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #efefef;
		
		.title {
			font-size: 34upx;
			margin: 0 20upx;
		}
		
		.line {
			width: 200upx;
			height: 2upx;
			background-color: #f75e7a;
		}
	}
</style>
