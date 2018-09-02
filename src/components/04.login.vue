<template>
    <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model.trim="userName" name="userName" placeholder="请输入用户名"></el-input>
                        <br>
                        <br>
                        <el-input v-model.trim="password" name="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
    name:'login',
    data:function(){
        return{
            userName:'admin',
            password:'123'
        }
    },
    methods:{
         login(){
      // 设置进度条的颜色 尺寸
    //   this.$Loading.config({
    //     color: "yellow",
    //     failedColor: "hotpink",
    //     height: 10
    //   });
    //   this.$Loading.start();
      //axios获取请求
      this.$axios.post("/account/login",{
          user_name:this.userName,
          password:this.password
      }).then(response=>{
        //  console.log(response);
         if(response.data.status==0){
             //用户提示
             this.$Notice.success({
                 title:'提示',
                 desc:response.data.message
             })
             //提交载荷
           this.$store.commit('changeLoginStatus',true);
           //跳回来时的页面
        //    this.$router.push(this.$store.state.fromPath);
        this.$router.go(-1)
         }else{
             //vuex修改
             this.$Notice.error({
                 title:'提示',
                 desc:response.data.message
             })
         }
         //关闭进度条
        //  this.$Loading.finish();
      }).catch(response=>{
          this.$Loading.error();//错误
      })
         }
    }
}
</script>
<style>

</style>


