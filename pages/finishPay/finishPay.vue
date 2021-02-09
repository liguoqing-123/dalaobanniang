<template>
	<view class="finishpay">
		<view class="container">
			<view class="icon">
				<uni-icons type="checkmarkempty" size="120" color="#FFFFFF" />
			</view>
			<view class="title">订单支付成功</view>
			<view class="list">
				<view>下单时间</view>
				<view>2020-02-02</view>
			</view>
			<view class="list">
				<view>支付方式</view>
				<view>微信</view>
			</view>
			<view class="list">
				<view>支付金额</view>
				<view>￥79.9</view>
			</view>
			<view class="list">
				<view>支付状态</view>
				<view>成功</view>
			</view>
		</view>
		<view class="see btn" @tap="see">查看订单</view>
		<view class="back btn" @tap="navto">返回首页</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			navto() {
				uni.switchTab({
					url: '../index/index'
				})
			}
		},
		components: {
			uniIcons
		}
	}
</script>

<style lang="less">
page {
	height: 100%;
	background-color: #efefef;
}
.finishpay {
	height: 100%;
	padding: 180rpx 20rpx;
	
	.container {
		background-color: #FFFFFF;
		padding: 80rpx 30rpx 10rpx;
		border-radius: 12rpx;
		box-shadow: 0 0 10rpx #cccccc;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.icon {
			position: absolute;
			z-index: 10;
			height: 160rpx;
			width: 160rpx;
			border-radius: 50%;
			background-color: #f75f78;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: .9;
			top: -110rpx;
			
		}
		
		.title {
			margin-bottom: 80rpx;
			text-align: center;
			font-size: 40rpx;
			font-weight: 600;
		}
		
		.list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 50rpx;
			
			view:nth-child(1) {
				font-weight: 500;
			}
			
			view:nth-child(2) {
				color: #999999;
			}
		}
	}
}
.btn {
	width: 100%;
	height: 88rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 12rpx;
	margin-top: 20rpx;
	box-shadow: 0 2rpx 5rpx #cccccc;
}
.see {
	background-color: #f75f78;
	color: #FFFFFF;
}
.back {
	background-color: #FFFFFF;
	color: #f75f78;
}
</style>
