export const loadSrc = (url, domId, type) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("请设置加载资源的url"));
      return false;
    }
    if (!domId) {
      reject(new Error("请设置加载资源的dom Id"));
      return false;
    }
    if (document.getElementById(domId)) {
      resolve();
    } else {
      if (type === "css") {
        let cssLink = document.createElement("link");
        cssLink.id = domId;
        cssLink.type = "text/css";
        cssLink.rel = "stylesheet";
        cssLink.href = url;
        cssLink.onload = () => {
          resolve();
        };
        document.head.appendChild(cssLink);
      } else {
        let jsScript = document.createElement("script");
        jsScript.id = domId;
        jsScript.type = "text/javascript";
        jsScript.onload = () => {
          resolve();
        };
        jsScript.src = url;
        document.body.appendChild(jsScript);
      }
    }
  });
};
export const checkIsLogin = () => {
  let userToken = myStorage.fetch("userToken");
  if (userToken) {
    return true;
  } else {
    return false;
  }
};
export const myStorage = {
  save: (key, value) => {
    if (key && value) {
      window.localStorage.setItem(key, value);
    }
  },
  fetch: key => {
    if (key) {
      let value = window.localStorage.getItem(key);
      return value;
    }
    return null;
  },
  remove: key => {
    if (key) {
      window.localStorage.removeItem(key);
    }
  },
  clear: () => {
    window.localStorage.clear();
  }
};
export const myValidator = {
  /* 校验字段合法性rule */
  checkMobile: s => {
    /* 校验手机号格式是否正确 */
    if (s) {
      s = s.toString().trim();
      let rule = /^\d{3,20}$/;
      return rule.test(s);
    }
    return false;
  },
  checkEmail: s => {
    /* 校验邮箱格式是否正确 */
    if (s) {
      s = s.toString().trim();
      // eslint-disable-next-line
        let rule = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
      return rule.test(s);
    }
    return false;
  },
  checkPwd: s => {
    /* 校验登录密码格式是否正确 */
    if (s) {
      s = s.toString().trim();
      let rule = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]{8,16}$/;
      return rule.test(s);
    }
    return false;
  },
  checkCode: s => {
    /* 校验短信或邮箱验证码格式是否正确 */
    if (s) {
      s = s.toString().trim();
      let rule = /^\d{6}$/;
      return rule.test(s);
    }
    return false;
  },
  checkImgCode: s => {
    /* 校验图片验证码格式是否正确 */
    if (s) {
      s = s.toString().trim();
      let rule = /^[a-zA-Z]{4}$/;
      return rule.test(s);
    }
    return false;
  },
  checkNickname: s => {
    /* 校验昵称格式是否正确 */
    if (s) {
      s = s.toString().trim();
      let rule = /^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/;
      return rule.test(s);
    }
    return false;
  }
};
export const cstr = s => {
  /*处理null、undefined或NaN字符串*/
  if (s) {
    return s.toString();
  } else {
    return "";
  }
};
export const formatTimeCountToStr = t => {
  /*格式化时间戳差*/
  if (t > 0) {
    let h = Math.floor((t / 60 / 60) % 24);
    if (h < 10) {
      h = `0${h}`;
    }
    let m = Math.floor((t / 60) % 60);
    if (m < 10) {
      m = `0${m}`;
    }
    let s = Math.floor(t % 60);
    if (s < 10) {
      s = `0${s}`;
    }
    return `${h}:${m}:${s}`;
  }
  return "";
};
export const formatTimeToStr = t => {
  if (t) {
    t = parseInt(t);
    let time = new Date(t * 1000);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let date = time.getDate();
    if (date < 10) {
      date = `0${date}`;
    }
    let hour = time.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = time.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    let second = time.getSeconds();
    if (second < 10) {
      second = `0${second}`;
    }
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }
  return "";
};
export const deepClone = obj => {
  /* 深度克隆对象 */
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  let clone;
  if (obj instanceof Date) {
    clone = new Date();
    clone.setTime(obj.getTime());
    return clone;
  }
  if (obj instanceof Array) {
    clone = [];
    let i;
    let n = obj.length;
    for (i = 0; i < n; i++) {
      clone[i] = deepClone(obj[i]);
    }
    return clone;
  }
  if (obj instanceof Object) {
    clone = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key]);
      }
    }
    return clone;
  }
  throw new Error(`Unable to clone obj! Its type isn't supported.`);
};
export const money = (m, c, w) => {
  /*m:金额;c:保留小数位数,只能取值0,1,2;w:1返回整个金额,2返回整数部分,3返回小数部分*/
  if (c !== 0 && c !== 1 && c !== 2) {
    // console.log('传入保留小数位数参数错误')
    return "";
  }
  if (w !== 1 && w !== 2 && w !== 3) {
    // console.log('传入返回类型参数错误')
    return "";
  }

  if (0 === m) {
    /*由于0=false,需特殊处理*/
    return deal("0", "");
  } else {
    if (!m || isNaN(m)) {
      return "";
    }
    m = m.toString();
    if (-1 === m.indexOf(".")) {
      return deal(m, "");
    } else {
      let s_arr = m.split(".");
      return deal(s_arr[0], s_arr[1]);
    }
  }

  function deal(p, f) {
    /*p为整数部分*/
    if (0 === c) {
      if (1 === w) {
        return p;
      } else if (2 === w) {
        return p;
      } else if (3 === w) {
        return "";
      }
    } else if (1 === c) {
      if (0 === f.length) {
        f = "0";
      } else if (f.length >= 2) {
        f = f.substring(0, 1);
      }
      if (1 === w) {
        return p + "." + f;
      } else if (2 === w) {
        return p;
      } else if (3 === w) {
        return f;
      }
    } else if (2 === c) {
      if (0 === f.length) {
        f = "00";
      } else if (1 === f.length) {
        f = f + "0";
      } else if (f.length >= 3) {
        f = f.substring(0, 2);
      }
      if (1 === w) {
        return p + "." + f;
      } else if (2 === w) {
        return p;
      } else if (3 === w) {
        return f;
      }
    }
  }
};
// ahex/hex 转 rgba
export const color2rgba = color => {
  let rgba = "";
  color = color.substr(1);
  let colorLen = color.length;
  let aValue, rValue, gValue, bValue;
  aValue = "0xFF";
  if (colorLen === 6 || colorLen === 8) {
    if (colorLen === 8) {
      aValue = "0x" + color.substr(0, 2);
      color = color.substr(2);
    }
    rValue = "0x" + color.substr(0, 2);
    gValue = "0x" + color.substr(2, 2);
    bValue = "0x" + color.substr(4, 2);
    rgba =
      "rgba(" +
      parseInt(rValue) +
      "," +
      parseInt(gValue) +
      "," +
      parseInt(bValue) +
      "," +
      parseInt(aValue) / 255 +
      ")";
  }
  return rgba;
};
// rgba 转 ahex
export const rgba2ahex = rgba => {
  let str = rgba.split(",");
  let r = parseFloat(str[0].split("(")[1]);
  let g = parseFloat(str[1]);
  let b = parseFloat(str[2]);
  let a = parseFloat(str[3].slice(0, -1));
  a = Math.round(a * 100) / 100;
  a = Math.round(a * 255);
  var alpha = (a + 0x10000).toString(16).substr(-2);
  let ahex =
    "#" + alpha + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1);
  return ahex;
};
export const dataURLtoFile = (dataurl, filename) => {
  //将base64转换为文件
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
export const checkIsChrome = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isEdge = userAgent.indexOf("edge") > -1;
  const isQQBrowser = userAgent.indexOf("qqbrowser") > -1;
  const isSougouBrowser = userAgent.indexOf("metasr") > -1;
  const is360Browser =
    window.navigator.mimeTypes["application/vnd.chromium.remoting-viewer"];
  let isChrome = true;
  if (/(iPhone|Android|iPod|iOS|iPad)/i.test(userAgent)) {
    userAgent.match(/CriOS\/([\d.]+)/i)
      ? (isChrome = true)
      : (isChrome = false);
  } else {
    isChrome =
      userAgent.indexOf("chrome") > -1 &&
      userAgent.indexOf("safari") > -1 &&
      !isEdge &&
      !isSougouBrowser &&
      !is360Browser &&
      !isQQBrowser;
  }
  return isChrome;
};
