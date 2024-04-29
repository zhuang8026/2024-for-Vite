import { useRouter } from 'vue-router';

// enum 映射
import { COOKIE_NAME } from '@/assets/enum/enum';

// utils
import { openLoading, closeLoading } from '@/utils/globalUtils';
import { setCookie, getCookie, eraseCookie } from '@/utils/cookie';

import { apiLogout } from '@/api/api.ts';

const Menu = {
    name: 'menu',
    components: {},
    props: [],
    setup() {
        let router = useRouter();
        const logout = async () => {
            openLoading('', 'Logging out...');

            try {
                let res = await apiLogout();
                eraseCookie(COOKIE_NAME.TOKEN);
                console.log('res', res);
                router.push({ name: 'Login' });
            } catch (err) {
                console.log('error in logout API:', err);
            }

            closeLoading('');
        };
        return {
            logout
        };
    }
};

export default Menu;
