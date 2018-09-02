<template>
    
      <div class="pay-order">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <canvas width="300" height="300"></canvas> -->
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid" :options="{size:251}"></qrcode>
                                </div>
                            </div>
                            <input type="button" value="跳转到支付页" @click="gotoPay">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
// 导入 二维码模块
import VueQrcode from "@xkeshi/vue-qrcode";
export default {
    name:'orderDetail',
    data:function(){
        return{
           orderInfo:{}
        }
    },
   created(){
       this.$axios.get(`/validate/order/getorder/${this.$route.params.orderid}`).
       then(response=>{
        //    console.log(response);
           this.orderInfo=response.data.message[0];
       });
       let timeId;
        timeId=setInterval(()=>{
       this.$axios.get(`/validate/order/getorder/${this.$route.params.orderid}`).
       then(response=>{
         console.log(11111)
        //    console.log(response)
        //    console.log(response.data.message[0]);
        //    this.orderInfo=response.data.message[0];
        if(response.data.message[0].status==2){
            this.$Message.success("等发货把");
             setTimeout(()=>{
              this.$router.push('/paySuccess');
             },500)
            clearInterval(timeId);
        }else{
            //支付失败
        }
        })
       },1000)
   },
      
    components:{
       //es6中的语法
       [VueQrcode.name]:VueQrcode
   },
   //方法
   methods:{
       gotoPay(){
           window.open(`http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.params.orderid}`);
       }
   }
       
   }


</script>
<style>
   .pay-order{
       min-height: 750px;
   }
</style>


