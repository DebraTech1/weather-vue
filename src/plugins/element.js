import Vue from 'vue'
import {
	Button,
	Row,
	Col,
	DatePicker,
	Loading,
	Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Loading)

Vue.prototype.$message = Message
