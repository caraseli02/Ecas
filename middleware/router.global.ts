import { useAuthStore } from '~~/store/authStore';
import { UserPermissionsEnum } from '~/types/auth/permissions';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const user = authStore.loggedInUser;

    if (to.name !== 'signup' && authStore.firebaseTempToken != null) {
        authStore.firebaseTempToken = null;
    }

    if (!user) {
        return;
    }

    const permissions = user.permissions;
    console.log(to.path);

    switch (true) {
        case to.path === '/dashboard/client':
            if (!permissions.includes(UserPermissionsEnum.ClientDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case to.path === '/dashboard/customers':
            if (!permissions.includes(UserPermissionsEnum.AdminDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case /^\/dashboard\/customers\/[^/]+\/control-panel\/[^/]+$/.test(to.path):
            if (!permissions.includes(UserPermissionsEnum.AdminDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case to.path === '/dashboard/orders':
            if (!permissions.includes(UserPermissionsEnum.AdminDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case /^\/dashboard\/orders\/[^/]+$/.test(to.path):
            if (!permissions.includes(UserPermissionsEnum.AdminDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case to.path === '/dashboard/settings':
            if (!permissions.includes(UserPermissionsEnum.AdminDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case /^\/dashboard\/settings\/[^/]+$/.test(to.path):
            if (!permissions.includes(UserPermissionsEnum.AdminDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case to.path === '/dashboard/products':
            if (!permissions.includes(UserPermissionsEnum.AdminDashboardRead)) {
                return navigateTo('/');
            }
            break;

        case to.path === '/dashboard/products/categories':
            if (!permissions.includes(UserPermissionsEnum.CategoriesRead)) {
                return navigateTo('/');
            }
            break;

        case to.path === '/product/categories':
            if (!permissions.includes(UserPermissionsEnum.CategoriesRead)) {
                return navigateTo('/');
            }
            break;

        case to.path === '/order-summary':
            if (!permissions.includes(UserPermissionsEnum.OrdersRead)) {
                return navigateTo('/');
            }
            break;

        case /^\/order-summary\/[^/]+$/.test(to.path):
            if (!permissions.includes(UserPermissionsEnum.OrdersRead)) {
                return navigateTo('/');
            }
            break;
    }
});
