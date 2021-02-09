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
						<image :src="img" v-if="img"></image>
						<image src="/static/head.png" v-else></image>
					</view>
					<view class="side">
						<uni-icons class="help" type="help" size="32" color="#FFFFFF"></uni-icons>
						<view @tap="notice" style="font-size: 26rpx;">积分规则</view>
					</view>
				</view>
				<!-- 昵称 -->
				<view class="info2">
					<view class="name1" style="font-size: 30rpx;">{{ userNickName }}</view>
				</view>
				<!-- ID -->
				<view class="info3" style="margin-bottom: 20rpx;">
					<view class="id2">ID：<text>{{ userId }}</text></view>
				</view>
				<!-- 邀请码 -->
				<view class="info3">
					<view class="id2">邀请码：<text>{{ userVavrot }}</text></view>
					<view class="copy" @tap.stop="copyCode(userVavrot)">复制</view>
				</view>
				<!-- 收益 -->
				<view class="info4">
					<view v-for="item in incomeList" :key="item.id" class="income">
						<view class="income-num">{{ item.num }}</view>
						<view class="income-title">{{ item.title }}</view>
					</view>
				</view>
			</view>
			<!-- 去提现 -->
			<view class="get-money">
				<view class="context button" @tap="navToPage(`../getMoney/getMoney?lastMoney=${lastMoney}`)">去提现</view>
				<uni-icons type="arrowright" size="24" color="#FFFFFF"></uni-icons>
			</view>
		</view>
		<view class="bottom-bar">
			<!-- 我的订单 -->
			<view class="my-order">
				<!-- 标题 -->
				<view class="my-top">
					<view class="mine-order">我的订单</view>
					<view class="all-order" @tap="navToPage('../orderCanBack/orderCanBack?id=0')">
						所有订单
						<uni-icons type="arrowright" size="32" color="#000000"></uni-icons>
					</view>
				</view>
				<!-- 选项 -->
				<view class="order-list">
					<view v-for="item in orderItem" :key="item.id" class="order-item" @tap="navToPage(item.url)">
						<image :src="item.imgSrc"></image>
						<view>{{ item.title }}</view>
					</view>
				</view>
			</view>
			<!-- 我的服务 -->
			<view class="service">
				<!-- 标题 -->
				<view class="my-top">我的服务</view>
				<view class="service-list">
					<view 
						class="service-item button" 
						v-for="item in serviceList" 
						:key="item.id"
						@tap="navToPage(item.url)"
					>
						<image :src="item.imgSrc"></image>
						<view>{{ item.title }}</view>
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
				userVavrot: '',
				userNickName: '',
				lastMoney: '',
				userId: '',
				incomeList: [{
					id: 1,
					num: 0,
					title: '总收益(元)'
				},{
					id: 2,
					num: 0,
					title: '今日收益(元)'
				},{
					id: 3,
					num: 0,
					title: '总消费积分'
				},{
					id: 4,
					num: 0,
					title: '今日奖励积分'
				}],
				img: '',
				orderItem: [{
					id: 1,
					imgSrc: '/static/daifukuan.png',
					title: '待付款',
					url: '../orderCanBack/orderCanBack?id=1'
				},{
					id: 2,
					imgSrc: '/static/daipingjia.png',
					title: '待评价',
					url: '../orderCanBack/orderCanBack?id=2'
				},{
					id: 3,
					imgSrc: '/static/sold.png',
					title: '退款/售后',
					url: '../orderCanBack/orderCanBack?id=3'
				}],
				serviceList: [{
					id: 1,
					imgSrc: '/static/yue.png',
					title: '我的余额',
					url: '../myLastMoney/myLastMoney'
				},{
					id: 2,
					imgSrc: '/static/dizhi.png',
					title: '地址管理',
					url: ''
				},{
					id: 3,
					imgSrc: '/static/shoucang.png',
					title: '我的收藏',
					url: '../collection/collection'
				},{
					id: 4,
					imgSrc: '/static/tuiguang.png',
					title: '我的推广',
					url: '../extend/extend'
				},{
					id: 5,
					imgSrc: '/static/lianxi.png',
					title: '联系我们',
					url: '../relation/relation'
				}]
			};
		},
		components: {
			uniIcons
		},
		onLoad() {
			this.$axios('/index/user', {
				userId: this.$userId,
				token: this.$token
			}).then(res => {
				const userId = this.$userId
				this.userId = userId.slice(0, 4) + '***' + userId.slice(-4)
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
				this.lastMoney = res.data.todayAmt || 0;
				this.incomeList[0].num = res.data.retailAmt || 0;
				this.incomeList[1].num = res.data.todayAmt || 0;
				this.incomeList[2].num = res.data.retailIntegral || 0;
				this.incomeList[3].num = res.data.todayIntegral || 0;
				this.img = res.data.userVavrot;
				this.userNickName = res.data.userNickName;
			}).catch(err => {
				console.log(err);
			});
		},
		methods: {
			navToPage(url) {
				if (!url) {
					this.notice();
				}
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
			padding-bottom: 140upx;
			
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
						font-size: 36upx;
						line-height: 36upx;
					}
					
					.income-title {
						font-size: 28upx;
						line-height: 28upx;
						margin-top: 12upx;
						white-space: nowrap;
					}
				}
			}
		}
		.get-money {
			position: absolute;
			bottom: 20upx;
			right: 0;
			padding: 0 20upx 0 24upx;
			height: 70upx;
			border-top-left-radius: 8upx;
			border-bottom-left-radius: 8upx;
			background-image: linear-gradient(to right, #8d6dfe, #c084fe);
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 2upx 5upx 0 #fc7363;
			
			.context {
				font-size: 24upx;
			}
		}
	}
	.bottom-bar {
		padding: 23upx 20upx 20upx 20upx;
		
		.my-order {
			margin-bottom: 20upx;
			padding: 27upx 20upx 28upx;
			background-color: #FFFFFF;
			display: flex;
			border-radius: 12upx;
			flex-direction: column;
			
			.my-top {
				width: 100%;
				height: 34upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.mine-order {
					font-size: 34upx;
					line-height: 34upx;
					color: #000000;
				}
				.all-order {
					font-size: 24;
				}
			}
			.order-list {
				margin-top: 37upx;
				display: flex;
				align-items: center;
				
				.order-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 76upx;
					
					&:last-child {
						margin-right: 0;
					}
					
					image {
						width: 47upx;
						height: 47upx;
					}
					
					view {
						font-size: 26upx;
						line-height: 26upx;
						margin-top: 17upx;
					}
				}
			}
		}
		.service {
			padding: 28upx 18upx 30upx 20upx;
			background-color: #FFFFFF;
			display: flex;
			border-radius: 12upx;
			flex-direction: column;
			
			.my-top {
				width: 100%;
				height: 34upx;
				display: flex;
				align-items: center;
				font-size: 34upx;
				line-height: 34upx;
				color: #000000;
				margin-bottom: 8upx;
			}
			.service-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				
				.service-item {
					margin-top: 30upx;
					width: 94upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					image {
						width: 47upx;
						height: 47upx;
					}
					
					view {
						font-size: 26upx;
						color: #000000;
						line-height: 26upx;
						margin-top: 16upx;
						white-space: nowrap;
					}
					
					&:nth-child(5n) {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
