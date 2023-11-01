import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { User } from 'firebase/auth';
import auth from './firebase';

/// Default ErrorResponse
export class ErrorResponse {
  constructor(public code: number, public message: string) { }
}

/// 401 ErrorResponse
export class UnauthorizedError implements ErrorResponse {
  constructor(public code: number, public message: string) { }
}

/// 404 ErrorResponse
export class NotFoundError implements ErrorResponse {
  constructor(public code: number, public message: string) { }
}

/// 500 ErrorResponse
export class InternalServerError implements ErrorResponse {
  constructor(public code: number, public message: string) { }
}

const config: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: process.browser ? process.env.NEXT_PUBLIC_API_EXTERNAL_ROOT_URL : process.env.NEXT_PUBLIC_API_INTERNAL_ROOT_URL
}
const instance = axios.create(config);

// リクエストの前に処理を挟み込む
// axiosの設定を受け取りここで設定を変更できる
// 第2引数にはリクエストときにエラーが発生したときに呼ばれるコールバック関数を受け取る
instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const currentUser = auth.currentUser;
    let idToken = await (currentUser as User)?.getIdToken();
    if (config.headers && !config.headers.Authorization) {
      if (idToken != undefined) {
        config.headers.Authorization = 'Bearer ' + idToken;
      }
    }
    return config;
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: Error | AxiosError<ErrorResponse>) {
    if (axios.isAxiosError(error)) {
      // AxiosError
      if (error.response && error.response.data) {
        const axiosError = error as AxiosError<ErrorResponse>;
        switch (axiosError.response.status) {
          case 401:
            typeof window !== "undefined" && (window.location.href = '/401');
            return Promise.reject(new UnauthorizedError(axiosError.response.data.code, axiosError.response.data.message));
          case 404:
            typeof window !== "undefined" && (window.location.href = '/404');
            return Promise.reject(new NotFoundError(axiosError.response.data.code, axiosError.response.data.message));
          case 500:
            typeof window !== "undefined" && (window.location.href = '/500');
            return Promise.reject(new InternalServerError(axiosError.response.data.code, axiosError.response.data.message));
          default:
            return Promise.reject(new ErrorResponse(axiosError.response.data.code, axiosError.response.data.message));
        }
      } else {
        // Unknown Error(Responseが存在しない系)
        return Promise.reject(new ErrorResponse(null, error.message));
      }
    } else {
      // Axios以外のエラー
      return Promise.reject(new ErrorResponse(null, error.message));
    }
  }
);

export default instance;
