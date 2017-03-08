<!-- 选择银联卡页面 -->
<template>
    <div class="PayCardList">
		<mt-header title="选择付款卡号">
            <span v-tap="{methods:back}" slot="left">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
		<div class="CardList" id="CardList">
	        <div class="banks">
	        	<div class="banklist" v-for="data in cards">
	        		<img :src="data.card_icon" alt="">
	        		<span>{{data.card_name}}</span>
	                <span>{{data.card_num}}</span>
	        	</div>
	        </div>
	    </div>
	    <div class="add_card" v-tap="{methods:addBandCard}">
	    	<img src="http://www.95599.cn/jiangsu/intro/jsweixintest/ABCWeJS/dist/static/img/payflat/tianjiayinhangka@2x.png" alt="">
	    	<span>添加银行卡</span>
	    	<img class="icon" src="http://www.95599.cn/jiangsu/intro/jsweixintest/ABCWeJS/dist/static/img/payflat/fanye@2x.png" alt="">
	    </div>
    </div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
    import {mapGetters} from 'vuex'
    import * as api from '../../api/payApi'
	export default{
        data(){
            return {
                cards: []
            }
        },
        methods:{
        	addBandCard(){
        		this.$router.push({ name: 'PayCardNumAdd'})
        	},
            getPayCardList(){
                api.getPayCardList().then((resp)=>{
                	console.log(resp.data.data[0].card_num);
                    if(resp.data.result == 0){
                        this.cards = resp.data.data;
                    }
                })
                
            }
        },
        mounted(){
            this.getPayCardList();
        }
	}
</script>
<style lang='scss'>
	.PayCardList{
		.CardList{
			margin-top: 0.266667rem;
			.banks{
				background: #fff;
				margin-bottom: 0.4rem;
				.banklist{
					height: 1.146667rem;
					border-bottom: 0.013333rem solid #e6e6e6;
					padding-left: 0.44rem;
					line-height: 1.12rem;
					img{
						height: 0.826667rem;
						width: 0.826667rem;
						margin-right: 0.466667rem;
						display: inline-block;
						float: left;
						margin-top: 0.16rem;
					}
				}
			}
		}
		.add_card{
			background: #fff;
			height: 1.146667rem;
			padding-left: 0.44rem;
			line-height: 1.12rem;
			img{
				height: 0.826667rem;
				width: 0.826667rem;
				margin-right: 0.466667rem;
				display: inline-block;
				float: left;
				margin-top: 0.16rem;
			}
			.icon{
				float: right;
				height: 0.533333rem;
				width: 0.266667rem;
				margin-top: 0.306667rem;
			}
		}
	}
</style>