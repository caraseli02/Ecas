import { useAuthStore } from '~~/store/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token');
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    // Demo mode bypass - set up demo user directly
    if (config.public.mockMode) {
        if (!authStore.loggedInUser) {
            // Set up demo user auth token
            authStore.addToken('demo-token-portfolio');

            // Create minimal demo user object
            const demoUser = {
                _id: 'mock-user-1',
                firebaseId: 'mock-firebase-id-portfolio-demo',
                role: 'customer',
                accountType: 'personal',
                verified: true,
                status: 1,
                permissions: ['*'],
                roles: ['admin', 'customer'],
                contactDetails: {
                    firstName: 'Portfolio',
                    lastName: 'Demo User',
                    email: 'admin@ecas.com',
                    phone: '+1234567890',
                },
                personalDetails: {
                    firstName: 'Portfolio',
                    lastName: 'Demo User',
                    address: {
                        name1: 'Demo Address',
                        country: 'US',
                        region: 'California',
                        city: 'San Francisco',
                        postcode: '94105',
                        _id: 'addr-1',
                    },
                    shippingAddress: [],
                    billingAddress: [],
                },
                createdAt: new Date().toISOString(),
                clientCode: 'DEMO001',
            };

            // Add user to store
            authStore.addUser(demoUser);
            console.log('Demo user set up in middleware');
        }
        return;
    }

    if (!token?.value) {
        return navigateTo({
            path: '/',
        });
    }

    if (import.meta.client && !token?.value) {
        authStore.signOut();
    }
});
