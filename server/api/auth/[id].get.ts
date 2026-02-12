export default defineEventHandler(async (event) => {
    const userId = getRouterParam(event, 'id');

    return {
        status: 'success',
        data: {
            _id: userId,
            firebaseId: 'mock-firebase-id-' + userId,
            role: 'customer' as any,
            accountType: 'personal' as any,
            verified: true,
            status: 1,
            spent: 1250.5,
            ordersCount: 5,
            currentStatus: 'online' as any,
            contactDetails: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                _id: userId + '-contact',
            },
            personalDetails: {
                firstName: 'John',
                lastName: 'Doe',
                address: {
                    name1: '123 Main Street',
                    country: 'US',
                    region: 'California',
                    city: 'San Francisco',
                    postcode: '94105',
                    _id: 'addr-1',
                },
                shippingAddress: [
                    {
                        name1: 'Home',
                        country: 'US',
                        region: 'California',
                        city: 'San Francisco',
                        postcode: '94105',
                        default: true,
                        _id: 'ship-1',
                    },
                ],
                billingAddress: [
                    {
                        name1: 'Office',
                        country: 'US',
                        region: 'California',
                        city: 'San Francisco',
                        postcode: '94105',
                        default: true,
                        _id: 'bill-1',
                    },
                ],
            },
            profileDetails: {
                email: 'john.doe@example.com',
                _id: 'prof-1',
            },
            createdAt: '2024-01-15T10:30:00.000Z',
            clientCode: 'TEST001',
        },
    };
});
