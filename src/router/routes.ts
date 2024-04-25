// page
// user page
import Login from '@/view/user/login/index.vue';
import Logout from '@/view/user/logout/index.vue';
import Profile from '@/view/user/profile/index.vue';
import Password from '@/view/user/password/index.vue';
import Notification from '@/view/user/notification/index.vue';
// view page
import Dashboard from '@/view/dashboard/index.vue';
import Device from '@/view/device/index.vue';
import Event from '@/view/event/index.vue';
import Gateway from '@/view/gateway/index.vue';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        meta: {
            requiresAuth: false // 不需要登录(token)
        }
    },
    {
        path: '/logout',
        component: Logout,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/account',
        name: 'Index',
        component: Profile,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'profile',
                name: 'Profile',
                meta: {
                    layout: 'main',
                    theme: 'default', // defualt, white, grey
                    requiresAuth: true
                },
                component: Profile
            },
            {
                path: 'password',
                name: 'Password',
                meta: {
                    layout: 'main',
                    theme: 'white', // defualt, white, grey
                    requiresAuth: true
                },
                component: Password
            },
            {
                path: 'notification',
                name: 'Notification',
                meta: {
                    layout: 'main',
                    theme: 'white', // defualt, white, grey
                    requiresAuth: true
                },
                component: Notification
            }
        ]
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
            layout: 'full',
            theme: 'default',
            requiresAuth: true
        },
        component: Dashboard
    },
    {
        path: '/device',
        name: 'Device',
        meta: {
            layout: 'full',
            theme: 'default',
            requiresAuth: true
        },
        component: Device
    },
    {
        path: '/event',
        name: 'Event',
        meta: {
            layout: 'full',
            theme: 'default',
            requiresAuth: true
        },
        component: Event
    },
    {
        path: '/gateway',
        name: 'Gateway',
        meta: {
            layout: 'full',
            theme: 'default',
            requiresAuth: true
        },
        component: Gateway
    }
];

export default routes;
