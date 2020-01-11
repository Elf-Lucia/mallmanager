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
      <el-input placeholder="请输入内容" v-model="query" class="input-select" @clear="lodaUserList()">
        <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
      </el-input>
        <el-button type="success" @click="showAddUserDialog()">添加用户</el-button>
     </el-col>
     <el-col :span="6"></el-col>
   </el-row>
         <!-- 表格 -->
 <el-table
 height="300px"
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
        label="用户状态"
        width="100">
        <template slot-scope="userList">
          <el-switch
          v-model="userList.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">  
            <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showEditDia(scope.row.id)" circle></el-button>
            <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="showDeleteDialog(scope.row.id)" circle></el-button>
            <el-button type="success" size="mini" plain icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- 分页 -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenumber"
      :page-sizes="[2,4,6,8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      <el-button type="primary" @click="Adduser()">确 定</el-button>
    </div>
    </el-dialog>
     <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisibleEdit = false">确 定</el-button>
    </div>
    </el-dialog>

  </el-card>
  
   
</template>
<script>
import { async } from 'q'
export default {
  data(){
    return{
      query:'',
  
      // 表格绑定数据
    userList:[],
    // 分页相关的数据
    pagenumber:1,
    pagesize:2,
    total:-1,
    // 添加对话框的属性
    dialogFormVisibleAdd:false,
    dialogFormVisibleEdit:false,
    // 添加用户的表单数据
    form:{
        username:"",
        password:"",
        email:"",
        mobile:""
    }
    }
  },
  created(){
    this.getUsersData()
  },
  methods:{
   
    // 搜索列表
    searchUser(){
      
      this.getUsersData()
      // const _this = this
      // const a= this.userList.filter(data =>{
      //   return data.username.includes(this.query)
      // })
      // _this.userList = a
    },
     // 取消搜索条件
    lodaUserList(){
      this.getUsersData()
    },
  //  添加用户
  async Adduser(){
   
    const res = await this.$http.post(`users`,this.form)
    console.log(res)
    const {status,data} = res
    if(status === 201){
        this.$message.success('添加用户成功') 
        // 关闭对话框
         this.dialogFormVisibleAdd = false
        //  更新视图
        this.getUsersData()
        // 清空对话框
        this.form ={}
    }else{
       this.$message.warning('添加用户失败') 
    }
  },
    // 显示添加用户表单
    showAddUserDialog(){
      this.dialogFormVisibleAdd = true
    },
     // 编辑用户显示对话框
   async showEditDia(userId){
      this.dialogFormVisibleEdit = true
      const res =await this.$http.put(`users/${userId}`,this.form)
      console.log(res)
      this.getUsersData
    },
    // 显示删除弹框
    showDeleteDialog(userId){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`users/${userId}`)
          if(res.status === 200){
            // 回到第一页
            this.pagenumber = 1
            // 更新视图
            this.getUsersData()
            //提示成功
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.pagenumber = 1
        this.getUsersData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenumber = val
        this.getUsersData()
      },

    // 获取用户列表的请求
    // pagesize 每页显示条数
    // pagenumber 显示的页数
    // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
   
   async getUsersData(){
      const AUTH_TOKEN = localStorage.getItem('token')
     this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
   const res = await this.$http.get(
       `users`)
     //`users?username=${this.query}&pagenumber=${this.pagenumber}&pagesize=${this.pagesize}`)
     
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