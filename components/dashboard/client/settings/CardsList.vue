<template>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[240px] overflow-y-auto">
        <OrderSummaryPayByCard
            v-for="item in cards"
            :key="item.id"
            view="modal"
            :card-info="item"
            :card-type="item?.card?.display_brand"
            :is-selected="item.id === selectedCard?.id"
            :is-default="item.default"
            :has-card="true"
            :is-expired="item.card.is_expired"
            @select-payment-option="selectNewCard"
            @set-default="setCardAsDefault"
        />
    </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { StripeCardInterface } from '~/types';

const card = ref<any | null>({});
const cards = ref<StripeCardInterface[]>([]);
const isNewCardSelected = ref<boolean>(false);

const selectedCard = ref(cards.value.find((card: StripeCardInterface) => card.default));

const selectNewCard = async (cardInfo: StripeCardInterface) => {
    selectedCard.value = cardInfo;
};

const setCardAsDefault = async (cardInfo: StripeCardInterface) => {
    cards.value = cards.value.map((card: StripeCardInterface) => {
        console.log(cardInfo.id, card.id, card.card.last4, card.default);
        return {
            ...card,
            default: card.id === cardInfo.id,
        };
    });
    console.log(card.value);
};

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
            card.value = _.cloneDeep(cards.value.find((card: StripeCardInterface) => card.default));
        } else {
            isNewCardSelected.value = true;
        }
    }
};

await fetchCards();
</script>

<style scoped></style>
