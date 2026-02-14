export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
    };

    return {
        status: 'success',
        data: {
            user: {
                _id: 'new-user-' + Date.now(),
                firebaseId: 'mock-firebase-id-' + Date.now(),
                role: 'customer',
                accountType: 'personal',
                verified: false,
                status: 1,
                permissions: ['customer'],
                roles: ['customer'],
                contactDetails: {
                    firstName: body.firstName || 'New',
                    lastName: body.lastName || 'User',
                    email: body.email,
                    phone: '',
                },
                personalDetails: {
                    firstName: body.firstName || 'New',
                    lastName: body.lastName || 'User',
                    address: null,
                    shippingAddress: [],
                    billingAddress: [],
                },
                createdAt: new Date().toISOString(),
                clientCode: 'NEW' + Date.now(),
            },
        },
    };
});
