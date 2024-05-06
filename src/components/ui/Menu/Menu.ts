import { computed, isShallow, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// enum 映射
import { COOKIE_NAME, FUN_NAME } from '@/assets/enum/enum';

// utils
import { useI18n } from 'vue-i18n';
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
        const { t, locale } = useI18n();

        const checkAuth = routerName => {
            const store = useGlobalStore();
            const user = store.userRole;
            let permissionList: any = Permissions[routerName];

            return permissionList.includes(user);
        };

        // menu
        let menu = reactive([
            {
                main: t(`menu.dashboard`),
                key: 'dashboard',
                subList: [
                    {
                        icon: '',
                        key: 'overall',
                        name: t(`menu.overall`),
                        link: 'Dashboard',
                        isShow: checkAuth('Dashboard')
                    }
                ],
                isShow: checkAuth('Dashboard')
            },
            {
                main: t(`menu.equipment_management`),
                key: 'equipment_management',
                subList: [
                    {
                        icon: '',
                        key: 'device_log',
                        name: t(`menu.device_log`),
                        link: 'Device',
                        isShow: checkAuth('Device')
                    }
                ],
                isShow: checkAuth('Device')
            },
            {
                main: t(`menu.event_management`),
                key: 'event_management',
                subList: [
                    {
                        icon: '',
                        key: 'event_log',
                        name: t(`menu.event_log`),
                        link: 'Event',
                        isShow: checkAuth('Event')
                    }
                ],
                isShow: checkAuth('Event')
            },
            {
                main: t(`menu.gateway_management`),
                key: 'gateway_management',
                subList: [
                    {
                        icon: '',
                        key: 'gateway_list',
                        name: t(`menu.gateway_list`),
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

        // 监听语言切换事件
        watch(
            () => locale.value,
            () => {
                console.log('locale', locale.value);
                // 更新翻译内容
                menu.forEach(item => {
                    item.main = t(`menu.${item.key}`);
                    item.subList.forEach(subItem => {
                        subItem.name = t(`menu.${subItem.key}`);
                    });
                });
            }
        );

        // onMounted(() => {});

        return { menu, logout, onClickMenu };
    }
};

export default Menu;
