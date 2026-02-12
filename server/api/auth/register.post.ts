export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return {
        status: 'success',
        data: {
            message: 'Registration successful',
            user: {
                _id: 'new-user-' + Date.now(),
                firebaseId: 'new-firebase-id-' + Date.now(),
                role: 'customer' as any,
                accountType: 'personal' as any,
                verified: false,
                status: 2,
                contactDetails: {
                    firstName: body.firstName || 'New',
                    lastName: body.lastName || 'User',
                    email: body.email || 'new@example.com',
                    phone: body.phone || '+1234567890',
                },
                createdAt: new Date().toISOString(),
            },
        },
    };
});
