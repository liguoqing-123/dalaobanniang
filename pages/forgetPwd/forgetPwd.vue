<template>
	<view class="forget-page">
		<view class="input-box">
			<view>手机号</view>
			<input type="text" placeholder="请输入手机号" v-model="phone">
		</view>
		<view class="input-box">
			<view>新密码</view>
			<input type="text" placeholder="请输入密码" v-model="password" />
		</view>
		<view class="input-box">
			<view>确认新密码</view>
			<input type="text" placeholder="请确认密码" v-model="rePassword" />
		</view>
		<view class="button" @tap="sure">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				rePassword: ''
			};
		},
		onLoad() {
			this.phone = uni.getStorageSync('phone');
		},
		methods: {
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
				this.$axios('/index/fogotPwd', {
					userPhone: this.phone,
					newUserPswd: this.password
				}).then(res => {
					if (res.data.retCode === '000000') {
						uni.showToast({
							title: '重置密码成功',
							icon: 'none',
							success: () => {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						})
					}
				}).catch(err => {
					console.log(err);
				})
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
	
	input {
		flex: 1;
	}
}
.button {
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
