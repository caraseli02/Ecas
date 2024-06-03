import { CustomerCreditInterface } from '~/types/auth/account-settings';

export const customerCreditHelper = (credit: CustomerCreditInterface) => {
    let spent = '';
    let limit = '';
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
    }
    console.log({ limit: limit, spent: spent });
    return { limit: limit, spent: spent };
};
