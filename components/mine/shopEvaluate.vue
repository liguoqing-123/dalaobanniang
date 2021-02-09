<template>
	<view class="shop-evaluate">
		<view class="evaluate">
			<image class="user-head" src="/static/head.png"></image>
			<view class="user-name">{{ userNickName }}</view>
			<view class="user-score">
				<Rate
					:touchable="false"
					:value="contentStar"
					:max="5"
					active-color="#d52800"
					:readonly="true"
					:margin="5"
				/>
				<view class="score-num">{{contentStar}}分</view>
			</view>
			<view class="user-say">
				{{ comment }}
			</view>
			<view class="user-imgs">
				<image v-for="img in getCommentImg" :key="img" :src="img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Rate from '@/components/uni/uni-rate/uni-rate.vue'
	export default {
		name: 'ShopEvaluate',
		props: {
			comment: {
				type: String,
				default() {
					return ''
				}
			},
			commentImg: {
				type: String,
				default() {
					return ''
				}
			},
			createTime: {
				type: String,
				default() {
					return ''
				}
			},
			userNickName: String,
			contentStar: String
		},
		data() {
			return {
				
			}
		},
		components: {
			Rate
		},
		computed: {
			getCommentImg() {
				if (!this.commentImg || this.commentImg === 'null') {
					return [];
				} else {
					return this.commentImg.split(',');
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.shop-evaluate {
		
		.evaluate {
			display: flex;
			flex-direction: column;
			padding-left: 90upx;
			background-color: #FFFFFF;
			position: relative;
			z-index: 10;
			justify-content: space-between;
			
			.user-head {
				height: 70upx;
				width: 70upx;
				border-radius: 6upx;
				position: absolute;
				top: 0upx;
				left: 0upx;
			}
			
			.user-name {
				font-size: 26upx;
				color: #333333;
				line-height: 30upx;
				letter-spacing: 2upx;
			}
			
			.user-score {
				margin: 16upx 0 30upx;
				display: flex;
				align-items: center;
				
				.score-num {
					font-size: 24upx;
					line-height: 24upx;
					letter-spacing: 2upx;
				}
			}
			
			.user-say {
				font-size: 24upx;
				color: #666666;
				margin-bottom: 24upx;
			}
			
			.user-imgs {
				display: flex;
				justify-content: space-between;
				margin-bottom: 30upx;
				flex-wrap: wrap;
				
				image {
					width: 120upx;
					height: 120upx;
					border-radius: 6upx;
					margin-right: 32upx;
					
					&:nth-child(4n) {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
