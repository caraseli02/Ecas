<template>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[240px] overflow-y-auto">
      <OrderSummaryPayByCard 
        v-for="(item, index) in cards" 
        :key="item.id"
        view="modal" 
        :card-info="item" 
        :card-type="item?.card?.display_brand"
        :is-selected="item.default"
        :has-card="true" 
        :is-expired="index === 1" 
        :class="{'-order-1': item.default}"
      />
      <!-- <OrderSummaryPayByCard view="payment" :card-info="card" :card-type="card?.card?.brand" :is-selected="!isNewCardSelectedModal &&
                    (payment.card?.id ? payment.card?.id === card?.id : order.paymentDetails?.card?.id === card?.id)
                    " :has-card="true" :is-expired="cardExpired(card)" @click="isNewCardSelectedModal = false"
                    @select-payment-option="selectPaymentOption({ type: PaymentTypeEnum.Card, info: card })" /> -->
    </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { StripeCardInterface } from '~/types';

const card = ref<any | null>({});
const cards = ref<StripeCardInterface[]>([]);
const isNewCardSelected = ref<boolean>(false);

const { $api } = useNuxtApp();
const fetchCards = async () => {
  const response = (await $api.user.userCards()) as unknown as {
    status: string;
    data: StripeCardInterface[];
  };

  if (response.status === 'success') {
    if (response.data.length) {
      console.log(response.data);
      
      cards.value = response.data;
      card.value = _.cloneDeep(cards.value.find((card: any) => card.default));
    } else {
      isNewCardSelected.value = true;
    }
  }
};

await fetchCards();
</script>

<style scoped>
</style>
