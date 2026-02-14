export default defineEventHandler(async (event) => {
    const userId = getRouterParam(event, 'userId');

    return {
        status: 'success',
        data: {
            _id: userId || 'mock-user-1',
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
        },
    };
});
