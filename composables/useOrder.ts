import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '~/store/cartStore';
import { AccountRole, AccountType, OrderRequestInterface, PaymentTypeEnum } from '~/types';
import { PlaceOrderInterface } from '~/model/order/response/PlaceOrder';
import { useCheckoutStore } from '~/store/checkout';
import { useUser } from './useUser';
import { storeToRefs } from 'pinia';
import { toast } from '~/components/ui/toast';

export function useOrder() {
    const router = useRouter();
    const { user, getShipping, getBilling } = useUser();
    const cartStore = useCartStore();
    const { $api } = useNuxtApp();
    const checkoutStore = useCheckoutStore();
    const { checkout } = storeToRefs(checkoutStore);
    const orderRequestObject = ref<OrderRequestInterface>({} as OrderRequestInterface);

    const makeCheckout = async (
        orderType: number,
        cartId: string,
        deliveryMethod: any,
        backOrderOption: any,
        smallOrder: any,
        paymentDetails: any,
        note: string
    ) => {
        if (!user.value || !user.value?.contactDetails || !deliveryMethod || !paymentDetails) {
            checkout.value = false; // Reset processing state on error
            console.log('User details not available');
            return;
        }

        if (user.value.role === AccountRole.Client) {
            const isPersonalAccount = user.value.accountType === AccountType.Personal;
            const nameDetails = isPersonalAccount
                ? {
                      firstName: user.value.personalDetails?.firstName,
                      lastName: user.value.personalDetails?.lastName,
                      city: user.value.personalDetails?.address.city,
                      country: user.value.personalDetails?.address.country,
                  }
                : {
                      firstName: user.value.contactDetails?.firstName,
                      lastName: user.value.contactDetails?.lastName,
                      city: user.value.companyDetails?.address.city,
                      country: user.value.companyDetails?.address.country,
                  };

            orderRequestObject.value = {
                isDraft: false,
                cartId: cartId,
                currency: 'ron',
                type: orderType,
                shippingDetails: {
                    ...nameDetails,
                    phone: user.value.contactDetails.phone,
                    address: getShipping(),
                    billingAddress: getBilling(),
                    stockorderShippingType: deliveryMethod,
                    backorderShippingTypeId: backOrderOption || undefined,
                },
                smallOrderChargeId: smallOrder?._id,
                paymentDetails: {
                    type: paymentDetails.type,
                },
            };

            if (paymentDetails.type === PaymentTypeEnum.Card) {
                orderRequestObject.value.stripeCardId = paymentDetails.card?.id || null;
            }

            if (note) {
                orderRequestObject.value.note = {
                    sender: user.value.firebaseId,
                    message: note,
                };
            }
        }

        const resultShipping = await $api.orders.validateAddress({
            country: orderRequestObject.value.shippingDetails.address.country,
            region: orderRequestObject.value.shippingDetails.address.region,
            city: orderRequestObject.value.shippingDetails.address.city,
            postcode: orderRequestObject.value.shippingDetails.address.postcode,
            name1: orderRequestObject.value.shippingDetails.address.name1,
            name2: orderRequestObject.value.shippingDetails.address.name2,
            default: false,
        });

        const resultBilling = await $api.orders.validateAddress({
            country: orderRequestObject.value.shippingDetails.billingAddress.country,
            region: orderRequestObject.value.shippingDetails.billingAddress.region,
            city: orderRequestObject.value.shippingDetails.billingAddress.city,
            postcode: orderRequestObject.value.shippingDetails.billingAddress.postcode,
            name1: orderRequestObject.value.shippingDetails.billingAddress.name1,
            name2: orderRequestObject.value.shippingDetails.billingAddress.name2,
            default: false,
        });

        if (!resultShipping.data.valid || !resultBilling.data.valid) {
            console.log('Invalid address');
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `${!resultBilling.data.valid ? 'Billing' : 'Shipping'} address is invalid`,
            });
            return;
        }

        try {
            const response = (await $api.orders.sendOrder(orderRequestObject.value)) as PlaceOrderInterface;

            if (response.status !== 'success') {
                await router.push({ path: '/checkout/fail' });
            } else {
                const orderId = response.data.orderId;
                await handleOrderResponse(response, orderId, paymentDetails.type);
            }
        } catch (error) {
            console.error('Error sending order:', error);
            await router.push({ path: '/checkout/fail' });
        } finally {
            await cartStore.updateAndReturnCart();
            checkout.value = false; // Reset processing state when everything is done
        }
    };

    const handleOrderResponse = async (response: PlaceOrderInterface, orderId: string, paymentType: number) => {
        if (paymentType === PaymentTypeEnum.Card) {
            const result = response.data.result;

            if (!result) {
                console.log('Pay with a new card', response.data);

                if (response.data.clientSecret) {
                    cartStore.setOrderClientSecret(response.data.clientSecret);
                }
                await router.push({ path: '/checkout/session', query: { id: orderId } });
                return;
            } else {
                switch (result.status) {
                    case 'succeeded':
                        orderId && (await router.push({ path: '/order-summary/' + orderId, query: { new: 'true' } }));
                        break;
                    case 'canceled':
                        console.log('Order canceled reason:', result.cancellation_reason);
                        await router.push({ path: '/checkout/fail' });
                        break;
                    case 'requires_action':
                        console.log('Order requires action');
                        if (result.next_action?.redirect_to_url?.url) {
                            window.location.href = result.next_action.redirect_to_url.url;
                        }
                        break;
                    case 'requires_payment_method':
                        console.log('Order requires payment method');
                        await router.push({ path: '/checkout/session' });
                        break;
                    default:
                        console.log('Order pending', result.status);
                        await router.push({ path: '/order-summary/' + orderId, query: { new: 'true' } });
                        break;
                }
            }
        } else if (paymentType === PaymentTypeEnum.Credit || paymentType === PaymentTypeEnum.Bank) {
            await router.push({ path: '/order-summary/' + orderId });
            console.log('Paid with credit or bank transfer');
        }
    };

    return { makeCheckout };
}
