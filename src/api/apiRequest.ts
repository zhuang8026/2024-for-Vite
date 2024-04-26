// framework
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useGlobalStore } from '@/store/index';

// enum 映射
import { COOKIE_NAME, ENV } from '@/assets/enum/enum';

// utils 工具
import { getCookie } from '@/utils/cookie';
import { axionInit } from '@/api/axionInit.ts';
import { filterQueryHandle } from '@/utils/globalUtils';

// component
// import uiLoading from '@/components/ui/Loading/index';

// let host = 'http://127.0.0.1:8002/api/Device/Equipment/'

export const apiRequest = async (method, url, auth, params = null) => {
    // 地端API
    let hostAppURL: string = '';

    // API初始化設定
    let apiEnv = import.meta.env.VITE_ENV; //現在環境

    let hostURL: string = '';
    let hostName: string = '';
    let apiURL: string = 'api/';
    let headers = {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // 'Content-Type': 'application/json',
    };

    let globalApiURL: any = axios.create({});

    // // 設定URL
    // let apiURLDevice = 'device/';
    // let apiURLDiagnostic = 'diagnostics';
    // let apiURLSystem = 'system/';
    // let apiURLAccount = 'account/';

    // //user-setting
    // let apiURLUser = `${apiURLAccount}/user/`;

    console.log('hostURL', apiEnv, hostURL);

    // 地端APP
    // let appApiReq = {};

    // let store = useGlobalStore();
    // 01 - API hostURL, url via different environment
    switch (apiEnv) {
        case ENV.MOCK:
            hostName = `${window.location.origin}/`;
            hostURL = `./mock/`;
            // hostAppURL = './mock/';
            break;
        case ENV.DEV:
            // hostName = 'http://192.168.0.102/'  // for ADC Server
            // hostName = 'http://192.168.50.40/'  // for BE Alan
            // hostName = 'http://192.168.50.222/'  // for BE Vic
            hostName = 'http://220.133.47.197/'; // for ais public server
            hostURL = `${hostName}${apiURL}`; // for Lynn testing
            // hostAppURL = 'http://127.0.0.1:35900/';
            break;
        case ENV.STSGING:
        case ENV.PROD:
            hostName = `${window.location.origin}/`;
            hostURL = `${hostName}${apiURL}`;
            // hostAppURL = 'http://127.0.0.1:35900/';
            break;
        default:
            hostURL = './mock';
            hostAppURL = './mock/';
    } //end: switch

    // 02 - api global initial setting

    switch (apiEnv) {
        case ENV.MOCK:
            axionInit(globalApiURL, hostURL);
            break;
        case ENV.DEV:
        case ENV.PROD:
        case ENV.STSGING:
            const token = getCookie(COOKIE_NAME.TOKEN);
            // const token = `Token rHRIlM54Is/wO3/WCxlacg==`;
            console.log('token', token);
            // globalApiURL.defaults.headers.common['Authorization'] = `Token ${token}`;
            headers['Authorization'] = `Token ${token}`;
            axionInit(globalApiURL, hostURL);
            break;
    }

    try {
        globalApiURL = await axios({
            headers,
            method,
            url: hostURL + url,
            data: params
        });

        const { status, data } = globalApiURL;
        console.log('globalApiURL', globalApiURL);
        if (status === 200) {
            return {
                code: status,
                data: data
            };
        } else {
            console.log(`API ERROR: ${data.message}`);
        }
    } catch (error) {
        return error;
    }
};
