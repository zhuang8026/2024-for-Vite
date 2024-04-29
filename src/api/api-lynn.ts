// framework
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useGlobalStore } from '@/store/index';

// enum 映射
import { ENV } from '@/assets/enum/enum';

// utils 工具
import { getCookie } from '@/utils/cookie';
import { axionInit } from '@/api/axionInit.ts';
import { filterQueryHandle } from '@/utils/globalUtils';

// component
// import uiLoading from '@/components/ui/Loading/index';

// let host = 'http://127.0.0.1:8002/api/Device/Equipment/'

// 地端API
let hostAppURL: string = '';

// API初始化設定
// let apiEnv = import.meta.env.VITE_ENV; //現在環境

let hostURL: string = '';
let hostName: string = '';
let apiURL: string = 'api/';
export let globalApiURL: any = axios.create({});

// 設定URL
let apiURLDevice = 'device/';
let apiURLDiagnostic = 'diagnostics';
let apiURLSystem = 'system/';
let apiURLAccount = 'account/';

//user-setting
// let apiURLUser = `${apiURLAccount}/user/`;

// console.log('hostURL', apiEnv, hostURL);

// user login, info
export let apiLogin: any;
export let apiLogout: any;
export let apiGetMyInfo: any;

// 地端APP
let appApiReq = {};

export let apiSetting = () => {
    let store = useGlobalStore();
    // 01 - API hostURL, url via different environment
    switch (apiEnv) {
        case ENV.MOCK:
            hostName = `${window.location.origin}/`;
            hostURL = './mock/';
            hostAppURL = './mock/';
            break;
        case ENV.DEV:
            // hostName = 'http://192.168.0.102/'  // for ADC Server
            // hostName = 'http://192.168.50.40/'  // for BE Alan
            // hostName = 'http://192.168.50.222/'  // for BE Vic
            hostName = 'http://220.133.47.197/'; // for ais public server
            hostURL = `${hostName}${apiURL}`; // for Lynn testing
            hostAppURL = 'http://127.0.0.1:35900/';
            break;
        case ENV.STSGING:
        case ENV.PROD:
            hostName = `${window.location.origin}/`;
            hostURL = `${hostName}${apiURL}`;
            // hostURL = `${window.location.origin}/api/`;
            hostAppURL = 'http://127.0.0.1:35900/';
            break;
        default:
            hostURL = './mock';
            hostAppURL = '/127.0.0.1:8008/apiApp';
    } //end: switch

    // 02 - api global initial setting

    switch (apiEnv) {
        case ENV.MOCK:
            console.log('mock');
            axionInit(globalApiURL, hostURL);
            break;
        case ENV.DEV:
        case ENV.PROD:
        case ENV.STSGING:
            const token = getCookie('William_token0987654321234567890987654321234567890987654321');
            // const token = `Token rHRIlM54Is/wO3/WCxlacg==`; // todo: temp for phase 3
            globalApiURL.defaults.headers.common['Authorization'] = `Token ${token}`;
            axionInit(globalApiURL, hostURL);
            break;
    }

    appApiReq = axios.create({
        baseURL: hostAppURL
    });
    const token = getCookie('William_token0987654321234567890987654321234567890987654321');
    appApiReq.defaults.headers.common['Authorization'] = `Token ${token}`;
    console.log('hostAppURL', hostAppURL);

    // 03 - api request via different env

    switch (apiEnv) {
        case ENV.MOCK:
            apiAppSensorDetect = () => appApiReq.get('apiAppSensorDetect.json');
            apiGetDevice = () => store.apiReq.get(`apiGetDevice.json`);
            apiGetLocation = () => store.apiReq.get(`apiGetLocation.json`);
            apiDelLocation = () => store.apiReq.get(`apiDelLocation.json`);
            apiAddLocation = () => store.apiReq.get(`apiAddLocation.json`);
            apiUpdateLocation = () => store.apiReq.get(`apiUpdateLocation.json`);

            break;
        case ENV.DEV:
        case ENV.STSGING:
        case ENV.PROD:
            apiAppSensorDetect = () =>
                appApiReq.post('/sensor/scan/', { hostname: hostName.split('://')[1] });
            apiGetDevice = () => store.apiReq.get(apiURLEquipment); // get data
            // location
            apiGetLocation = () => store.apiReq.get(apiURLLocation);
            apiDelLocation = id => store.apiReq.delete(`${apiURLLocation}/${id}`);
            apiAddLocation = data => store.apiReq.post(`${apiURLLocation}`, data);
            apiUpdateLocation = (id, data) => store.apiReq.patch(`${apiURLLocation}/${id}`, data);

            break;
    } //end: switch
};
