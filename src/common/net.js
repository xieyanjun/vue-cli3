// import Qs from "qs";
// import axios from "axios";
// import CryptoJS from "crypto-js";
import { DEBUG, CODE_NOT_LOGIN } from "./c.js";
import { API } from "./config.js";
import { myStorage } from "./utils.js";

import { MessageBox } from "element-ui";

let tokenFlag = false;

export const commonParams = () => {
  let params = {
    language: "cn", // 语言参数
    deviceType: "run", // 接口调用来源参数
    deviceId: "browser", // 设备唯一标识码
    apiVersion: "1.1.0", // api版本号
    systemVersion: "", // 操作系统及版本号
    platformId: "4" // 管理平台ID
  };
  let { navigator } = window;
  let systemInfo = {
    appCodeName: navigator.appCodeName || "",
    appName: navigator.appName || "",
    appVersion: navigator.appVersion || ""
  };
  params.deviceId = `${systemInfo.appCodeName}_${systemInfo.appName}`;
  params.systemVersion = systemInfo.appVersion;
  let userToken = myStorage.fetch("userToken");
  if (userToken) {
    params.token = userToken;
  }
  return params;
};

export const paramsSign = (params, url) => {
  if (params.postman === "php") {
    return "";
  }
  /* 参数签名 */
  let key = "93f725a07423fe1c889f448b33d21f46";
  if (url && url.indexOf(`${API()}/common/`) === 0) {
    key = "b15681f74461af9642ab5356fba7962b";
  }
  let allKeys = [];
  let paramsLower = {};
  let sArr = [];
  let res = "";
  for (let k in params) {
    let kLower = k;
    allKeys.push(kLower);
    paramsLower[kLower] = "";
    if (params[k] !== 0 && (!params[k] || params[k] === "undefined")) {
      params[k] = "";
    }
    paramsLower[kLower] = params[k];
  }
  allKeys.sort();
  allKeys.forEach(v => {
    sArr.push(`${v}=${paramsLower[v]}`);
  });
  sArr.push(`key=${key}`);
  res = sArr.join("&");
  res = CryptoJS.MD5(res).toString();
  return res.toLowerCase();
};

export const req = params => {
  if (!params) {
    return new Promise((resolve, reject) => {
      reject(new Error("请设置请求参数"));
    });
  }
  if (!params.url) {
    return new Promise((resolve, reject) => {
      reject(new Error("请设置请求url"));
    });
  }
  return new Promise((resolve, reject) => {
    params.data = Object.assign({}, commonParams(), params.data);
    params.data.signToken = paramsSign(params.data, params.url);
    if (!params.method) {
      params.method = "post";
    }
    let config = {
      url: params.url,
      method: params.method,
      headers: {
        //   'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      responseType: params.responseType || "json",
      timeout: 180000,
      paramsSerializer: function(params) {
        return Qs.stringify(params, {
          arrayFormat: "brackets"
        });
      },
      transformRequest: [
        function(data) {
          return Qs.stringify(data, {
            arrayFormat: "brackets"
          });
        }
      ]
    };
    if (params.method.toLowerCase() === "get") {
      Object.assign(config, {
        params: Object.assign(params.data, {
          timestamp: Date.parse(new Date()) / 1000
        })
      });
    } else {
      Object.assign(config, {
        // params: {
        //   timestamp: Date.parse(new Date()) / 1000
        // },
        data: params.data
      });
    }
    axios(config)
      .then(response => {
        // eslint-disable-next-line
        DEBUG && console.log(`${params.url}---response--->`, response);
        let { data, status } = response;
        if (parseInt(status) === 200) {
          let { code } = data;
          code = parseInt(code);
          if (code === 0) {
            resolve(data);
          } else if (CODE_NOT_LOGIN === code) {
            myStorage.clear();
            window.location.reload();
          } else if (code === 3) {
            if (tokenFlag) return;
            tokenFlag = true;
            if (MessageBox) {
              MessageBox.alert(
                "当前账号权限发生变化，为保护账号安全请重新登录",
                "️⚠️ 警告",
                {
                  confirmButtonText: "确定并重新登录",
                  type: "error",
                  customClass: "message-token",
                  showClose: false,
                  beforeClose: () => {
                    myStorage.clear();
                    window.location.href = "/login";
                    return false;
                  }
                }
              );
            } else {
              alert("当前账号权限发生变化，为保护账号安全请重新登录");
              setTimeout(() => {
                myStorage.clear();
                window.location.href = "/login";
                return false;
              }, 100);
            }
          } else {
            reject(data);
          }
        } else {
          reject(response);
        }
      })
      .catch(e => {
        // eslint-disable-next-line
        DEBUG && console.log(`${params.url}---catch--->`, e);
        reject(e);
      });
    // eslint-disable-next-line
    DEBUG && console.log(`${params.url}---params--->`, config);
  });
};

// 删除对象空属性
export const removeProperty = object => {
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (
        object[prop] === "" ||
        object[prop] == [] ||
        object[prop] === "undifined"
      ) {
        delete object[prop];
      }
    }
  }
  return object;
};
