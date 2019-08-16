/* 接口服务器域名 */
export const API = () => {
  let api = "//testapi.hoolihome.com:9081";
  let host = window.location.host;
  if (host === "admin.hoolihome.com") {
    api = "//api.hoolihome.com";
  } else if (host === "readyadmin.hoolihome.com") {
    api = "//readyapi.hoolihome.com";
  }
  return api;
};

/* cdn服务器域名 */
export const CDN = () => {
  let cdn = "@/assets/imgs";
  let host = window.location.host;
  if (host === "admin.hoolihome.com" || host === "readyadmin.hoolihome.com") {
    cdn = "//static.hoolihome.com/system/admin";
  }
  return cdn;
};
