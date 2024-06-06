import { CustomerCreditInterface } from '~/types/auth/account-settings';

export const customerCreditHelper = (credit: CustomerCreditInterface) => {
    let spent = '';
    let limit = '';
    let available = '';
    console.log(credit);
    if (credit) {
        limit = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(credit.limit);

        spent = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(credit.spent);

        available = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(credit.available);
    }
    console.log({ limit: limit, spent: spent, available: available });
    return { limit: limit, spent: spent, available: available };
};
