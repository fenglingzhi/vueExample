<template>
	<div class="bank">
		    <!-- <keep-alive include=""> -->
		      <router-view ></router-view>
		    <!-- </keep-alive> -->
			<mt-tabbar v-model="selected" :fixed="fixed" class="ratain-border-top">
		      <mt-tab-item id="BankIndex" v-tap="{methods:changeTab,tabName:'BankIndex'}">
		        <i slot="icon" class="icon iconfont icon-shouyeshouye"></i>
		        首页
		      </mt-tab-item>
		      <mt-tab-item id="BankNearby" v-tap="{methods:skipBank}">
		        <i slot="icon" class="icon iconfont icon-fujin"></i>
		        附近
		      </mt-tab-item>
		      <mt-tab-item id="BankMine" v-tap="{methods:changeTab,tabName:'BankMine'}">
		        <i slot="icon" class="icon iconfont icon-wo"></i>
		        我的
		      </mt-tab-item>
		    </mt-tabbar>

	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		name:'Bank',
		data(){
			return {
				selected:'BankIndex',
				fixed:true
			}
		},
		methods:{
			// 获取微信config之后，根据appid，secret，code获取openid等信息(最后真实调试微信端使用)
			getCode(){
				let vm = this
				vm.configWxjssdk()
				
				wx.ready(function () {
					vm.configWxMenu()
			    });
				
			},
			skipBank(){
				location.href="http://www.95599.cn/jiangsu/intro/jsweixintest/weixin/redirect1?appid=wxb280dffa14c0d7dd&state=03000005"
			},
			// 切换tab栏进行路由跳转
			changeTab(params){
	          let vm = this
	          vm.selected = params.tabName
	          vm.$router.push({name:params.tabName})
	        },
	        // 初始化tab栏状态并且修改标题名称
	        init(){
	        	document.title = "微银行"
	        	this.selected = this.$route.name
	        },
	        
	        //配置菜单项
	        configWxMenu(){
	        	wx.hideMenuItems({  
		            menuList: [  
		                'menuItem:share:qq', //分享到QQ  
		                'menuItem:share:weiboApp', // 分享到Weibo  
		                'menuItem:favorite', // 收藏  
		                'menuItem:share:QZone', // 分享到 QQ 空间  
		                'menuItem:copyUrl', // 复制链接  
		                'menuItem:openWithQQBrowser', // 在QQ浏览器中打开  
		                'menuItem:openWithSafari', // 在Safari中打开  
		                'menuItem:share:email', // 邮件  
		                'menuItem:readMode', // 阅读模式  
		                'menuItem:originPage' // 原网页  
		            ],  
		            success: function (res) {  
		                // alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');  
		            },  
		            fail: function (res) {  
		                alert(JSON.stringify(res));  
		            }  
		        })
	        },
	        

		},
		computed:{
		    ...mapGetters([
		        
		    ])
		},
		mounted(){
			// 调试微信真机
			// this.getCode()
			this.init()
		},
		activated (){
			this.init()
		},
		deactivated(){
			console.log('deactivated')
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/base/config.scss';
	.bank{
		background-color: #f5f3f6;
		height: 100%;
		.mint-tab-container{
			padding-bottom: 55px;
		}
		.mint-tabbar {
			background-color: #fff;
		    .mint-tab-item-icon{
		    	position: relative;
		    	.iconfont{
			    	font-size: 25px;
			    }
		    }
		    
		    .mint-tab-item{
		    	color: rgb(87,86,86);
		    	padding: 6px 0;
		    	background-color: #fff;
		    }
		    .mint-tab-item.is-selected{
		    	color: $backIcon-color;
		    	background-color: #fff;
		    }
		    .mint-tab-item-label{
		    	font-size: 14px;
		    }
		}
	}
</style>