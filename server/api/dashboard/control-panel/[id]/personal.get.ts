import { getDemoAddresses, getDemoUserProfile } from '~/server/utils/mockDashboardDemo';

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id');
    const profile = getDemoUserProfile(id);
    const addresses = getDemoAddresses(id);

    return {
        status: 'success',
        data: {
            ...profile,
            accountType: 0,
            shippingAddress: addresses.shippingAddress,
            billingAddress: addresses.billingAddress,
        },
    };
});
