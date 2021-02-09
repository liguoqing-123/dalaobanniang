<template>
	<view class="team-income">
		<view class="team-title">
			<view class="team-dot"></view>
			<view class="team-title">{{ theme }}</view>
		</view>
		<view class="team-num">
			￥<text>{{ num }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TeamIncome',
		props: {
			num: {
				type: [Number, String],
				default() {
					return 0;
				}
			},
			theme: {
				type: String,
				default() {
					return '';
				}
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.team-income {
		width: 330upx;
		height: 160upx;
		background-color: #edeaff;
		border-radius: 10upx;
		display: flex;
		align-items: stretch;
		padding: 20upx 0 2upx;
		flex-direction: column;
		margin-top: 20upx;
		
		.team-title {
			height: 24upx;
			font-size: 24upx;
			line-height: 24upx;
			display: flex;
			align-items: center;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			
			.team-dot {
				background-color: #f75f78;
				width: 10upx;
				height: 10upx;
				border-radius: 50%;
				margin-left: 20upx;
				margin-right: 30upx;
			}
			
			.team-title {
				color: #808080;
			}
		}
		
		.team-num {
			height: 116upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			line-height: 26upx;
			letter-spacing: 4upx;
		}
		
	}
</style>
