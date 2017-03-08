import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import bank from './modules/bank'
import mall from './modules/mall'


Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		base,
		bank,
		mall
	}
})

export default store