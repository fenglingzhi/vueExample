// 微银行模块
import * as api from '../../api/bankApi'
const state = {
	bankBusiness:{},//微银行首页业务
	cardList:[],//用户银行卡列表
	bankService:[],//微银行实体业务
	userInfo:{},//用户信息
}

const actions = {
	// 获取银行首页业务
	FETCH_BANK_BUSINESS:({commit,state},body) => {
		return api.GetWeiBankIndex(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_BANK_BUSINESS',{Data})
			})
	},
	//根据openid获取用户信息
	FETCH_USER_INFO:({commit,state}) => {
		return api.GetUserInfoById()
			.then(resp => {
				let Data = resp.data.data
				commit('SET_USERINFO',{Data})
			})
	},
	// 切换城市获取银行首页业务
	FETCH_BANK_BUSINESS_BYCITY:({commit,state},body) => {
		return api.GetWeiBankIndexByCity(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_BANK_BUSINESS',{Data})
			})
	},
	// 获取全部服务
	FETCH_BANK_SERVICE:({commit,state},citycode) => {
		return api.getAllService(citycode)
			.then(resp => {

				let Data = resp.data.data
				commit('SET_BANK_SERVICE',{Data})
			})
	},
	// 获取银行卡列表
	FETCH_BANK_CARDLIST:({commit,state},openid)=>{
		return api.getCards(openid)
			.then(resp=>{
				if(resp.data.result === 0){
					//如果是数组才赋值
					if(resp.data.data.List instanceof Array){
						let Data = resp.data.data.List
						commit('SET_BANK_CARDLIST',{Data})
					}
					
				}
			})
	},
	// 更新默认卡
	UPDATE_BANK_DEFAULTCARD:({commit,state},body)=>{
		return api.changeDefaultCard(body)
			.then(resp=>{
				alert(JSON.stringify(resp))
			})
	},
	// 获取验证码
	FETCH_BANK_ACCESSCODE:({commit,state},body)=>{
		return api.getCode(body)
			.then(resp=>{
				alert(JSON.stringify(resp))
			})
	},
	// 绑定银行卡
	INSERT_BANK_CARD:({commit,state},body)=>{
		return api.bindCard(body)
			.then(resp=>{
				alert(JSON.stringify(resp))
			})
	},
	// 解绑银行卡
	DELETE_BANK_CARD:({commit,state},body)=>{
		return api.DeleteCard(body)
			.then(resp=>{
				alert(JSON.stringify(resp))
			})
	}
}

const mutations = {
	SET_USERINFO:(state,{Data}) => {
		state.userInfo = Data
	},
	SET_BANK_BUSINESS:(state,{Data}) => {
		state.bankBusiness = Data
	},
	SET_BANK_SERVICE:(state,{Data}) => {
		state.bankService = Data
	},
	SET_BANK_CARDLIST:(state,{Data}) => {
		state.cardList = Data
	}
} 

const getters = {
	activeUserInfo(state){
		return state.userInfo
	},
	activeBankBusiness(state){
		return state.bankBusiness
	},
	activeBankService(state){
		return state.bankService
	},
	activeCardList(state){
		return state.cardList
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}