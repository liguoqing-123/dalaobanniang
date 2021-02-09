<template>
	<view class="addcard-page">
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		<!-- 导航栏 -->
		<view class="addcard-nav">
			<view class="side" @tap="navBack">
				<uni-icons type="back" size="48" color="#b3b3b3"></uni-icons>
				<text>返回</text>
			</view>
			<view>绑定银行卡</view>
			<view class="side"></view>
		</view>
		<!-- 内容区 -->
		<view class="addcard-container">
			<!-- 安全提示 -->
			<view class="safe-tip">信息加密处理，仅用于银行验证</view>
			<!-- 姓名、银行卡号、开户行、手机号码 -->
			<view class="inputbox">
				<view>姓名</view>
				<input type="text" placeholder="请输入您的姓名" v-model="userName" />
			</view>
			<view class="inputbox">
				<view>银行卡号</view>
				<input type="text" placeholder="请输入您的身份证号" v-model="accNum" />
			</view>
			<view class="inputbox">
				<view>开户行</view>
				<input type="text" v-model="accBank" />
			</view>
			<view class="inputbox">
				<view>开户行地址</view>
				<input type="text" v-model="accAddress" />
			</view>
			<view class="inputbox">
				<view>手机号码</view>
				<input type="text" placeholder="请填写银行预留手机号" v-model="userPhone" />
			</view>
			<!-- 验证码 -->
			<view class="code">
				<view>验证码</view>
				<input type="text" v-model="safeCode" placeholder="请输入手机验证码" />
				<view class="button" @tap="getCache" v-if="!showTime">获取验证码</view>
				<view class="button" v-else>{{ time }} s</view>
			</view>
			<!-- 默认收款账户 -->
			<view class="default-bank">
				<view>设为默认收款账户</view>
				<switch :checked="isDefault" @tap="toggleSwitch" />
			</view>
			<!-- 确定按钮 -->
			<view class="commit-btn button" @tap="addCardHandler()">确定</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				userName: '',
				accNum: '',
				accBank: '',
				accAddress: '',
				userPhone: '',
				isDefault: false,
				safeCode: '',
				time: 60,
				showTime: false,
				inputList: [{
					id: 1,
					title: '姓名',
					type: 'text',
					placeholder:'请输入您的姓名'
				},{
					id: 2,
					title: '银行卡号',
					type: 'number',
					placeholder:'请输入您的身份证号'
				},{
					id: 3,
					title: '开户行',
					type: 'text',
					placeholder:''
				},{
					id: 4,
					title: '开户行地址',
					type: 'text',
					placeholder:''
				},{
					id: 5,
					title: '手机号码',
					type: 'number',
					placeholder:'请填写银行预留手机号'
				}]
			};
		},
		components: {
			uniIcons
		},
		methods: {
			// 显示倒计时
			showTimeHandler() {
				this.time = 60;
				this.showTime = true;
				const timer = setInterval(() => {
					this.time --;
					if (this.time <= 0) {
						clearInterval(timer);
						this.showTime = false;
					}
				}, 1000);
			},
			getCache() {
				this.$axios('/sms/sendSms', {
					smsType: 4,
					userPhone: this.userPhone
				}).then(res => {
					console.log(res);
					this.showTimeHandler();
				}).catch(err => {
					uni.showToast({
						title: '未知异常',
						icon: 'none'
					})
				});
			},
			toggleSwitch() {
				this.isDefault = !this.isDefault;
			},
			navBack() {
				uni.navigateBack();
			},
			addCardHandler() {
				const {userName, accNum, accBank, accAddress, userPhone, accId, safeCode} = this;
				if (!(userName && accNum && accBank && accAddress && userPhone)) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					});
					return;
				}
				if (!safeCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return;
				}
				this.$axios('/index/addBack', {
					userName,
					accNum,
					accBank,
					accAddress,
					userPhone,
					smsCode: this.safeCode,
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
							title: '添加成功'
						});
						if (this.isDefault) {
							uni.setStorageSync('defaultCard', {
								accNum,
								accBank,
								accAddress,
								accId
							});
						}
						uni.navigateBack();
					}
				}).catch(err => {
					console.log(err);
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}
	.addcard-page {
		height: 100%;
		margin-top: var(--status-bar-height);
		background-color: #efefef;
		position: relative;
		padding-top: 88upx;
	}
	.status-bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
	}
	.addcard-nav {
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
		
		.side {
			width: 200upx;
			height: 88upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			transform: translateX(-10upx);
			
			text {
				font-size: 28upx;
				color: #000000;
			}
		}
	}
	.safe-tip {
		height: 41upx;
		padding: 0 20upx;
		font-size: 18upx;
		display: flex;
		align-items: center;
		color: #000000;
	}
	.inputbox {
		padding: 0 20upx;
		height: 88upx;
		margin-bottom: 1upx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		
		&:last-child {
			margin-bottom: 0upx;
		}
		
		view {
			font-size: 32upx;
			color: #000000;
			width: 252upx;
			flex-shrink: 0;
		}
		input {
			flex: 1;
			font-size: 22upx;
			color: #333333;
			height: 88upx;
			
			&:-webkit-input-placeholder {
				color: #BBBBBB;
				font-size: 22upx;
			}
		}
	}
	.code {
		height: 88upx;
		margin: 10upx 0;
		padding: 0 20upx;
		align-items: center;
		display: flex;
		background-color: #FFFFFF;
		
		view:first-child {
			font-size: 32upx;
			color: #000000;
			width: 252upx;
			flex-shrink: 0;
		}
		
		input {
			flex: 1;
			height: 88upx;
			font-size: 24upx;
			color: #333333;
			
			&:-webkit-input-placeholder {
				color: #BBBBBB;
				font-size: 24upx;
			}
		}
		
		view:last-child {
			font-size: 24upx;
			color: #be6c34;
			width: 184upx;
			flex-shrink: 0;
			padding-left: 44upx;
			height: 68upx;
			display: flex;
			align-items: center;
			border-left: 1upx solid #c0c0c0;
		}
	}
	.default-bank {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		margin-bottom: 40upx;
		height: 88upx;
		
		view {
			font-size: 24upx;
			color: #999999;
			padding: 0 20upx;
			flex: 1;
		}
	}
	.commit-btn {
		margin: 0 20upx;
		width: 710upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background-color: #f75f78;
		font-size: 32upx;
		border-radius: 44upx;
	}
</style>
