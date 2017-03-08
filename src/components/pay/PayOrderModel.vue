<!-- 快捷支付页面 -->
<template>
    <div class="PayOrderShort">
        <mt-header title="付款详情">
            <span v-tap="{methods:back}" slot="left">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
        <div class="order_info">
            <span>订单号</span>
            <span>000311100001</span>
        </div>
        <div class="goods_info">
            <div class="goods_title">
                <div></div><span>“传世之宝”金银元宝</span>
            </div>
            <div class="goods_detail">
                <p>
                    已选：银,100g  数量：1  这里是文本远景系列三相四线插座86型四孔电源插座 空调柜机面板牙白25A三相四线
                </p>
            </div>
            <div class="price">
                <p>需支付￥65</p>
            </div>
        </div>
        
    </div>
</template>
<script>
	export default{
        
    }
</script>
<style lang='scss'>
.PayOrderShort{
    font-size: 0.4rem;
    %common_background{
        background: #fff;
    }
    %common_border{
        border-top: 0.013333rem solid #e6e6e6;
        border-bottom: 0.013333rem solid #e6e6e6;
    }
    %common_height_linehegint{
        height: 1.146667rem;
        line-height: 1.173333rem;
    }
    .order_info{
        @extend %common_background;
        @extend %common_border;
        @extend %common_height_linehegint;
        width: 100%;
        padding: 0 0.4rem;
        margin-top: -0.133333rem;
        margin-bottom: 0.266667rem;
    }
    .goods_title{
        @extend %common_background;
        @extend %common_border;
        @extend %common_height_linehegint;
        text-indent: 0.266667rem;
        width: 100%;
        font-weight: 500;
        div{
            @extend %common_background;
            height: 1.12rem;
            width: 0.133333rem;
            float: left;
            background: #f9532d;
        }
    }
    .goods_detail{
        @extend %common_background;
        padding: 0.4rem 0.44rem 0.4rem 0;
        border-bottom: 0.013333rem solid #e6e6e6;
        p{
            margin-left: 0.44rem;
            font-size: 0.4rem;
        }
    }
    .price{
        @extend %common_background;
        @extend %common_height_linehegint;
        width: auto;
        padding-right: 0.44rem;
        margin-bottom: 0.266667rem;
        p{
            color: #f9532d;
            text-align: right;
            font-weight: 500;
        }
    }
}
</style>