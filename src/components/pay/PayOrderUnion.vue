<!-- 快捷支付页面 -->
<template>
    <div class="PayOrderUnion">
        <pay-order-model></pay-order-model>
        <mt-cell title="付款方式" is-link value="" v-tap="{ methods : open}" v-for="data in cards">
          <span  size="large">{{cardshow}}</span>
        </mt-cell>
        <mt-popup v-model="CardList" position="bottom" class="card_list_model">
            <div class="opt-area">
                <span v-tap="{methods:selectNum}">完成</span>
            </div>
			<mt-picker :slots="cards"  @change="onValuesChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
		</mt-popup>
        <pay-check-info></pay-check-info>
        <div class="pay_confirm" v-tap="{methods:payConfirm}">
            确认付款
        </div>
    </div>
</template>
<script>
    import PayOrderModel from './PayOrderModel'
    import PayCheckInfo from './PayCheckInfo'
    import { Popup } from 'mint-ui'
    import { Picker } from 'mint-ui'
    import * as api from '../../api/payApi'
	export default{
		name: "PayOrderUnion",
        data() {
            return {
                CardList:false,//弹层是否打开
                cards: [
                    {
                        flex: 1,
                        values: [],//支付卡列表
                        textAlign: 'left',
                    }
                ],
                cardnum:'',//默认快捷支付卡
                cardshow:''
            };
        },
        components:{
            PayOrderModel,
            PayCheckInfo
        },
        methods:{
        	payConfirm(){
        		this.$router.push({ name: 'PayCheckInfo'})
        	},
            //切换支付卡
            onValuesChange(picker, values) {
                this.cardshow = values[0];
            },
            selectNum(){
                this.CardList = false;
            },
            //打开弹层
            open(){
                this.CardList = true;
            },
            //获取快捷支付卡列表
            getPayCardList(){
                api.getPayCardList().then((resp)=>{
                    if(resp.data.result == 0){
                        var cardinfo = [];
                        //循环json拼接
                        for(var i = 0; i<resp.data.data.length; i++){
                            var cardname = resp.data.data[i].card_name;
                            var cardnum = resp.data.data[i].card_num;
                            //将对象转换为数组格式
                            cardinfo.push(cardname + cardnum);
                            this.cards[0].values = cardinfo;
                        }
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
    .PayOrderUnion{
        font-size: 0.4rem;
        .pay_card_num{
            background: #fff;
            border-top: 0.013333rem solid #e6e6e6;
            /* border-bottom: 0.013333rem solid #e6e6e6; */
            height: 1.146667rem;
            line-height: 1.173333rem;
            padding: 0 0.44rem;
            .num{
                float: right;
            }
        }
        .pay_confirm{
            height: 1.333333rem;
            width: auto;
            background: #fd655a;
            line-height: 1.333333rem;
            text-align: center;
            color: #fff;
            border-radius: 0.133333rem;
            font-size: 0.453333rem;
            margin: 0.826667rem 0.44rem 0 0.44rem;
        }
        .card_list_model{
            width: 100%;
        }
        .mint-cell{
            width: 100%;
        }
        .opt-area{
            position: relative;
            width: 100%;
            box-sizing: border-box;
            text-align: right;
            padding:0.266667rem 0;
            &::after{
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                border-bottom: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform: scaleY(0.5);
                        transform: scaleY(0.5);
            }

            span{
                padding: 0.266667rem 0.4rem;
                font-size: 0.4rem;
            }
        }
    }
</style>
