// enum 映射
import { ENV } from '@/assets/enum/enum';
import { apiRequest } from '@/api/apiRequest.ts';

// API初始化設定
let apiEnv = import.meta.env.VITE_ENV; //現在環境
console.log('apiEnv', apiEnv);

export const apiLogin = async payload => {
    // 如果是开发环境，直接返回模拟数据
    const url = apiEnv === ENV.MOCK ? `apiLogin.json` : `account/login/`;
    const res = await apiRequest('POST', url, true, payload);
    return res;
};

export const apiLogout = async () => {
    // 如果是开发环境，直接返回模拟数据
    const url = apiEnv === ENV.MOCK ? `apiLogout.json` : `account/logout/`;
    const res = await apiRequest('POST', url, true);
    return res;
};

export const apiGetMyInfo = async () => {
    // 如果是开发环境，直接返回模拟数据
    const url = apiEnv === ENV.MOCK ? `apiGetMyInfo.json` : `account/user/`;
    const res = await apiRequest('GET', url, true);
    return res;
};
