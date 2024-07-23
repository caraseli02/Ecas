import { OrderRequestInterface, PaymentTypeEnum, StripeCardInterface } from '~/types';
import { UserInterface } from '~/types/auth/user-interface';
import { customerCreditHelper } from '~/helpers/customer-credit.helper';

export const paymentInfoHelper = (order: OrderRequestInterface, userDetails: UserInterface, userCards: StripeCardInterface[]) => {
    const creditInfo = userDetails.adminSettings?.customerCredit;

    switch (order.paymentDetails.type) {
        case PaymentTypeEnum.Card: {
            return {
                type: PaymentTypeEnum.Card,
                info: {
                    provider: order.paymentDetails.card?.brand,
                    last4: order.paymentDetails.card?.last4,
                },
            };
        }
        case PaymentTypeEnum.Credit: {
            if (creditInfo === undefined) return null;

            const credit = customerCreditHelper(creditInfo);
            return {
                type: PaymentTypeEnum.Credit,
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
                type: PaymentTypeEnum.Bank,
                info: {
                    text: 'Bank transfer',
                },
            };
        }
        default:
            return {
                type: PaymentTypeEnum.Bank,
                info: {
                    text: 'N/A',
                },
            };
    }
};
