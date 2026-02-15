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
            
            // Create complete demo user object with all required fields
            const now = new Date();
            const demoUser: any = {
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
                        name1: 'NUXT_PUBLIC_BASE_URL_API',
                        country: 'US',
                        region: 'California',
                        city: 'San Francisco',
                        postcode: '94105',
                        _id: 'addr-1',
                    },
                    shippingAddress: [],
                    billingAddress: [],
                },
                createdAt: now.toISOString(),
                clientCode: 'DEMO001',
                aud: 'mock-aud',
                auth_time: Math.floor(now.getTime() / 1000),
                email: 'admin@ecas.com',
                email_verified: true,
                exp: Math.floor(now.getTime() / 1000) + (3600 * 24 * 30),
                firebase: {
                    identities: {
                        'google.com': ['admin@ecas.com'],
                    },
                    sign_in_provider: 'email',
                },
                iat: Math.floor(now.getTime() / 1000),
                iss: 'mock-iss',
                name: 'Portfolio Demo User',
                picture: 'https://ui-avatars.com/api/?name=Portfolio+Demo+User',
                sub: 'demo',
                user_id: 'mock-user-1',
                permissions: ['*'],
                roles: ['admin', 'customer'],
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
    }

    if (import.meta.client && !token?.value) {
        authStore.signOut();
    }
});
    }

    if (import.meta.client && !token?.value) {
        authStore.signOut();
    }
});
