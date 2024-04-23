// vue
import { createRouter, createWebHashHistory } from 'vue-router';
// enum
import { ENV, FUN_NAME, PAGE_TYPE } from '@/assets/enum/enum';

// page
import Main from '@/view/main/index.vue';
// device
import device from '@/view/devices/device/index.vue';
import deviceAdd from '@/view/devices/device-add/index.vue';
import deviceDetail from '@/view/devices/device-detail/index.vue';
import deviceSensorDetect from '@/view/devices/device-sensor-detect/index.vue';
// gateway
import gateway from '@/view/devices/gateway/index.vue';
// event
import event from '@/view/event/event-list/index.vue';
import eventDetail from '@/view/event/event-list/event-detail/index.vue';
import eventNotificationSettings from '@/view/event/event-list/event-notification-settings/index.vue';
//eventTrash
import eventTrash from '@/view/event/event-trash/index.vue';
import eventTrashDetail from '@/view/event/event-trash/trash-detail/index.vue';

// component
import msg from '@/view/msg/index.vue';
import model from '@/view/model/model/index.vue';
import uiDemo from '@/components/ui-demo/index.vue';
import dashboard from '@/view/dashboard/dashboard/index.vue';
import modelDetail from '@/view/model/model-detail/index.vue';
import userSetting from '@/view/user/user-setting/index.vue';
import pwdReset from '@/view/user/pwd-reset/index.vue';
import login from '@/view/login/login/index.vue';
import pwdSetting from '@/view/login/pwd-setting/index.vue';
import smtp from '@/view/user/smtp/index.vue';
import permission from '@/view/user/permission/index.vue';
import sensorOverview from '@/view/dashboard/sensor-overview/index.vue';
import pwdForget from '@/view/login/pwd-forget/index.vue';
import { permissionMapping } from '@/utils/permission';
import { useGlobalStore } from '@/store';
import { checkUserPermission } from '@/utils/globalUtils';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/msg',
        component: msg,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/main',
        name: 'Index',
        component: Main,

        children: [
            {
                path: 'device',
                name: FUN_NAME.DEVICE,
                meta: {
                    layout: PAGE_TYPE.MAIN,
                    theme: 'default', // defualt, white, grey
                    isExtra: false,
                    requiresAuth: true
                },
                component: device
            },
            {
                path: 'device-detail/:id',
                name: FUN_NAME.DEVICE_DETAIL,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white', // defualt, white, grey
                    requiresAuth: true
                },
                component: deviceDetail
            },
            {
                path: 'device-edit/:id',
                name: FUN_NAME.DEVICE_EDIT,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white', // defualt, white, grey
                    requiresAuth: true
                },
                component: deviceDetail
            },
            {
                path: 'gateway',
                name: FUN_NAME.GATEWAY,
                meta: {
                    layout: PAGE_TYPE.MAIN,
                    theme: 'default',
                    isExtra: false, // 是否有額外的東西要顯示在標題列'
                    requiresAuth: true
                },
                component: gateway
            },
            {
                path: 'event',
                name: FUN_NAME.EVENT,
                props: true,
                meta: {
                    layout: PAGE_TYPE.MAIN,
                    theme: 'default',
                    isExtra: true, // 是否有額外的東西要顯示在標題列'
                    requiresAuth: true
                },
                component: event
            },
            {
                path: 'event-detail/:id',
                name: FUN_NAME.EVENT_DETAIL,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true, // 是否要在內頁自動長有scrollbar
                    requiresAuth: true
                },
                component: eventDetail
            },
            {
                path: 'event/event-notification-settings',
                name: FUN_NAME.EVENT_NOTIFICATION,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true, // 是否要在內頁自動長有scrollbar
                    requiresAuth: true
                },
                component: eventNotificationSettings
            },
            {
                path: 'event-trash',
                name: FUN_NAME.EVENT_TRASH,
                meta: {
                    layout: PAGE_TYPE.MAIN,
                    theme: 'default',
                    isExtra: false,
                    requiresAuth: true
                },
                component: eventTrash
            },
            {
                path: 'trash-detail/:id',
                name: FUN_NAME.TRASH_DETAIL,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true, // 是否要在內頁自動長有scrollbar
                    requiresAuth: true
                },
                component: eventTrashDetail
            },
            {
                path: 'model',
                name: FUN_NAME.MODEL,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'grey',
                    isScroll: false, // 是否要在內頁自動長有scrollbar
                    requiresAuth: true
                },
                component: model
            },
            {
                path: 'model/list-new',
                name: FUN_NAME.MODEL_NEW,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'grey',
                    isScroll: false, // 是否要在內頁自動長有scrollbar
                    requiresAuth: true
                },
                component: model
            },
            {
                path: 'model/list-create',
                name: FUN_NAME.MODEL_CREATE,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'grey',
                    requiresAuth: true
                },
                component: model
            },
            {
                path: 'model/list-retrain',
                name: FUN_NAME.MODEL_RETRAIN,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'grey',
                    requiresAuth: true
                },
                component: model
            },
            {
                path: 'model-detail/:fun/:id/',
                name: FUN_NAME.MODEL_DETAIL,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    requiresAuth: true
                },
                props: true,
                // params:{
                //     sensorId: 'id',
                //     modelId: 'modelId',
                // },
                component: modelDetail
            },
            {
                path: 'dashboard',
                name: FUN_NAME.DASHBOARD,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'grey',
                    requiresAuth: true
                },
                component: dashboard
            },
            {
                path: 'sensor-overview',
                name: FUN_NAME.SENSOR_OVERVIEW,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true,
                    requiresAuth: true
                },

                component: sensorOverview
            },
            {
                path: 'user-setting',
                name: FUN_NAME.USER_SETTING,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true,
                    requiresAuth: true
                },
                component: userSetting
            },
            {
                path: 'pwd-reset',
                name: FUN_NAME.PWD_RESET,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true,
                    requiresAuth: true
                },
                component: pwdReset
            },
            {
                path: 'smtp',
                name: FUN_NAME.SMTP,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true,
                    requiresAuth: true
                },
                component: smtp
            },
            {
                path: 'permission',
                name: FUN_NAME.PERMISSION,
                meta: {
                    layout: PAGE_TYPE.FLEX,
                    theme: 'white',
                    isScroll: true,
                    requiresAuth: true
                },
                component: permission
            }
        ]
    },
    {
        path: '/device-add',
        name: FUN_NAME.DEVICE_ADD,
        meta: {
            layout: PAGE_TYPE.FULL,
            theme: 'default',
            requiresAuth: true
        },
        component: deviceAdd
    },
    {
        path: '/sensor-detect',
        name: FUN_NAME.SENSOR_DETECT,
        meta: {
            layout: PAGE_TYPE.FULL,
            theme: 'default',
            requiresAuth: true
        },
        component: deviceSensorDetect
    },

    {
        path: '/pwd-setting',
        name: FUN_NAME.PWD_SETTING,
        meta: {
            layout: PAGE_TYPE.FULL,
            theme: 'grey-eb',
            isScroll: false,
            requiresAuth: true
        },
        component: pwdSetting
    },
    {
        path: '/pwd-forget',
        name: FUN_NAME.PWD_FORGET,
        meta: {
            layout: PAGE_TYPE.FULL,
            theme: 'grey-eb',
            isScroll: false,
            requiresAuth: false
        },
        component: pwdForget
    },
    {
        path: '/login',
        name: FUN_NAME.LOGIN,
        meta: {
            layout: PAGE_TYPE.FULL,
            theme: 'light',
            isScroll: false,
            requiresAuth: false
        },
        component: login
    },
    {
        path: '/ui',
        component: uiDemo,
        name: 'ui',
        meta: {
            requiresAuth: false
        }
    }
];

