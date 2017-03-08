<!-- 微银行首页轮播图 -->
<template>
	<div class="header">
        <div class="header-info">
        	<span class="area-info" v-tap="{methods:selectcity}">
        		{{areaInfo.city | CityName}}
				<span class="icon iconfont icon-xia1"></span>
        	</span>
        	<span class="title">{{areaInfo.bank_name}}</span>
        	<span class="icon iconfont icon-saoyisao" v-tap="{methods:Scan}"></span>
        </div>
        <swiper :options="activityOption">
		       <swiper-slide v-for="item in swipe.data">
		        <img class="item-image" :src="item.img_url" alt="" v-tap="{methods:skipUrl,link_url:item.link_url,auth:item.auth}">
		       </swiper-slide>
		       <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
		   </swiper>
       </div>
</template>
<script>
	export default{
		props:{
			swipe:{
				type:Object,
				required:true
			},
			areaInfo:{
				type:Object,
				required:true
			},
			activityOption:{
				type:Object,
				required:false
			}
		},
		methods:{
			selectcity(){
				let vm = this
				vm.$router.push({name:'CityList'})
			},
			Scan(){
				wx.scanQRCode({
				    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				    success: function (res) {
				    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				});
			}
		}
	}
</script>
<style lang='scss'>
	.header{
		.swiper-container{
			height: 3.826667rem;
			.swiper-slide{
				img{
					width: 100%;
					display: block;
				}
			}
		}
		position: relative;
		overflow-y: hidden;
		.header-info{
			width: 10rem;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			z-index: 10;
			color: #fff;
			padding: 0.4rem 0.4rem 0 0.4rem;
			height: 0.933333rem;
			.area-info{
				width: 1.333333rem;
				font-size: 0.373333rem;
				position: relative;
				bottom: 1px;
				.icon-xia1{
					font-size: 0.32rem;
				}
			}
			.title{
				flex: 1;
				font-size: 0.4rem;
				width: 6.533333rem;
				display: flex;
				align-items: flex-end;
				justify-content: center;
			}
			.icon-saoyisao{
				width: 1.333333rem;
				font-size: 20px;
				position: relative;
				bottom: 3px;
				text-align: right;
			}
		}
	}
</style>