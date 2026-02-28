import { $fetch, type FetchOptions } from 'ohmyfetch';
import { defineNuxtPlugin } from '#app';
import ProductService from '~/services/products.service';
import AuthService from '~/services/auth.service';
import UserService from '~/services/user.service';
import UserDashboardService from '~/services/dashboard/user.service';
import FavouriteFolderService from '~/services/favourite-folder.service';
import CustomerProfileService from '~/services/dashboard/customer-profile.service';
import NotificationsService from '~/services/notifications.service';
import ControlPanelService from '~/services/dashboard/control-panel.service';
import SettingsClientService from '~/services/dashboard/settings.service';
import OrdersService from '~/services/dashboard/orders.service';
import CartService from '~/services/cart.service';
import GeneralSettings from '~/services/general-settings.service';
import CategoriesService from '~/services/categories.service';
import CustomerDashboard from '~/services/dashboard/client.service';
import SmartPricingService from '~/services/dashboard/smart-pricing.service';
import DocumentService from '~/services/dashboard/document.service';

/** ApiInstance interface provides us with good typing */
export interface IApiInstance {
  product: ProductService;
  auth: AuthService;
  user: UserService;
  userDashboard: UserDashboardService;
  favouriteFolder: FavouriteFolderService;
  cart: CartService;
  customerProfile: CustomerProfileService;
  notifications: NotificationsService;
  controlPanel: ControlPanelService;
  orders: OrdersService;
  documents: DocumentService;
  generalSettings: GeneralSettings;
  categories: CategoriesService;
  customerDashboard: CustomerDashboard & { getMetadata: () => Promise<any> };
  settingsClient: SettingsClientService;
  smartPricing: SmartPricingService;
}

declare module '#app' {
  interface NuxtApp {
    $api: IApiInstance;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config.public;

  console.log(`[API] MOCK_MODE: ${config.MOCK_MODE ? 'ENABLED' : 'DISABLED'}`);

  const baseURL = (() => {
    if (!config.MOCK_MODE) {
      return config.BASE_URL_API;
    }

    if (import.meta.client) {
      return '/api';
    }

    const event = nuxtApp.ssrContext?.event;
    const protoHeader = event?.node.req.headers['x-forwarded-proto'];
    const protocol = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader || 'http';
    const host = event?.node.req.headers.host || 'localhost:3000';

    return `${protocol}://${host}/api`;
  })();

  const fetchOptions: FetchOptions = {
    baseURL,
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
    cart: new CartService(apiFetcher),
    customerProfile: new CustomerProfileService(apiFetcher),
    notifications: new NotificationsService(apiFetcher),
    controlPanel: new ControlPanelService(apiFetcher),
    orders: new OrdersService(apiFetcher),
    documents: new DocumentService(apiFetcher),
    generalSettings: new GeneralSettings(apiFetcher),
    categories: new CategoriesService(apiFetcher),
    customerDashboard: new CustomerDashboard(apiFetcher),
    settingsClient: new SettingsClientService(apiFetcher),
    smartPricing: new SmartPricingService(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
