<template>
	<view class="choose-card-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="choose-card-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view>银行卡</view>
			<view class="side"></view>
		</view>
		<!-- 内容区 -->
		<view class="choose-card-container">
			<!-- 银行卡 -->
			<template v-if="showCard">
				<view class="card button"
					v-for="(item, index) in JMCardList"
					:key="item.accId"
					@tap="chooseThis(item)"
				>
					<view class="card-info">
						<view class="info1">
							<view class="bank">{{ item.accBank }}</view>
							<view class="userid">{{ item.accNum }}</view>
						</view>
						<view class="info2">
							<view class="default" v-if="defaultIndex === index">默认</view>
							<view class="address">{{ item.accAddress }}</view>
						</view>
					</view>
					<uni-icons
						class="write"
						type="compose"
						size="40"
						color="#b2b2b2"
						@tap="setDefault(item.accId)"
					></uni-icons>
				</view>
			</template>
			<template v-else>
				<view class="nothing">
					<image src="/static/nothing.png"></image>
					<view class="tip">您还没有添加银行卡</view>
				</view>
			</template>
			<!-- 添加新银行卡 -->
			<view
				class="add-card button"
				@tap="navToPage('../addCard/addCard')"
			>添加新银行卡</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				cardList: [],
				JMCardList: [],
				defaultIndex: 0
			};
		},
		onShow() {
			// 网络请求银行卡列表，并且存储默认卡信息
			this.$axios('/index/userBackList', {
				userId: this.$userId,
				token: this.$token
			})
			.then(res => {
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
					const arr = res.data.array;
					uni.getStorage({
						key: 'defaultCard',
						// 存储过
						success: res => {
							const cardNumList = arr.map(item => {
								return item.accNum;
							});
							let index = cardNumList.indexOf(res.data.accNum);
							// 如果存储的卡号在请求的银行卡列表里  就不再存储
							if (index !== -1) {
								// 在 arr 中找到这张银行卡并且添加默认属性
								this.defaultIndex = index;
							} else {
								// 如果存储的卡号不在列表中，重新存储
								const defaultCard = arr[0];
								this.$set(defaultCard, 'isDefault', true);
								uni.setStorage({
									key: 'defaultCard',
									data: defaultCard
								});
							}
						},
						// 没有存储过
						fail: () => {
							// 抽离需要存储的信息 本地存储默认卡信息
							const defaultCard = arr[0];
							uni.setStorage({
								key: 'defaultCard',
								data: {
									accNum: defaultCard.accNum,
									accBank: defaultCard.accBank,
									accAddress: defaultCard.accAddress,
									accId: defaultCard.accId
								}
							});
						}
					})
					this.cardList = arr;
					this.JMCardList = JSON.parse(JSON.stringify(arr));
					this.JMCardList.forEach(item => {
						item.accNum = this.JMaccNum(item.accNum);
					});
			}).catch(err => {
				console.log(err);
			});
		},
		computed: {
			showCard() {
				return this.cardList.length;
			}
		},
		components: {
			uniIcons
		},
		methods: {
			// 选择银行卡
			chooseThis(card) {
				card = JSON.stringify(card);
				uni.navigateTo({
					url: `../getMoney/getMoney?card=${card}`
				});
			},
			navBack() {
				uni.navigateBack()
			},
			navToPage(url) {
				uni.navigateTo({
					url
				})
			},
			// 加密银行卡号
			JMaccNum(num) {
				let str = num.toString();
				return str.substr(0, 7) + '****' + str.substr(-4);
			},
			// 设置默认银行卡号
			setDefault(accId) {
				uni.showModal({
					title: '提示',
					content: '请确认将此卡设置为默认银行卡',
					success: (res) => {
						if (!res.confirm) {
							return;
						} else {
							const card = this.cardList.filter(item => item.accId === accId)[0];
							uni.setStorage({
								key: 'defaultCard',
								data: {
									accNum: card.accNum,
									accBank: card.accBank,
									accAddress: card.accAddress,
									accId: card.accId
								},
								success: () => {
									this.JMCardList.forEach((item, index) => {
										if (item.accId === accId) {
											this.defaultIndex = index;
										}
									});
									uni.showToast({
										title: '设置成功',
										icon: 'none'
									});
								}
							})
						}
					}
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
	.choose-card-page {
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
	.choose-card-nav {
		width: 100%;
		height: 88upx;
		font-size: 32upx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #000000;
		padding: 0 20upx;
		z-index: 999;
		position: fixed;
		top: var(--status-bar-height);
	
		.side {
			width: 50upx;
			height: 88upx;
			display: flex;
			align-items: center;
		}
	}
	.choose-card-container {
		padding: 20upx;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	
	.card {
		margin-bottom: 20upx;
		border-radius: 12upx;
		background-color: #FFFFFF;
		padding: 19upx 20upx 10upx 17upx;
		display: flex;
		align-items: center;
		letter-spacing: 2upx;
		
		&:last-child {
			margin-bottom: 0;
		}
		
		.card-info {
			flex: 1;
			height: 70upx;
			display: flex;
			flex-direction: column;
			
			.info1 {
				height: 28upx;
				font-size: 28upx;
				line-height: 28upx;
				display: flex;
				align-items: center;
				
				.bank {
					color: #000000;
					margin-right: 46upx;
				}
				.userid {
					font-size: 24upx;
					color: #666666;
					letter-spacing: 2upx;
				}
			}
			.info2 {
				margin-top: 13upx;
				height: 40upx;
				font-size: 18upx;
				display: flex;
				align-items: center;
				color: #666666;
				
				.default {
					width: 60upx;
					color: #FFFFFF;
					background-color: #f75f78;
					margin-right: 16upx;
					border-radius: 4upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				
				.address {
					letter-spacing: 1upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		.write {
			-webkit-transform: translateY(-5upx);
			transform: translateY(-5upx);
		}
	}
	.nothing {
		width: 100%;
		padding-top: 288upx;
		transform: rotate(0deg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		image {
			width: 200upx;
			height: 200upx;
		}
		
		.tip {
			font-size: 22upx;
			line-height: 22upx;
			color: #666666;
			margin-top: 40upx;
		}
	}
	.add-card {
		position: fixed;
		bottom: 20upx;
		left: 20upx;
		right: 20upx;
		width: 710upx;
		height: 100upx;
		border-radius: 50upx;
		background-color: #f75f78;
		color: #FFFFFF;
		font-size: 34upx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}
</style>
