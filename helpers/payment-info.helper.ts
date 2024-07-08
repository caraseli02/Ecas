import { OrderRequestInterface, PaymentTypeEnum } from '~/types';
import { UserInterface } from '~/types/auth/user-interface';
import { customerCreditHelper } from '~/helpers/customer-credit.helper';

export const paymentInfoHelper = (order: OrderRequestInterface, userDetails: UserInterface) => {
    const creditInfo = userDetails.adminSettings?.customerCredit;
    switch (order.paymentDetails.type) {
        case PaymentTypeEnum.Card: {
            return {
                type: 'Card',
                info: {
                    provider: 'Visa',
                    last4: '0036',
                },
            };
        }
        case PaymentTypeEnum.Credit: {
            if (creditInfo === undefined) return null;
            const credit = customerCreditHelper(creditInfo);
            console.log(credit);
            return {
                type: 'Credit',
                info: {
                    limit: credit?.limit,
                    tillDue: credit?.tillDue,
                    term: credit?.term,
                    spent: credit?.spent,
                    dueDate: credit?.dueDate,
                    available: credit?.available,
                    freeze: credit?.freeze,
                    active: credit?.active,
                },
            };
        }
        case PaymentTypeEnum.Bank: {
            return {
                type: 'Bank',
                info: {
                    text: 'Bank transfer',
                },
            };
        }
        default: {
            return null;
        }
    }
};