export default defineEventHandler(() => {
    return {
        status: 'success',
        data: {
            selected: {
                service: {
                    id: 1,
                    courierName: 'Demo Express',
                    name: 'Standard Delivery',
                },
                price: {
                    total: 19.9,
                    noVat: 16.72,
                },
            },
            list: [
                {
                    service: {
                        id: 1,
                        courierName: 'Demo Express',
                        name: 'Standard Delivery',
                    },
                    price: {
                        total: 19.9,
                        noVat: 16.72,
                    },
                },
                {
                    service: {
                        id: 2,
                        courierName: 'Fast Lane',
                        name: 'Next Day',
                    },
                    price: {
                        total: 29.9,
                        noVat: 25.13,
                    },
                },
            ],
        },
    };
});
