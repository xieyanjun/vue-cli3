const rules = {
  validateNumber: (rule, value, callback) => {
    /* 必填数字验证 */
    let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    if (!value.trim()) {
      callback(new Error("必填"));
    } else {
      if (!reg.test(value)) {
        callback(new Error("必须是数字"));
      } else {
        callback();
      }
    }
  },
  checkSpace: (rule, value, callback) => {
    /* 必填验证 */
    if (!value.trim()) {
      callback(new Error("不能为空"));
    } else {
      callback();
    }
  },
  validateNumberRequired: (rule, value, callback) => {
    /* 必填数字验证 */
    let reg = /(^[1-9][0-9]*$)|(^[0-9]$)|(^((\d)|([1-9]\d*))\.\d+$)/;
    let reg2 = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
    if (!value.trim()) {
      callback(new Error("必填"));
    } else {
      if (!reg.test(parseFloat(value))) {
        callback(new Error("必须是数字"));
      } else if (!reg2.test(value)) {
        callback(new Error("保留小数点后两位"));
      } else {
        callback();
      }
    }
  },
  validateNumberNonRequired: (rule, value, callback) => {
    /* 非必填但是必须是数字 */
    let reg = /(^[1-9][0-9]*$)|(^[0-9]$)|(^((\d)|([1-9]\d*))\.\d+$)/;
    let reg2 = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
    if (!value) {
      callback();
    } else {
      if (!reg.test(parseFloat(value))) {
        callback(new Error("必须是数字"));
      } else if (!reg2.test(value)) {
        callback(new Error("保留小数点后两位"));
      } else {
        callback();
      }
    }
  },
  checkMail: (rule, value, callback) => {
    /* 必填、邮箱 */
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!value.trim()) {
      return callback(new Error("请输入邮箱地址"));
    }
    if (!reg.test(value.trim())) {
      return callback(new Error("请输入正确的邮箱地址"));
    }
    callback();
  },
  checkMobile: (rule, value, callback) => {
    /* 非必填、手机号 */
    let reg = /^[1][0-9]{10}$/;
    if (!value) {
      callback();
    } else {
      if (!reg.test(value.trim())) {
        return callback(new Error("请输入正确的手机号"));
      }
      callback();
    }
  },
  moneyLength: (rule, value, callback) => {
    /* 金额不超过8位 */
    let abStr = value.toString();
    let abNum = 0;
    if (abStr.indexOf(".") !== -1) {
      abNum = abStr.substring(0, abStr.indexOf(".")).length;
    } else {
      abNum = abStr.length;
    }
    if (abNum > 8) {
      return callback(new Error("金额不能超过8位"));
    } else {
      callback();
    }
  },
  validateDecimal: (rule, value, callback) => {
    let reg = /(^[1-9][0-9]*$)|(^[0-9]$)|(^((\d)|([1-9]\d*))\.\d+$)/;
    let reg2 = /^[0-9]+([.]{1}[0-9]{1})?$/;
    if (!value) {
      callback();
    } else {
      if (!reg.test(value)) {
        callback(new Error("必须是数字"));
      }
      if (!reg2.test(value)) {
        callback(new Error("保留小数点后一位"));
      } else {
        callback();
      }
    }
  }
};

export default rules;
