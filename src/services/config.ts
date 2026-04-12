import axios from "axios";
import _ from "lodash";
import Cookies from "js-cookie";
import CommonConstants from "@/constants/common.constans";

export const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

http.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${Cookies.get(CommonConstants.AccessTokenKey)}`;
    config.headers["Content-Type"] = `application/json`;
    config.headers["appName"] = import.meta.env.VITE_APP_NAME;
    config.headers["appVersion"] = import.meta.env.VITE_APP_VERSION;
    config.headers["platform"] = import.meta.env.VITE_APP_PLATFORM;
    config.headers["accept"] = `*/*`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (_.has(error, "response.data")) {
      if (_.get(error, "response.status") === 401) {
        Cookies.remove(CommonConstants.AccessTokenKey);
        window.location.href = "/login";
        return Promise.reject(error);
      }
      const responseErr = _.get(error, "response.data");
      return Promise.reject(responseErr);
    }
    return Promise.reject(error);
  }
);