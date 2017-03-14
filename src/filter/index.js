// 全局应用过滤器
import moment from 'moment'
function starcover(value,start,end){
    if(start+end>value.length){
        return value
    }else{
        if(start<0){start = 0}
        if(end<0){end = 0}
        let arrl = value.substr(0,start)
        let arr2 = value.substr(value.length-end)
        let arr3 = ''
        for(let i = 0;i<value.length-(start+end);i++){
            arr3+='*'
        }
        return arrl+arr3+arr2
	}
}
module.exports.install = function(Vue,options){
	//转换订单状态
	Vue.filter('toOrderState',(value)=>{
		if(value){
			let arr = ['未支付','已支付','已提货','支付失败']
			return arr[Number(value)]
		}
	})
	//保留小数点后两位
	Vue.filter('tofixtwo',(value)=>{
		if(value){
			return Number(value).toFixed(2)
		}
	})
	Vue.filter('timeCon',(value)=>{
		let temparr = moment(value).format('YYYY/MM/DD')
		return temparr
	})
	//19位数字，显示前9位后四位
	Vue.filter('cardNum',(value)=>{
		if(value){
			return starcover(value,9,4)
		}
		
	})
	//回显信息--卡号
	Vue.filter('bindCardNo',(value)=>{
		if(value){
			let arr1 = value.substr(value.length-4)
			return '***************'+arr1
		}
		
	})
	//回显信息--姓名
	Vue.filter('bindName',(value)=>{
		if(value){
			let arr1 = value.substr(0,1)
		let arr2 = ''
		for(let i = 1;i<value.length;i++){
			arr2+='*'
		}
		return arr1+arr2
		}
		
	})
	//回显信息--身份证号
	Vue.filter('bindIdNo',(value)=>{
		if(value){
			let arr1 = value.substr(value.length-4)
		let arr2 = ''
		for(let i = 0;i<value.length-4;i++){
			arr2+='*'
		}
		return arr2+arr1
		}
		
	})
	//会先信息--手机号
	Vue.filter('bindPhone',(value)=>{
		if(value){
			let arr1 = value.substr(value.length-4)
		let arr2 = ''
		for(let i = 0;i<value.length-4;i++){
			arr2+='*'
		}
		return arr2+arr1
		}
		
	})
	//显示手机号前三后四位
	Vue.filter('checkCardPhone',(value)=>{
		if(value){
			return starcover(value,3,4)
		}
		
	})
	//回显最后四位
	Vue.filter('CheckCardCardNo',(value)=>{
		if(value){
			let arr1 = value.substr(value.length-4)
			return arr1
		}
	})
	//去除最后一位
	Vue.filter('CityName',(str)=>{
		if(str){
			var newstr=str.substring(0,str.length-1)
			return newstr
		}
	})
}