import { useRouter } from 'vue-router';

// enum 映射
// import { COOKIE_NAME } from '@/assets/enum/enum';

// utils
import { useI18n } from 'vue-i18n';
// import { openLoading, closeLoading } from '@/utils/globalUtils';
// import { setCookie, getCookie, eraseCookie } from '@/utils/cookie';

// import { apiLogout } from '@/api/api.ts';

export default {
    name: 'dashboard',
    components: {},
    props: [],
    setup() {
        let router = useRouter();

        const { locale } = useI18n();
        const handleChangeLanguage = e => {
            locale.value = e.target.value;
        };

        return {
            handleChangeLanguage
        };
    }
};
