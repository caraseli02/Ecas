export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return {
        status: 'success',
        data: {
            message: 'Firebase registration successful',
            user: {
                _id: 'firebase-user-' + Date.now(),
                firebaseId: body.firebaseId || 'mock-firebase-id-' + Date.now(),
                role: 'customer' as any,
                accountType: body.accountType || ('personal' as any),
                verified: true,
                status: 1,
                contactDetails: {
                    firstName: body.firstName || 'Firebase',
                    lastName: body.lastName || 'User',
                    email: body.email || 'firebase@example.com',
                    phone: body.phone || '+9876543210',
                },
                createdAt: new Date().toISOString(),
            },
        },
    };
});
