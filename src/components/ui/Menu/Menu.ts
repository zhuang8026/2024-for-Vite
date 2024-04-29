import { computed, isShallow, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// enum 映射
import { COOKIE_NAME, FUN_NAME } from '@/assets/enum/enum';

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
        // menu
        let menu = reactive([
            {
                main: 'Dashboard',
                subList: [
                    {
                        icon: '',
                        name: 'Overall',
                        link: 'Dashboard',
                        isShow: true
                    }
                ],
                isShow: true
            },
            {
                main: 'Equipment Management',
                subList: [
                    {
                        icon: '',
                        name: 'Device information',
                        link: 'Device',
                        isShow: true
                    }
                ],
                isShow: true
            },
            {
                main: 'Event Management',
                subList: [
                    {
                        icon: '',
                        name: 'Event Log',
                        link: 'Event',
                        isShow: true
                    }
                ],
                isShow: true
            },
            {
                main: 'Gateway Management',
                subList: [
                    {
                        icon: '',
                        name: 'Gateway',
                        link: 'Gateway',
                        isShow: true
                    }
                ],
                isShow: true
            }
        ]); //end: menu

        //點擊menu
        let onClickMenu = (menuName: string) => {
            let _menuName = menuName;
            router.push({ name: _menuName });
        }; //end: onClickMenu

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
        return { menu, logout, onClickMenu };
    }
};

export default Menu;
