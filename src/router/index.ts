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
// import { checkUserPermission } from '@/utils/globalUtils';

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

let firstEntering = true;
router.beforeEach(async (to, from, next) => {
    let store = useGlobalStore();
    console.log('beforeEach', store.userRole);
    window.scrollTo(0, 0);

    // check permission
    let env = import.meta.env.VITE_ENV; //現在環境
    console.log('env', env);
    const isRequiresAuth = to.meta.requiresAuth; // 检查路由是否需要登录
    const pageName = to.name;

    if (from.name == 'Login') firstEntering = true;

    if (isRequiresAuth) {
        // if (firstEntering) {
        //     let data = await checkUserPermission();
        //     let role = data.role;
        //     store.setRole(role);
        //     firstEntering = false;
        // }

        console.log('to', pageName);
        // let permisson = permissionMapping[pageName];
        // let currentRole = store.userRole;
        let isHasAuth = false;
        // console.log('permisson', permisson);
        // if (typeof permisson == 'string') {
        //     isHasAuth = true;
        //     console.log('isHasAuth', isHasAuth);
        // } else {
        //     isHasAuth = permisson.includes(currentRole);
        // }

        isHasAuth ? next() : next('/login');
    } //end: if isRequiresAuth
    else {
        next();
    }
});

export default router;
