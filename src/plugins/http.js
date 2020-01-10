//插件模块
import axios from 'axios'
const MyHttp = {}

MyHttp.install =  (Vue)=> {
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }
  axios.defaults.baseURL='http://localhost:3000/'

  export default MyHttp