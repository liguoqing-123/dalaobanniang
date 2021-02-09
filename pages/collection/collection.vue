<template>
	<view class="collection-page">
		<view v-for="food in array" class="col-item" @tap="navToDetail(food.storeId, food.merchCode)">
			<image :src="food.storeImg" mode="widthFix"></image>
			<view class="right">
				<view>{{ food.storeName }}</view>
				<view>￥ {{ food.storePrice }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: []
			};
		},
		onLoad() {
			this.$axios('/fav/getFavList', {
				userId: this.$userId,
				token: this.$token
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
					this.array = res.data.array;
				}
			});
		},
		methods: {
			navToDetail(procId, merchCode) {
				uni.navigateTo({
					url: `../foodDetail/foodDetail?id=${procId}&merchCode=${merchCode}`
				});
			}
		}
	}
</script>

<style lang="less">
.collection-page {
	padding: 20rpx;
	
	.col-item {
		padding: 24rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		display: flex;
		
		
		& > image {
			width: 200rpx;
			border-radius: 12rpx;
			margin-right: 20rpx;
		}
		
		.right {
			flex: 1;
			padding: 10rpx 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			& > view:first-child {

			}
			
			& > view:last-child {
				color: #d81e07;
			}
		}
	}
}
</style>
