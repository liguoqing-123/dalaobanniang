<template>
	<view class="evaluate-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="evaluate-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view>评价</view>
			<view class="side"></view>
		</view>
		<!-- 内容区 -->
		<view class="evaluate-container">
			
			<!-- 评论卡片 -->
			<view class="evaluate-bar">
				<!-- shop-name -->
				<view class="shop-name">
					<image src="/static/head.png"></image>
					<view class="name">大老板娘海鲜烧烤（西安店）</view>
				</view>
				<!-- 总体评分 -->
				<view class="totalily">
					<view class="total-title">总体评分</view>
					<uniRate
						activeColor="#d81e07"
						color="#efefef"
						:size="70"
						:margin="15"
						:value="totalScore"
						@change="onChangeTotal($event)"
					/>
					<view class="total-num"><view>{{ totalScore }}</view>分</view>
				</view>
				<!-- 口感、服务、坏境 -->
				<view class="scores">
					<view class="score-item" v-for="(item, index) in scores" :key="item.id">
						<view class="score-title">{{ item.title }}</view>
						<uniRate
							activeColor="#d81e07"
							color="#efefef"
							:size="48"
							:margin="10"
							:value="getValue(index)"
							@change="onChangeRate(index, $event)"
						/>
						<view class="score-value">{{ getValue(index) }}分</view>
					</view>
				</view>
				<!-- 文字、图片上传 -->
				<view class="textarea">
					<textarea v-model="textValue" placeholder="写出你的意见或建议" />
					<view class="imgupload">
						<ImgUpload
							ref="hlUploadImg"
							:maxCount="3"
							:autoUpload="true"
							tapModel="preview"
							@chooseImg="chooseImg"
						/>
					</view>
				</view>
				<!-- 匿名提交 -->
				<view class="without-commit">
					<label class="radio">
						<radio :value="commitNoName" @tap="onChangeCommit" :checked="commitNoName" color="#f75f78" /><text>匿名提交</text>
					</label>
				</view>
			</view>
			
			<!-- 提交 -->
			<view class="commit-btn" @tap.stop="commitHandler">提交</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import ImgUpload from '@/components/uni/hl-uploadImg/hlUploadImg.vue'
	import uniRate from '@/components/uni/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
				// 是否匿名提交
				commitNoName: false,
				totalScore: 5,
				scoreValues: [5, 5, 5],
				scores: [{
					id: 1,
					title: '口感'
				},{
					id: 2,
					title: '服务'
				},{
					id: 3,
					title: '坏境'
				}],
				textValue: '',
				merchCode: '',
				imgList: [],
				orderId: ''
			};
		},
		components: {
			uniIcons,
			ImgUpload,
			uniRate
		},
		onLoad(options) {
			this.merchCode = options.merchCode;
			this.orderId = options.orderId;
		},
		methods: {
			chooseImg(data) {
				this.imgList = data.allImages;
			},
			navBack() {
				uni.navigateBack();
			},
			onChangeRate(index, e) {
				this.$set(this.scoreValues, index, e.value);
			},
			getValue(index) {
				return this.scoreValues[index];
			},
			onChangeTotal(e) {
				this.totalScore = e.value;
				this.scoreValues = new Array(3).fill(e.value);
			},
			onChangeCommit() {
				this.commitNoName = !this.commitNoName;
			},
			commitHandler() {
				const contentImg = this.imgList.join(',');
				this.$axios('/store/setContent', {
					userId: this.$userId,
					token: this.$token,
					merchCode: this.merchCode,
					contentStar: this.totalScore,
					contentKWstar: this.scoreValues[0],
					contentFWStar: this.scoreValues[1],
					contentHJStar: this.scoreValues[2],
					content: this.textValue,
					contentImg,
					status: this.commitNoName ? '0' : '1',
					orderId: this.orderId
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
						uni.showToast({
							title: '评价成功',
							success: () => {
								uni.switchTab({
									url:'../order/order'
								})
							}
						});
					}
				}).catch(err => {
					console.log(err);
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
		background-color: #efefef;
	}

	.evaluate-page {
		margin-top: var(--status-bar-height);
		background-color: #efefef;
		position: relative;
		padding-top: 88upx;
	}

	.status-bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.evaluate-nav {
		width: 100%;
		height: 88upx;
		font-size: 32upx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #000000;
		z-index: 999;
		padding: 0 20upx;
		position: fixed;
		top: var(--status-bar-height);

		.side {
			width: 36upx;
			height: 36upx;
		}
	}

	.evaluate-container {
		padding: 20upx;
	}
	
	.evaluate-bar {
		height: 902upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
		display: flex;
		flex-direction: column;
		padding: 0 20upx;
		
		.shop-name {
			height: 131upx;
			border-bottom: 1upx solid #808080;
			align-items: center;
			padding-left: 35upx;
			display: flex;
			
			image {
				height: 90upx;
				width: 90upx;
				border-radius: 8upx;
				margin-right: 18upx;
			}
			
			.name {
				font-size: 32upx;
				color: #333333;
			}
		}
	
		.totalily {
			height: 172upx;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding-bottom: 20upx;
			
			.total-title {
				position: absolute;
				top: 10rpx;
				left: 0;
				font-size: 28upx;
				color: #000000;
			}
			.total-num {
				font-size: 42upx;
				display: flex;
				align-items: flex-end;
				color: #d71f07;
				
				view {
					font-size: 130upx;
					font-weight: bold;
					transform: translateY(-30upx);
				}
			}
		}
		
		.scores {
			height: 251upx;
			border-top: 1upx solid #808080;
			display: flex;
			flex-direction: column;
			justify-content: center;
			
			.score-item {
				display: flex;
				align-items: center;
				font-size: 26upx;
				color: #000000;
				
				&:nth-child(2) {
					margin: 20upx 0;
				}
				
				.score-title {
					margin-right: 20upx;
				}
			}
		}
		
		.textarea {
			border-radius: 12upx;
			background-color: #efefef;
			position: relative;
			width: 670upx;
			box-sizing: border-box;
			
			.imgupload {
				padding: 10upx;
			}
			
			textarea {
				padding: 20upx 20upx 0;
				box-sizing: border-box;
				height: 152upx;
				font-size: 24upx;
				line-height: 32upx;
				color: #000000;
				width: 100%;
				z-index: 1000;
			}
		}
		
		.without-commit {
			height: 88upx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			
			.radio {
				display: flex;
				align-items: center;
				height: 28upx;
				
				radio {
					transform: scale(0.7);
				}
				
				text {
					font-size: 16upx;
					color: #808080;
				}
			}
		}
	}
	
	.commit-btn {
		margin-top: 30upx;
		background-color: #f75f78;
		color: #FFFFFF;
		font-size: 32upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 12upx;
		height: 88upx;
	}
	
</style>
