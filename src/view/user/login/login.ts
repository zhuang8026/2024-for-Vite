// framework
import { computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// pinia
import { useGlobalStore } from '@/store';

import { openLoading, closeLoading } from '@/utils/globalUtils';

//api
import { apiURLUser } from '@/api/api.ts';

export default {
    name: 'login',
    components: {},
    props: {},
    setup() {
        let router = useRouter();
        let store = useGlobalStore();

        let state = reactive({
            account: '',
            password: '',
            error: {
                accountEmail: ''
            }
        });

        // let forgetPassword = () => {
        //     router.push({ name: FUN_NAME.PWD_FORGET });
        // };

        const API001 = async () => {
            const res = await apiURLUser();
            console.log('API001:', res);
            // if (res.code === 200) {
            // } else {
            //     console.log('GET001API error:', res);
            // }
        };

        onMounted(async () => {
            await API001();
            openLoading('', '3000ms test');
            setTimeout(() => {
                closeLoading('');
            }, 3000);
        });

        return {};
    }
};
