<template>

   
    <div>    
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物</router-link>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-for="item in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    
                                    <td><img style="width:65px" :src="item.img_url" alt=""></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td><el-input-number size="mini" :min="0" v-model="item.buycount" @change="numChange($event,item.id)"></el-input-number></td>
                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td><el-button type="danger" icon="el-icon-delete" @click="delOne(item.id)" circle></el-button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index"><button class="button">继续购物</button></router-link>
                            <!-- <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button> -->
                            <!-- <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button> -->
                            <button class="submit" @click="account">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "shoppingCart",
  data:function(){
      return{
          message:[],     
      }
  },
  created() {
    // 获取cateData
    let cartData = this.$store.state.cartData;
    if(JSON.stringify(cartData)=="{}"){
        return;
    }
    let ids = "";
    //遍历获取id
    for (const key in cartData) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, -1);
    // console.log(ids);
    this.$axios.get(`/comment/getshopcargoods/${ids}`)
    .then(response=>{
       
        // console.log(response);
        response.data.message.forEach(v => {
               v.buycount=cartData[v.id];//将获取到的值 赋值给buyCount购买数量
               v.selected=true;
        });
        //再赋值给message
         this.message=response.data.message;
    });

  },
  computed:{
      //总金额
      totalPrice(){
          let totalPrice=0
          this.message.forEach(v => {
              //如果选中  就计算
              if(v.selected==true){
                 totalPrice+=v.sell_price*v.buycount;
              }
          });
          return totalPrice;
      },
     //总数量
     totalNum(){
          let totalNum=0
          this.message.forEach(v => {
              //如果选中  就计算
              if(v.selected==true){
                 totalNum+=v.buycount;
              }
          });
          return totalNum;
     }
  },
  methods:{
      numChange(num,id){
        //  console.log(num,id);
         this.$store.commit('updateGoodsNum',{
             goodId:id,
             goodNum:num
         }) 
      },
      delOne(id){
        //提交载体
        this.$store.commit('deleteGood',id);
        //遍历删除
        this.message.forEach((v,i)=>{
            if(v.id==id){
                this.message.splice(i,1)
            }
        })
      },
      //结算
      account(){
        if(this.totalNum==0){
            this.$message.error('哥们，你选一个吧，不然怎么结算呢？');
            return;
        } 
        //获取id
        let ids='';
        this.message.forEach(v=>{
            if(v.selected==true){
                ids+=v.id+',';
            }          
        })
         ids=ids.slice(0,-1);
         console.log(ids);
         
        //router.push(location, onComplete?, onAbort?)
        this.$router.push("/order/"+ids);
      }  
  }
};
</script>

<style>
</style>
