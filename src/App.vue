<template>
  <div id="app">
        <router-view ></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  methods:{
  	loadwxConfig(){
  		let vm = this
      // console.log(document.URL.split('#')[0])
      vm.$store.dispatch('FETCH_WX_CONFIG',document.URL.split('#')[0])
        .then(()=>{
          let wxConfig = vm.$store.getters.activeWXConfig
          wx.config({
            debug: true,
            appId: wxConfig.appid,
            timestamp: parseInt(wxConfig.timestamp),
            nonceStr: wxConfig.nonce,
            signature: wxConfig.signature,
            jsApiList: [
              'getLocation',
              'chooseImage',
              'openLocation',
              'scanQRCode'
            ]
          });

          //获取当前地理位置信息，获取当前城市信息
          wx.ready(function () {
              wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    alert(res)
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    var body={
                      latitude:latitude,
                      longitude:longitude
                    }

                    vm.$store.dispatch('UPDATE_CURRENT_LOCATION',body)
                }
              });
           });

        })
  	}
  },
  created(){
  	// this.loadwxConfig()
  },
  computed:{
    ...mapGetters([
        'activeWXConfig'
    ])
  }
}
</script>

<style lang='scss'>
@import '../static/lib/icon-font/iconfont.css';
@import '../static/lib/base/base.css';
@import '../static/lib/base/common.css';
html,body{
  height: 100%;
  background-color: #f2f2f2;
}
a:hover{
  text-decoration: none;
}
#app {
  font-family: Arial, "PingFang SC", "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:0.373333rem;
  height: 100%;
}
.mint-toast{
      z-index: 2050 !important;
    }
  .app_fix{
      position: fixed;
      left: 0;
      right: 0;
    }
</style>
