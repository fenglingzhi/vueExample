// 支付相关api
import Vue from 'vue'
import axios from 'axios'
import {
	TEMP_ROOT,
	API_ROOT
} from '../config'

// 银行卡列表
export function getCardList(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/CardList.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	}) 
}

// 交易卡列表
export function getPayCardList(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/PayCardList.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	}) 
}

// 信用卡列表
export function getCreditCardList(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/credit.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	}) 
}

// 支付方式列表
export function getPayTypeList(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/payType.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	}) 
}

// 商品详情列表
export function getGoodsInfoList(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/merchantinfo.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	}) 
}