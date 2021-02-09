<template>
	<view class="index-page">
		<view class="top-bgc">
			<!-- 信息、搜索 -->
			<view class="index-nav">
				<image src="/static/head.png" @tap="navToPage('../login/login')"></image>
				<view class="address" @tap="chooseCity">
					<view class="add1">{{ city }}
						<uni-icons type="arrowdown" size="18" color="#FFFFFF"></uni-icons>
					</view>
					<view class="add2">晴 10℃</view>
				</view>
				<view class="search-box" @tap="navToPage('../food/food?focus=true&showSwiper=false')">
					<view class="searchPlace">
						<uni-icons type="search" size="32" color="#666666" class="search-icon"></uni-icons>
						海底捞
					</view>
				</view>
				<view class="plus" @tap="showLittleBar">
					<uni-icons type="plusempty" size="48" color="#FFFFFF"></uni-icons>
				</view>
				<view class="qipao" v-if="showQiPao">
					<view class="icon"></view>
					<view class="qipao-item" @tap="scanHandler">
						<uni-icons type="scan" size="32" color="#333333"></uni-icons>
						<text>扫一扫</text>
					</view>
					<view class="qipao-item" @tap="navToPage('../set/set')">
						<uni-icons type="gear" size="32" color="#333333"></uni-icons>
						<text>设置</text>
					</view>
				</view>
			</view>
			<!-- 扫一扫 -->
			<view class="scan-box">
				<view class="scan-item" @tap="scanHandler">
					<uni-icons type="scan" size="62" color="#FFFFFF"></uni-icons>
					<view>扫一扫</view>
				</view>
			</view>
			<!-- swiper -->
			<view class="swiper-box">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="pic in picArray" :key="pic.picId">
						<image :src="pic.picImg"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 选项：美食、便利... -->
		<view class="choose">
			<view class="c-item" v-for="item in chooseList" :key="chooseList.id" @tap="navToPage(item.url)">
				<ChooseItem :imgSrc="item.imgSrc" :text="item.text" />
			</view>
		</view>
		<!-- command -->
		<view class="command">
			<!-- 选项 -->
			<view class="com-top">
				<view class="com-bar">
					<view class="com1" 
						:class="command === 1 ? 'black' : ''"
						@tap="toggleCommand(1)"
					>人气推荐</view>
					<view class="com2" 
						:class="command === 2 ? 'black' : ''"
						@tap="toggleCommand(2)"
					>每日推荐</view>
				</view>
				<view class="com-more" @tap="navToPage('../food/food?focus=false&showSwiper=true')">
					查看更多
					<uni-icons type="arrowright" size="28" color="#808080"></uni-icons>
				</view>
			</view>
			<!-- 食物列表/人气推荐 -->
			<view class="com-content" v-if="command === 1">
				<view
					class="com-item"
					v-for="peo in peoArray"
					:key="peo.procId"
					@tap="navToPage(`../foodDetail/foodDetail?id=${peo.procId}`)"
				>
					<CommandFood :imgSrc="peo.procImg" :name="peo.procName" :price="peo.procPrice" />
				</view>
			</view>
			<!-- 食物列表/每日推荐 -->
			<view class="com-content" v-if="command === 2">
				<view
					class="com-item"
					v-for="peo in peoArray"
					:key="peo.id"
					@tap="navToPage(`../foodDetail/foodDetail?id=${peo.procId}`)"
				>
					<CommandFood :imgSrc="peo.procImg" :name="peo.procName" :price="peo.procPrice" />
				</view>
			</view>
		</view>
		<DevideLine title="精品推荐" />
		<!-- boutique command -->
		<view class="boutique">
			<view
				class="boutique-item"
				v-for="proc in proArray"
				:key="proc.procId"
				@tap="navToPage(`../foodDetail/foodDetail?id=${proc.procId}`)"
			>
				<Food
					:name="proc.procName"
					:imgSrc="proc.procImg"
					:price="proc.procPrice"
				/>
			</view>
		</view>
		<!-- near-shop -->
		<DevideLine title="附近商家" />
		<view class="near-shop">
			<view class="sort-bar">
				<view :class="activeIndex === 1 ? 'active' : ''" @tap="showThis(1)">综合排序</view>
				<view :class="activeIndex === 2 ? 'active' : ''" @tap="showThis(2)">品类</view>
				<view :class="activeIndex === 3 ? 'active' : ''" @tap="showThis(3)">销量</view>
				<view :class="activeIndex === 4 ? 'active' : ''" @tap="showThis(4)">距离</view>
			</view>
			<view
				class="near-food"
				v-for="merch in merArray"
				:key="merch.merchCode"
				@tap="navToPage(`../shop/shop?merchCode=${merch.merchCode}`)"
			>
				<Food
					:name="merch.merchName"
					:imgSrc="merch.merchImg"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import ChooseItem from '@/components/mine/chooseItem.vue'
	import CommandFood from '@/components/mine/commandFood.vue'
	import DevideLine from '@/components/mine/devideLine.vue'
	import Food from '@/components/mine/food.vue'
	export default {
		data() {
			return {
				// 用户城市信息
				city: '西安',
				longitude: '',
				latitude: '',
				// 是否显示气泡
				showQiPao: false,
				// 输入框是否在聚焦
				isFocus: false,
				// 综合排序 品类 销量 距离索引
				activeIndex: 1,
				picArray: [], // 图片集合
				peoArray: [], // 人气集合
				proArray: [], // 精品推荐集合
				merArray: [], // 附近商家集合
				qipaoList: [{
					title: '扫一扫'
				},{
					title: '设置'
				}],
				chooseList: [{
					id: 1,
					imgSrc: '/static/index1.png',
					text: '美食',
					url: '../food/food?focus=false&showSwiper=true'
				},{
					id: 2,
					imgSrc: '/static/index2.png',
					text: '便利',
					url: ''
				},{
					id: 3,
					imgSrc: '/static/index3.png',
					text: '水果',
					url: ''
				},{
					id: 4,
					imgSrc: '/static/index4.png',
					text: '甜品',
					url: ''
				},{
					id: 5,
					imgSrc: '/static/index5.png',
					text: '饮品',
					url: ''
				},{
					id: 6,
					imgSrc: '/static/index6.png',
					text: '午饭',
					url: ''
				},{
					id: 7,
					imgSrc: '/static/index7.png',
					text: '快餐',
					url: ''
				},{
					id: 8,
					imgSrc: '/static/index8.png',
					text: '买菜',
					url: ''
				},{
					id: 9,
					imgSrc: '/static/index9.png',
					text: '签到福利',
					url: ''
				}],
				command: 1,
				
			}
		},
		components: {
			uniIcons,
			ChooseItem,
			CommandFood,
			DevideLine,
			Food
		},
		methods: {
			showLittleBar() {
				this.showQiPao = !this.showQiPao;
			},
			toggleCommand(index) {
				this.command = index;
			},
			navToPage(url) {
				if (url !== '') {
					uni.navigateTo({
						url
					})
					return
				}
				uni.showToast({
					title: '敬请期待',
					icon: "none"
				})
			},
			showThis(index) {
				this.activeIndex = index;
				const type = (index - 1).toString()
				this.$axios('/store/getStoreList', {
					type: index - 1,
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					this.merArray = res.data.merArray // 附近商家集合
				})
			},
			// 扫描二维码
			scanHandler() {
				uni.scanCode({
					
				})
			},
			// 调用地图选择城市
			chooseCity() {
				uni.chooseLocation();
			}
		},
		onLoad() {
			// 获取用户城市信息
			uni.getLocation({
				geocode: true,
				success: res => {
					const longitude = res.longitude.toFixed(5).toString();
					const latitude = res.latitude.toFixed(5).toString();
					this.longitude = longitude
					this.latitude = latitude
					uni.setStorage({
						key: 'longitude',
						data: longitude
					})
					uni.setStorage({
						key: 'latitude',
						data: latitude
					})
					this.city = res.address.city.substr(0, 2);
				}
			})
			// 请求数据
			this.$axios('/store/getStoreList', {
				type: '0',
				longitude: this.longitude,
				latitude: this.latitude
			}).then(res => {
				this.picArray =  res.data.picArray // 图片集合
				this.peoArray =  res.data.peoArray // 人气集合
				this.proArray =  res.data.proArray // 精品推荐集合
				this.merArray =  res.data.merArray // 附近商家集合
			})
		}
	}
