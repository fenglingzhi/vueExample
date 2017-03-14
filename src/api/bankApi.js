// 微银行相关api
import Vue from 'vue'
import axios from 'axios'
import {
	TEMP_ROOT,
	API_ROOT
} from '../config'

// var keyid = JSON.parse(sessionStorage.getItem('wx_info')).openid

// 根据openid获取用户信息
export function GetUserInfoById(){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/GetwxUser',
			data:{
				openid:JSON.parse(sessionStorage.getItem('wx_info')).openid
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 测试根据经纬度获取首页
export function GetWeiBankIndex(body){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/GetWeiBankMenu',
			data:{
				appid:body.appid,
				openid:body.openid,
				lat:body.lat,
				lng:body.lng
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

//根据城市名称获取首页
export function GetWeiBankIndexByCity(body){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/GetWeiBankMenu',
			data:{
				openid:JSON.parse(sessionStorage.getItem('wx_info')).openid,
				newCity:body.city
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}




// 获取银行卡列表
// 2.24 从get改为post方式
export function getCards(openid){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/getCard',
			data:{
				openid:openid
			}
		}).then((resp) =>{
			resolve(resp)
		},reject).catch(err=>{
			alert(err)
		})
	})
}

// 获取验证码
export function getCode(body){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/sendCode',
			data:{
				cardNo:body.cardNo,
				certid:body.idCardNo,
				telNo:body.phone
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 绑定银行卡
export function bindCard(body){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/checkAndBindCard',
			data:{
				cardNo:body.cardNo,
				certid:body.idCardNo,
				telNo:body.phone,
				code:body.code,
				custName:body.custName,
				openid:body.openId,
				appid:body.regEntry,
				lat:body.lat,//纬度
				lng:body.lng,//经度
				changeWxUser:body.changeWxUser	
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 更换默认银行卡
export function changeDefaultCard(body){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/UpCard',
			data:{
				cardNo:body.cardNo,
				openid:body.openid
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 解绑银行卡
export function DeleteCard(body){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/DeleteCard',
			data:{
				cardNo:body.cardNo,
				openid:body.openid
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 获取所有服务
export function getAllService(citycode){
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url:API_ROOT+'WeiBank/GetAllTrans',
			data:{
				citycode:citycode
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}