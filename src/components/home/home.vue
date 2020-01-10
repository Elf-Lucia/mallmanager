<template>
 <el-container>
  <el-header>
    <el-row>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <img src="../../assets/logo.png" alt="无法显示图片">
            </div>
        </el-col>
        <el-col :span="18" >
            <h3>后台管理系统</h3>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple">
                <a href="#" class="loginout" @click.prevent="handleExit()">退出</a>
            </div>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-aside class="aside" width="200px">
        <!-- default-active:默认展开项
          :unique-opened: 只允许同时展开一项
          :router 开启路由模式
          开启后, 设置el-menu-item的index值 为路由标识
        -->
        <el-menu default-active="2-1" class="menu" :unique-opened="true" :router="true">
        <!-- 用户管理-->
          <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>用戶管理</span>
            </template>
          <el-menu-item index="/user">
              <i class="el-icon-success"></i>
                 用戶列表
          </el-menu-item>
        </el-submenu>
        <!-- 权限管理-->
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>權限管理</span>
        </template>
                  <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-view"></i>
            權限列表
          </el-menu-item>
        </el-submenu>
        <!-- 商品管理-->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
                  <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
            商品列表
          </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-view"></i>
            分類參數
          </el-menu-item>
           <el-menu-item index="3-1">
              <i class="el-icon-view"></i>
            商品分類
          </el-menu-item>
        </el-submenu>
        <!--订单管理-->
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>訂單管理</span>
            </template>
          <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
                訂單列表
          </el-menu-item>
        </el-submenu>
        <!--数据统计-->
          <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>數據統計</span>
            </template>
          <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
            數據報表
          </el-menu-item>
        </el-submenu>

        </el-menu>
      </el-aside>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
     beforeCreate () {
        // 从session中获取token 判断是否有token
        const token = sessionStorage.getItem('token')
        if (!token) {
        // 返回登录页,token没有值
        this.$router.push({name: 'login'})
        this.message.warning('请先登录')
        }
    //有值继续渲染
  },
  methods:{
      //点击退出，返回到登录页，并提示并清空token
      handleExit(){
          localStorage.setItem=''
          this.$message.success('退出成功')
          this.$router.push({name:'login'})
      }
  }
 }
</script>
<style scoped>
 .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
    .el-header img{
        height: 50px;
        margin: 5px;
    }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .loginout{
    text-decoration: none;
    line-height: 60px;
  }
  .el-submenu .el-menu-item{
      padding: 0
  }
    .el-container {
    height: 100%;
  }
</style>