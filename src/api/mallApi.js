// 微商盟相关api
import Vue from 'vue'
import axios from 'axios'
import {
	API_ROOT
} from '../config'

// 获取微商盟首页信息
export function getMallIndex(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/mallIndex.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 获取首页热门商品
export function getIndexGoodsList(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/IndexGoodsList.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 获取商品列表数据
export function getGoodsList(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/GoodsList.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

//获取首页头部信息
export function getMallHeader(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/mallHeader.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 获取商品详情模板
export function getGoodsDetail(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/goodsDetail.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取商品图文详情模板
export function getGoodsGraphic(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:API_ROOT+'WeiStore/GetProductImgInfo?productCode=000000000008'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取时间列表
export function getOrderDate() {
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/orderDate.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取金库所在区域
export function getOrderArea() {
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/orderArea.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取金库所在支行
export function getOrderDot(areaId) {
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/orderDot.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取提货人选项
export function getOrderConsignee() {
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/orderConsignee.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取支付方式选项
export function getOrderPay() {
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/orderPay.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取支付方式选项
export function getOrderBill() {
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/orderBill.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 订单数据
export function getGoodDetail(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/orderDetail.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 获取订单列表
export function getOrderList(type,number){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/OrderList.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 查询未支付订单详情
export function getUnpaidDetail(orderid){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/UnpaidOrderDetail.json'
		}).then((resp) =>{
			resolve(resp)

		},reject)
	}) 
}

// 下单
export function GoldBooking(data){
	return new Promise((resolve,reject)=>{
		axios({
			method:'post',
			url:API_ROOT+'/weiStore/GoldBooking',
			data:{
				openid:data.openid,
				areaCode:data.areaCode,
				productCode:data.productCode,
				productSubCode:data.productSubCode,
				num:data.num,
				isSelf:data.isSelf,
				bank:data.bank,
				quittanceType:data.quittanceType,
				quittanceTitle:data.quittanceTitle,
				paymentWay:data.paymentWay,
				contactPhone:data.contactPhone,
				getterPhone:data.getterPhone,
				getterName:data.getterName,
				getterIdCardNum:data.getterIdCardNum,
				reference:data.reference,
				appointmentExchangeDate:data.appointmentExchangeDate,
				salesMode:data.salesMode,
				remark:data.remark,
				code:data.code

			}
		}).then((resp) =>{
			resolve(resp)

		},reject)
	})
}