export const router = createRouter({
    // mode: 'history',
    history: createWebHashHistory(),
    // base: ENV.production.base,
    // @ts-ignore
    routes: routes,
    // @ts-ignore
    scrollBehavior(to, from, savedPosition) {
        // if (savedPosition && to.meta.keepAlive) {
        //     return savedPosition;
        // }
        // if (to.hash) {
        //     return { el: to.hash, behavior: "smooth" };
        // } else {
        //     document.getElementById('main-layout-content').scrollTo(0, 0);
        //     return { x: 0, y: 0 };
        // }
    }
});

let isFirstInitSet = true;
router.beforeEach(async (to, from, next) => {
    let store = useGlobalStore();
    console.log('beforeEach', store.userRole);
    window.scrollTo(0, 0);
    // check permission
    // let isAuthenticated = false;
    let env = import.meta.env.VITE_ENV; //現在環境
    // console.log('env', env);
    const isRequiresAuth = to.meta.requiresAuth; // 检查路由是否需要登录
    const pageName = to.name;
    console.log('requiresAuth', isRequiresAuth);

    if (from.name == FUN_NAME.LOGIN) {
        isFirstInitSet = true;
    }

    if (isRequiresAuth) {
        if (isFirstInitSet) {
            let data = await checkUserPermission();
            let role = data.role;
            store.setRole(role);
            isFirstInitSet = false;
            console.log('get user', store.userRole);
        }

        console.log('to', pageName);
        let permisson = permissionMapping[pageName];
        let currentRole = store.userRole;
        let isHasAuth = false;
        console.log('permisson', permisson);
        if (typeof permisson == 'string') {
            isHasAuth = true;
            console.log('isHasAuth', isHasAuth);
        } else {
            isHasAuth = permisson.includes(currentRole);
        }

        isHasAuth ? next() : next('/login');
    } //end: if isRequiresAuth
    else {
        next();
    }
});

export default router;
