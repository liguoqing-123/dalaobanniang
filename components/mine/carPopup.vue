<template>
	<view class="car-popup">
		<!-- 标题 -->
		<view class="bar">
			<view>购物车</view>
			<view @tap="clearCart">
				<uniIcons type="trash" size="30" />
				清空
			</view>
		</view>
		<!-- 列表 -->
		<view class="container">
			<view v-for="item in list" :key="item.carId" class="item">
				<view class="name">{{ item.procName }}</view>
				<view class="price">￥{{ Number(item.procPrice).toFixed(2) }}</view>
				<view class="decreament" @tap="changeNum('decreament', item)"> - </view>
				<view class="num"> {{ item.num }} </view>
				<view class="increament" @tap="changeNum('increament', item)"> + </view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		name: 'CarPopup',
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			changeNum(type, food) {
				const change = type === 'increament' ? 1 : -1
				this.$emit('changeNum', change, food)
			},
			clearCart() {
				this.$emit('clear')
			}
		},
		components: {
			uniIcons
		}
	}
</script>

<style lang="less" scoped>
	.car-popup {
		width: 100%;
		background-color: #FFFFFF;
		padding-bottom: 88rpx;
	}
	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		background-color: #efefef;
	}
	.container {
		display: flex;
		flex-direction: column;
		padding: 20rpx 40rpx;
		
		.item {
			height: 88rpx;
			border-bottom: 2rpx solid #efefef;
			display: flex;
			align-items: center;
			
			.name {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.price {
				color: #f10000;
				margin-right: 30rpx;
				flex-shrink: 0;
			}
			.decreament {
				background-color: #FFFFFF;
				color: #666666;
				border: 2rpx solid #666666;
				flex-shrink: 0;
				width: 60rpx;
				height: 40rpx;
				border-radius: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.num {
				margin: 0 20rpx;
				flex-shrink: 0;
				width: 40rpx;
				text-align: center;
			}
			.increament {
				background-color: #222222;
				color: #FFFFFF;
				flex-shrink: 0;
				width: 60rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
			}
		}
	}
</style>
