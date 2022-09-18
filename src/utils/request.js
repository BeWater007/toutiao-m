import axios from "axios";
import store from "../store/index";
import router from "../router";
import { Toast } from "vant";
const request = axios.create({
  baseURL: "http://toutiao.itheima.net",
  timeout: 30000,
});
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (store.state.user && store.state.user.token) {
      // 如果有用户信息，也有token就给请求头添加token
      config.headers.Authorization = `Bearer ${store.state.user.token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (+error?.response?.status === 401) {
      // router.push({ name: "my" });
      Toast.fail("登录过期,可重新登录");
    }
    // console.log("111", err);
    return Promise.reject(error);
  }
);
export default request;
