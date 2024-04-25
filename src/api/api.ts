// framework
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useGlobalStore } from '@/store/index';

// enum 映射
// import { COOKIE_NAME, ENV, FUN_NAME, HEAD_ID, POPUP } from '@/assets/enum/enum';
// import { API_MODEL_TYPE_URL, API_NAME, SENSORDATA_AXIS, SENSORDATA_TYPE } from '@/assets/enum/api-enum';

// utils 工具
// import { getCookie } from '@/utils/cookie';

// component
import uiLoading from '@/components/ui/Loading/index';

// let host = 'http://127.0.0.1:8002/api/Device/Equipment/'

// 地端API
let hostAppURL: string = '';

// API初始化設定
let apiEnv = import.meta.env.VITE_ENV; //現在環境

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
let apiURLUser = `account/user/`;

// loading modal function
const openLoading = (_store, text = 'Loading') => {
    console.log('loading API start');
    _store.setIsLoadingOpen(true);
    uiLoading.show({ text });
};
const closeLoading = _store => {
    console.log('loading API end');
    _store.setIsLoadingOpen(false);
    uiLoading.hide();
};

console.log('hostURL', apiEnv, hostURL);

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
    // according to apiType, call error message modal
    if (_errorStatus == 404) {
        // console.log('GET_SENSOR_LIVE_DATA_ERROR_STATUS:', _errorStatus);
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

// API共用處理
let requ = 0;
const axionInit = (req: any, base: string) => {
    const store = useGlobalStore();
    const _router = useRouter();
    const _route = useRoute();
    console.log('req', req, 'router', _router);
    console.log('REQUEST', requ++, store);

    req.defaults.baseURL = base;

    // [請求攔截] client request
    req.interceptors.request.use(
        (config: any) => {
            let requestCount = store.getApiRequestCount;
            requestCount++;
            store.setApiRequestCount(requestCount);
            console.log(`注意: 第 ${store.apiRequestCount} request`);

            // if (!store.getIsLoadingOpen) {
            //     openLoading(store, store.isLoadingTest);
            // }

            return config;
        },
        function (error: any) {
            let requestCount = store.getApiRequestCount;
            requestCount--; // 當前執行API數量減 1
            store.setApiRequestCount(requestCount);
            console.log(`注意: 第 ${store.apiRequestCount} request`);
            // closeLoading(store);
            return Promise.reject(error);
        }
    );

    // [回覆攔截] server response
    req.interceptors.response.use(
        function (response: any) {
            // console.log('api 計算 response',needLoadingRequestCount)
            let store = useGlobalStore();
            let requestCount = store.getApiRequestCount;
            requestCount--;
            store.setApiRequestCount(requestCount);
            let isAllRequestFinished =
                requestCount == 0 && Object.values(store.loading).every(item => item == false);
            console.log(
                '完成幾個REQUEST',
                store.apiRequestCount,
                Object.values(store.loading).every(item => item == false)
            );
            console.log('loading page', store.loading);
            console.log('isAllRequestFinished', isAllRequestFinished);
            console.log(
                'all',
                Object.values(store.loading).every(item => item == false)
            );
            if (isAllRequestFinished) {
                console.log('關閉 close');
                closeLoading(store);
            }
            if (response.data) {
                return response.data;
            } else {
                return response;
            }
        },
        function (error: any) {
            console.log('error close', error);
            let requestCount = store.getApiRequestCount;
            requestCount--;
            store.setApiRequestCount(requestCount);
            closeLoading(store);
            if (error.response) {
                apiErrorHandle(error.response, _router, _route);
            }
            return Promise.reject(error);
        }
    );
    console.log('axionInit END');
    console.log('req', req.default);

    store.setApiReq(req);
};

// user login, info
export let apiLogin: any;
export let apiLogout: any;
export let apiGetMyInfo: any;

//#region  filterQuery
let filterQueryHandle = (filter, search) => {
    let searchQuery = '';
    let filterQuery = '';
    console.log('filterQueryHandle', filter);
    if (filter !== '') {
        if (filter.hasOwnProperty(HEAD_ID.LOCATION)) {
            console.log('filter[HEAD_ID.LOCATION]', filter[HEAD_ID.LOCATION]);
            filterQuery += '&locationId=' + filter[HEAD_ID.LOCATION].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.COMPONENT)) {
            filterQuery += '&component=' + filter[HEAD_ID.COMPONENT].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.EQ_NAME)) {
            filterQuery += '&equipmentName=' + filter[HEAD_ID.EQ_NAME].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.EQ_MODEL)) {
            filterQuery += '&equipmentModel=' + filter[HEAD_ID.EQ_MODEL].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.CP_NAME)) {
            filterQuery += '&componentName=' + filter[HEAD_ID.CP_NAME].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.CP_MODEL)) {
            filterQuery += '&componentModel=' + filter[HEAD_ID.CP_MODEL].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.CONNECT)) {
            filterQuery += '&connected=' + filter[HEAD_ID.CONNECT].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.SENSOR_POS)) {
            filterQuery += '&installLocation=' + filter[HEAD_ID.SENSOR_POS].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.EVENTTYPE)) {
            filterQuery += '&eventType=' + filter[HEAD_ID.EVENTTYPE].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.ANOMALY_PATTERN)) {
            filterQuery += '&anomalyPattern=' + filter[HEAD_ID.ANOMALY_PATTERN].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.TIMESTART)) {
            filterQuery += '&startTime=' + filter[HEAD_ID.TIMESTART];
        }
        if (filter.hasOwnProperty(HEAD_ID.TIMEEND)) {
            filterQuery += '&endTime=' + filter[HEAD_ID.TIMEEND];
        }
        if (filter.hasOwnProperty(HEAD_ID.BRAND)) {
            filterQuery += '&brand=' + filter[HEAD_ID.BRAND].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.MODEL_STATUS)) {
            filterQuery += '&modelStatus=' + filter[HEAD_ID.MODEL_STATUS].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.EVENT_TYPE)) {
            filterQuery += '&eventType=' + filter[HEAD_ID.EVENT_TYPE].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.PROCESS_STATUS)) {
            filterQuery += '&processStatus=' + filter[HEAD_ID.PROCESS_STATUS].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.TIME_START)) {
            filterQuery += '&startTime=' + filter[HEAD_ID.TIME_START].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.TIME_END)) {
            filterQuery += '&endTime=' + filter[HEAD_ID.TIME_END].join(',');
        }
        if (filter.hasOwnProperty(HEAD_ID.MODELID)) {
            filterQuery += '&modelId=' + filter[HEAD_ID.MODELID].join(',');
        }
    }

    if (search !== '') {
        searchQuery = `&search=${search}`;
    }

    return {
        filterQuery,
        searchQuery
    };
};

