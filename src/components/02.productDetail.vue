<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- <img-zoom :src="images[0].thumb_path" width="450" height="250" :bigsrc="images[0].thumb_path" :configs="configs"></img-zoom>    --> 
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" ></ProductZoomer>               
                            </div>
                            <div class="goods-spec">
                                <!--  -->
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size='mini' v-model="buyCount" @change="buyCountChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:showDiscuss==false}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss==true}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="showDiscuss==false" v-html="goodsinfo.content">

                            </div>
                            <div class="tab-content" v-show="showDiscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="inputToSay"  id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click="submitCommit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="replayList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in replayList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time |filterDate }}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        <!-- <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li> -->
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page 
                                        :total="totalCount" show-elevator show-sizer placement="top" :page-size-opts="[5, 6,12, 13, 26]"
                                        @on-change="pageChange"
                                        @on-page-size-change="pageSizeChange"
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id" class="">
                                                <img :src="item.img_url">                  
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{item.add_time | filterDate}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Back-top :height="100" :bottom="100">
            <div class="top">返回顶端</div>
        </Back-top>
        <!-- 移动的小图片 -->
        <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt="">
    </div>
</template>



<script>
// 导入jq
import $ from "jquery";

export default {
  name: "detail",
  data: function() {
    return {
      productId: undefined,
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],//商品图片
      buyCount: 0,
      showDiscuss: false,
      currentPage:1,
      replayList:[],//回复的评论
      pageSize:10,
      inputToSay:'',//输入的评论
      totalCount:0,//总评论数
       // 放大镜设置
      zoomerOptions: {
        'zoomFactor': 5,// 放大倍数
        'pane': 'container-round',// container-round 小放大镜
        'hoverDelay': 300,
        'namespace': 'zoomer',
        'move_by_click':true,// true 点击切换
        'scroll_items': 7,
        'choosed_thumb_border_color': "yellowgreen" // 框的颜色
      },
      images:{
          normal_size:[     
          ]
      }
    };
  },
  
   methods:{
     buyCountChange(){
         console.log('改变啦！！！')
     },
     getProductDetail(){
          //保存id
    this.productId = this.$route.params.id;
    this.$axios.get(`/goods/getgoodsinfo/${this.productId}`)
    .then(response => {
        // console.log(response);
        this.goodsinfo = response.data.message.goodsinfo;
        this.hotgoodslist = response.data.message.hotgoodslist;
        this.imglist = response.data.message.imglist;
        //处理放大镜
        let temArr=[];
        this.imglist.forEach(v => {
            temArr.push({
                id:v.id,
                url:v.thumb_path
            })
        });
        //临时数组
        this.images.normal_size=temArr;
      });
      },
      //获取评论的方法  这里pageSize 在data那里没设置  直接接参数10
      getComments(){
      this.$axios.get(`/comment/getbypage/goods/${this.productId}?pageIndex=${this.currentPage}&pageSize=${this.pageSize}`)
        .then(response=>{
            // console.log(response);
            this.replayList=response.data.message;
            this.totalCount=response.data.totalcount;
      })
      },
      //页码改变
      pageChange(pageIndex){
          this.currentPage=pageIndex;
          //重新调用getComments
          this.getComments();
      },
      //页码容量改变
      pageSizeChange(size){
          this.pageSize=size;
          if(this.pageSize==1){
              this.getComments();
          }
      },
        // 发表评论
    submitCommit(){
        if(this.inputToSay==''){
            // 直接弹框
             this.$Message.error('哥们,写点啥呗, 前端程序员不想理你 并且跑出了一个异常!!');
            return;
        }
         //调用接口
    this.$axios.post(`/validate/comment/post/goods/${this.productId}`,{
        commenttxt:this.inputToSay
    })
    .then(response=>{
        //提示用户成功
        this.$Message.success(response.data.message);
        //刷新
        this.getComments();
        //清空评论
        this.inputToSay='';
    })
    },  
    //加入购物车
     cartAdd(){
         if(this.buyCount==0){
             this.$Message.error('你没添加任何东西')
             return;
         }
       let cartOffset=$('.add').offset();
       console.log(cartOffset)
       //获取目标位置的坐标
       let targetOffset=$('.icon-cart').offset();
       console.log(targetOffset)
       $('.moveImg').stop().show().addClass('move').css(cartOffset).animate(targetOffset,1000,function(){
             $(this).hide().removeClass('move');
       });
    //    this.$store.commit('increment',68);
    this.$store.commit('addGoods',{
             goodId:this.productId,
             goodNum:this.buyCount
        }
    )
     }
   },    
      //周期函数
  created() {   
   this.getProductDetail();
   this.getComments();
  },
   watch:{
      $route(val,oldVal){
          //数组清空
          this.images.normal_size=[];
          //调用thisproductDetail
          this.getProductDetail();
      }
   }

  //      filters: {
  //     //过滤日期
  //     filterDate(val) {
  //       return moment(val).format("YYYY年MM月DD日");
  //     }
  //   }
};
</script>
<style lang="less">
.tab-content img {
  width: 100%;
  display: block;
}
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
  /* 放大镜相关样式 */
    /* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list{
      display: flex;
      justify-content: center;
      img{
          width: 80px;
          height: 80px;
          margin: 2px;
      }
  }
  .control{
      text-align:center;
    display: flex;
    /* 主轴 */
    justify-content: center;
     /* 纵轴 副轴 侧轴 */
    align-items:center;
  }
 
}


 .moveImg{
      position: absolute;
    //   left:0;
    //   top:0;
      width: 50px;
    //   display: none;
    
  }
 .moveImg.move{
      transition:transform 1s, opacity 1s; 
      opacity: 0.5;
      transform:scale(0.1) rotate(7200deg);
 }  
</style>
