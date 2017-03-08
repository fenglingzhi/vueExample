// 根级别全局信息
import * as api from '../../api/baseApi'

// 全局基础模块
const state = {
	wxconfig:{},
	cityData:[],
	wxInfo:{},//包含openid等信息
}

const actions = {
	FETCH_WX_CONFIG:({commit,state},url) => {
		return api.getWXConfig(url)
			.then(resp=>{
				let Data = resp.data.data
				commit('SET_WX_CONFIG',{Data})
			})
	},
	FETCH_STATIC_WX_CONFIG:({commit,state}) => {
		return api.getStaticWXConfig()
			.then(resp => {
				let Data = resp.data.Data
				commit('SET_WX_CONFIG',{Data})
			})
	},
	FETCH_BASE_CITY:({commit,state}) => {
		return api.getCityInfo()
			.then(resp=>{
				let Data = resp.data.Data
				commit('SET_BASE_CITY',{Data})
			})
	},
	FETCH_WX_INFO:({commit,state},body) => {
		return api.getWXInfo(body)
			.then(resp=>{
				let Data = resp.data.data
				commit('SET_WX_INFO',{Data})
			})
	}

}

const mutations = {
	SET_WX_CONFIG:(state,{Data}) => {
		state.wxconfig = Data
	},
	SET_BASE_CITY:(state,{Data}) => {
		state.cityData = Data
	},
	SET_WX_INFO:(state,{Data}) => {
		state.wxInfo = Data
	}
} 

const getters = {
	activeWXConfig(state){
		return state.wxconfig
	},
	activeCityData(state){
		return state.cityData
	},
	activeWXInfo(state){
		return state.wxInfo
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}