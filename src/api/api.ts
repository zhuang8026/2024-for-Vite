// enum 映射
import { ENV } from '@/assets/enum/enum';
import { apiRequest } from '@/api/apiRequest.ts';

// API初始化設定
let apiEnv = import.meta.env.VITE_ENV; //現在環境
console.log('apiEnv', apiEnv);

export const apiURLUser = async () => {
    console.log('apiURLUser');
    // 如果是开发环境，直接返回模拟数据
    const url = apiEnv === ENV.MOCK ? `apiUser.json` : `/account/user/`;
    const res = await apiRequest('GET', url, true);
    return res;
};
