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
