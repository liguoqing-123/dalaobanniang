<template>
	<view class="login">
		<!-- 登录 -->
		<view class="login-title">
			<uni-icons @tap="switchToPage('../index/index')" class="side" type="back" size="48" color="#FFFFFF"></uni-icons>
			<view>登录</view>
			<view class="side"></view>
		</view>
		<!-- 页面区域 -->
		<view class="login-content">
			<!-- 你好 -->
			<view class="showbar">
				<view class="show-item">你好，</view>
				<view class="show-item">欢迎来到大老板娘</view>
			</view>
			<!-- 输入框 -->
			<view class="input">
				<!-- 手机号 -->
				<view class="inputbox">
					<input 
						type="number"
						placeholder="请输入手机号码"
						:adjust-position="false"
						:maxlength="11"
						v-model="phone"
					/>
					<view class="clearbtn" @tap="clearPhone">
						<uni-icons type="clear" size="24" color="#cbcacf"></uni-icons>
					</view>
				</view>
				<!-- 密码 -->
				<view class="inputbox">
					<input 
						type="password"
						placeholder="请输入密码"
						:adjust-position="false"
						v-model="password"
					/>
				</view>
				<!-- 记住/忘记密码 -->
				<view class="rem-pwd">
					<view class="rem">
						<label @tap="remForPwd">
							<view class="rem-icon">
								<!-- circle / checkbox-filled -->
								<uni-icons :type="rememberPwd ? 'checkbox-filled' : 'circle'" size="24" color="#FFFFFF"></uni-icons>
							</view>
							<view>记住密码</view>
						</label>
					</view>
					<view class="forget" @tap="forgetPwd">忘记密码</view>
				</view>
				<view class="boss-login">
					<label @tap="bossLoginHandler">
						<view class="rem-icon">
							<!-- circle / checkbox-filled -->
							<uni-icons :type="bossLogin ? 'checkbox-filled' : 'circle'" size="24" color="#FFFFFF"></uni-icons>
						</view>
						<view>商家登录</view>
					</label>
				</view>
				<!-- 按钮 -->
				<view class="logon-register" @tap="loginHandler">登录/注册</view>
				<!-- 第三方登录 -->
				<view class="other-login-methods">
					<view class="line"></view>
					<view class="text">其他登录方式</view>
					<view class="line"></view>
				</view>
				<view class="other-login">
					<image src="/static/weixin.png" @tap="otherLogin"></image>
					<image src="/static/qq.png" @tap="otherLogin"></image>
					<image src="/static/weibo.png" @tap="otherLogin"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		name: 'login',
		data() {
			return {
				// 记住用户名
				rememberPwd: true,
				// 商家登录
				bossLogin: false,
				// 用户输入的电话号
				phone: '',
				password: ''
			};
		},
		components: {
			uniIcons
		},
		methods: {
			// 忘记密码
			forgetPwd() {
				uni.navigateTo({
					url: '../forgetPwd/forgetPwd'
				});
			},
			remForPwd() {
				this.rememberPwd = !this.rememberPwd;
			},
			clearPhone() {
				this.phone = '';
			},
			switchToPage(url) {
				uni.switchTab({
					url
				})
			},
			bossLoginHandler() {
				this.bossLogin = !this.bossLogin;
			},
			loginHandler() {
				const type = this.bossLogin ? 1 : 0;
				this.$axios('/index/login', {
					userPhone: this.phone,
					userPswd: this.password,
					type
				}).then(res => {
					if (res.data.retCode === '0000033') {
						uni.showToast({
							title: '登陆超时，请重新登录',
							icon: 'none'
						});
						return;
					}
					if (res.data.retCode !== '000000') {
						uni.showToast({
							title: '密码错误',
							icon: 'none'
						});
						return;
					}
					const {userId, token} = res.data;
					uni.setStorageSync('userId', userId);
					uni.setStorageSync('token', token);
					uni.setStorageSync('phone', this.phone);
					if (this.rememberPwd) {
						uni.setStorageSync('password', this.password);
					}
					if (type === 1) {
						uni.navigateTo({
							url: '../bossPage/bossPage'
						})
					} else if (type === 0) {
						uni.switchTab({
							url: '../index/index'
						})
					}
				}).catch(err => {
					console.log(err);
				});
			},
			otherLogin() {
				uni.showToast({
					icon: 'none',
					title: '敬请期待'
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}
	.login {
		padding-top: var(--status-bar-height);
		background-image: url(../../static/loginbg.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		height: 100%;
	}
	.login-title {
		display: flex;
		font-size: 32upx;
		justify-content: space-between;
		padding: 20upx;
		height: 44upx;
		align-items: center;
		color: #FFFFFF;
		
		.side {
			width: 200upx;
			height: 88upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}
	.login-content {
		padding: 0 80upx;
	}
	.showbar {
		padding-top: 128upx;
		
		.show-item {
			letter-spacing: 2upx;
			line-height: 48upx;
			font-size: 36upx;
			color: #FFFFFF;
		}
	}
	.input {
		padding-top: 87upx;
		
		.inputbox {
			height: 125upx;
			border-bottom: 2upx solid #cccccc;
			display: flex;
			align-items: flex-end;
			
			.clearbtn {
				width: 38upx;
				height: 38upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
			
			input {
				height: 42upx;
				line-height: 42upx;
				font-size: 24upx;
				color: #b3b3b3;
				flex: 1;
			}
			
			view {
				width: 24upx;
				flex-shrink: 0;
			}
		}
		.rem-pwd {
			height: 84upx;
			font-size: 24upx;
			line-height: 24upx;
			color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.rem {
				label {
					display: flex;
				}
				
				.rem-icon {
					margin-right: 20upx;
				}
			}
		}
		.boss-login {
			height: 84upx;
			font-size: 24upx;
			line-height: 24upx;
			display: flex;
			color: #FFFFFF;
			justify-content: flex-start;
			align-items: center;
			
			label {
				display: flex;
				
				.rem-icon {
					margin-right: 20upx;
				}
			}
		}
		.logon-register {
			margin-top: 89upx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 88upx;
			border-radius: 44upx;
			background-color: #f75f78;
			color: #FFFFFF;
			font-size: 32upx;
		}
		.other-login-methods {
			margin-top: 118upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.line {
				background: #cccccc;
				height: 2upx;
				flex: 1;
			}
			.text {
				flex-shrink: 0;
				color: #cccccc;
				font-size: 24upx;
				margin: 0 24upx;
			}
		}
		.other-login {
			margin-top: 50upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			image {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
	}
</style>
