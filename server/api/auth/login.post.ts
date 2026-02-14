export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as { email?: string; password: string };

    if (body.email === 'admin@ecas.com' && body.password === 'admin123') {
        return {
            status: 'success',
            data: {
                token: 'mock-jwt-token-portfolio-demo',
                user: {
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
                        email: body.email || 'admin@ecas.com',
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
                },
            },
        };
    }

    throw createError({ status: 401, statusText: 'Invalid credentials' });
});
