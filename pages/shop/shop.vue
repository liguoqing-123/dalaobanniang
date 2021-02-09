<template>
	<view class="shop-page">
		<view class="shop-bg">
			<!-- 导航栏 -->
			<view class="shop-nav">
				<uni-icons class="side" type="back" size="48" color="#FFFFFF" @tap="navBack"></uni-icons>
				<view class="search-box" @tap="navToPage('../food/food?focus=true&showSwiper=false')">
					<view class="searchPlace">
						<uni-icons type="search" size="32" color="#FFFFFF" class="search-icon"></uni-icons>
						海底捞
					</view>
				</view>
				<uni-icons class="side" type="plusempty" size="48" color="#FFFFFF"></uni-icons>
			</view>
		</view>
		<!-- 商家简介 -->
		<view class="shop-page-info">
			<image src="/static/head.png"></image>
			<Food :name="merchName" :imgSrc="merchImg" />
		</view>
		<!-- 轮播图 -->
		<view class="shop-page-swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="#ffffff"
			 indicator-active-color="#f75f78">
				<swiper-item v-for="i in 3" :key="i">
					<image src="/static/shop-swiper.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 选项卡 -->
		<view class="shop-page-bar">
			<view @tap="showBottom(1)" :class="bottomIndex === 1 ? 'active' : ''">点餐</view>
			<view @tap="showBottom(2)" :class="bottomIndex === 2 ? 'active' : ''">评价</view>
			<view @tap="showBottom(3)" :class="bottomIndex === 3 ? 'active' : ''">商铺</view>
		</view>
		<!-- 根据选项卡显示的页面 -->
		<view class="shop-page-main">
			<!-- 点餐 -->
			<view class="popup" v-show="bottomIndex === 1">
				<!-- 弹出层的每一项数据 -->
				<view class="pop-item" v-for="(item, index) in popupList" :key="index">
					<!-- 每项弹出层左边的试图 -->
					<view class="pop-title" :class="popupItemIndex === index ? 'active' : ''" @tap="togglePopup(item.storeClassName, index)">
						{{ item.storeClassName }}
					</view>
					<!-- 每项弹出层右边的试图 -->
					<view class="pop-child-box">
						<scroll-view scroll-y="true">
							<view class="food-page-item" v-for="food in foodList" :key="food.procId" @tap="navToPage(`../foodDetail/foodDetail?id=${food.procId}`)">
								<AddFood :userId="userId" :token="token" :procId="food.procId" :merchCode="merchCode" :imgSrc="food.procImg"
								 :name="food.procName" :send="food.send" :sellnum="food.sellnum" :price="food.procPrice" />
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 评价 -->
			<view v-show="bottomIndex === 2" class="evaluate">
				<!-- 用户总评价 -->
				<view class="total-evaluate">
					<view class="total-score">
						<view class="total-left">
							<image src="/static/head.png"></image>
							<view>商家评分</view>
						</view>
						<view class="total-right">
							<view>{{ ALLstar }}分</view>
							<Rate :touchable="false" :value="ALLstar" :max="5" active-color="#d52800" :readonly="true" :margin="5" />
						</view>
					</view>
					<view class="item-score">
						<view class="score">
							<view>口感</view>
							<Rate :touchable="false" :value="ALLKWstar" :max="5" active-color="#d52800" :readonly="true" :margin="5" />
							<view>{{ ALLKWstar }}分</view>
						</view>
						<view class="score">
							<view>环境</view>
							<Rate :touchable="false" :value="ALLHJstar" :max="5" active-color="#d52800" :readonly="true" :margin="5" />
							<view>{{ ALLHJstar }}分</view>
						</view>
						<view class="score">
							<view>服务</view>
							<Rate :touchable="false" :value="ALLFWstar" :max="5" active-color="#d52800" :readonly="true" :margin="5" />
							<view>{{ ALLFWstar }}分</view>
						</view>
					</view>
				</view>
				<!-- 每个用户评价 -->
				<template v-if="commentArray.length !== 0">
					<view class="evaluate-item" v-for="comment in commentArray" :key="comment.commentID">
						<ShopEvaluate :comment="comment.content" :commentImg="comment.contentImg" :createTime="comment.dataTime"
						 :userNickName="comment.userNickName" :contentStar="comment.contentStar" />
					</view>
				</template>
				<template v-else>
					<view class="no-ev">
						<image src="/static/null.png"></image>
						<view>暂无评价</view>
					</view>
				</template>
			</view>
			<!-- 商铺 -->
			<view v-show="bottomIndex === 3" class="store">
				<!-- 商铺基本信息 -->
				<view class="store-info">
					<image src="/static/address.png" @tap="getNavigation"></image>
					<view class="baseinfo-right">
						<view class="title1">{{ merchName }}</view>
						<view class="title2">{{ getMerchAddress }}</view>
					</view>
					<image src="/static/phone.png" @tap="phoneToBoss"></image>
				</view>
				<!-- 店面介绍标题 -->
				<view class="info-title">店面介绍</view>
				<!-- 店面介绍区域 -->
				<view class="infos" v-html="intro"></view>
			</view>
		</view>
		<!-- 底部固定购物车 -->
		<view class="cart-btm">
			<view class="cart-left">
				<image src="/static/blackCart.png" @tap="showCar"></image>
				<view>￥{{ totalMoney }}</view>
			</view>
			<view class="cart-right" @tap="navToPage('../cart/cart')">结算</view>
		</view>
		<Popup type="bottom" ref="popup" class="car-info">
			<CarPopup :list="carList" @changeNum="changeNum" @clear="clearCart" />
		</Popup>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import Food from '@/components/mine/food.vue'
	import AddFood from '@/components/mine/addFood.vue'
	import ShopEvaluate from '@/components/mine/shopEvaluate.vue'
	import Rate from '@/components/uni/uni-rate/uni-rate.vue'
	import Popup from '@/components/uni/uni-popup/uni-popup.vue'
	import CarPopup from '@/components/mine/carPopup.vue'
	export default {
		data() {
			return {
				intro: '',
				merchPhone: '',
				userId: '',
				token: '',
				merchCode: '',
				popupItemIndex: 0,
				// 输入框是否在聚焦
				isFocus: false,
				// 点赞、评论、商铺索引
				bottomIndex: 1,
				// 是否显示选择栏
				showchooseBar: false,
				merchName: '', // 商家名称
				merchImg: '', // 商家图片
				// 显示弹出层的第几项
				commentArray: [], // 评论列表
				// 点餐中的食物列表
				foodList: [],
				merchAddress: '',
				ALLstar: '', // 总分
				ALLKWstar: '', // 口感
				ALLHJstar: '', // 坏境
				ALLFWstar: '', // 服务
				popupList: [
					{storeClassName: '全部商品'}
				],
				carIsShow: false,
				carList: [] // 购物车列表
			};
		},
		computed: {
			getMerchAddress() {
				if (!this.merchAddress || this.merchAddress === 'null') {
					return '';
				} else {
					return this.merchAddress;
				}
			},
			totalMoney() {
				let total = 0
				this.carList.forEach(item => {
					total += item.num * item.procPrice
				})
				return total.toFixed(2)
			}
		},
		components: {
			uniIcons,
			Food,
			AddFood,
			ShopEvaluate,
			Rate,
			Popup,
			CarPopup
		},
		methods: {
			// 清空购物车
			clearCart() {
				this.$axios('/store/delAllCar', {
					userId: this.userId,
					token: this.token
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
									userId: this.userId,
									token: this.token
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
										this.carList = [];
									}
								}).catch(err => {
									console.log(err);
								});
							}
						});
					}
				}).catch(err => {
					console.log(err);
				})
			},
			changeNum(num, food) {
				// 改变食物的数量，更新视图，网络请求添加购物车数据
				this.carList.forEach(item => {
					if (item.procId === food.procId) { // 找到需要添加的食物
						if (!item.num && num === -1) { // 不可为负
							return
						}
						if (num === -1) { // 删除购物车的接口
							this.$axios('/store/delCar', {
								array: [food.carId],
								userId: this.userId,
								token: this.token
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
									item.num += num
								}
							})
						} else if (num === 1) { // 添加购物车的接口
							this.$axios('/store/addCar', {
								procId: food.procId,
								merchCode: food.merchCode,
								userId: this.userId,
								token: this.token
							}).then(res => {
								if (res.data.retCode === '000000') {
									item.num += num
								}
							})
						}
					}
				})
			},
			getNavigation() {
				// 导肮
			},
			showCar() {
				if (!this.carIsShow) {
					this.$refs.popup.open()
				} else {
					this.$refs.popup.close()
				}
				this.carIsShow = !this.carIsShow
			},
			togglePopup(storeClassName, index) {
				if (storeClassName === '全部商品') {
					storeClassName = '';
				}
				this.popupItemIndex = index;
				this.$axios('/store/getMerch', {
					type: "1",
					storeClassName,
					merchCode: this.merchCode
				}).then(res => {
					if (res.data.retCode === '000000') {
						const data = res.data
						// 商铺名称
						this.merchName = data.merchName;
						// 商铺图片
						// this.merchImg = data.merchImg;
						// 商铺食物
						this.foodList = data.array;
						// 评论列表
						// this.commentArray = data.commentArray;
					}
				})
			},
			navBack() {
				uni.navigateBack();
			},
			toggleView(id) {
				// 如果点击的是目前高亮显示的
				if (this.activeIndex === id) {
					this.showchooseBar = !this.showchooseBar;
					// 点击不不是目前高亮的，那么显示选项弹出层
				} else {
					this.activeIndex = id;
					this.showchooseBar = true;
				}
				// 如果将要显示选项弹出层，就隐藏轮播，显示弹出层
				if (this.showchooseBar) {
					this.showSwiper = false;
					this.$refs.popup.open();
					// 如果将要收起选项弹出层
				} else {
					this.showSwiper = true;
					this.$refs.popup.close();
				}
			},
			showBottom(id) {
				this.bottomIndex = id;
				if (id === 2) {
					this.$axios('/store/getMerch', {
						type: "2",
						storeClassName: "",
						merchCode: this.merchCode
					}).then(res => {
						this.commentArray = res.data.array;
						this.ALLstar = res.data.ALLstar === 'NaN' ? 0 : res.data.ALLstar;
						this.ALLKWstar = res.data.ALLKWstar === 'NaN' ? 0 : res.data.ALLKWstar;
						this.ALLHJstar = res.data.ALLHJstar === 'NaN' ? 0 : res.data.ALLHJstar;
						this.ALLFWstar = res.data.ALLFWstar === 'NaN' ? 0 : res.data.ALLFWstar;
					});
				} else if (id === 3) {
					this.$axios('/store/getMerch', {
						type: "3",
						storeClassName: "",
						merchCode: this.merchCode
					}).then(res => {
						this.intro = res.data.merchContent;
						this.merchPhone = res.data.merchPhone;
						this.merchName = res.data.merchName;
						this.merchImg = res.data.merchPic;
						this.merchAddress = res.data.merchAddress;
					});
				}
			},
			navToPage(url) {
				uni.navigateTo({
					url
				})
			},
			isFocusInput(flag) {
				this.isFocus = flag;
			},
			phoneToBoss() {
				uni.makePhoneCall({
					phoneNumber: this.merchPhone
				});
			}
		},
		onLoad(options) {
			this.userId = this.$userId;
			this.token = this.$token;
			this.merchCode = options.merchCode;
			// 商铺详情接口
			this.$axios('/store/getMerch', {
				type: "1",
				storeClassName: "",
				merchCode: this.merchCode
			}).then(res => {
				// 商铺名称
				this.popupList = [...this.popupList, ...res.data.classNameArray];
				this.merchName = res.data.merchName;
				// 商铺图片
				this.merchImg = res.data.merchPic;
				// 商铺食物
				this.foodList = res.data.array;
			})
		},
		onShow() {
			// 获取购物车数据
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
				const carList = []
				res.data.array.forEach(item => {
					item.shopList.forEach(food => {
						const current = carList.filter(i => food.procId === i.procId)[0]
						if (!current) {
							carList.push({
								...food,
								merchCode: item.merchCode,
								num: 1
							})
						} else {
							current.num ++
						}
					})
				})
				this.carList = carList
			})
		},
		mounted() {
			this.$refs.popup.open()
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #efefef;
	}

	.shop-page {
		padding-top: var(--status-bar-height);
		position: relative;
		width: 100%;
		padding-bottom: 88upx;
	}

	.shop-bg {
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 1;
		height: 400upx;
		background-image: url(../../static/classify.png);
		background-repeat: no-repeat;
		background-size: cover;

		.shop-nav {
			padding-top: var(--status-bar-height);
			height: 88upx;
			padding-left: 20upx;
			padding-right: 20upx;
			width: 100%;
			font-size: 32upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;

			.search-box {
				height: 58upx;
				background-color: rgba(0, 0, 0, .5);
				flex: 1;
				border-radius: 29upx;
				overflow: hidden;
				-webkit-transform: rotate(0deg);
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 50upx;

				.searchPlace {
					position: absolute;
					z-index: 1;
					font-size: 28upx;
					color: #FFFFFF;
					height: 58upx;
					display: flex;
					align-items: center;

					.search-icon {
						margin-right: 16upx;
					}
				}

				input {
					height: 58upx;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					color: #FFFFFF;
					font-size: 26upx;
					width: 100%;

					&:-webkit-placeholder {
						color: #FFFFFF;
						font-size: 26upx;
					}
				}
			}

			.side {
				display: flex;
				align-items: center;
				width: 36upx;
				height: 88upx;
				flex-shrink: 0;
			}
		}
	}

	.shop-page-info {
		position: relative;
		margin: 268upx 23upx 0 17upx;
		z-index: 2;

		&>image {
			width: 60upx;
			height: 60upx;
			border-radius: 6upx;
			position: absolute;
			z-index: 3;
			top: -30upx;
			right: 20upx;
		}
	}

	.shop-page-swiper {
		margin: 20upx;
		border-radius: 12upx;
		overflow: hidden;
		height: 200upx;
		-webkit-transform: rotate(0deg);

		swiper {
			height: 200upx;
			width: 100%;

			image {
				height: 200upx;
				width: 100%;
			}
		}
	}

	.shop-page-bar {
		height: 88upx;
		background-color: #FFFFFF;
		padding: 0 20upx;
		width: 100%;
		font-size: 28upx;
		color: #808080;
		display: flex;
		align-items: center;

		.active {
			color: #f75f78;
		}

		view {
			height: 88upx;
			margin: 0 40upx;
			display: flex;
			justify-content: center;
			align-items: center;

			&:first-child {
				margin-left: 0;
				margin-right: 40upx;
			}
		}
	}
	.shop-page-main {

		.popup {
			width: 100%;
			min-height: 440upx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			position: relative;

			.pop-item {
				height: 88upx;
				font-size: 24upx;
				display: flex;
				flex-direction: column;
				overflow: visible;

				.pop-title {
					flex: 1;
					display: flex;
					align-items: center;
					padding-left: 40upx;

					&.active {
						background-color: #efefef;
						color: #f85e78;
					}
				}

				.pop-child-box {
					height: 880upx;
					position: absolute;
					width: 530upx;
					background-color: #efefef;
					right: 0;
					z-index: 1;
					top: 0;
					padding: 20upx;

					.food-page-item {
						margin-bottom: 20upx;

						&:last-child {
							margin-bottom: 108upx;
						}
					}
				}
			}
		}

		.total-evaluate {
			height: 140upx;
			background-color: #FFFFFF;
			margin: 20upx;
			border-radius: 12upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.total-score {
				flex: 1;
				display: flex;

				.total-left {
					width: 134upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					image {
						width: 74upx;
						height: 74upx;
						border-radius: 6upx;
					}

					view {
						margin-top: 12upx;
						font-size: 24upx;
						line-height: 24upx;
						color: #333333;
					}
				}

				.total-right {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					transform: translateX(20upx);

					&>view {
						font-size: 44upx;
						color: #d52800;
					}
				}
			}

			.item-score {
				flex: 1;
				border-left: 1upx solid #CCCCCC;
				display: flex;
				flex-direction: column;

				.score {
					font-size: 24upx;
					display: flex;
					align-items: center;

					&>view:first-child {
						margin: 0 38upx 0 44upx;
					}

					&>view:last-child {
						margin-left: 10upx;
					}
				}
			}
		}

		.evaluate-item {
			background-color: #FFFFFF;
			margin: 20upx;
			border-radius: 12upx;
			overflow: hidden;
			-webkit-transform: rotate(0deg);
			padding: 20upx 20upx 0;
		}

		.store {
			display: flex;
			flex-direction: column;
			padding-top: 20upx;

			.store-info {
				height: 88upx;
				background-color: #FFFFFF;
				border-radius: 10upx;
				margin-top: 20upx;
				display: flex;
				align-items: center;
				padding-left: 21upx;
				margin: 0 20upx;
				padding-right: 20rpx;

				&>image:first-child {
					height: 48upx;
					width: 48upx;
					border-radius: 50%;
					margin-right: 23upx;
					flex-shrink: 0;
				}

				&>image:last-child {
					width: 39upx;
					height: 47upx;
					margin-left: 20rpx;
				}

				.baseinfo-right {
					flex: 1;
					height: 60upx;
					border-right: 1upx solid #b3b3b3;

					view {
						font-size: 24upx;
						line-height: 24upx;
						letter-spacing: 2upx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;

						&.title1 {
							margin-bottom: 8upx;
							color: #000000;
						}

						&.title2 {
							color: #808080;
						}
					}
				}
			}

			.info-title {
				height: 50upx;
				display: flex;
				align-items: flex-end;
				font-size: 26upx;
				color: #333333;
				line-height: 26upx;
				padding: 0 20upx;
			}

			.infos {
				margin: 20upx;
				background-color: #FFFFFF;
				border-radius: 12upx;
				padding: 14upx 20upx;
				letter-spacing: 2upx;
				
				img {
					width: 670rpx !important;
					border-radius: 12rpx !important;
				}

				.infos-title {
					font-size: 24upx;
					line-height: 36upx;
					color: #333333;
					margin-bottom: 18upx;
				}

				.infos-item {
					height: 80upx;
					display: flex;
					align-items: center;
					font-size: 24upx;
					color: #333333;
					font-weight: 500;
				}

				image {
					width: 670upx;
					height: 340upx;
					border-radius: 12upx;
				}
			}
		}
	}

	.cart-btm {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		height: 88upx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20upx;

		.cart-left {
			display: flex;
			align-items: center;

			image {
				width: 40upx;
				height: 40upx;
				margin-right: 24upx;
			}

			view {
				font-size: 24upx;
				color: #f75f78;

				text {
					font-size: 32upx;
				}
			}
		}

		.cart-right {
			width: 200upx;
			height: 58upx;
			background-color: #f75f78;
			color: #FFFFFF;
			border-radius: 29upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36upx;
		}
	}
	.no-ev {
		width: 100%;
		margin-top: 20rpx;
		color: #333;
		background-color: #f4f4f4;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		
		image {
			width: 300rpx;
			height: 260rpx;
		}
		
		view {
			color: #666;
			font-size: 28rpx;
		}
	}
</style>
