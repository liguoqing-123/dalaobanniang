<template>
	<view class="user-evaluate">
		<view class="user">
			<image src="/static/head.png"></image>
			<view class="name">{{ userNickName }}</view>
			<view class="time">2020-02-02</view>
		</view>
		<view class="content">
			<view class="content-word">
				{{ content }}
			</view>
			<view class="content-images" v-if="contentImg && contentImg !== 'null'">
				<image :src="i" v-for="i in contentImgs" :key="i"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: '',
		props: {
			userNickName: String,
			dataTime: String,
			content: String,
			contentStar: [Number, String],
			contentImg: String
		},
		computed: {
			contentImgs() {
				return this.contentImg.split(',');
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.user-evaluate {
		letter-spacing: 2upx;
		background-color: #FFFFFF;
		
		.user {
			height: 40upx;
			display: flex;
			align-items: center;
			
			image {
				width: 40upx;
				height: 40upx;
				margin-right: 12upx;
				flex-shrink: 0;
				border-radius: 20upx;
			}
			
			.name {
				font-size: 24upx;
				flex: 1;
				color: #333333;
			}
			.time {
				font-size: 18upx;
				flex-shrink: 0;
				color: #808080;
			}
		}
		.content {
			padding: 5upx 10upx 20upx 53upx;
			
			.content-word {
				font-size: 22upx;
				line-height: 32upx;
				color: #808080;
			}
			.content-images {
				margin-top: 16upx;
				display: flex;
				flex-wrap: wrap;
				
				image {
					width: 160upx;
					height: 160upx;
					margin-right: 20upx;
					
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
