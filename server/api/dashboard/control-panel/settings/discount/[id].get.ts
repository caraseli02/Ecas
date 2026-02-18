export default defineEventHandler(() => {
    return {
        status: 'success',
        data: {
            value: 10,
            startDate: '2024-01-01T00:00:00.000Z',
            endDate: '2027-01-01T00:00:00.000Z',
        },
    };
});
