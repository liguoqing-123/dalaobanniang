<template>
	<view class="boss-page">
		<view class="boss-container">
			<template v-if="pageIndex === 0">
			</template>
			<template v-if="pageIndex === 1">
				<BossMine />
			</template>
		</view>
		<!-- 底部tabBar -->
		<view class="tab-bar">
			<view :class="pageIndex === 0 ? 'active' : ''" @tap="changePage(0)">订单</view>
			<view :class="pageIndex === 1 ? 'active' : ''" @tap="changePage(1)">我的</view>
		</view>
	</view>
</template>
<script>
	import BossMine from '@/components/mine/bossMine.vue'
	export default {
		data() {
			return {
				pageIndex: 0
			};
		},
		methods: {
			changePage(index) {
				this.pageIndex = index;
			}
		},
		components: {
			BossMine
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
		background-color: #efefef;
	}
	.boss-page {
		padding-bottom: 50px;
	}
	.status-bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.boss-nav {
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
			width: 36upx;
			height: 36upx;
		}
	}
	.boss-container {
		position: relative;
	}
	.tab-bar {
		width: 100%;
		height: 50px;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		display: flex;
		align-items: stretch;
		
		view {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #000000;
			font-size: 18px;
		}
		
		.active {
			color: #f75f78;
		}
	}
</style>
