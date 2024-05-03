import { computed, isShallow, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// enum 映射
import { COOKIE_NAME, FUN_NAME } from '@/assets/enum/enum';

// utils
import { openLoading, closeLoading } from '@/utils/globalUtils';
import { setCookie, getCookie, eraseCookie } from '@/utils/cookie';
import { Permissions } from '@/utils/permission';

// store
import { useGlobalStore } from '@/store/index';

import { apiLogout } from '@/api/api.ts';

const Menu = {
    name: 'menu',
    components: {},
    props: [],
    setup() {
        let router = useRouter();

        const checkAuth = routerName => {
            const store = useGlobalStore();
            const user = store.userRole;
            let permissionList: any = Permissions[routerName];

            return permissionList.includes(user);
        };

        // menu
        let menu = reactive([
            {
                main: 'Dashboard',
                subList: [
                    {
                        icon: '',
                        name: 'Overall',
                        link: 'Dashboard',
                        isShow: checkAuth('Dashboard')
                    }
                ],
                isShow: checkAuth('Dashboard')
            },
            {
                main: 'Equipment Management',
                subList: [
                    {
                        icon: '',
                        name: 'Device log',
                        link: 'Device',
                        isShow: checkAuth('Device')
                    }
                ],
                isShow: checkAuth('Device')
            },
            {
                main: 'Event Management',
                subList: [
                    {
                        icon: '',
                        name: 'Event Log',
                        link: 'Event',
                        isShow: checkAuth('Event')
                    }
                ],
                isShow: checkAuth('Event')
            },
            {
                main: 'Gateway Management',
                subList: [
                    {
                        icon: '',
                        name: 'Gateway list',
                        link: 'Gateway',
                        isShow: checkAuth('Gateway')
                    }
                ],
                isShow: checkAuth('Gateway')
            }
        ]);

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

        // onMounted(() => {});

        return { menu, logout, onClickMenu };
    }
};

export default Menu;
