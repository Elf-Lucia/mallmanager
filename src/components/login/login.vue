<template>
  <div class="login-wrap">
    
    <div style="margin: 20px;"></div>
    <el-form 
    label-position="top" 
    label-width="80px" 
    :model="formData"
    class="login-form">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password"></el-input>
        </el-form-item>

        <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default { 
    data(){
        return{
            formData:{
                username:'',
                password:''
            }
        }
    },
    methods:{
      handleLogin(){
          this.$http.post('/users',this.formData)
          .then(res=>{
            console.log(res);
            //对象解构赋值
           //const {data,meta:{msg,status}}=res.data
          //  if(status===200){
          //     //登陆成功
          //     //跳转home
          //    // this.$router.push({name:'home'})
          //     //提示成功
          //     // this.$message.success(msg);
          //  }else{
          //    this.$message.warning(msg)
          //  }
            const {data,status}=res
            console.log(data)
         if(status === '201'){
              //登陆成功
              //跳转home
             // this.$router.push({name:'home'})
              //提示成功
              this.$message.success(msg);
         }else{
             this.$message.warning(msg)
           }
         })
      }
     
    }
}
</script>
<style scoped>
.login-wrap {
  background-color: #324152;
  height: 100%;
 display: flex;
 justify-content: center;
 align-items: center
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-button {
  width: 100%;
}
</style>