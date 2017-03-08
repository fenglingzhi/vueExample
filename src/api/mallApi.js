// 微商盟相关api
import Vue from 'vue'
import axios from 'axios'
import {
	API_ROOT
} from '../config'

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
			url:'./static/json/graphicDetail.json'
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

