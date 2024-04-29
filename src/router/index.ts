// vue
import { createRouter, createWebHashHistory } from 'vue-router';
// enum
// import { ENV, FUN_NAME, PAGE_TYPE } from '@/assets/enum/enum';

// page
import routes from '@/router/routes.ts';

// component

// store/pinia/vuex
import { useGlobalStore } from '@/store';

// until
import { ROLE } from '@/assets/enum/enum';
import { Permissions } from '@/utils/permission';
import { apiCheckUserPermission } from '@/utils/globalUtils';

/**
 * @ts-ignore 是 TypeScript 中的一个特殊注释，用于告诉 TypeScript 编译器忽略下一行或下一段代码的类型检查。
 */
export const router = createRouter({
    // mode: 'history',
    history: createWebHashHistory(), // createWebHashHistory 是创建一个带有哈希值的历史记录。
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

// let firstEntering = true;
router.beforeEach(async (to, from, next) => {
    let store = useGlobalStore(); // 此階段是為了拿到 store 中 user role 的狀態
    window.scrollTo(0, 0);

    // check permission
    // let env = import.meta.env.VITE_ENV; //現在環境
    const isRequiresAuth = to.meta.requiresAuth as boolean; // 检查路由是否需要登录
    const pageName = to.name as string;
    let isHasAuth = false;
    // if (from.name == 'Login') firstEntering = true;

    // check user permission
    if (isRequiresAuth) {
        let res: any = await apiCheckUserPermission(); // 取得用戶基本資料
        if (res.code == 200) {
            let role = res.data.role;
            store.setRole(role);
        } else {
            let role = ROLE.NONE;
            store.setRole(role);
        }

        let permisson = Permissions[pageName];
        let currentRole = store.userRole;

        /**
         * check permission
         * @type {string|boolean}
         * permisson = 'all' or ['admin', 'user']
         * 'all' => true (全部用戶都有權限)
         */
        if (typeof permisson == 'string') {
            isHasAuth = true;
        } else {
            isHasAuth = permisson.includes(currentRole);
        }
        isHasAuth ? next() : next('/login');

        console.log('to', pageName);
        console.log('permisson', permisson);
        console.log('currentRole', currentRole);
        console.log('isHasAuth', isHasAuth);
    } else {
        next();
    }
});

export default router;
