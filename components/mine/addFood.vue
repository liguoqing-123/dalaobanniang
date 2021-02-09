<template>
	<view class="add-food">
		<image :src="imgSrc"></image>
		<view class="add-right">
			<view class="add-name">{{ name }}</view>
			<view class="add-send">附送：{{ send || 0 }}</view>
			<view class="add-sell">月售：{{ sellnum || 0 }}</view>
			<view class="add-price">￥<text>{{ price }}</text></view>
		</view>
		<view class="addbtn-img" @tap.stop="addToCart">
			<image src="/static/addbtn.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: '',
		props: {
			userId: String,
			token: String,
			procId: [String, Number],
			merchCode: [String, Number],
			imgSrc: {
				type: String,
				default() {
					return '';
				}
			},
			name: {
				type: String,
				default() {
					return '';
				}
			},
			send: {
				type: String,
				default() {
					return '';
				}
			},
			sellnum: {
				type: String,
				default() {
					return '';
				}
			},
			price: {
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
		methods: {
			addToCart() {
				this.$axios('/store/addCar', {
					procId: this.procId,
					merchCode: this.merchCode,
					userId: this.userId,
					token: this.token
				}).then(res => {
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
	.add-food {
		background-color: #FFFFFF;
		height: 200upx;
		border-radius: 12upx;
		padding: 20upx;
		display: flex;
		align-items: stretch;
		box-sizing: border-box;
		position: relative;
		
		&>image {
			height: 160upx;
			width: 150upx;
			border-radius: 6upx;
			margin-right: 20upx;
			flex-shrink: 0;
		}
		
	}
	
	.add-right {
		height: 169upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		letter-spacing: 2upx;
		transform: translateY(-4upx);
		
		.add-name {
			font-size: 22upx;
			line-height: 30upx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.add-send {
			font-size: 20upx;
			color: #808080;
			line-height: 20upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.add-sell {
			font-size: 20upx;
			color: #808080;
			line-height: 20upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.add-price {
			font-size: 20upx;
			line-height: 20upx;
			color: #f75f78;
			
			text {
				font-size: 24upx;
				line-height: 24upx;
			}
		}
		
	} 

	.addbtn-img {
		@size: 36upx;
		position: absolute;
		width: @size;
		height: @size;
		border-radius: 50%;
		bottom: 20upx;
		right: 20upx;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		
		image {
			width: @size;
			height: @size;
		}
	}
</style>
