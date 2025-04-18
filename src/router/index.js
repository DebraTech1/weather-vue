import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherShow from '../components/WeatherShow.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		redirect: '/weather'
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	},
	{
		path: '/weather',
		name: 'weather',
		component: WeatherShow
	}
]

const router = new VueRouter({
	routes
})

export default router
