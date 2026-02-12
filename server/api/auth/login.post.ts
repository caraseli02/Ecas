export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as { email?: string; password: string };

    return {
        status: 'success',
        data: {
            token: 'mock-jwt-token-12345',
            user: {
                _id: '1',
                firebaseId: 'mock-firebase-id-12345',
                role: 'customer' as any,
                accountType: 'personal' as any,
                verified: true,
                status: 1,
                contactDetails: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: body.email || 'test@example.com',
                    phone: '+1234567890',
                },
                personalDetails: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: {
                        name1: 'Test Address',
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
                clientCode: 'TEST001',
            },
        },
    };
});
