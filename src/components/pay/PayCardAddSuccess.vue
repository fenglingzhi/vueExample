<!-- 绑定银联卡成功页面 -->
<template>
    <div class="PayCardAddSuccess">
    	<div class="success" v-show="">
        	<img src="http://www.95599.cn/jiangsu/intro/jsweixintest/ABCWeJS/dist/static/img/payflat/chengg@2x.png" alt="">
        	<h1>添加成功</h1>
        </div>
        <div class="failed">
        	<img src="http://www.95599.cn/jiangsu/intro/jsweixintest/ABCWeJS/dist/static/img/payflat/shibai@2x.png" alt="">
        	<h1>添加失败</h1>
        	<p>短信验证码过期，请重新获取</p>
        </div>
        <div class="back"  v-tap="{methods:returnpaycard}">
        	<span>返回</span>
        </div>
    </div>
</template>
<script>
	export default{
		methods:{
			returnpaycard(){
				this.$router.push({ name: 'PayCardList'})
			}
		}
		
	}
</script>
<style lang='scss'>
	.PayCardAddSuccess{
		img{
			width: 2.026667rem;
			height: 2.026667rem;
			margin-top: 1.093333rem;
			margin-left: 3.986667rem;
		}
		h1{
			font-size: 0.48rem;
			text-align: center;
			color: #3f3f3f;
			margin-bottom: 0.266667rem;
		}
		p{
			font-size: 0.373333rem;
			color: #adadad;
			text-align: center;
		}
		.back{
			margin: 0 0.44rem;
            height: 1.333333rem;
            line-height: 1.333333rem;
            width: auto;
            background: #fd655a;
            color: #fff;
            font-size: 0.453333rem;
            border-radius: 0.133333rem;
            text-align: center;
            margin-top: 0.533333rem;
		}
	}
</style>