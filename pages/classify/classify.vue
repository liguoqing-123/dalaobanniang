<template>
	<view class="classify-page">
		<!-- 导航栏 -->
		<view class="classify-nav" :style="`height: ${navHeight};`">
			<view class="title">分类</view>
			<view class="search" @tap="navToPage('../food/food?focus=true&showSwiper=false')">
				<view class="searchPlace">
					<uni-icons type="search" size="32" color="#666666" class="search-icon"></uni-icons>
					海底捞
				</view>
			</view>
		</view>
		<!-- 分类 -->
		<view class="classify-container">
			<!-- 选项卡 -->
			<view class="left-bar">
				<view class="bar" 
					v-for="item in proClassArray"
					:key="item.procClassId"
					:class="barIndex === item.procClassId ? 'active' : ''"
					@tap="toggleView(item.procClassId)"
				>
					{{ item.procClassName }}
				</view>
			</view>
			<!-- 内容展示区 -->
			<view class="container">
				<!-- 轮播图 -->
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" v-if="swiperList.length">
					<swiper-item v-for="(item, index) in swiperList" :key="index.picId">
						<image :src="item.picImg"></image>
					</swiper-item>
				</swiper>
				<!-- 食物区 -->
				<view class="foods">
					<view
						class="food-item"
						v-for="food in foodList"
						:key="food.procId"
						@tap="navToPage(`../foodDetail/foodDetail?id=${food.procId}&merchCode=${food.merchCode}`)"
					>
						<FoodCard 
							:id="food.procId"
							:img="food.procImg"
							:name="food.procName"
							:price="food.procPrice"
							:merchCode="food.merchCode"
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
	import FoodCard from '@/components/mine/foodCard.vue'
	export default {
		data() {
			return {
				// 输入框是否在聚焦
				isFocus: false,
				barIndex: 1,
				proClassArray: [],
				foodList: [],
				swiperList: [],
				userId: '',
				token: ''
			};
		},
		onLoad() {
			this.userId = this.$userId;
			this.token = this.$token;
			this.$axios('/store/getStoreClass', {
				procClassId: ''
			}).then(res => {
				this.foodList = res.data.array;
				this.proClassArray = res.data.proClassArray;
				this.swiperList = res.data.puctureImg;
			}).catch(err => {
				console.log('err', err);
			});
		},
		components: {
			uniIcons,
			FoodCard
		},
		methods: {
			toggleView(id) {
				this.barIndex = id;
				this.$axios('/store/getStoreClass', {
					procClassId: id
				}).then(res => {
					this.foodList = res.data.array;
				}).catch(err => {
					console.log('err', err);
				});
			},
			navToPage(url) {
				uni.navigateTo({
					url
				})
			}
		},
		computed: {
			navHeight() {
				let statusHeight;
				uni.getSystemInfo({
					success: function(e) {
						statusHeight = e.statusBarHeight;
					}
				})
				return uni.upx2px(88) + statusHeight +　'px';
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}
	.classify-page {
		margin-top: var(--status-bar-height);
		background-color: #efefef;
		height: 100%;
		padding-top: 88upx;
	}
	.classify-nav {
		background-color: #FFFFFF;
		padding-top: var(--status-bar-height);
		padding-left: 50upx;
		padding-right: 14upx;
		align-items: center;
		display: flex;
		position: fixed;
		z-index: 999;
		top: 0;
		width: 100%;
		
		.title {
			font-size: 36upx;
			margin-right: 78upx;
		}
		
		.search {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			flex: 1;
			height: 58upx;
			border-radius: 29upx;
			background-color: #efefef;
			color: #666666;
			position: relative;
			
			.searchPlace {
				position: absolute;
				z-index: 999;
				font-size: 28upx;
				color: #666666;
				height: 58upx;
				display: flex;
				align-items: center;
				
				.search-icon {
					margin-right: 16upx;
				}
			}
			
			.search-text {
				width: 100%;
				height: 58upx;
				line-height: 58upx;
				margin-left: 20upx;
				text-align: center;
			}
		}
	}
	.classify-container {
		display: flex;
		position: relative;
		padding-left: 170upx;
		
		.left-bar {
			background-color: #FFFFFF;
			height: 1095upx;
			width: 170upx;
			font-size: 32upx;
			flex-shrink: 0;
			position: fixed;
			z-index: 999;
			left: 0;
			
			.bar {
				height: 88upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.active {
				background-color: #efefef;
				color: #fa5d78;
			}
		}
		.container {
			position: relative;
			padding: 20upx;
			swiper {
				width: 540upx;
				height: 226upx;
				border-radius: 5upx;
				overflow: hidden;
				-webkit-transform: rotate(0deg);
				
				image {
					width: 540upx;
					height: 226upx;
				}
			}
			
			.foods {
				padding-top: 5upx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				
				.food-item {
					margin-top: 28upx;
					width: 258upx;
				}
			}
		}
	}
</style>
