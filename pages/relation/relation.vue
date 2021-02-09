<template>
	<view class="relation-page">
		<!-- status-bar -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="rel-nav">
			<uni-icons class="side" type="back" size="48" color="#7f7f7f" @tap="navBack"></uni-icons>
			<view>联系我们</view>
			<view class="side"></view>
		</view>
		<!-- 问题提交、上传图片 -->
		<view class="upload-thing">
			<textarea class="textarea" v-model="textValue" placeholder="您的问题，已提交上一级，请耐心等待"/>
			<view class="upload">
				<ImgUpload
					ref="hlUploadImg"
					:maxCount="3"
					:autoUpload="true"
					tapModel="preview"
					@chooseImg="chooseImg"
				/>
			</view>
		</view>
		<!-- 联系方式 -->
		<view class="torelate">
			<view>客服微信：<text>123456789</text></view>
			<view>客服QQ：<text>123456789</text></view>
			<view>客服电话：<text>123456789</text></view>
		</view>
		<!-- 提交 -->
		<view class="btn button" @tap="commit">提交</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import ImgUpload from '@/components/uni/hl-uploadImg/hlUploadImg.vue'
	export default {
		data() {
			return {
				textValue: '',
				imgList: []
			};
		},
		components: {
			uniIcons,
			ImgUpload
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			chooseImg(data) {
				this.imgList = data.allImages;
			},
			commit() {
				if (!this.textValue) {
					uni.showToast({
						title: '请输入您的问题',
						icon: 'none'
					});
					return;
				}
				const contentImg = this.imgList.join(',');
				this.$axios('/store/callUs', {
					userId: this.$userId,
					token: this.$token,
					content: this.textValue,
					contentImg
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
					console.log(res);
					if (res.data.retCode === '000000') {
						uni.showToast({
							title: '提交成功'
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
	}
	.relation-page {
		height: 100%;
		background-color: #efefef;
		margin-top: var(--status-bar-height);
	}
	.status-bar {
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		width: 100%;
		height: var(--status-bar-height);
		z-index: 999;
	}
	.rel-nav {
		padding: 0 20upx;
		height: 88upx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		font-size: 32upx;
		color: #000000;
		align-items: center;
		
		.side {
			width: 200upx;
			height: 88upx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
	.upload-thing {
		position: relative;
		z-index: 999;
		margin-top: 20upx;
		
		.textarea {
			height: 264upx;
			background-color: #FFFFFF;
			padding: 20upx;
			font-size: 24upx;
			color: #808080;
			width: 100%;
		}
		.upload {
			background-color: #FFFFFF;
			padding: 10upx;
		}
	}
	.torelate {
		margin-top: 30upx;
		background-color: #FFFFFF;
		padding: 0 20upx;
		
		view {
			height: 88upx;
			font-size: 24upx;
			display: flex;
			align-items: center;
			border-top: 1upx solid #b3b3b3;
			color: #808080;
			
			&:first-child {
				border-top: none;
			}
		}
	}
	.btn {
		margin: 30upx 23upx 0 17upx;
		font-size: 32upx;
		height: 88upx;
		border-radius: 12upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f75f78;
		color: #FFFFFF;
	}
</style>
