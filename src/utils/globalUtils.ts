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

// // API
import { apiGetMyInfo } from '@/api/api';

//# apiCheckUserPermission
export let apiCheckUserPermission = async () => {
    try {
        let res = await apiGetMyInfo();
        console.log('apiGetMyInfo success:', res);
        return res;
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

// //#region  filterQuery
// export const filterQueryHandle = (filter, search) => {
//     let searchQuery = ''; // 模糊查詢
//     let filterQuery = ''; // 勾選查詢

//     if (filter !== '') {
//         if (filter.hasOwnProperty('LOCATION')) filterQuery += '&locationId=' + filter['LOCATION'].join(',');
//         if (filter.hasOwnProperty('COMPONENT')) filterQuery += '&component=' + filter['COMPONENT'].join(',');
//     }

//     if (search !== '') searchQuery = `&search=${search}`;

//     return {
//         searchQuery, // 模糊查詢
//         filterQuery, // 勾選查詢
//     };
// };
