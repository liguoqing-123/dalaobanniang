<template>
	<view class="extend-person-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="ex-per-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view>推广人统计</view>
			<view class="side"></view>
		</view>
		<!-- 内容区 -->
		<view class="ex-per-container">
			<view class="per-container">
				<!-- 每一项  -->
				<view class="person" v-for="item in personList" :key="item.id">
					<image :src="item.userVavrot"></image>
					<view class="peron-info">
						<view class="info-top">
							<view class="info-name"><text>{{ item.userNickName }}</text></view>
						</view>
						<!-- <view class="info-bottom">
							<view>商铺 <text>{{ item.shop }}</text></view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				personList: []
			};
		},
		components: {
			uniIcons
		},
		onLoad() {
			this.$axios('/index/downUser', {
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
				this.personList = res.data.array;
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			navBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}
	.extend-person-page {
		height: 100%;
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
	}
	.ex-per-nav {
		width: 100%;
		z-index: 999;
		height: 88upx;
		font-size: 32upx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #000000;
		padding: 0 20upx;
		position: fixed;
		top: var(--status-bar-height);
	
		.side {
			width: 36upx;
			height: 36upx;
		}
	}
	.ex-per-container {
		padding: 20upx;
		
		.per-container {
			border-radius: 12upx;
			background-color: #FFFFFF;
			padding: 0 20upx;
			
			.person {
				height: 118upx;
				border-bottom: 1upx solid #b3b3b3;
				display: flex;
				align-items: center;
				letter-spacing: 2upx;
				
				image {
					width: 70upx;
					height: 70upx;
					border-radius: 50%;
					margin-right: 32upx;
				}
				
				.peron-info {
					display: flex;
					flex-direction: column;
					
					.info-top {
						display: flex;
						align-items: center;
						
						view {
							text {
								letter-spacing: 2upx;
							}
						}
						
						.info-name {
							font-size: 26upx;
							color: #000000;
							margin-right: 22upx;
						}
						
						.pink {
							border: 1upx solid #f75f78;
							color: #f75f78;
							display: flex;
							justify-content: center;
							align-items: center;
							height: 36upx;
						}
						.info-id {
							margin-right: 20upx;
							font-size: 22upx;
							padding: 0 16upx;
						}
					}
					
					.info-bottom {
						display: flex;
						align-items: center;
						
						view {
							margin-right: 10upx;
							font-size: 20upx;
							letter-spacing: 0.1upx;
							
							text {
								margin-left: 6upx;
								font-size: 18upx;
							}
						}
					}
				}
				
				
				&:last-child {
					height: 116upx;
				}
			}
		}
	}
</style>
