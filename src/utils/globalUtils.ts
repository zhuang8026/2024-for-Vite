/**
 * 處理filter選項
 * @param opt  選項
 * @param id  這個選項的ID
 * @returns
 */

// kit
import { ref } from 'vue';
import { uuid } from 'vue3-uuid';

// component
import uiLoading from '@/components/ui/Loading/index';

// until
// import { getCookie } from "./cookie";

// API
import { apiGetMyInfo } from '@/api/api';

//#region checkUserPermission
export let checkUserPermission = async () => {
    try {
        let result = await apiGetMyInfo();
        console.log('apiGetMyInfo result', result);
        return result;
    } catch (err) {
        console.log('API ERROR');
    }
    return '';
};

export const openLoading = (_store, text = 'Loading') => {
    // _store.setIsLoadingOpen(true);
    uiLoading.show({ text });
};
export const closeLoading = _store => {
    // _store.setIsLoadingOpen(false);
    uiLoading.hide();
};
