<template>
	<view class="mine-page">
		<!-- 背景区域 -->
		<view class="top-bar">
			<!-- 个人中心标题 -->
			<view class="mine-nav">
				<view class="side"></view>
				<text class="title">个人中心</text>
				<view class="side">
					<view>
						<uni-icons type="chat" size="42" color="#FFFFFF" @tap="notice"></uni-icons>
					</view>
					<view>
						<uni-icons type="gear" size="48" color="#FFFFFF" @tap="navToPage('../set/set')"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 信息区域 -->
			<view class="mine-info">
				<!-- 头像 -->
				<view class="info1">
					<view class="side"></view>
					<view class="head-img">
						<image src="/static/head.png"></image>
					</view>
					<view class="side">
						<uni-icons class="help" type="help" size="32" color="#FFFFFF"></uni-icons>
						<view>积分规则</view>
					</view>
				</view>
				<!-- 昵称 -->
				<view class="info2">
					<view class="name1">陕西彭于晏</view>
					<view class="name2">一级代理商</view>
				</view>
				<!-- ID -->
				<view class="info3">
					<view class="id1">ID:<text>123666</text></view>
					<view class="id2">邀请码：<text>1121</text></view>
					<view class="copy" @tap.stop="copyCode('1121')">复制</view>
				</view>
				<!-- 收益 -->
				<view class="info4">
					<view v-for="item in incomeList" :key="item.id" class="income">
						<view class="income-num">{{ item.num }}</view>
						<view class="income-title">{{ item.title }}</view>
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
				incomeList: [{
					id: 1,
					num: 298.98,
					title: '今日收益'
				},{
					id: 2,
					num: 298.98,
					title: '今日卖出份数'
				},{
					id: 3,
					num: 29898,
					title: '总收益'
				},{
					id: 4,
					num: 29898,
					title: '总卖出份数'
				}]
			};
		},
		components: {
			uniIcons
		},
		methods: {
			navToPage(url) {
				uni.navigateTo({
					url 
				})
			},
			copyCode(code) {
				uni.setClipboardData({
					data: code,
					success() {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						})
					}
				})
			},
			notice() {
				uni.showToast({
					icon: 'none',
					title: '敬请期待'
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #efefef;
	}
	.mine-page {
		height: 100%;
		background-color: #efefef;
	}
	.top-bar {
		height: 550upx;
		padding-top: var(--status-bar-height);
		background-image: linear-gradient(to right, #f75f78, #fd937b);
		position: relative;

		.mine-nav {
			height: 88upx;
			font-size: 36upx;
			color: #FFFFFF;
			padding: 0 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.title {
				flex-shrink: 0;
				white-space: nowrap;
			}
			
			.side {
				width: 200upx;
				height: 88upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				&>view {
					margin-left: 16upx;
					display: flex;
					align-items: center;
				}
			}
		}
		.mine-info {
			padding: 0 20upx;
			
			.info1 {
				height: 100upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.head-img {
					display: flex;
					justify-content: center;
					align-items: center;
					border: 2upx solid #FFFFFF;
					height: 100upx;
					width: 100upx;
					border-radius: 50%;
					overflow: hidden;
					-webkit-transfrom: rotate(0deg);
					
					image {
						height: 96upx;
						width: 96upx;
					}
				}
				
				.side {
					width: 200upx;
					display: flex;
					justify-content: flex-end;
					font-size: 18upx;
					color: #FFFFFF;
					align-items: center;
					letter-spacing: 1upx;
					
					.help {
						margin-right: 10upx;
					}
				}
			}
			.info2 {
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 22upx;
				padding: 30upx 0 28upx;
				
				.name1 {
					font-size: 28upx;
					margin: 0 10upx;
				}
				.name2 {
					font-size: 26upx;
					margin: 0 10upx;
				}
			}
			.info3 {
				display: flex;
				justify-content: center;
				align-items: center;
				
				view {
					font-size: 24upx;
					margin: 0 8upx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f78e92;
				}
				.id1 {
					padding: 0 13upx;
				}
				.id2 {
					padding: 0 12upx;
				}
				.copy {
					padding: 0 20upx;
				}
			}
			.info4 {
				display: flex;
				align-items: center;
				margin-top: 55upx;
				
				.income {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 3upx 0 19upx;
					color: #FFFFFF;
					flex: 1;
					
					.income-num {
						font-size: 22upx;
						line-height: 22upx;
					}
					
					.income-title {
						font-size: 24upx;
						line-height: 24upx;
						margin-top: 12upx;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
