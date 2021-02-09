<template>
	<view class="food-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏、轮播图 -->
		<view class="food-swiper">
			
			<!-- 导航栏、搜索框 -->
			<view
				class="food-nav"
				:style="!showSwiper ? `background-color: #FFFFFF;` : ''"
			>
				<!-- 返回按钮 -->
				<uni-icons
					class="side"
					type="back"
					size="48"
					:color="!showSwiper ? '#b3b3b3' : '#FFFFFF'"
					@tap="navBack"
				></uni-icons>
				
				<!-- 搜索框 -->
				<view class="search-box">
					<view class="searchPlace" v-if="!isFocus">
						<uni-icons v-if="showSearch" type="search" size="32" color="#666666" class="search-icon"></uni-icons>
						<!-- 海底捞 -->
					</view>
					<!-- 输入框 -->
					<input
						type="text"
						v-model="searchText"
						:style="!showSwiper ? `background-color: #efefef;` : ''"
						@focus="isFocusInput(true)"
						@blur="isFocusInput(false)"
						:focus="isFocus"
					/>
				</view>
				<view class="side" >
					<!-- 搜索按钮 -->
					<view class="search-btn" v-show="isFocus" @tap.stop="search">
						搜索
					</view>
				</view>
			</view>
			
			<!-- 轮播图 -->
			<swiper
				v-show="showSwiper"
				:indicator-dots="true"
				:autoplay="true"
				:interval="3000"
				:duration="1000"
			>
				<!-- 轮播组件 -->
				<swiper-item
					v-for="pic in picArray"
					:key="pic.picId"
				>
					<image :src="pic.picImg"></image>
				</swiper-item>
			</swiper>
			
			<!-- 不显示轮播图时的占位元素 -->
			<view
				v-show="!showSwiper"
				class="null"
				:style="isFocus || showchooseBar ? 'height: 88upx;' : 'height: 303upx;'"
			></view>
		</view>
		
		<!-- 内容区 -->
		<view class="food-container" :style="!showSwiper ? `padding-top: 88upx;` : ''">
			<!-- 选项区 -->
			<view
				class="pulldown-bar"
				:style="!showSwiper ? `position: fixed;top:${top};z-index:999;` : ''"
			>
				<view 
					class="pull--item"
					v-for="item in pullList"
					:key="item.id"
					:class="item.id === activeIndex ? 'active' : ''"
					@tap="toggleView(item.id)"
				>
					{{ item.title }}
					<uni-icons
						class="pull-icon"
						size="24"
						:type="item.id === activeIndex && showchooseBar ? 'arrowup' : 'arrowdown'"
						:color="item.id === activeIndex ? 'active' : ''"
					></uni-icons>
				</view>
			</view>
			<!-- '#fa5e76' : '#808080' -->
			<!-- 食物列表 -->
			<view class="food-list">
				<!-- 每一个食物 -->
				<view 
					class="food-item" 
					v-for="proc in proArray" 
					:key="proc.Id"
					@tap="navToPage(`../shop/shop?merchCode=${proc.merchCode}`)"
				>
					<Food
						:name="proc.merchName"
						:imgSrc="proc.merchPic"
						:price="proc.procPrice"
					/>
				</view>
			</view>
		</view>
		<!-- 弹出层组件 -->
		<uniPopup type="top" ref="popup">
			<!-- 弹出层插槽 -->
			<view 
				class="popup" 
				:style="`margin-top: ${popupTop};`"
			>
				<!-- 弹出层的每一项数据 -->
				<view 
					class="pop-item" 
					v-for="item in popupList" 
					:key="item.procClassId"
				>
					<!-- 每项弹出层左边的试图 -->
					<view 
						class="pop-title"
						:class="popupItemIndex === item.id ? 'active' : ''" 
						@tap="togglePopup(item.procClassId)"
					>
						{{ item.procClassName }}
					</view>
				</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import Food from '@/components/mine/food.vue'
	import uniPopup from '@/components/uni/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				showSearch: true,
				// 输入框是否在聚焦
				isFocus: false,
				// 是否需要显示轮播图
				showSwiper: true,
				// 输入框双向绑定 value
				searchText: '',
				// 选择列表索引
				activeIndex: 1,
				// 是否显示选择栏
				showchooseBar: false,
				// 显示弹出层的第几项
				popupItemIndex: 1,
				longitude: '', // 维度
				latitude: '', // 纬度
				picArray: [], // 轮播图
				proArray: [], // 食物列表
				// 弹出层 padding-top 值
				pullList: [{
					id: 1,
					title: '全部美食'
				},{
					id: 2,
					title: '附近'
				},{
					id: 3,
					title: '销量'
				}],
				// popupList
				popupList: []
			};
		},
		components: {
			uniIcons,
			Food,
			uniPopup
		},
		computed: {
			top() {
				let statusHeight;
				uni.getSystemInfo({
					success: (res) => {
						statusHeight = res.statusBarHeight
					}
				})
				return uni.upx2px(88) + statusHeight + 'px';
			},
			// 弹出层 padding-top 值
			popupTop() {
				let statusHeight;
				uni.getSystemInfo({
					success(res) {
						statusHeight = res.statusBarHeight
					}
				});
				return uni.upx2px(176) + statusHeight + 'px';
			}
		},
		watch: {
			searchText(val) {
				if (!val) {
					this.showSearch = true;
				} else {
					this.showSearch = false;
				}
			}
		},
		methods: {
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
				// 根据目前高亮显示的 bar 来进行网络请求
				const barType = (this.activeIndex).toString()
				this.$axios('/store/getfood', {
					classId: '',
					type: barType,
					inputContent: this.searchText,
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					if (res.statusCode === 200) {
						const data = res.data
						this.picArray = data.merchContent
						this.proArray = data.array
					}
				})
			},
			togglePopup(id) {
				this.showSwiper = true;
				this.$refs.popup.close();
				const barType = (this.activeIndex).toString()
				this.$axios('/store/getfood', {
					classId: id,
					type: barType,
					inputContent: this.searchText,
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					if (res.statusCode === 200) {
						const data = res.data
						this.picArray = data.merchContent
						this.proArray = data.array
					}
				})
			},
			navToPage(url) {
				uni.navigateTo({
					url
				})
			},
			isFocusInput(flag) {
				this.isFocus = flag;
				if (flag) {
					this.showSwiper = false;
					this.$refs.popup.open();
				} else {
					this.showSwiper = false;
				}
			},
			search() {
				this.showSwiper = true;
				this.$refs.popup.close();
				const barType = (this.activeIndex).toString()
				this.$axios('/store/getfood', {
					classId: '',
					type: barType,
					inputContent: this.searchText,
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					console.log(res);
					const data = res.data
					this.picArray = data.merchContent
					this.proArray = data.array
				})
			}
		},
		onLoad(e) {
			// 控制页面显示
			this.isFocus = e.focus === 'true' ? true : false;
			this.showSwiper = e.showSwiper === 'true' ? true : false;
			if (!this.showSwiper) {
				this.$nextTick(function(){
					this.$refs.popup.open();
				})
			}
			// 获取地理位置，本地存储
			this.longitude = uni.getStorageSync('longitude');
			this.latitude = uni.getStorageSync('latitude');
			// 网络请求食物列表
			const barType = '1';
			this.$axios('/store/getfood', {
				classId: '',
				type: barType,
				inputContent: this.searchText,
				longitude: this.longitude,
				latitude: this.latitude
			}).then(res => {
				const data = res.data
				this.picArray = data.merchContent
				this.proArray = data.array
			})
			// 网络请求弹出层
			this.$axios('/store/getStoreClass', {
				procClassId: ''
			}).then(res => {
				this.popupList = res.data.proClassArray;
			}).catch(err => {
				console.log('err', err);
			});
		},
		onPageScroll(e) {
			let top = e.scrollTop
			let toggleTop = uni.upx2px(215);
			if (top >= toggleTop) {
				this.showSwiper = false;
			} else {
				this.showSwiper = true;
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
		background-color: #efefef;
	}
	.food-page {
		margin-top: var(--status-bar-height);
		background-color: #efefef;
		position: relative;
	}
	.status-bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	
	.null {
		height: 303upx;
		width: 100%;
		background-color: #FFFFFF;
	}
	.food-swiper {
		width: 100%;
		position: relative;
		
		swiper {
			height: 303upx;
			width: 100%;
			
			image {
				height: 303upx;
				width: 100%;
			}
		}
		
		.food-nav {
			width: 100%;
			height: 88upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #000000;
			padding: 0 20upx;
			position: fixed;
			top: var(--status-bar-height);
			z-index: 999;
		
			.side {
				width: 48upx;
				height: 48upx;
				display: flex;
				align-items: center;
			}
			
			.search-btn {
				height: 48upx;
				font-size: 24upx;
				color: #333333;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				white-space: nowrap;
				width: 100%;
			}
			
			.search-box {
				width: 460upx;
				height: 58upx;
				background-color: #FFFFFF;
				border-radius: 29upx;
				font-size: 26upx;
				overflow: hidden;
				-webkit-transform: rotate(0deg);
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				
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
				
				input {
					width: 460upx;
					height: 58upx;
					font-size: 26upx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666666;
					text-align: center;
				}
			}
		}
	}
	
	.food-container {
		position: relative;
	}
	
	.pulldown-bar {
		height: 88upx;
		padding: 0 40upx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		width: 100%;
		
		.pull--item {
			color: #808080;
			font-size: 26upx;
			margin-right: 40upx;
			display: flex;
			align-items: center;
			
			&.active {
				color: #fa5e76;
			}
			
			.pull-icon {
				margin-left: 15upx;
			}
		}
	}
	.food-list {
		
		.food-item {
			margin: 20upx;
		}
	}

	.popup {
		width: 100%;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		
		.pop-item {
			height: 88upx;
			font-size: 24upx;
			display: flex;
			flex-direction: column;
			width: 50%;
			overflow: visible;
			
			.pop-title {
				flex: 1;
				display: flex;
				align-items: center;
				padding-left: 40upx;
				
				&:hover {
					background-color: #efefef;
					color: #f85e78;
				}
			}
		}
	}
</style>
