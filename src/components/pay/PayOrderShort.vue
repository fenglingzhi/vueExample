<!-- 快捷支付页面 -->
<template>
    <div class="pay_order_short">
        <pay-order-model></pay-order-model>
        <div class="pay_card_num">
            <span>支付卡号</span>
            <span class="num">6228 **** **** 2356<i>  ></i></span>
        </div>
        <div class="pay_confirm">
            确认付款
        </div>
    </div>
</template>
<script>
    import PayOrderModel from './PayOrderModel'
	export default{
        components:{
            PayOrderModel
        }
    }
</script>
<style lang='scss'>
    .pay_order_short{
        font-size: 0.4rem;
        .pay_card_num{
            background: #fff;
            border-top: 0.013333rem solid #e6e6e6;
            border-bottom: 0.013333rem solid #e6e6e6;
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
    }
</style>