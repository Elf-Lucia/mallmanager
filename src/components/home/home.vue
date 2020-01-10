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
                <a href="#" class="loginout">退出</a>
            </div>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>
<script>
export default { }
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
</style>