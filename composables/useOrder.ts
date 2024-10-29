import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/authStore';
import { useCartStore } from '~/store/cartStore';
import { AccountRole, OrderRequestInterface, PaymentTypeEnum } from '~/types';
import { PlaceOrderInterface } from '~/model/order/response/PlaceOrder';
import { useCheckoutStore } from '~/store/checkout';
import { useUser } from './useUser';
import { storeToRefs } from 'pinia';

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
      console.log(!user.value , !user.value?.contactDetails , !deliveryMethod , !paymentDetails);
      return;
    }

    if (user.value.role === AccountRole.Client && user.value?.personalDetails) {
      orderRequestObject.value = {
        isDraft: false,
        cartId: cartId,
        currency: 'usd',
        type: orderType,
        shippingDetails: {
          firstName: user.value.personalDetails.firstName,
          lastName: user.value.personalDetails.lastName,
          phone: user.value.contactDetails.phone,
          city: user.value.personalDetails.address.city,
          country: user.value.personalDetails.address.country,
          address: getShipping(),
          billingAddress: getBilling(),
          deliveryTypeId: deliveryMethod._id,
          backorderShippingTypeId: backOrderOption?._id || undefined,
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

      if (result) {
        if (result.status === 'succeeded' && orderId) {
          await router.push({ path: '/order-summary/' + orderId });
        } else if (result.status === 'canceled') {
          console.log('Order canceled reason:', result.cancellation_reason);
          await router.push({ path: '/checkout/fail' });
        } else if (result.status === 'requires_payment_method') {
          console.log('Order requires payment method');
          await router.push({ path: '/checkout/session' });
        } else {
          console.log('Order pending', result.status);
          await router.push({ path: '/order-summary/' + orderId });
        }
      } else {
        console.log('Pay with a new card', response.data);

        if (response.data.clientSecret) {
          cartStore.setOrderClientSecret(response.data.clientSecret);
        }
        await router.push({ path: '/checkout/session', query: { id: orderId } });
      }
    } else if (paymentType === PaymentTypeEnum.Credit || paymentType === PaymentTypeEnum.Bank) {
      await router.push({ path: '/order-summary/' + orderId });
      console.log('Paid with credit or bank transfer');
    }
  };

  return { makeCheckout };
}
