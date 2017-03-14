<!-- 快捷支付页面 -->
<template>
    <div class="PayPlatform">
        <mt-header title="支付平台">
            <span v-tap="{methods:back}" slot="left">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
        <div class="paybody">
        <div class="merchantname"><span class="bar"></span><span>江苏省农行</span></div>
            <div class="goodinfo" v-for="data in merchantinfo">
                
                <div class="goodtitle">{{data.goods_title}}</div>
                <div class="gooddetail">
                    <span>
                        {{data.goods_material}}
                    </span>
                    <span>
                        {{data.goods_weight}}g
                    </span>
                    <span>
                        数量 {{data.goods_num}}
                    </span>
                </div>
                <div class="clear"></div>
            </div>
            <div class="payconfirm">
                <mt-button @click.native="payTypeList = true" size="large">支付 ￥0.01</mt-button>
            </div>
            <!-- <mt-actionsheet :actions="payTypeList" v-model="paybotton" cancel-text="">
                
            </mt-actionsheet> -->
            <mt-popup v-model="payTypeList" position="bottom" class="paytypelist">
                <ul>
                    <li v-for="(data,index) in paylist" v-tap="{methods: payListFun, data:data}" :id="data.payid"><img :src="data.card_icon" alt=""><span>{{data.card_name}}</span></li>
                </ul>
            </mt-popup>
        </div>
        
        
    </div>
</template>
<script>
    import * as api from '../../api/payApi'
	export default{        
        data() {
            return {
                payTypeList: false,
                closeOnClickModal: true,
                paylist: [],
                merchantinfo:[],
                modal: true,
                payname: '',
                payid: ''
            }
        },
        methods: {
            payListFun(params){
                console.log(params.data.payid)
                var idIndex = params.data.payid
                // switch(idIndex) {
                //     case idIndex:
                //         this.payIterator(params.data)
                //         break;
                //     case idIndex:
                //         this.payIterator(params.data)
                //         break;
                //     case idIndex:
                //         this.payIterator(params.data)
                //         break;
                //     case idIndex:
                //         this.payIterator(params.data)
                //         break;
                //     case idIndex:
                //         this.payIterator(params.data)
                //         break;
                // }
                if(idIndex){
                    this.payIterator(params.data);
                }
                this.payTypeList = false;
            },
            payIterator(data){
                // console.log(data)
                // console.log(data.card_name)
                alert(data.card_name)
            },
            //获取快捷支付卡列表
            PayTypeList(){
                api.getPayTypeList().then((resp)=>{
                    if(resp.data.result == 0){
                        this.paylist = resp.data.data;
                    }
                })  
                
            },
            //获取商品信息详情
            MerchantInfoList(){
                api.getGoodsInfoList().then((resp)=>{
                    if(resp.data.result == 0){
                        this.merchantinfo = resp.data.data;
                        console.log(this.merchantinfo);
                    }
                })  
                
            }
        },
        mounted() {
            this.PayTypeList()
            this.MerchantInfoList()
        }
    }
</script>
<style lang='scss'>
.PayPlatform{
    .clear{
        clear: both;
    }
    .mint-popup-4 {
        width: 100%;
        .picker-slot-wrapper, .picker-item {
          backface-visibility: hidden;
        }
    }
    .paybody{
        .merchantname{
            background: #fff;
            height: 1.066667rem;
            line-height: 1.066667rem;
            border-bottom: 0.013333rem solid #e6e6e6;
            font-size: 0.4rem;
            font-weight: 500;
            span{
                height: 1.066667rem;
                line-height: 1.066667rem;
                display: inline-block;
            }
            .bar{
                height: 1.066667rem;
                width: 0.133333rem;
                display: inline-block;
                background: #fd655a;
                float: left;
                margin-right: 0.266667rem;
            }

        }
        .goodinfo{
            background: #fff;
            padding: 0.266667rem 0.44rem 0 0.44rem;
            margin-bottom: 0.133333rem;
            .goodtitle{
                float: left;
                font-size: 0.4rem;
                font-weight: 500;
                padding: 0.44rem 0 0.44rem 0;
            }
            .gooddetail{
                float: right;
                span{
                    display: inline-block;
                    padding: 0.44rem 0 0.44rem 0;
                }
                .gooddetail::after{
                clear: both;
            }
            }
            
        }
        .payconfirm{
            padding: 0 0.533333rem;
            margin-top: 1.333333rem;
            .mint-button--default{
                background: #fd655a;
                color: #fff;
            }
            .mint-button:not(.is-disabled):active::after {
                opacity: .05;
            }
        }
    }
    .paytypelist{
        padding: 0 0.44rem;
        border-radius: 0.133333rem;
        width: 100%;
        li{
            padding: 0 0.266667rem;
            height: 1.333333rem;
            line-height: 1.333333rem;
            text-align: center;
            border-bottom: 0.013333rem solid #e6e6e6;
            img{
                vertical-align: middle;
                width: 0.8rem;
                height: 0.8rem;
                margin-right: 0.133333rem;
            }
            span{
                display: inline-block;
                height: 1.333333rem;
                line-height: 1.333333rem;
            }
        }
    }
}
</style>