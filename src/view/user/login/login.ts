// framework
import { computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// pinia
import { useGlobalStore } from '@/store';

// enum 映射
import { COOKIE_NAME } from '@/assets/enum/enum';

// utils
import { openLoading, closeLoading } from '@/utils/globalUtils';
import { setCookie, getCookie } from '@/utils/cookie';

//api
import { apiLogin } from '@/api/api.ts';

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

        const login = async () => {
            openLoading('', 'Logging in...');

            let payload = {
                userEmail: state.account,
                password: state.password
            };
            const res: any = await apiLogin(payload);
            if (res.code === 200) {
                console.log('Login success:', res);

                const expiredDate = res.data.expire_at;
                let token = res.data.token;
                setCookie(COOKIE_NAME.TOKEN, token, expiredDate); // 3 day token expired todo: check

                router.push({ name: 'Dashboard' });
            } else {
                console.log('Login error:', res);
            }
            closeLoading('');
        };

        // let forgetPassword = () => {
        //     router.push({ name: FUN_NAME.PWD_FORGET });
        // };

        return {
            state,
            login
        };
    }
};
