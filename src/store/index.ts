import { ROLE } from '@/assets/enum/enum';
import axios from 'axios';
import { defineStore } from 'pinia';
import { FUN_NAME } from '@/assets/enum/enum';

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () => ({
        isFirstLogin: true,
        apiRequestCount: 0, // 統計 api 呼叫總數
        apiReq: axios.create({}),
        userRole: ROLE.ADMIN,
        sensorDetectSlectedId: '', // detect-sensor selected id, wheen detect, add it
        isLoadingOpen: false,
        isLoadingTest: 'Loading',
        apiType: '',
        loading: {
            [FUN_NAME.LOGIN]: false
        }
    }),

    getters: {
        getApiRequestCount: state => state.apiRequestCount,
        getSensorDetectSelectedId: state => state.sensorDetectSlectedId,
        getIsLoadingPage: state => page => state.loading[page],
        getIsLoadingOpen: state => state.isLoadingOpen,
        getIsLoadingTest: state => state.isLoadingTest,
        getApiType: state => state.apiType,
        getIsFirstLogin: state => state.isFirstLogin
    },

    actions: {
        setApiRequestCount(count: number) {
            this.apiRequestCount = count;
        },
        setApiReq(axios) {
            this.apiReq = axios;
        },
        setApiReqVal(key, val) {
            this.apiReq[key] = val;
        },
        setRole(val) {
            this.userRole = val;
        },
        setSensorDetectSelectedId(id) {
            this.sensorDetectSlectedId = id;
        },
        setLoadingPage(page, val) {
            console.log('setLoadingPage', page, val);
            this.loading[page] = val;
            console.log('this.loading', this.loading);
        },
        setIsLoadingOpen(val) {
            this.isLoadingOpen = val;
        },
        setIsLoadingTest(val) {
            this.isLoadingTest = val;
        },
        setApiType(val) {
            this.apiType = val;
        },
        setIsFirstLogin(val) {
            this.isFirstLogin = val;
        }
    }
});