</script>

<style lang="less" scoped>
	.top-bgc {
		background-color: #f96678;
		padding-top: var(--status-bar-height);
	}
	page {
		background-color: #efefef;
	}
	.index-page {
		background-color: #efefef;
	}
	.index-nav {
		height: 78upx;
		display: flex;
		align-items: center;
		background-color: #f96678;
		padding-left: 20upx;
		padding-right: 20upx;
		position: relative;
		
		image {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			margin-right: 23upx;
		}
		
		.address {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			margin-right: 30upx;
			
			.add1 {
				font-size: 18upx;
			}
			
			.add2 {
				font-size: 16upx;
			}
		}
		
		.search-box {
			flex: 1;
			height: 58upx;
			border-radius: 29upx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #666666;
			font-size: 26upx;
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
		
		.plus {
			padding-left: 40upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
		
		.qipao {
			position: absolute;
			z-index: 9999;
			background-color: #FFFFFF;
			right: 20upx;
			top: 88upx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			border-radius: 12upx;
			
			.icon {
				height: 0;
				width: 0;
				position: absolute;
				top: -20upx;
				right: 16upx;
				border-style: solid;
				border-width: 10upx 10upx 10upx 10upx;
				border-color: transparent transparent #FFFFFF transparent;
				width: 0px;
				height: 0px;
			}
			
			.qipao-item {
				display: flex;
				margin: 0 16upx 0 10upx;
				padding: 10upx 0;
				align-items: center;
				border-bottom: 1upx solid #CCCCCC;
				
				&:last-child {
					border-bottom: none;
				}
				
				text {
					margin-left: 10upx;
					font-size: 32upx;
					color: #333333;
				}
			}
		}
	}
	.scan-box {
		height: 110upx;
		padding: 0 20upx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		
		.scan-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 0 120upx 0 20upx;
			
			&:last-child {
				margin-right: 0upx;
			}
			
			&>view {
				font-size: 20upx;
				line-height: 20upx;
				margin-top: 10upx;
				color: #FFFFFF;
			}
		}
	}
	.swiper-box {
		margin-top: 20upx;
		height: 260upx;
		padding-left: 20upx;
		padding-right: 20upx;
		
		swiper {
			height: 260upx;
			border-radius: 14upx;
			overflow: hidden;
			-webkit-transform: rotate(0deg);
		}
		
		image {
			width: 100%;
			height: 260upx;
		}
	}
	.choose {
		margin-top: 26upx;
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		border-radius: 14upx;
		padding: 19upx 10upx 11upx 10upx;
		margin-left: 20upx;
		margin-right: 20upx;
		
		.c-item {
			width: 97upx;
			height: 154upx;
			margin-right: 51upx;
		}
		
		.c-item:nth-child(5n) {
			margin-right: 0upx;
		}
	}
	.command {
		margin-top: 20upx;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-radius: 14upx;
		padding: 18upx 20upx 29upx;
		margin-left: 20upx;
		margin-right: 20upx;
		
		.com-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.com-bar {
				display: flex;
				font-size: 30upx;
				line-height: 30upx;
				
				.com1 {
					padding-right: 21upx;
					border-right: 1upx solid #000000;
					color: #808080;
				}
				
				.com2 {
					padding-left: 20upx;
					color: #808080;
				}
				
				.black {
					color: #000000;
				}
			}
			
			.com-more {
				font-size: 28upx;
				line-height: 28upx;
				color: #808080;
			}
			
		}
		
		.com-content {
			display: flex;
			overflow-x: scroll;
			overflow-y: hidden;
			
			.com-item {
				padding-top: 30upx;
				margin-right: 44upx;
				width: 20%;
			}
		}
	}
	.boutique {
		margin-left: 20upx;
		margin-right: 20upx;
		background-color: #efefef;
		
		.boutique-item {
			margin-bottom: 20upx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.near-shop {
		background-color: #efefef;
		
		.sort-bar {
			height: 88upx;
			padding: 0 42upx;
			font-size: 28upx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			
			.active {
				color: #f75f78;
			}
			
			view {
				margin-right: 52upx;
			}
		}
		
		.near-food {
			margin: 20upx;
		}
	}
	
</style>
