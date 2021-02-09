<template>
	<view class="bar-box">
		<view class="box-top">
			<view class="top-title">{{ title }}</view>
		</view>
		<view class="box-bottom">
			<slot name="income"></slot>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		name: 'IncomeBar',
		props: {
			title: {
				type: String,
				default() {
					return '';
				}
			}
		},
		data() {
			return {
				
			}
		},
		components: {
			uniIcons
		},
		methods: {
			navToPage(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.bar-box {
		
		.box-top {
			margin-bottom: 10upx;
			height: 24upx;
			font-size: 24upx;
			line-height: 24upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.top-right {
				font-size: 20upx;
				display: flex;
				align-items: center;
			}
		}
		.box-bottom {
			display: flex;
			justify-content: space-between;
			padding-bottom: 30upx;
			align-items: center;
			flex-wrap: wrap;
		}
	}
</style>
