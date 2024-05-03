import { ROLE } from '@/assets/enum/enum';

// 用戶權限 頁面設定
export const Permissions = {
    Login: ROLE.NONE,
    Account: ROLE.ALL,
    Profile: [ROLE.ADMIN, ROLE.POWERUSER],
    Password: [ROLE.ADMIN, ROLE.POWERUSER],
    Notification: [ROLE.ADMIN, ROLE.POWERUSER],
    Dashboard: [ROLE.ADMIN, ROLE.POWERUSER, ROLE.USER],
    Device: [ROLE.ADMIN, ROLE.POWERUSER],
    Event: [ROLE.ADMIN, ROLE.POWERUSER],
    Gateway: [ROLE.ADMIN, ROLE.POWERUSER, ROLE.USER]
};
