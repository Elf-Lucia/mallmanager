<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
   <el-row class="serach-row">
     <el-col :span="18" >    
      <el-input placeholder="请输入内容" v-model="query" class="input-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
        <el-button type="success">添加用户</el-button>
     </el-col>
     <el-col :span="6"></el-col>
   </el-row>
         <!-- 表格 -->
 <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="150">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="130">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="100">
        <!-- 
          如果单元格内显示的内容不只是字符串（文本），
          需要给被显示的内容外层包裹一个template
         -->
        <!--
          每个组件是独立的，想用外层的数据设置slot-scope,slot-scope自动的去上一层找最外层标签
           template内部要使用数据设置slot-scope 属性
        该属性的值是要用数据create_time的数据源userList
         -->
         <!-- slot-scope的值userList其实就是eltable绑定的数据
         userList.row -> 数组中的每个对象 -->
         <template slot-scope="userList">
          {{userList.row.create_time | fmtdate }}  
         </template> 
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
      <!-- 分页 -->
  </el-card>
  
   
</template>
<script>
export default {
  data(){
    return{
      query:'',
  
      // 表格绑定数据
    userList:[],
    // 分页相关的数据
    pagenumber:1,
    pagesize:2,
    total:-1
    }
  },
  created(){
    this.getUsersData()
  },
  methods:{
    // 获取用户列表的请求
    // pagesize 每页显示条数
    // pagenumber 显示的页数
    // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
   
   async getUsersData(){
      const AUTH_TOKEN = localStorage.getItem('token')
     this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
   const res = await this.$http.get(
     `users?query=${this.query}&pagenumber=${this.pagenumber}&pagesize=${this.pagesize}`)
     // console.log(res);
    //  const{
      // meta:{status,msg},
      // data:{users,total}
      // } =res.data
  //    if(status === 200){
  //    this.userList =users
  //   this.total = total
  //   this.$message.success(msg)
  //  }else{
  //    this.$message.warning(msg)
  //  }
   const {status,statusText,data} = res
  
   if(status === 200){
    //  给表格数据赋值
    // 给total赋值
    // 提示
        this.userList = data
        this.total = status
        this.$message.success(statusText) 
   }else{
     this.$message.warning(statusText)
   }
    }
  }
 }
</script>
<style scoped>
.box-card{
  height: 100%;
}
.serach-row{
  text-align: left;
  line-height: 70px;
}
.input-select{
  width: 40%
}
</style>