import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Mint from 'mint-ui';
import vueTap from 'v-tap';
import Vuerify from 'vuerify'
import VuerifyDirective from 'v-vuerify-next'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../static/lib/base/config.scss'
Vue.use(VueAwesomeSwiper)
Vue.use(Vuerify)
Vue.use(VuerifyDirective)

Vue.config.errorHandler = function (err, vm) {
    let error = JSON.stringify(err)
    let obj = JSON.stringify(vm)
    var beacon = new Image()
    beacon.src = 'http://www.95599.cn/jiangsu/intro/jsweixintest/'+'weixinservice/frontlog?msg='+'err:'+error+'vm:'+obj+'&error=1'
    
}

window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        var info = "错误信息：" + errorMessage + "</br>" +
                "出错文件：" + scriptURI + "</br> " +
                "出错行号：" + lineNumber + "</br>" +
                "出错列号：" + columnNumber + "</br>" +
                "错误详情：" + errorObj + "</br></br>";
        var beacon = new Image()
        beacon.src = 'http://www.95599.cn/jiangsu/intro/jsweixintest/'+'weixinservice/frontlog?msg='+info+'&error=1'
    }


import {request, response , respErr} from './service/httpInterceptor';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.use(vueTap);

import router from './router'
import store from './store'
import filter from './filter'


import MyPlugin from './components/common/vue.ext.js'
Vue.use(MyPlugin)
Vue.use(filter);



router.beforeEach((to,from,next)=>{
	// console.log(from)
	//如果存在-pop，否则-next()
    // if(sessionStorage.getItem('popupArr')){
    //     let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
    //     if(tempArr.length>0){
    //     	tempArr.pop()
    //     	sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
    //     	next(false)
    //     }else{
    //     	next()
    //     }
    // }else{
        next()
    // }
	
})


axios.interceptors.request.use(request);

axios.interceptors.response.use(response,respErr);



var vm = new Vue({
	router,
	store,
	el: '#app',
	render: h => h(App)
})
