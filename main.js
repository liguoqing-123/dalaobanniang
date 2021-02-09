import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.mixin({
	onLoad: function() {
		const userId = uni.getStorageSync('userId') || '';
		const token = uni.getStorageSync('token') || '';
		this.$userId = userId;
		this.$token = token;
	}
});

Vue.prototype.$axios = function(url, data) {
	url = 'http://47.108.53.184' + url;
	data = data || {};
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method: 'POST',
			// header: {
			// 	'content-type': 'application/x-www-form-urlencoded',
			// },
			sslVerify: false,
			data: data,
			success(res) {
				resolve(res);
			},
			fail(err) {
				reject(err);
			}
		})
	})
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
