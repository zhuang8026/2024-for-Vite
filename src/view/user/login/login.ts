// framework
import { computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// pinia
import { useGlobalStore } from '@/store';

import { openLoading, closeLoading } from '@/utils/globalUtils';

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

        onMounted(() => {
            openLoading('', '3000ms test');
            setTimeout(() => {
                closeLoading('');
            }, 3000);
        });

        return {};
    }
};