//#endregion filterQuery

// 地端APP
let appApiReq = {};

export let apiSetting = () => {
    let store = useGlobalStore();
    // 01 - API hostURL, url via different environment
    switch (apiEnv) {
        case ENV.MOCK:
        case ENV.HTTPS:
            hostName = `${window.location.origin}/`;
            hostURL = './mock/';
            hostAppURL = './mock/';
            break;
        case ENV.TEST:
            hostName = 'http://220.133.47.197/'; // for outside BE Alan
            // hostName = 'http://192.168.50.40/'; // for inside BE Alan
            // hostName = 'http://192.168.50.222/';  // for inside BE Vic
            hostURL = `${hostName}${apiURL}`; // for Lynn testing
            hostAppURL = 'http://127.0.0.1:35900/';
            break;
        case ENV.DEV:
            // hostName = 'http://192.168.0.102/'  // for ADC Server
            // hostName = 'http://192.168.50.40/'  // for BE Alan
            // hostName = 'http://192.168.50.222/'  // for BE Vic
            hostName = 'http://220.133.47.197/'; // for ais public server
            hostURL = `${hostName}${apiURL}`; // for Lynn testing
            hostAppURL = 'http://127.0.0.1:35900/';
            break;
        case ENV.DEMO:
            // hostName = 'http://192.168.50.40/'; // PHM Testing Server
            hostName = `${window.location.origin}/`;
            hostURL = `${hostName}${apiURL}`;
            hostAppURL = 'http://127.0.0.1:35900/';
            break;
        case ENV.STSGING:
        case ENV.PROD:
            // hostURL = `${window.location.origin}/api/`;
            hostName = `${window.location.origin}/`;
            hostURL = `${hostName}${apiURL}`;
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
        case ENV.DEMO:
        case ENV.DEV:
        case ENV.PROD:
        case ENV.STSGING:
            const token = getCookie(COOKIE_NAME.TOKEN);
            // const token = `Token rHRIlM54Is/wO3/WCxlacg==`; // todo: temp for phase 3
            globalApiURL.defaults.headers.common['Authorization'] = `Token ${token}`;
            axionInit(globalApiURL, hostURL);
            break;
    }

    appApiReq = axios.create({
        baseURL: hostAppURL
    });
    const token = getCookie(COOKIE_NAME.TOKEN);
    appApiReq.defaults.headers.common['Authorization'] = `Token ${token}`;
    console.log('hostAppURL', hostAppURL);

    // 03 - api request via different env

    switch (apiEnv) {
        case ENV.MOCK:
        case ENV.HTTPS:
            apiAppSensorDetect = () => appApiReq.get('apiAppSensorDetect.json');
            apiGetDevice = () => store.apiReq.get(`apiGetDevice.json`);
            apiGetLocation = () => store.apiReq.get(`apiGetLocation.json`);
            apiDelLocation = () => store.apiReq.get(`apiDelLocation.json`);
            apiAddLocation = () => store.apiReq.get(`apiAddLocation.json`);
            apiUpdateLocation = () => store.apiReq.get(`apiUpdateLocation.json`);
            // apiEquipmentList = () => store.apiReq.get(`apiEquipmentList.json`);
            apiEquipmentList = (page, filter = '', search = '') => {
                let { searchQuery, filterQuery } = filterQueryHandle(filter, search);
                console.log(`${apiURLEquipmenDetail}?page=${page}${searchQuery}${filterQuery}`);

                return store.apiReq.get(`apiEquipmentList.json`);
            };
            apiEquipment = () => store.apiReq.get(`apiEquipment.json`);
            apiAddEquipment = () => store.apiReq.get(`apiAddEquipment.json`);
            apiAddComponent = req => {
                console.log('apiAddComponent', req);
                return store.apiReq.get(`apiAddComponent.json`);
            };
            apiAddComponentImage = () => store.apiReq.get(`apiAddComponentImage.json`);
            apiEquipmentUpdate = () => store.apiReq.get(`apiEquipmentUpdate.json`);
            apiDeleteEquipment = () => store.apiReq.get(`apiDeleteEquipment.json`);
            apiComponentUpdate = () => store.apiReq.get(`apiComponentUpdate.json`);
            apiComponentGetNameModel = () => store.apiReq.get(`apiComponentGetNameModel.json`);
            apiEquipmentGetNameModel = () => store.apiReq.get(`apiEquipmentGetNameModel.json`);

            // Gateway
            apiGetGateway = () => store.apiReq.get(`apiGetGateway.json`); // 取得資料
            apiCreateGateway = () => {
                setTimeout(() => {
                    console.log('apiCreateGateway');
                    return store.apiReq.post(`apiGetGateway.json`); // 創建資料
                }, 10000);
            };
            apiEditGateway = () => store.apiReq.get(`apiGetGateway.json`); // 修改資料
            apiDeleteGateway = () => store.apiReq.get(`apiGetGateway.json`); // 刪除資料

            // sensor
            apiGetSensor = (page = 1, filters = '') => {
                let { filterQuery } = filterQueryHandle(filters, '');
                console.log('apiGetSensor url:', `${apiURLSensor}?page=${page}${filterQuery}`);
                return store.apiReq.get(`apiGetSensor.json`);
            };
            apiGetLocalSensor = () => store.apiReq.get(`apiGetLocalSensor.json`);
            apiUpdateSensor = () => store.apiReq.get(`apiUpdateSensor.json`);
            apiUpdateSensorImage = (id, formdata) => {
                console.log('apiUpdateSensorImage', id, formdata);
                return store.apiReq.get(`apiUpdateSensorImage.json`);
            };
            apiAddSensor = req => {
                console.log('apiAddSensor', req);
                return store.apiReq.get(`apiAddSensor.json`);
            };
            apiDelSensor = id => store.apiReq.get(`apiDelSensor.json`);
            apiUpdatePyhsicalSensor = (id, req) => {
                console.log('apiUpdatePyhsicalSensor', id, req);
                return store.apiReq.get(`apiUpdatePyhsicalSensor.json`);
            };
            apiAddPyhsicalSensor = () => {
                console.log('apiAddPyhsicalSensor');
                return store.apiReq.get(`apiAddPyhsicalSensor.json`);
            };
            apiGetLicense = () => store.apiReq.get(`apiGetLicense.json`);
            apiUpdateLicense = () => store.apiReq.get(`apiUpdateLicense.json`);
            apiGetEditPyhsicalSensor = () => store.apiReq.get(`apiGetEditPyhsicalSensor.json`);

            // Event
            apiGetEventList = (page = 1, filters = '') => {
                console.log('apiGetEventList', page, filters);
                let { filterQuery } = filterQueryHandle(filters, '');
                console.log('apiGetEventList url:', `${apiURLEvent}?page=${page}${filterQuery}`);
                return store.apiReq.get(`apiGetEvent.json`);
            };
            apiPostEventList = () => store.apiReq.get(`apiPostEventList.json`);
            apiEditEventList = () => store.apiReq.get(`apiGetEvent.json`);
            apiDeleteEventList = () => store.apiReq.get(`apiGetEvent.json`);
            apiNewEvent = () => store.apiReq.get(`apiNewEvent.json`); // create new event

            // model
            apiGetModelNewList = (page = 1, filter = '') => {
                let { searchQuery, filterQuery } = filterQueryHandle(filter, '');
                console.log(
                    `${apiURLModel}${API_MODEL_TYPE_URL.NEW}/?page=${page}${searchQuery}${filterQuery}`
                );
                return store.apiReq.get(`apiGetModelNewList.json`);
            }; //取得model list new
            apiGetModelCreated = (page = 1, filter = '') => {
                let { searchQuery, filterQuery } = filterQueryHandle(filter, '');
                console.log(
                    `${apiURLModel}${API_MODEL_TYPE_URL.CREATE}/?page=${page}${searchQuery}${filterQuery}`
                );
                return store.apiReq.get(`apiGetModelCreated.json`);
            }; // created
            apiGetModelPending = (page = 1, filter = '') => {
                let { searchQuery, filterQuery } = filterQueryHandle(filter, '');
                console.log(
                    `${apiURLModel}${API_MODEL_TYPE_URL.PENDING}/?page=${page}${searchQuery}${filterQuery}`
                );
                return store.apiReq.get(`apiGetModelPending.json`);
            }; // pending
            apiDeleteModel = () => store.apiReq.get(`apiDeleteModel.json`); // delete
            apiAddModel = () => store.apiReq.get(`apiAddModel.json`); // add
            apiTerminalModel = () => store.apiReq.get(`apiTerminalModel.json`); // terminal api
            apiRebuildModel = () => store.apiReq.get(`apiRebuildModel.json`); // rebuild api
            apiRetrainModel = () => store.apiReq.get(`apiRetrainModel.json`); // retrain api
            apiGetRetrainData = () => store.apiReq.get(`apiGetRetrainData.json`); //apiGetRetrainData
            // todo優化 modelType no use
            apiGetModelDetail = (sensorId, modelType) => {
                console.log(`${apiURLModel}${modelType}/?id=${sensorId}`);
                return store.apiReq.get(`apiGetModelDetail.json`); // model detail api
            };
            apiUpdateModelName = () => store.apiReq.get(`apiUpdateModelName.json`); // update model api
            apiPatchChangeModel = arr => store.apiReq.patch(`apiGetModelDetail.json`);

            // Event Trash
            apiGetEventTrashList = (page = 1, filters = '') => {
                let { filterQuery } = filterQueryHandle(filters, '');
                console.log('apiGetEventTrash url:', `${apiURLEvent}?page=${page}${filterQuery}`);
                return store.apiReq.get(`apiGetEventTrash.json`);
            };
            apiEditEventTrashList = () => store.apiReq.get(`apiGetEventTrash.json`); // reset
            apiDeleteEventTrashList = () => store.apiReq.get(`apiGetEventTrash.json`); // hard delete

            // Event Detail
            apiGetEventDetail = () => store.apiReq.get(`apiGetEventDetail.json`); // get data
            apiGetAnomalyType = () => store.apiReq.get(`apiGetAnomalyType.json`); // get data
            apiPostRelabelQty = () => store.apiReq.get(`apiPostRelabelQty.json`); // post data

            // Event Trash Detail
            apiGetEventTrashDetail = () => store.apiReq.get(`apiGetEventDetail.json`); // get data

            // sensorData
            apiGetSensorDataFFT = () => store.apiReq.get(`apiURLSensorDataFFT.json`); // get data
            apiGetSensorOA = (id = '', startTime = '', endTime = '') => {
                let tempArr: Array<string> = [];
                let filterCondition = '';
                if (id != '') {
                    tempArr.push(`sensorId=${id}`);
                }
                if (startTime != '') {
                    tempArr.push(`startTime=${startTime}`);
                }
                if (endTime != '') {
                    tempArr.push(`endTime=${endTime}`);
                }
                filterCondition = tempArr.join('&');
                console.log('filterCondition', filterCondition);
                console.log('url', `${apiURLSensorData}oa/?${filterCondition}`);

                return store.apiReq.get(`apiGetSensorOA.json`); //}
            };
            apiGetSensorData = (
                id = '',
                axis = SENSORDATA_AXIS.X,
                dataType = SENSORDATA_TYPE.ACC
            ) => {
                console.log(
                    'url',
                    `${apiURLSensorData}?sensorDataId=${id}&dataType=${dataType}&axis=${axis}`
                );
                return store.apiReq.get('apiGetSensorData.json'); // get data
            };
            apiGetSensorDataLive = payload => {
                console.log('api-Get-SensorDataLive:', payload);
                return store.apiReq.get(`apiGetSensorDataLive.json`); // get data
            };

            // SMTP
            apiGetSMTP = () => store.apiReq.get(`apiGetSMTP.json`); // get data
            apiPostSMTP = () => store.apiReq.get(`apiGetSMTP.json`); // 改變資料

            // dashboard
            apiGetDashboard = () => store.apiReq.get(`apiGetDashboard.json`); // get data
            apiPostEventQty = () => store.apiReq.get(`apiPostEventQty.json`); // get data
            apiPostEventRankOfEqpt = () => store.apiReq.get(`apiPostEventRankOfEqpt.json`); // get data
            apiGetPendingEvent = filters => {
                let { filterQuery } = filterQueryHandle(filters, '');
                console.log('apiGetPendingEvent url:', `${apiURLEvent}?page=${1}${filterQuery}`);
                return store.apiReq.get(`apiGetPendingEvent.json`); // get data
            };
            apiGetpendingEventQty = () => store.apiReq.get(`apiGetpendingEventQty.json`); // get data
            apiGetSensorNumber = () => store.apiReq.get(`apiGetSensorNumber.json`); // get data
            apiGetUserSettings = id => {
                console.log(`${apiURLUserSettings}?userId=${id}`);
                return store.apiReq.get(`apiGetUserSettings.json`); //get data
            };
            apiPatchUserSettings = () => store.apiReq.get(`apiPatchUserSettings.json`); //get data
            apiGetSensorCount = () => store.apiReq.get(`apiGetSensorCount.json`); //get data

            // user-setting
            apiGetUser = () => store.apiReq.get(`apiUser.json`); // get data
            apiPatchUser = () => store.apiReq.patch(`apiPatchUser.json`); // get data
            apiGetLicenseInformation = () => store.apiReq.get(`apiGetLicenseInformation.json`); //get data

            // Change Password
            apiPostModifyPassword = () => store.apiReq.get(`apiPostModifyPassword.json`); // 改密碼

            // [mock] Permission
            apiGetPermission = () => store.apiReq.get(`apiGetAccoutUser.json`); // get data
            apiGetSearchPermission = obj => {
                const { role, search } = obj;
                let searchURL = `search=${search}`;
                let url = '';

                if (role.length > 0 || search) {
                    let roleParam = role.join(',');
                    url = url + `role=${roleParam}`;

                    if (search != '') {
                        url = `${url}&${searchURL}`;
                    }
                }
                console.log('url:', url);
                return store.apiReq.get(`apiGetSearchPermission.json`); // get  filiter data
            };
            apiPatchPermission = () => store.apiReq.get(`apiGetAccoutUser.json`); // patch data
            apiPostPermission = () => store.apiReq.get(`apiGetAccoutUser.json`); // post data
            apiDeletePermission = () => store.apiReq.get(`apiGetAccoutUser.json`); // delete data
            apiPostResentInvitation = () => store.apiReq.get(`apiGetAccoutUser.json`); // send email data

            // pwd-forget
            apiPostPwdForget = () => store.apiReq.get(`apiPostPwdForget.json`); //忘記密碼
            apiLogin = () => {
                return store.apiReq.get(`apiLogin.json`); // login
            };
            apiLogout = () => {
                return store.apiReq.get(`apiLogout.json`); // logout
            };
            apiGetMyInfo = () => store.apiReq.get(`apiGetMyInfo.json`);
            // anomalyPattern
            apiGetAnomalyPattern = () => store.apiReq.get(`apiGetAnomalyPattern.json`); // get data

            break;
        case ENV.DEV:
        case ENV.STSGING:
        case ENV.PROD:
        case ENV.DEMO:
        case ENV.TEST:
            apiAppSensorDetect = () =>
                appApiReq.post('/sensor/scan/', { hostname: hostName.split('://')[1] });
            apiGetDevice = () => store.apiReq.get(apiURLEquipment); // get data
            // location
            apiGetLocation = () => store.apiReq.get(apiURLLocation);
            apiDelLocation = id => store.apiReq.delete(`${apiURLLocation}/${id}`);
            apiAddLocation = data => store.apiReq.post(`${apiURLLocation}`, data);
            apiUpdateLocation = (id, data) => store.apiReq.patch(`${apiURLLocation}/${id}`, data);
            // equipment
            apiEquipmentList = (page, filter = '', search = '') => {
                console.log('apiEquipmentList', page, filter, search);
                let { searchQuery, filterQuery } = filterQueryHandle(filter, search);
                console.log(`${apiURLEquipmenDetail}?page=${page}${searchQuery}${filterQuery}`);
                return store.apiReq.get(
                    `${apiURLEquipmenDetail}?page=${page}${searchQuery}${filterQuery}`
                );
            };
            apiEquipment = id => store.apiReq.get(`${apiURLEquipmenDetail}?equipmentId=${id}`);
            apiAddEquipment = data => store.apiReq.post(apiURLEquipment, data);
            apiAddComponent = data => store.apiReq.post(apiURLComponent, data);
            apiAddComponentImage = (id, data) =>
                store.apiReq.patch(`${apiURLComponent}${id}/`, data);
            apiEquipmentUpdate = (id, data) => store.apiReq.patch(`${apiURLEquipment}${id}/`, data);
            apiDeleteEquipment = data =>
                store.apiReq.delete(`${apiURLDevice}mutipleequipments/`, { data: data });
            apiComponentUpdate = (id, data) => store.apiReq.patch(`${apiURLComponent}${id}/`, data);
            apiComponentGetNameModel = () => store.apiReq.get(`${apiURLComponent}distinct/`);
            apiEquipmentGetNameModel = () => store.apiReq.get(`${apiURLEquipment}distinct/`);

            // Gateway
            apiGetGateway = page => store.apiReq.get(`${apiURLGateway}?page=${page}`); // 取得資料
            apiCreateGateway = data => store.apiReq.post(`${apiURLGateway}`, data); // 創建資料
            apiEditGateway = (id, data) => store.apiReq.patch(`${apiURLGateway}${id}/`, data); // 修改資料
            apiDeleteGateway = arr =>
                store.apiReq.delete(`${apiURLDevice}/mutiplegateways/`, { data: arr }); // 刪除資料

            // Sensor
            apiGetSensor = (page = 1, filters = '') => {
                let { filterQuery } = filterQueryHandle(filters, '');
                return store.apiReq.get(`${apiURLSensor}?page=${page}${filterQuery}`);
            };
            apiGetLocalSensor = id => store.apiReq.get(`${apiURLDevice}localsensor/${id}/`);
            apiUpdateSensor = (id, payload) => store.apiReq.patch(`${apiURLSensor}${id}/`, payload);
            apiUpdateSensorImage = (id, payload) =>
                store.apiReq.patch(`${apiURLSensor}${id}/`, payload);
            apiAddSensor = data => store.apiReq.post(`${apiURLSensor}`, data);
            apiDelSensor = id => store.apiReq.delete(`${apiURLSensor}${id}/`);
            apiGetLicense = () => store.apiReq.get(`${apiURLSensorLic}`);
            apiUpdateLicense = payload =>
                store.apiReq.patch(`${apiURLSensorLic}`, { data: payload });
            apiAddPyhsicalSensor = data => store.apiReq.post(`${apiURLPhysicalSensor}`, data);
            apiUpdatePyhsicalSensor = (id, data) =>
                store.apiReq.patch(`${apiURLPhysicalSensor}${id}/`, data);
            apiGetEditPyhsicalSensor = () => store.apiReq.get(`${apiURLPhysicalSensor}unedited/`);

            // model
            apiGetModelNewList = (page = 1, filter = '') => {
                let { searchQuery, filterQuery } = filterQueryHandle(filter, '');
                console.log(
                    `${apiURLModel}${API_MODEL_TYPE_URL.NEW}/?page=${page}${searchQuery}${filterQuery}`
                );
                return store.apiReq.get(
                    `${apiURLModel}${API_MODEL_TYPE_URL.NEW}/?page=${page}${searchQuery}${filterQuery}`
                );
            }; //取得model list
            apiGetModelCreated = (page = 1, filter) => {
                let { searchQuery, filterQuery } = filterQueryHandle(filter, '');
                console.log(
                    `${apiURLModel}${API_MODEL_TYPE_URL.CREATE}/?page=${page}${searchQuery}${filterQuery}`
                );
                return store.apiReq.get(`${apiURLModel}${API_MODEL_TYPE_URL.CREATE}/?page=${page}`);
            }; // created
            apiGetModelPending = (page = 1, filter) => {
                let { searchQuery, filterQuery } = filterQueryHandle(filter, '');
                console.log(
                    `${apiURLModel}${API_MODEL_TYPE_URL.PENDING}/?page=${page}${searchQuery}${filterQuery}`
                );
                return store.apiReq.get(
                    `${apiURLModel}${API_MODEL_TYPE_URL.PENDING}/?page=${page}${searchQuery}${filterQuery}`
                ); // pending
            };
            apiDeleteModel = payload => store.apiReq.delete(`${apiURLModel}/`, { data: payload }); // delete
            apiAddModel = payload => store.apiReq.post(`${apiURLModel}build/`, payload); // add
            apiTerminalModel = payload => store.apiReq.post(`${apiURLModel}stop/`, payload); // terminal api
            apiGetRetrainData = payload => store.apiReq.post(`${apiURLModel}retrainData/`, payload); // retainData api
            apiRebuildModel = payload => store.apiReq.post(`${apiURLModel}rebuild/`, payload); // rebuild api
            apiRetrainModel = payload => store.apiReq.post(`${apiURLModel}retrain/`, payload); // retrain api
            // modelType : new  / created / pending ${API_MODEL_TYPE_URL.PENDING}
            // todo:優化 modelType nouse
            apiGetModelDetail = (sensorId, modelType) => {
                return store.apiReq.get(`${apiURLModel}${modelType}/?id=${sensorId}`); // model detail api
            };
            apiUpdateModelName = payload => store.apiReq.post(`${apiURLModel}`, payload); // update model api
            apiPatchChangeModel = arr => store.apiReq.patch(`${apiURLModel}changeModel/`, arr); // change model api

            // Event
            apiGetEventList = (page = 1, filters = '') => {
                let { filterQuery } = filterQueryHandle(filters, '');
                return store.apiReq.get(`${apiURLEvent}?page=${page}${filterQuery}`);
            };
            apiEditEventList = arr => store.apiReq.patch(`${apiURLEvent}`, arr); // soft delete data
            apiDeleteEventList = arr => store.apiReq.delete(`${apiURLEvent}`, arr); // no use
            // export
            apiPostEventList = idList => {
                return store.apiReq.get(`${apiURLEvent}export/?id=${idList}`); // Export selected events
            };
            apiNewEvent = payload => store.apiReq.post(`${apiURLEvent}`, payload); // create new event

            // Event Trash
            apiGetEventTrashList = (page = 1, filters = '') => {
                let { filterQuery } = filterQueryHandle(filters, '');
                return store.apiReq.get(`${apiURLEventTrash}?page=${page}${filterQuery}`); // get data
            };

            apiEditEventTrashList = arr => store.apiReq.patch(`${apiURLEventTrash}`, arr); // reset
            apiDeleteEventTrashList = arr =>
                store.apiReq.delete(`${apiURLEventTrash}`, { data: arr }); // hard delete data

            // Event Detail
            apiGetEventDetail = id => store.apiReq.get(`${apiURLEvent}?id=${id}`); // get data
            apiGetAnomalyType = () => store.apiReq.get(`${apiURLAnomalyType}`); // get data
            apiPostRelabelQty = sensorId => store.apiReq.post(`${apiURLRelabelQty}`, sensorId); // post data

            // Event Trash
            apiGetEventTrashDetail = id => store.apiReq.get(`${apiURLEventTrash}?id=${id}`); // get data

            // sensorData
            // apiGetSensorDataFFT todo: need remove not use
            apiGetSensorDataFFT = ID =>
                store.apiReq.get(`${apiURLSensorData}fft/`, { sensorDataId: ID }); // get data
            apiGetSensorOA = (id = '', startTime = '', endTime = '') => {
                let tempArr: Array<string> = [];
                let filterCondition = '';
                if (id != '') {
                    tempArr.push(`sensorId=${id}`);
                }
                if (startTime != '') {
                    tempArr.push(`startTime=${startTime}`);
                }
                if (endTime != '') {
                    tempArr.push(`endTime=${endTime}`);
                }
                filterCondition = tempArr.join('&');
                console.log('filterCondition', filterCondition);
                console.log('url', `${apiURLSensorData}oa/?${filterCondition}`);

                return store.apiReq.get(`${apiURLSensorData}oa/?${filterCondition}`); //
            };
            apiGetSensorData = (id = '', axis, dataType) => {
                let tempArr: Array<string> = [];
                let filterCondition = '';
                // if (id != '') {
                // 	tempArr.push(`sensorDataId=${id}`);
                // }
                // if (startTime != '') {
                // 	tempArr.push(`startTime=${startTime}`);
                // }
                // if (endTime != '') {
                // 	tempArr.push(`endTime=${endTime}`);
                // }
                filterCondition = tempArr.join('&');
                console.log('filterCondition', filterCondition);
                console.log(
                    'url',
                    `${apiURLSensorData}?sensorDataId=${id}&dataType=${dataType}&axis=${axis}`
                );

                return store.apiReq.get(
                    `${apiURLSensorData}?sensorDataId=${id}&dataType=${dataType}&axis=${axis}`
                ); // get data
            };

            // apiGetSensorDataLive = (sensorId) => store.apiReq.get(`${apiURLSensorData}live/?physicalSensorId=${sensorId}`); // get data
            apiGetSensorDataLive = payload =>
                store.apiReq.post(`${apiURLSensorData}live/`, payload); // post data

            // SMTP
            apiGetSMTP = () => store.apiReq.get(`${apiURLSystem}smtpSetting/1/`); // get data
            apiPostSMTP = arr => store.apiReq.post(`${apiURLSystem}smtpSetting/`, arr); // 改變資料

            //dashboard
            apiGetDashboard = () => store.apiReq.get(`${apiURLDashboard}abMachineLoc/`); // get data
            apiPostEventQty = payload => store.apiReq.post(`${apiURLDashboard}eventQty/`, payload); // post data
            apiPostEventRankOfEqpt = payload =>
                store.apiReq.post(`${apiURLDashboard}eventRankOfEqpt/`, payload); // post data
            apiGetPendingEvent = filters => {
                let { filterQuery } = filterQueryHandle(filters, '');
                console.log('apiGetPendingEvent url:', `${apiURLEvent}?page=${1}${filterQuery}`);
                return store.apiReq.get(`${apiURLEvent}?page=${1}${filterQuery}`);
            }; // get data
            apiGetpendingEventQty = () => store.apiReq.get(`${apiURLDashboard}pendingEventQty/`); // h block get data
            apiGetSensorNumber = () => store.apiReq.get(`${apiURLSensor}number`); // get data
            apiGetUserSettings = id => store.apiReq.get(`${apiURLUserSettings}?userId=${id}`); // get data
            apiPatchUserSettings = payload => store.apiReq.patch(`${apiURLUserSettings}`, payload); // update data
            apiGetSensorCount = () => store.apiReq.get(`${apiURLSensorCount}connected`); // get data

            //user-setting
            apiGetUser = () => store.apiReq.get(`account/user/`); //get data
            apiPatchUser = payload => store.apiReq.patch(`${apiURLUser}`, payload); // update data
            apiGetLicenseInformation = () => store.apiReq.get(`${apiURLLicense}`); // get data

            // Change Password
            apiPostModifyPassword = payload =>
                store.apiReq.post(`${apiURLUser}modifyPassword/`, payload); // 改密碼

            // [dev] Permission
            apiGetPermission = () => store.apiReq.get(`${apiURLAccount}admin/user/`); //get data
            apiGetSearchPermission = obj => {
                const { role, search } = obj;
                let searchURL = `search=${search}`;
                let url = '';

                if (role.length > 0 || search) {
                    let roleParam = role.join(',');
                    url = url + `role=${roleParam}`;

                    if (search != '') {
                        url = `${url}&${searchURL}`;
                    }
                }
                console.log('apiGETSearchPermission url:', `${apiURLAccount}admin/user/?${url}`);

                return store.apiReq.get(`${apiURLAccount}admin/user/?${url}`); //get data
            };
            apiPostPermission = payload =>
                store.apiReq.post(`${apiURLAccount}admin/user/`, payload); // post data
            apiPatchPermission = payload =>
                store.apiReq.patch(`${apiURLAccount}admin/user/`, payload); // patch data
            apiDeletePermission = data =>
                store.apiReq.delete(`${apiURLAccount}admin/user/`, { data: data }); // delete data
            apiPostResentInvitation = payload =>
                store.apiReq.post(`${apiURLAccount}admin/resentInvitation/`, payload); // send email data

            // pwd-forget
            apiPostPwdForget = payload =>
                store.apiReq.post(`${apiURLUser}forgetPassword/`, payload); // 忘記密碼
            apiLogin = payload => store.apiReq.post(`${apiURLAccount}login/`, payload); // login / test@asus.com/Admin1234
            apiLogout = () => store.apiReq.post(`${apiURLAccount}logout/`); // logout
            apiGetMyInfo = () => store.apiReq.get(`${apiURLAccount}user/`); // get user info
            // anomalyPattern
            apiGetAnomalyPattern = () => store.apiReq.get(`${apiURLDiagnostic}/anomalyPattern/`); //get data

            break;
    } //end: switch
};
