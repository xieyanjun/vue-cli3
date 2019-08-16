// 接口地址url统一管理
import { API } from "./config.js";
const api = API();
const apis = {
  // 公共
  api_prefix_list: `${api}/common/address`
};

export default apis;
