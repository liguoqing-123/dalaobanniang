<template>
	<view class="order">
		<view class="navbar">
			<!-- 导航栏 -->
			<view
				v-for="bar in navBarList"
				:key="bar.id"
				:class="currentBar === bar.id ? 'active' : ''"
				@click="toggleView(bar.id)"
			>{{ bar.title }}</view>
		</view>
		<view class="container">
			<!-- 每一次的订单 -->
			<view
				v-for="(order, orderIndex) in array"
				:key="order.orderId"
				class="fooditem"
			>
				<!-- 每一次订单中的数据 -->
				<view
					v-for="(food, index) in order.proArray"
					:key="food.procId"
					@click="toFoodDetail(food.procId)"
				>
					<OrderItem
						:orderIndex="orderIndex"
						:length="order.proArray.length"
						:index="index"
						:remark="order.remark"
						:userId="userId"
						:token="userId"
						:orderAmt="order.orderAmt"
						:procId="food.procId"
						:merchCode="food.merchCode"
						:orderId="order.orderId"
						:navBarType="currentBar"
						:dataTime="order.dataTime"
						:status="order.status"
						:storePrice="food.storePrice"
						:storeName="food.storeName"
						:storeImg="food.storeImg"
						:food="food"
						@changeMoney="getTotalMoney"
						@pay="pay"
						@getAgain="getAgain"
					/>
				</view>
			</view>
			<!-- 精品推荐 -->
			<DevideLine />
			<view
				class="command"
				v-for="food in proArray"
				:key="food.procId"
				@tap="navto(food.procId)"
			>
				<Food
					:name="food.procName"
					:imgSrc="food.procImg"
					:price="food.procPrice"
				/>
			</view>
		</view>
		<view class="pay-sure" v-if="currentBar === 1">
			<view>￥{{ totalMoney }}</view>
			<view>确认付款</view>
		</view>
	</view>
</template>

<script>
	import DevideLine from '@/components/mine/devideLine.vue';
	import Food from '@/components/mine/food.vue';
	import OrderItem from '@/components/mine/orderItem.vue';
	export default {
		components: {
			DevideLine,
			Food,
			OrderItem
		},
		data() {
			return {
				currentBar: 0,
				navBarList: [
					{id: 0, title: '全部'},
					{id: 1, title: '待付款'},
					{id: 2, title: '待评价'},
					{id: 3, title: '退款/售后'}
				],
				button1: [
					{id: 1, text: '评价', color: '#808080', bgcolor: '#FFFFFF', bdcolor: '#808080'},
					{id: 2, text: '再来一单', color: '#808080', bgcolor: '#FFFFFF', bdcolor: '#808080'}
				],
				button2: [
					{id: 1, text: '确认付款', color: '#FFFFFF', bgcolor: '#f75f78', bdcolor: '#f75f78'}
				],
				button3: [
					{id: 1, text: '再来一单', color: '#808080', bgcolor: '#FFFFFF', bdcolor: '#808080'},
					{id: 2, text: '评价', color: '#FFFFFF', bgcolor: '#f75f78', bdcolor: '#f75f78'},
				],
				proArray: [],
				array: [],
				totalMoney: 0,
				userId: '',
				token: ''
			};
		},
		onShow() {
			this.userId = this.$userId;
			this.token = this.$token;
			this.$axios('/pay/orderList', {
				userId: this.$userId,
				token: this.$token,
				type: 0
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
				this.proArray = res.data.proArray;
				this.array = res.data.array
			}).catch(err => {
				console.log(err);
			});
		},
		methods: {
			navto(id) {
				uni.navigateTo({
					url: `../foodDetail/foodDetail?id=${id}`
				})
			},
			getAgain(orderId) {
				console.log(this.array)
				// 拿到当前的订单
				let order;
				for (let i = 0; i < this.array.length; i ++) {
					if (this.array[i].orderId === orderId) {
						order = this.array[i]
						break
					}
				}
				const foodList = order.proArray
				const orderAmt = order.orderAmt
				let merchName
				let procId = ''
				foodList.forEach(food => {
					merchName = food.storeName
					procId += food.procId + ','
				})
				procId = procId.slice(0, procId.length - 1)
				const array = encodeURIComponent(JSON.stringify(foodList));
				uni.navigateTo({
					url: `../../pages/pay/pay?procId=${procId}&array=${array}&orderAmt=${orderAmt}&merchName=${merchName}`
				})
			},
			pay(orderIndex) {
				const order = this.array[orderIndex]
				let procId = ''
				order.proArray.forEach(item => {
					procId += item.procId + ','
				})
				procId = procId.slice(0, procId.length - 1)
				const orderAmt = order.orderAmt
				const remark = order.remark
				this.$axios('/pay/AddOrder', {
					userId: this.$userId,
					token: this.$token,
					orderAmt: orderAmt,
					procId: procId,
					remark: remark
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
					uni.navigateTo({
						url: '../finishPay/finishPay'
					})
				}).catch(err => {
					console.log(err);
				})
			},
			toggleView(id) {
				let title;
				if (id === 0) title = '全部订单';
				else if (id === 1) title = '待付款';
				else if (id === 2) title = '待评价';
				else if (id === 3) title = '退款/售后';
				uni.setNavigationBarTitle({
					title
				});
				this.currentBar = id;
				this.$axios('/pay/orderList', {
					userId: this.$userId,
					token: this.$token,
					type: id
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
					this.proArray = res.data.proArray;
					this.array = res.data.array
				}).catch(err => {
					console.log(err);
				});
			},
			toFoodDetail(id) {
				uni.navigateTo({
					url: `../foodDetail/foodDetail?id=${id}`
				})
			},
			getTotalMoney(money) {
				this.totalMoney += money;
			}
		}
	}
</script>

<style lang="less">
page {
	height: 100%;
	background-color: #efefef;
}
.order {
	padding-top: 88rpx;
}
.navbar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	display: flex;
	z-index: 9999;
	height: 88rpx;
	align-items: stretch;
	background-color: #FFFFFF;
	
	&>view {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		margin: 0 40rpx;
		
		&.active {
			color: #f75f78;
		}
	}
}
.container {
	padding: 20rpx;
}
.command {
	margin-bottom: 20rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}
.fooditem {
	border-radius: 12rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
}
.pay-sure {
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #FFFFFF;
	height: 88rpx;
	display: flex;
	justify-content: space-between;
	padding: 0 20rpx;
	align-items: center;
	
	& > view:first-child {
		color: #f75f78;
	}
	
	& > view:last-child {
		background-color: #f75f78;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 170rpx;
		min-height: 60rpx;
		border-radius: 12rpx;
		color: #FFFFFF;
		font-size: 26rpx;
	}
}
</style>
