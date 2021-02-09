<template>
	<view class="cart-item">
		<!-- shop-info -->
		<view class="shop-info">
			<view class="info-left" @tap="chooseAll"> 
				<!-- 该商店食物的全选 -->
				<radio color="#f75f78" :checked="allChoosed" />
			</view>
			<view class="info-right" @tap="navToPage(`../../pages/shop/shop?merchCode=${merchCode}`)">
				<view class="baseinfo">
					<view class="info1">{{ shopName }}</view>
					<view class="info2">
						<view>免费送餐</view>
						<view>店内就餐</view>
						<view>满减</view>
						<view>自营</view>
					</view>
				</view>
				<!-- 箭头 -->
				<uniIcons class="arrow" type="arrowright" size="36" color="#808080"></uniIcons>
			</view>
		</view>
		<!-- main -->
		<view class="main">
			<!-- 食物列表 -->
			<view class="food" v-for="food in foodList" :key="food.shoppingCarId">
				<!-- 单选框 -->
				<view class="food-left" @tap="chooseThis(food)">
					<!-- 单个食物的选择 -->
					<radio ref="radio" color="#f75f78" :checked="choosedThis(food)" />
				</view>
				<!-- 右边内容 -->
				<view
					class="food-right"
					@tap="navToPage(`../../pages/foodDetail/foodDetail?id=${food.procId}`)"
				>
					<image :src="food.procImg"></image>
					<view class="food-center">
						<view class="food-name">{{ food.procName }}</view>
						<view class="food-num">×{{ 1 }}</view>
					</view>
					<view class="food-price">￥{{ food.procPrice }}</view>
				</view>
			</view>
			<!-- 餐具费 -->
			<view class="canju">
				<view class="canju-left">餐具费</view>
				<view class="canju-right">￥{{ 0 }}</view>
			</view>
			<!-- 优惠内容 -->
			<view class="cheaper">
				<view class="cheaper-left">优惠内容</view>
				<view class="cheaper-right">-￥{{ 0 }}</view>
			</view>
			<!-- total -->
			<view class="total-pay">
				<view class="total-top total">
					已优惠
					<text>￥{{ 0 }}</text>
				</view>
				<view class="total-bottom total">
					合计
					<text>￥{{ totalMoney }}</text>
				</view>
				<view class="btn total" @tap="pay()">立即结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		name: 'CartItem',
		props: {
			allCheacked: true,
			merchCode: {
				type: [Number, String],
				default() {
					return ''
				}
			},
			index: {
				type: Number,
				default() {
					return 0
				}
			},
			isSelectAll: {
				type: Boolean,
				default() {
					return false;
				}
			},
			shopName: {
				type: String,
				default() {
					return '';
				}
			},
			foodList: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		components: {
			uniIcons
		},
		data() {
			return {
				allChoosed: false,
				// 用户选择的每一个食物
				userChoosedItem: []
			}
		},
		computed: {
			totalMoney() {
				let moneyArr = this.userChoosedItem.map((item, index) => {
					return Number(item.procPrice);
				});
				let sum = 0;
				for (let i of moneyArr) {
					sum += i;
				}
				return sum.toFixed(1);
			}
		},
		methods: {
			// 结算
			pay() {
				let procId = '';
				let orderAmt = 0;
				this.userChoosedItem.forEach(item => {
					procId += item.procId + ',';
					orderAmt += Number(item.procPrice);
				});
				procId = procId.slice(0, procId.length - 1);
				const array = JSON.stringify(this.userChoosedItem);
				const merchName = this.shopName;
				uni.navigateTo({
					url: `../pay/pay?procId=${procId}&orderAmt=${orderAmt}&array=${array}&merchName=${merchName}`
				});
			},
			// 当前商店食物的全选
			chooseAll() {
				this.allChoosed = !this.allChoosed;
				if (this.allChoosed) {
					this.userChoosedItem = this.foodList;
				} else {
					this.userChoosedItem = [];
				}
				this.$emit('getChoosedList', this.userChoosedItem, this.index, this.allChoosed);
			},
			chooseThis(food) {
				let arr = this.userChoosedItem;
				// 并未添加
				if (arr.indexOf(food) === -1) {
					arr.push(food);
					// 如果全选了就激活全选按钮
					if (arr.length === this.foodList.length) {
						this.allChoosed = true;
					}
				} else {
					// 已经添加
					this.allChoosed = false;
					let newArr = [];
					// 全选后取消的 bug
					if (this.isSelectAll) {
						for (let i = 0; i < this.foodList.length; i ++) {
							if (this.foodList[i] !== food) {
								newArr.push(this.foodList[i]);
							}
						}
						this.userChoosedItem = newArr;
					} else {
						for (let i of arr) {
							if (i !== food) {
								newArr.push(i);
							}
						}
						this.userChoosedItem = newArr;
					}
				}
				this.$emit('getChoosedList', this.userChoosedItem, this.index, this.allChoosed);
			},
			choosedThis(food) {
				return this.userChoosedItem.indexOf(food) !== -1;
			},
			navToPage(url) {
				uni.navigateTo({
					url
				})
			}
		},
		watch: {
			isSelectAll(flag) {
				if (flag) {
					this.allChoosed = true;
					this.userChoosedItem = this.foodList;
				} else {
					this.allChoosed = false;
				}
			},
			allChoosed(flag) {
				if (flag) {
					this.userChoosedItem = this.foodList;
					this.$emit('getChoosedList', this.userChoosedItem, this.index, this.allChoosed);
				} else {
					if (this.userChoosedItem.length === this.foodList.length) {
						// 代表是全选后取消一个
						this.userChoosedItem = [];
					}
					this.$emit('getChoosedList', this.userChoosedItem, this.index, this.allChoosed);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart-item {
		letter-spacing: 2upx;
		border-radius: 12upx;
		background-color: #FFFFFF;
		margin: 20upx;
		display: flex;
		flex-direction: column;
	}
	.shop-info {
		padding: 16upx 20upx 4upx;
		display: flex;
		height: 72upx;
		
		.info-left {
			width: 68upx;
			margin-right: 1upx;
			display: flex;
			justify-content: center;
			flex-shrink: 0;
			
			radio {
				transform: scale(0.7) translateX(-10upx) translateY(-6upx);
				transform-origin: top center;
			}
		}
		.info-right {
			flex: 1;
			border-bottom: 1upx solid #b3b3b3;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.baseinfo {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.info1 {
					font-size: 24upx;
					display: flex;
					align-items: center;
					letter-spacing: 0;
					line-height: 24upx;
				}
				.info2 {
					font-size: 16upx;
					line-height: 16upx;
					margin: 6upx 0;
					display: flex;
					align-items: center;
					
					view {
						color: #ec482c;
						margin-left: 5upx;
						margin-right: 15upx;
					}
				}
			}
			
			.arrow {
				transform: translateY(-6upx);
			}
		}
	}
	.main {
		padding: 20upx 20upx 0;
		
		.food {
			margin-bottom: 30upx;
			height: 98upx;
			display: flex;
			
			.food-left {
				width: 68upx;
				flex-shrink: 0;
				display: flex;
				justify-content: center;
				
				radio {
					transform: scale(0.7) translateX(-10upx) translateY(-6upx);
					transform-origin: top center;
				}
			}
			
			.food-right {
				flex: 1;
				display: flex;
				align-items: stretch;
				justify-content: space-between;
				
				image {
					width: 98upx;
					height: 98upx;
					margin-right: 22upx;
					flex-shrink: 0;
					border-radius: 8upx;
				}
				
				.food-center {
					height: 98upx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					letter-spacing: 3upx;
					
					.food-name {
						font-size: 24upx;
						line-height: 24upx;
						color: #000000;
					}
					.food-num {
						font-size: 18upx;
						line-height: 18upx;
						color: #b3b3b3;
					}
				}
				.food-price {
					height: 98upx;
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
					align-items: flex-end;
					font-size: 28upx;
					letter-spacing: 2upx;
				}
			}
		}
		.canju {
			display: flex;
			height: 36upx;
			align-items: center;
			justify-content: space-between;
			font-size: 20upx;
			margin-left: 68upx;
			
			.canju-left {
				letter-spacing: 2upx;
			}
			.canju-right {
				letter-spacing: 5upx;
				font-size: 20upx;
			}
		}
		.cheaper {
			height: 58upx;
			border-bottom: 1upx solid #b3b3b3;
			font-size: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 68upx;
			
			.cheaper-left {
				letter-spacing: 2upx;
				color: #000000;
			}
			.cheaper-right {
				letter-spacing: 5upx;
				font-size: 20upx;
				color: #eb472c;
			}
		}
		.total-pay {
			height: 87upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 68upx;
			
			.btn {
				color: #FFFFFF;
				font-size: 22upx;
				background-color: #f75f78;
				border-radius: 6upx;
				width: 120upx;
				height: 58upx;
				justify-content: center;
			}	
			
			.total {
				display: flex;
				align-items: center;
				
				text {
					color: #ec482f;
				}
				
				&.total-top {
					font-size: 22upx;
					line-height: 22upx;
					color: #000000;
					
					text {
						font-size: 22upx;
					}
				}
				
				&.total-bottom {
					font-size: 22upx;
					line-height: 22upx;
					font-weight: 500;
					color: #000000;
					
					text {
						font-size: 22upx;
					}
				}
			}
		}
	}
</style>
