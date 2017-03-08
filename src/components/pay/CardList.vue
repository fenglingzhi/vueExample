<!-- 查询可绑定银联卡类型 -->
<template>
    <div class="CardList" id="CardList">
        <div class="banks">
        	<div class="banklist" v-for="data in cards">
        		<img :src="data.card_icon" alt="">
        		<span>{{data.card_name}}</span>
        	</div>
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
            getCardList(){
                api.getCardList().then((resp)=>{
                    if(resp.data.result == 0){
                        this.cards = resp.data.data;
                    }
                })
            }
        },
        mounted(){
            this.getCardList();
        }
	}
</script>
<style lang='scss'>
	.CardList{
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
</style>