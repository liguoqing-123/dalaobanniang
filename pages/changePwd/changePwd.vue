<template>
	<view class="change-page">
		<view class="input-box">
			<view>手机号</view>
			<input type="text" placeholder="请输入手机号" v-model="phone">
		</view>
		<view class="input-box">
			<view>旧密码</view>
			<input type="text" placeholder="请输入旧密码" v-model="remPassword" />
		</view>
		<view class="input-box">
			<view>新密码</view>
			<input type="text" placeholder="请输入新密码" v-model="password" />
		</view>
		<view class="input-box">
			<view>确认新密码</view>
			<input type="text" placeholder="请确认新密码" v-model="rePassword" />
		</view>
		<view class="input-box">
			<view>验证码</view>
			<input type="text" placeholder="请输入验证码" v-model="cacheCode" />
			<view class="button" @tap="getCache" v-if="!showTime">获取验证码</view>
			<view class="button" v-else>{{ time }} s</view>
		</view>
		<view class="button" @tap="sure">
			确认修改
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				rePassword: '',
				cacheCode: '',
				showTime: false,
				time: 60,
				remPassword: ''
			};
		},
		onLoad() {
			this.phone = uni.getStorageSync('phone');
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
			// 获取验证码
			getCache() {
				this.$axios('/sms/sendSms', {
					smsType: 4,
					userPhone: this.phone
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
			sure() {
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入新密码',
						icon: 'none'
					});
					return;
				}
				if (this.password !== this.rePassword) {
					uni.showToast({
						title: '确认密码错误',
						icon: 'none'
					});
					return;
				}
				if (!this.cacheCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return;
				}
				if (this.remPassword === this.password) {
					uni.showToast({
						title: '新密码不可与旧密码相同',
						icon: 'none'
					});
					return;
				}
				// 网络请求修改密码
				this.$axios('/index/changePwd', {
					userPhone: this.phone,
					newUserPwd: this.password,
					oldUserPwd: this.remPassword,
					smsCode: this.cacheCode
				}).then(res => {
					console.log(res);
					if (res.data.retCode === '000000') {
						uni.showToast({
							title: '修改成功',
							success: () => {
								this.password = '';
								this.rePassword = '';
								this.cacheCode = '';
								this.remPassword = '';
							}
						});
					} else {
						uni.showToast({
							title: res.data.retMsg,
							icon: 'none'
						});
					}
				}).catch(err => {
					console.log(err);
				});
			}
		}
	}
</script>

<style lang="less">
.input-box {
	height: 100rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	background-color: #FFFFFF;
	margin-bottom: 20rpx;
	
	view {
		width: 200rpx;
	}
	
	.button {
		font-size: 24rpx;
		width: 170rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-left: 1upx solid #c0c0c0;
		height: 68upx;
		color: #be6c34;
	}
	
	input {
		flex: 1;
	}
}
.change-page > .button {
	height: 88rpx;
	width: 80%;
	margin: 40rpx auto;
	color: #FFFFFF;
	background-color: #f75f78;
	display: flex;
	border-radius: 12rpx;
	align-items: center;
	justify-content: center;
}
</style>
