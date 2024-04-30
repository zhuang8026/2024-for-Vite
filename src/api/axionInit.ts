// framework
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/index';

// axios
import axios from 'axios';

// utils 工具
// import { getCookie } from '@/utils/cookie';

// // loading modal function
// const openLoading = (_store, text = 'Loading') => {
//     console.log('loading API start');
//     _store.setIsLoadingOpen(true);
//     uiLoading.show({ text });
// };
// const closeLoading = _store => {
//     console.log('loading API end');
//     _store.setIsLoadingOpen(false);
//     uiLoading.hide();
// };

let apiErrorHandle = (res, router, route) => {
    let _store = useGlobalStore();
    let _res = res;
    const _router = router;
    const _route = route;

    let apiType = _store.getApiType;
    let _errorStatus = _res.status;
    // let _statusText = _res.statusText;
    // let _errorData = _res.data;

    console.log('_route' + _route, '_router', _router);
    console.log('_res', _res, apiType);

    if (_errorStatus == 404) {
        // _store.setModalType(POPUP.SENSOR_DISCONNECT); // 傳感器 已斷開
        // _store.setIsModalOpen(true);
    } else if (_errorStatus == 401) {
    } else if (_errorStatus == 500) {
    } else if (_errorStatus == 403) {
        route.back();
    } else {
        // _errorData = '';
        // _store.setModalType(POPUP.API_ERROR_GLOBAL);
        // let data = {
        //     val: `API Error [${_errorStatus}] - ${_statusText} \n ${_errorData} `
        // };
        // _store.setModalInputData(data);
        // _store.setIsModalOpen(true);
    }
};

// API 初始化 (包含 [請求攔截] client request & [回覆攔截] server response)
export const axionInit = async (req: any, base: string) => {
    const store = useGlobalStore();
    const _router = useRouter();
    const _route = useRoute();
    // console.log('req', req);
    // console.log('router', _router);
    console.log('axionInit start');
    console.log('base', base);

    axios.defaults.baseURL = base;

    // [請求攔截] client request
    axios.interceptors.request.use(
        (config: any) => {
            let requestCount = store.getApiRequestCount;
            requestCount++;
            store.setApiRequestCount(requestCount);
            console.log(`通知: 已送出 ${store.apiRequestCount} API 請求`);

            // if (!store.getIsLoadingOpen) openLoading(store, store.isLoadingTest);

            return config;
        },
        function (error: any) {
            let requestCount = store.getApiRequestCount;
            requestCount--; // 當前執行API數量減 1
            store.setApiRequestCount(requestCount);
            console.log(`注意: 已送出 ${store.apiRequestCount} API 請求`);
            // closeLoading(store);
            return Promise.reject(error);
        }
    );

    // [回覆攔截] server response
    axios.interceptors.response.use(
        // [API回覆成功]
        function (response: any) {
            let store = useGlobalStore();
            let requestCount = store.getApiRequestCount;
            requestCount--;
            store.setApiRequestCount(requestCount);

            let isAPIRequest = requestCount == 0; // 請求是否全部結束
            // let isPageLoading = Object.values(store.loading).every(item => item == false); // 頁面loading是否全部結束
            let isAllRequestFinished = isAPIRequest; // 全部請求結束 & 頁面loading結束

            console.log(`通知: 已完成 ${requestCount}支 API 請求`);

            if (isAllRequestFinished) {
                console.log('通知: 當前頁面 API請求 已全部結束');
                // closeLoading(store);
            }
            if (response.data) {
                return response.data;
            } else {
                return response;
            }
        },
        // [API回覆失敗]
        function (error: any) {
            let requestCount = store.getApiRequestCount;
            requestCount--;
            store.setApiRequestCount(requestCount);
            // closeLoading(store);
            if (error.response) {
                apiErrorHandle(error.response, _router, _route);
            }
            return Promise.reject(error);
        }
    );

    // 存入 store/pinia
    // store.setApiReq(req);

};
