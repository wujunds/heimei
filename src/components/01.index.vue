<template>
 <!-- 主体部分 -->
      <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in catelist.subcates" :key="itemSon.id">
                                               {{itemSon.title}}&nbsp;
                                            </span>
                                            <!-- <span>
                                                摄影摄像&nbsp;
                                            </span>
                                            <span>
                                                存储设备&nbsp;
                                            </span> -->
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="item in catelist" :key="item.id" href="/goods/43.html">{{item.title}}</a>
                                                <!-- <a href="/goods/43.html">摄影摄像</a>
                                                <a href="/goods/43.html">存储设备</a> -->
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                                <!-- <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>电脑办公</span>
                                        <p>
                                            <span>
                                                电脑整机&nbsp;
                                            </span>
                                            <span>
                                                外设产品&nbsp;
                                            </span>
                                            <span>
                                                办公打印&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">电脑办公</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html">电脑整机</a>
                                                <a href="/goods/43.html">外设产品</a>
                                                <a href="/goods/43.html">办公打印</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>影音娱乐</span>
                                        <p>
                                            <span>
                                                平板电视&nbsp;
                                            </span>
                                            <span>
                                                音响DVD&nbsp;
                                            </span>
                                            <span>
                                                影音配件&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">影音娱乐</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html">平板电视</a>
                                                <a href="/goods/43.html">音响DVD</a>
                                                <a href="/goods/43.html">影音配件</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                                <li>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>服装类</span>
                                        <p>
                                            <span>
                                                男装&nbsp;
                                            </span>
                                            <span>
                                                女装&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">服装类</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html">男装</a>
                                                <a href="/goods/43.html">女装</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel indicator-position="outside">
                                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                 <!-- <h3>{{ item.title }}</h3> -->
                                 <img :src="item.img_url">
                                     </el-carousel-item>
                                     </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>
                            <!-- <li>
                                <div class="img-box">
                                    <label>2</label>
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</a>
                                    <span>2015-04-20</span>
                                </div>
                            </li>
                            <li>
                                <div class="img-box">
                                    <label>3</label>
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200318534459.jpg">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">飞利浦（PHILIPS）DVP3690 全高清DVD影碟机播放器</a>
                                    <span>2015-04-20</span>
                                </div>
                            </li>
                            <li>
                                <div class="img-box">
                                    <label>4</label>
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200258403759.jpg">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                    <span>2015-04-20</span>
                                </div>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 手机数码 -->
        <div class="section" v-for="item in message" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemSon in item.datas" :key="itemSon.artID">
                            <router-link :to="'/detail/'+itemSon.artID">
                                <div class="img-box">
                                    <!-- <img :src="itemSon.img_url"> -->
                                  <img v-lazy="itemSon.img_url" >
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.cateTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存{{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//导入moment.js
// import moment from "moment";
// 导入swiper.js
// import swiper from "swiper";
export default {
  name: "index",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      message:[]
    };
  },
  beforeCreate() {},
  created() {
    this.$axios.get(`/goods/gettopdata/goods`)
      .then(response => {
        // console.log(response);
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
      })
    //   .catch(error => {
    //     console.log(error);
    //   });
      //获取电子商品
      this.$axios.get(`/goods/getgoodsgroup`)
      .then(response=>{
        //   console.log(response)
        this.message=response.data.message;
      });

  },
//   filters: {
//     //过滤日期
//     filterDate(val) {
//       return moment(val).format("YYYY年MM月DD日");
//     }
//   }
};
</script>

<style>
  .el-carousel__item img {
    /* color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0; */
    height: 340px;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>