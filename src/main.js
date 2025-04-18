import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import echarts from 'echarts'
import axios from 'axios'

Vue.prototype.$echarts = echarts
// axios.defaults.baseURL = 'http://34.81.234.90:10801/weather/api/v1/'
// axios.defaults.baseURL = 'http://kevin0914.serv00.net:10803/weather/api/v1/'
// cloudflare workers转发
axios.defaults.baseURL = 'https://weather-forward.dragon-1110.workers.dev/api/'
// axios.defaults.baseURL = 'http://192.168.1.100:10801/weather/api/v1/'
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
