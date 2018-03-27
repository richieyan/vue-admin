<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api'; //请求登录方法
  //import NProgress from 'nprogress'
  export default {
    data() { //data属性，通常是定义一个函数，返回当前页面的数据对象
      //这里没有用到vuex
      return {
        logining: false, //默认没登录
        ruleForm2: { //默认数据 :model="ruleForm2" 
          account: 'admin',      //v-model="ruleForm2.account" 
          checkPass: '123456'
        },
        rules2: { //输入框校验规则 
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true //是否选中记住密码(v-model=checked)
      };
    },
    methods: {
      handleReset2() {  //处理重置
        //refs是template中ref声明
        //这个是el-form对象，不是ruleForm2那个数据对象，DOM加载成功之后才能调用
        //命名最好与数据对象命名分开，比如elRuleForm2
        this.$refs.ruleForm2.resetFields(); 
      },
      handleSubmit2(ev) { //ev 是事件对象
        var _this = this; //引用记录，但是下面代码没用到
        console.log("handleSubmit2:this---->"+this);
        //validate是elForm的方法，参考EL的form定义
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            //看看this是什么
            console.log("ruleForm2.validate:this---->"+this);
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              console.log("requestLogin(loginParams).the:this---->"+this);
              this.logining = false;
              //NProgress.done();
              //对象解构赋值 ES6 黑魔法 http://es6.ruanyifeng.com/
              let { msg, code, user } = data; 
              if (code !== 200) { //判断响应中code, 从mock看，应该不是http status?
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else { //login success
                sessionStorage.setItem('user', JSON.stringify(user));
                //this就是VueApp对象，可以拿到$router，就是router对象
                // https://router.vuejs.org/zh-cn/essentials/navigation.html
                this.$router.push({ path: '/table' }); //编程式导航，导航到table
              }
            });
          } else {
            console.log('error submit!!'); //输入不合法
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>