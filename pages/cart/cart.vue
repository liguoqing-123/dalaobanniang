<template>
	<view class="evaluate-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="evaluate-nav">
			<uni-icons class="side" type="back" size="48" color="#b3b3b3" @tap="navBack"></uni-icons>
			<view>购物车</view>
			<view class="side" @tap="delOrBuy">管理</view>
		</view>
		<!-- 内容区 -->
		<view class="evaluate-container">
			<view v-for="(cart, index) in cartList" :key="cart.merchCode">
				<CartItem
					:shopName="cart.merchName"
					:foodList="cart.shopList"
					@getChoosedList="getChoosedList"
					:isSelectAll="isItemsSelectedAll[index]"
					:index="index"
					:merchCode="cart.merchCode"
				/>
			</view>
		</view>
		<!-- 全选 结算 / 删除-->
		<view class="all-btn">
			<label class="all-select" @tap="selectAllHandler">
				<radio color="#f75f78" :checked="isSelectAll" /><text>全选</text>
			</label>
			<view class="bottom-right1">
				<template v-if="showBottomBar">
					<view class="cheap-all">
						<view class="cheap">已优惠<text>￥</text><text class="num">0</text></view>
						<view class="all">合计<text>￥</text><text class="num">{{ totalMoney }}</text></view>
					</view>
					<view class="yes-btn" @tap.stop="settle">立即结算</view>
				</template>
				<template v-else>
					<view class="del">
						<view @tap="clearCart">清空</view>
						<view @tap="delCartItem">删除</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import CartItem from '@/components/mine/cartItme.vue'
	export default {
		data() {
			return {
				// 点击管理后显示立即结算（true）还是删除（false）
				showBottomBar: true,
				// 用户选择需要支付的食物
				userChoosedFood: [],
				userChoosedList: [],
				// 储存每一个部分的全选状态
				isItemsSelectedAll: [],
				// 模拟网络请求得到的购物车数据
				cartList: []
			};
		},
		onLoad() {
			this.$axios('/store/getCarList', {
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
				this.cartList = res.data.array;
			}).catch(err => {
				console.log(err);
			});
		},
		mounted() {
			this.isItemsSelectedAll = new Array(this.cartList.length);
			for (let i in this.isItemsSelectedAll) {
				this.$set(this.isItemsSelectedAll, i, false);
			}
		},
		computed: {
			totalMoney() {
				let moneyArr = this.userChoosedList.map((item) => {
					return Number(item.procPrice);
				})
				let sum = 0;
				for (let i of moneyArr) {
					sum += i;
				}
				return sum.toFixed(1);
			},
			isSelectAll() {
				let arr = this.isItemsSelectedAll;
				return Boolean(arr[0] && arr[1] && arr[2]);
			}
		},
		components: {
			uniIcons,
			CartItem
		},
		methods: {
			delOrBuy() {
				this.showBottomBar = !this.showBottomBar;
			},
			navBack() {
				uni.navigateBack();
			},
			navToPage(url) {
				uni.navigateTo({
					url
				})
			},
			getChoosedList(arr, index, flag) {
				this.userChoosedFood[index] = arr;
				let newArr = [];
				for (let i = 0; i < this.userChoosedFood.length; i++) {
					if (this.userChoosedFood[i]) {
						for (let j = 0; j < this.userChoosedFood[i].length; j++) {
							newArr.push(this.userChoosedFood[i][j]);
						}
					}
				}
				this.userChoosedList = newArr;
				this.$set(this.isItemsSelectedAll, index, flag);
			},
			selectAllHandler() {
				if (this.isSelectAll) {
					this.isItemsSelectedAll = [false, false, false];
				} else {
					this.isItemsSelectedAll = [true, true, true];
				}
				if (this.isSelectAll) {
					for (let i = 0; i < this.cartList.length; i++) {
						this.userChoosedList = [...this.userChoosedList, ...this.cartList[i].procArray];
					}
				} else {
					this.userChoosedList = [];
				}
			},
			// 结算
			settle() {
				let merchName = '';
				this.cartList.forEach(item => {
					if (item.shopList.includes(this.userChoosedList[0])) {
						merchName = item.merchName;
					}
				})
				if (this.userChoosedList.length === 0) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					});
					return;
				}
				let procId = '';
				let orderAmt = 0;
				this.userChoosedList.forEach(item => {
					procId += item.procId + ',';
					orderAmt += Number(item.procPrice);
				});
				procId = procId.slice(0, procId.length - 1);
				const array = encodeURIComponent(JSON.stringify(this.userChoosedList));
				uni.navigateTo({
					url: `../pay/pay?procId=${procId}&orderAmt=${orderAmt}&array=${array}&merchName=${merchName}`
				});
			},
			// 删除
			delCartItem() {
				const selected = this.userChoosedList;
				const idArr = selected.map((item) => {
					return item.carId;
				});
				if (idArr.length === 0) {
					uni.showToast({
						title: '请选择需要删除的食物',
						icon: 'none'
					});
					return;
				}
				// 网络请求
				this.$axios('/store/delCar', {
					array: idArr,
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
						uni.showToast({
							title: '删除成功',
							success: () => {
								// 删除成功后重新请求购物车数据并渲染视图
								this.$axios('/store/getCarList', {
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
										this.cartList = res.data.array;
									}
								}).catch(err => {
									console.log(err);
								});
							}
						})
						
					}
				}).catch(err => {
					console.log(err);
				});
			},
			// 清空
			clearCart() {
				this.$axios('/store/delAllCar', {
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
					// 清空成功后重新请求购物车数据刷新试图
					// 删除成功后重新请求购物车数据并渲染视图
					if (res.data.retCode === '000000') {
						uni.showToast({
							title: '清空成功',
							success: () => {
								this.$axios('/store/getCarList', {
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
										this.cartList = res.data.array;
									}
								}).catch(err => {
									console.log(err);
								});
							}
						});
					}
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

	.evaluate-page {
		margin-top: var(--status-bar-height);
		background-color: #efefef;
		position: relative;
		padding-top: 88upx;
		margin-bottom: 68upx;
	}

	.status-bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FFFFFF;
		position: fixed;
		z-index: 999;
		top: 0;
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
		padding: 0 20upx;
		position: fixed;
		top: var(--status-bar-height);
		z-index: 999;

		.side {
			width: 200upx;
			height: 50upx;
			display: flex;
			align-items: center;
			
			&:last-child {
				font-size: 22upx;
				justify-content: flex-start;
			}
		
			&:last-child {
				font-size: 22upx;
				justify-content: flex-end;
			}
		}
	}
	
	.evaluate-container {
		padding-bottom: 88upx;
	}

	.all-btn {
		letter-spacing: 2upx;
		height: 88upx;
		padding: 0 20upx;
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		
		.all-select {
			height: 88upx;
			display: flex;
			align-items: center;
			flex: 1;
			
			radio {
				transform: scale(0.7);
				transform-origin: left center;
			}
			
			text {
				font-size: 24upx;
				color: #000000;
			}
		}
		
		.bottom-right1 {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		.del {
			display: flex;
			
			view {
				margin-left: 18upx;
				height: 58upx;
				background-color: #f75f78;
				color: #FFFFFF;
				font-size: 22upx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 6upx;
				padding: 0 40upx;
			}
		}
		.cheap-all {
			margin-right: 18upx;
			
			.cheap {
				height: 18upx;
				font-size: 18upx;
				line-height: 18upx;
				display: flex;
				align-items: center;
				
				text {
					color: #e9482c;
					
					&.num {
						font-size: 18upx;
					}
				}
			}
			.all {
				height: 24upx;
				font-size: 24upx;
				line-height: 24upx;
				margin-top: 10upx;
				display: flex;
				align-items: center;
				
				text {
					color: #e9482c;
					
					&.num {
						font-size: 24upx;
					}
				}
			}
		}
		.yes-btn {
			padding: 0 10upx;
			height: 58upx;
			background-color: #f75f78;
			color: #FFFFFF;
			font-size: 22upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 6upx;
		}
	}
</style>
