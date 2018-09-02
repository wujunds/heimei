import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Index from './components/01.index.vue';
import Detail from './components/02.productDetail.vue';
import shoppingCart from './components/03.shoppingCart.vue';
import Order from './components/05.order.vue';
import Login from './components/04.login.vue';
import orderDetail from './components/06.orderDetail.vue';
import PaySuccess from './components/07.paySuccess.vue';
import VipCenter from './components/08.vipCenter.vue';
import OrderList from './components/09.orderList.vue';
import OrderDetailTwo from './components/10.orderDetailTwo.vue';
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials = true;
import moment from "moment";//时间格式
// 跨域请求时 是否会携带 凭证(cookie)

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);
//放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);
//注册 时间格式
Vue.filter('filterDate', function(val,formatStr){
  if(formatStr!=undefined){
    return moment(val).format(formatStr);
  }else{
    return moment(val).format("YYYY年MM月DD日");
  }
})
//引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  cartData:JSON.parse(window.localStorage.getItem('goodKey'))||{},
  islogin:false,
  // fromPath:''
  },
  mutations: {
    // increment (state,n) {
      // 变更状态
      // state.count+=n
    //   Vue.set(obj, 'newProp', 123)
    // }
    addGoods(state,goodInfo){
      //判断goodInfo里面的Id是否存在  如果不存在就添加
       if(state.cartData[goodInfo.goodId]==undefined){
         Vue.set(state.cartData,goodInfo.goodId,goodInfo.goodNum)
       //如果存在就累加     
       }else{
         state.cartData[goodInfo.goodId]+=goodInfo.goodNum 
       }
    }  ,
    updateGoodsNum(state,goodInfo){
      //替换即可
      state.cartData[goodInfo.goodId]=goodInfo.goodNum;
    },
    //Vue.delete
    deleteGood(state,goodId){
        Vue.delete(state.cartData,goodId)       
    }
    ,
    //切换登录状态
    changeLoginStatus(state,islogin){
        state.islogin=islogin;
    },
    // saveFromPath(state,fromPath){
    //   state.fromPath=fromPath;
    // }
  },
   //getters 
   getters:{
    goodsCount: state => {
      let num=0;
     for(const key in state.cartData){
          // console.log(key)
          num+=state.cartData[key];
     }
     return num;
    }
  }
})
   //页面加载之前
   window.onbeforeunload=function(){
     window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartData))
   }

//全局this.$axios
import axios from "axios";
Vue.prototype.$axios=axios;
//全局基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899/site';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 懒加载
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('./assets/img/3a40de39b235974d8d9e436f1d33bbed.png'),
  attempt: 1
})
Vue.use(VueRouter);
Vue.use(ElementUI);
let routes=[
  {
    path:'/',
    // 解析到 直接修改路由地址为/index
    redirect:'/index'
  },
  //首页规则
  {
    path:'/index',
    component:Index,
  },
  {
    path:'/detail/:id',
    component:Detail,
  },
  {
    path:'/cart',
    component:shoppingCart
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/order/:ids',
    component:Order,
    // 路由元信息 可以随意加 
    meta: {
      changeLoginStatus: true
      // panduan:true     
    }
  },
  {
    path:'/orderDetail/:orderid',
    component:orderDetail,
    meta: {
      changeLoginStatus: true
      // panduan:true     
    }
  },
  {
    path:'/paySuccess',
    component:PaySuccess,
    meta: {
      changeLoginStatus: true
      // panduan:true     
    }
  },
  {
    path:'/vipCenter',
    component:VipCenter,
    meta: {
      changeLoginStatus: true
      // panduan:true     
    }
  },
  {
    path:'/orderList',
    component:OrderList,
    meta: {
      changeLoginStatus: true
      // panduan:true     
    }
  },
  {
    path:'/orderDetailTwo/:id',
    component:OrderDetailTwo,
    meta:{
      changeLoginStatus:true
    }
  }
]

//实例化路有对象
let router=new VueRouter({
   routes
})
//注册一个全局前置守卫
router.beforeEach((to, from, next) => {
      // store.commit('saveFromPath',from.path)
     //检测是否登录
     if(to.path.indexOf('/order/')!=-1){
          axios.get('account/islogin').then(response=>{
            //  console.log(response);
            if(response.data.code=='nologin'){
              //没登录就去登录页面
              next('/login');
            }else{
              next();//直接跳转
            }
          })   
     }else{
       next();
     }
})
//挂到vue示例上面
Vue.config.productionTip=false;

new Vue({
  render: h => h(App),
  router,
  //仓库对象  属性名字 叫做 store
  store, 
  beforeCreate(){
    // console.log('你爷爷被创建了')
    axios.get('/account/islogin').then(response=>{
      // console.log(response)
      if(response.data.code=="logined"){
        //登陆过
        store.state.islogin=true;
      }else{
        //没登录
      }
    })
  }
}).$mount('#app')