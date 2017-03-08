// 微商城模块
import * as api from '../../api/mallApi'

const state = {
	goodsDetail:{},// 商品详情
	goodsGraphic:{},// 图文详情
	orderDetail:{},
	mallIndexGoodsList:[],//首页热门商品
	mallHeaderInfo:{},//首页地区，用户，轮播图信息
	mallGoodsList:[]//商品列表数据
}

const actions = {
	FETCH_MALL_INDEX_GOODSLIST:({commit,state}) => {
		return api.getIndexGoodsList()
			.then(resp => {
				if(resp.data.result === 0){
					let Data = resp.data.data
					commit('SET_MALL_INDEX_GOODSLIST',{Data})
				}
			})
	},
	FETCH_MALL_GOODSLIST:({commit,state}) => {
		return api.getGoodsList()
			.then(resp => {
				if(resp.data.result === 0){
					let Data = resp.data.data
					commit('SET_MALL_GOODSLIST',{Data})
				}
			})
	},
	FETCH_MALL_HEADER_INFO:({commit,state}) => {
		return api.getMallHeader()
			.then(resp => {
				if(resp.data.result === 0){
					let Data = resp.data.data
					commit('SET_MALL_HEADER_INFO',{Data})
				}
			})
	},
	FETCH_MALL_GOODSDETAIL:({commit,state}) => {
		return api.getGoodsDetail()
			.then(resp => {
				let Data = resp.data.data
				console.log(resp)
				commit('SET_MALL_GOODSDETAIL',{Data})
			})
	},
	FETCH_MALL_GOODSGRAPHIC:({commit,state}) => {
		return api.getGoodsGraphic()
			.then(resp => {
				if(resp.data.result == 0){
					let Data = resp.data.data
					commit('SET_MALL_GOODSGRAPHIC',{Data})
				}
			})
	},
	FETCH_MALL_ORDERDETAIL:({commit,state}) => {
		return api.getOrderDetail()
			.then(resp => {
				let Data = resp.data.Data
				commit('SET_MALL_ORDERDETAIL',{Data})
			})
	}
	
}

const mutations = {
	SET_MALL_INDEX_GOODSLIST:(state,{Data}) => {
		state.mallIndexGoodsList = Data
	},
	SET_MALL_GOODSLIST:(state,{Data}) => {
		state.mallGoodsList = Data
	},
	SET_MALL_HEADER_INFO:(state,{Data}) => {
		state.mallHeaderInfo = Data
	},
	SET_MALL_GOODSDETAIL:(state,{Data}) =>{
		state.goodsDetail = Data
	},
	SET_MALL_GOODSGRAPHIC:(state,{Data}) =>{
		state.goodsGraphic = Data
	},
	SET_MALL_ORDERDETAIL:(state,{Data}) =>{
		state.orderDetail = Data
	},
} 

const getters = {
	activemallIndexGoodsList(state){
		return state.mallIndexGoodsList
	},
	activemallGoodsList(state){
		return state.mallGoodsList
	},
	activemallHeaderInfo(state){
		return state.mallHeaderInfo
	},
	activeGoodsDetail(state){
		return state.goodsDetail
	},
	activeGoodsGraphic(state){
		return state.goodsGraphic
	},
	activeOrderDetail(state){
		return state.orderDetail
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}