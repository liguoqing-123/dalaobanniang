<template>
	<view class="detail-page">
		<!-- status-bar -->
		<view class="status-bar"></view>
		<!-- 顶部固定定位的按钮 -->
		<view class="top-bar">
			<view class="backbtn" @tap="navBack">
				<uni-icons type="back" size="48" color="#FFFFFF"></uni-icons>
			</view>
		</view>
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="i in foodImg" :key="i.picId">
				<image class="banner" :src="i.picImg"></image>
			</swiper-item>
		</swiper>
		<view class="detail-container">
			<!-- 食物名称 -->
			<view class="detail-name">{{ foodName }}</view>
			<!-- 月销售量 -->
			<view class="detail-sellnum">
				<view>月售<text>3000</text></view>
				<uniIcons
					:style="`transform: translateX(4rpx);`"
					:type="favIconType"
					size="40"
					:color="favIconColor"
					@tap="toggleFav"
				></uniIcons>
			</view>
			<!-- 价格 -->
			<view class="detail-price">
				<view class="detail-pricenum">￥<text>{{ foodPrice }}</text></view>
				<image class="button" src="/static/add.png" @tap="addThisFood"></image>
			</view>
			<!-- 掌柜描述 -->
			<view class="boss-say say-box">掌柜描述: {{ storeContent }}</view>
			<!-- 商品评价 -->
			<view class="detail-evaluate" v-if="contentArr.length">
				<!-- 标题 -->
				<view class="evaluate-title">商品评价</view>
				<!-- 每一条评价 -->
				<view v-for="content in contentArr" :key="content.contentId" class="evaluate-item">
					<UserEvaluate
						:userNickName="content.userNickName"
						:dataTime="content.dataTime"
						:content="content.content"
						:contentStar="content.contentStar"
						:contentImg="content.contentImg"
					/>
				</view>
			</view>
			<view v-else class="no-ev">
				<image src="/static/null.png"></image>
				<view>暂无评价</view>
			</view>
      <!-- 餐厅介绍 -->
      <view>
				<view style="margin: 20rpx 0;font-size: 36rpx;">餐厅介绍</view>
				<view style="display: flex;align-items: stretch;" @tap="toStore">
					<image :src="merchInfo.merchPic" style="width: 200rpx;height: 200rpx;flex-shrink: 0;border-radius: 12rpx;margin-right: 20rpx;"></image>
					<view style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;">
						<view>{{ merchInfo.merchName }}</view>
						<view>地址：{{ merchInfo.merchAddress }}</view>
						<view>联系方式：{{ merchInfo.merchPhone }}</view>
					</view>
				</view>
        <view style="margin: 20rpx 0;font-size: 36rpx;">商品列表</view>
        <view class="foods-container">
					<view
						v-for="food in storeArray"
						:key="food.storeId"
						class="store-foods"
						@tap="toDetail(food.storeId)"
					>
						<FoodCard
							:id="food.storeId"
							:img="food.storePic"
							:name="food.storeName"
							:merchCode="merchCode"
							:userId="userId"
							:token="token"
						/>
					</view>
				</view>
      </view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import UserEvaluate from '@/components/mine/userEvaluate.vue'
	import FoodCard from '@/components/mine/foodCard.vue'
	export default {
		data() {
			return {
				foodName: '',
				foodImg: '',
				foodPrice: '',
				merchCode: '',
				contentArr: [],
				isFav: '0',
				favId: '',
				procId: '',
				storeContent: '',
				merchInfo: {},
				storeArray: [],
				userId: '',
				token: ''
			};
		},
		computed: {
			favIconType() {
				return this.isFav === '1' ? 'heart-filled' : 'heart';
			},
			favIconColor() {
				return this.isFav === '1' ? '#f75f78' : '#222222';
			}
		},
		onLoad(options) {
			this.userId = this.$userId;
			this.token = this.$token;
			const id = options.id.toString();
			this.$axios('/store/getStoreProductDetail', {
				userId: this.$userId,
				token: this.$token,
				procId: id
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
					this.merchInfo = res.data.merchInfo;
					this.storeArray = res.data.storeArray;
					this.foodName = res.data.procName;
					this.merchCode = res.data.merchCode;
					this.foodImg = res.data.array;
					this.foodPrice = res.data.procPrice;
					this.contentArr = res.data.contentArr;
					this.isFav = res.data.isFav;
					this.favId = res.data.favId;
					this.procId = res.data.procId;
					this.storeContent = res.data.storeContent;
				}
			}).catch(err => {
				console.log(err);
			});
		},
		components: {
			uniIcons,
			UserEvaluate,
			FoodCard
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: `/pages/foodDetail/foodDetail?id=${id}`
				})
			},
			toStore() {
				uni.navigateTo({
					url: `/pages/shop/shop?merchCode=${this.merchCode}`
				})
			},
			navBack() {
				uni.navigateBack();
			},
			addThisFood() {
				this.$axios('/store/addCar', {
					procId: this.procId,
					merchCode: this.merchCode,
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
							title: '添加成功',
							success: () => {
								uni.navigateTo({
									url: '../cart/cart'
								})
							}
						})
					}
				}).catch(err => {
					console.log(err);
				});
			},
			toggleFav() {
				const favId = this.favId;
				const isFav = this.isFav;
				// 删除收藏
				if (isFav === '1') {
					this.$axios('/fav/removeFav', {
						favId,
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
									this.isFav = '0';
								}
							});
						}
					});
				// 添加收藏
				} else {
					this.$axios('/fav/addFav', {
						procId: this.procId,
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
						console.log(res);
						if (res.data.retCode === '000000') {
							uni.showToast({
								title: '添加成功',
								success: () => {
									this.favId = res.data.favId;
									this.isFav = '1';
								}
							});
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.detail-page {
		margin-top: var(--status-bar-height);
		
		.banner {
			height: 500upx;
			width: 100%;
		}
	}
	.status-bar {
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		width: 100%;
		height: var(--status-bar-height);
		z-index: 999;
	}
	.top-bar {
		position: absolute;
		top: var(--status-bar-height);
		left: 0;
		right: 0;
		width: 710upx;
		display: flex;
		align-items: center;
		padding: 0 20upx;
		z-index: 999;
		height: 88upx;
		
		.backbtn {
			width: 50upx;
			height: 88upx;
			display: flex;
			align-items: center;
		}
	}
	.detail-container {
		background-color: #FFFFFF;
		letter-spacing: 2upx;
		padding: 0 20upx;
	}
	.detail-name {
		font-size: 32upx;
		color: #000000;
		padding: 16rpx 0;
	}
	.detail-sellnum {
		@size: 24rpx;
		font-size: @size;
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #808080;
		
		text {
			font-size: @size;
			margin-left: @size;
		}
	}
	.detail-price {
		margin-top: 16upx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		
		.detail-pricenum {
			@height: 42upx;
			line-height: @height;
			height: @height;
			font-size: 32upx;
			color: #f75f78;
			font-weight: bold;
			
			text {
				font-size: 36upx;
			}
		}
		
		image {
			@size: 36upx;
			width: @size;
			height: @size;
		}
	}
	.say-box {
		font-size: 24upx;
		line-height: 36upx;
		color: #808080;
	}
	.boss-say {
		margin-top: 22upx;
	}
	.detail-main, .detail-eat {
		margin-top: 14upx;
	}
	.detail-evaluate {
		
		.evaluate-title {
			height: 81upx;
			border-bottom: 1upx solid #b3b3b3;
			padding-top: 16upx;
			line-height: 64upx;
			font-size: 28upx;
			color: #000000;
		}
		.evaluate-item {
			margin-top: 40upx;
		}
	}
	.no-ev {
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
	.foods-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.store-foods {
		width: 48%;
		display: flex;
		justify-content: center;
	}
</style>
