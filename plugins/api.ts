import { $fetch, FetchOptions } from 'ohmyfetch';
import { defineNuxtPlugin } from '#app';
import ProductService from '~/services/products.service';
import AuthService from '~/services/auth.service';
import UserService from '~/services/user.service';
import UserDashboardService from '~/services/dashboard/user.service';
import FavouriteFolderService from '~/services/favourite-folder.service';
import CustomerProfileService from '~/services/customer-profile.service';
import NotificationsService from '~/services/notifications.service'

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    product: ProductService;
    auth: AuthService;
    user: UserService;
    userDashboard: UserDashboardService;
    favouriteFolder: FavouriteFolderService;
    customerProfile : CustomerProfileService;
    notifications : NotificationsService;
}

export default defineNuxtPlugin((nuxtApp) => {
    const fetchOptions: FetchOptions = {
        baseURL: nuxtApp.$config.public.BASE_URL_API,
    };

    /** create a new instance of $fetcher with custom option */
    const apiFetcher = $fetch.create(fetchOptions);

    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
        product: new ProductService(apiFetcher),
        auth: new AuthService(apiFetcher),
        user: new UserService(apiFetcher),
        userDashboard: new UserDashboardService(apiFetcher),
        favouriteFolder: new FavouriteFolderService(apiFetcher),
        customerProfile : new CustomerProfileService(apiFetcher),
        notifications : new NotificationsService(apiFetcher)
    };

    return {
        provide: {
            api: modules,
        },
    };
});
