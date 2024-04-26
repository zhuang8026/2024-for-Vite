import { ROLE } from '@/assets/enum/enum';

export const Permissions = {
    Account: ROLE.ALL,
    Profile: [ROLE.ADMIN, ROLE.POWERUSER],
    Password: [ROLE.ADMIN, ROLE.POWERUSER],
    Notification: [ROLE.ADMIN, ROLE.POWERUSER],
    Dashboard: [ROLE.ADMIN, ROLE.POWERUSER],
    Device: [ROLE.ADMIN, ROLE.POWERUSER],
    Event: [ROLE.ADMIN, ROLE.POWERUSER],
    Gateway: [ROLE.ADMIN, ROLE.POWERUSER]
};
