// 全局路由文件
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const BindCard = resolve => require(['../components/bindcard/BindCard'],resolve)
const Bank = resolve => require(['../components/bank/Bank'], resolve)
const BankIndex = resolve => require(['../components/bank/bankIndex/BankIndex'],resolve)
const FloorMore = resolve => require(['../components/bank/bankIndex/FloorMore'],resolve)
const AllService = resolve => require(['../components/bank/bankIndex/AllService'],resolve)
const BankNearby = resolve => require(['../components/bank/bankNearby/BankNearby'],resolve)
const BankMine = resolve => require(['../components/bank/bankMine/BankMine'],resolve)
const CityList = resolve => require(['../components/bank/CityList'],resolve)
const Mall = resolve => require(['../components/mall/Mall'], resolve)
const MallIndex = resolve => require(['../components/mallIndex/MallIndex'], resolve)
const MallClassify = resolve => require(['../components/mallClassify/MallClassify'],resolve)
const MallOrder = resolve => require(['../components/mallOrder/MallOrder'], resolve)
const GoodsList = resolve => require(['../components/mallIndex/GoodsList'], resolve)
const GoodsDetail = resolve => require(['../components/goodsDetail/GoodsDetail'], resolve)
const GraphicDetail = resolve => require(['../components/goodsDetail/GraphicDetail'],resolve)
const OrderDetail = resolve => require(['../components/mallOrder/OrderDetail'],resolve)
const CardList = resolve => require(['../components/bindcard/CardList'],resolve)
const CheckBindInfo = resolve => require(['../components/bindcard/CheckBindInfo'],resolve)
const BindSuccess = resolve => require(['../components/bindcard/BindSuccess'],resolve)
const UnbindSuccess = resolve => require(['../components/bindcard/UnbindSuccess'],resolve)
const BindError = resolve => require(['../components/bindcard/BindError'],resolve)
const UnbindError = resolve => require(['../components/bindcard/UnbindError'],resolve)
const UnbindCard = resolve => require(['../components/bindcard/UnbindCard'],resolve)

// 支付平台组件
const CheckCardInfo = resolve => require(['../components/pay/CheckCardInfo'],resolve)
const FetchCardType = resolve => require(['../components/pay/FetchCardType'],resolve)
const FetchProtocol = resolve => require(['../components/pay/FetchProtocol'],resolve)
const PayCardAddSuccess = resolve => require(['../components/pay/PayCardAddSuccess'],resolve)
const PayCardList = resolve => require(['../components/pay/PayCardList'],resolve)
const PayCardNumAdd = resolve => require(['../components/pay/PayCardNumAdd'],resolve)
const PayCheckInfo = resolve => require(['../components/pay/PayCheckInfo'],resolve)
const PayOrderShort = resolve => require(['../components/pay/PayOrderShort'],resolve)
const PayOrderUnion = resolve => require(['../components/pay/PayOrderUnion'],resolve)
const PaySuccess = resolve => require(['../components/pay/PaySuccess'],resolve)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}
const router = new Router({  
	// mode:'history',
	scrollBehavior:()=>({
		y:0
	}),
	routes:[
		{name:'Bank',path:'/bank',component:Bank,children:[
            {name:'BankIndex',path:'bankIndex',component:BankIndex},
            {name:'BankNearby',path:'bankNearby',component:BankNearby},
            {name:'BankMine',path:'bankMine',component:BankMine}
        ]},
        {name:'FloorMore',path:'/floormore',component:FloorMore},
        {name:'AllService',path:'/allservice',component:AllService},
    	{name:'BindCard',path:'/bindcard',component:BindCard},
        {name:'CheckBindInfo',path:'/checkBindInfo',component:CheckBindInfo},
        {name:'CityList',path:'/citylist',component:CityList},
    	{name:'BindSuccess',path:'/bindsuccess',component:BindSuccess},
        {name:'BindError',path:'/binderror',component:BindError},
        {name:'UnbindSuccess',path:'/unbindsuccess',component:UnbindSuccess},
        {name:'UnbindError',path:'/unbinderror',component:UnbindError},
    	{name:'Mall', path:'/mall', component:Mall,children:[
            {name:'MallIndex',path:'mallIndex',component:MallIndex},
            {name:'MallClassify',path:'mallClassify',component:MallClassify},
            {name:'MallOrder',path:'mallOrder',component:MallOrder},
            {name:'MallMine',path:'mallMine',component:BankMine},
        ]},
    	{name:'CardList',path:'/cardlist',component:CardList},
    	{name:'UnbindCard',path:'/unbindcard',component:UnbindCard},
        {name:'GoodsList',path:'/goodsList',component:GoodsList},
        {name:'GoodsDetail',path:'/goodsDetail',component:GoodsDetail},
        {name:'GraphicDetail',path:'/graphicDetail',component:GraphicDetail},
        {name:'OrderDetail',path:'/orderDetail',component:OrderDetail},
        {name:'CheckCardInfo',path:'/checkCardInfo',component:CheckCardInfo},
        {name:'FetchCardType',path:'/fetchCardType',component:FetchCardType},
        {name:'FetchProtocol',path:'/fetchProtocol',component:FetchProtocol},
        {name:'PayCardAddSuccess',path:'/payCardAddSuccess',component:PayCardAddSuccess},
        {name:'PayCardList',path:'/payCardList',component:PayCardList},
        {name:'PayCardNumAdd',path:'/payCardNumAdd',component:PayCardNumAdd},
        {name:'PayCheckInfo',path:'/payCheckInfo',component:PayCheckInfo},
        {name:'PayOrderShort',path:'/payOrderShort',component:PayOrderShort},
        {name:'PayOrderUnion',path:'/payOrderUnion',component:PayOrderUnion},
        {name:'PaySuccess',path:'/paySuccess',component:PaySuccess},
        {path: '*', redirect: '/bank/bankIndex'}
	]
})

export default router
