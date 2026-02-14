// ~/composables/usePaymentCards.ts
import { ref, watch } from 'vue';
import { useNuxtApp } from '#app';
import _ from 'lodash';
import type { StripeCardInfoInterface } from '~/types';
import { useUser } from './useUser';

const card = ref<any | null>({});
const cards = ref<StripeCardInfoInterface[]>([]);
const isNewCardSelected = ref<boolean>(false);

export function usePaymentCards() {
    const { $api } = useNuxtApp();
    const { user } = useUser();

    const fetchCards = async () => {
        const response = (await $api.user.userCards()) as unknown as {
            status: string;
            data: StripeCardInfoInterface[];
        };

        if (response.status === 'success') {
            if (response.data.length) {
                cards.value = response.data;
                card.value = _.cloneDeep(cards.value.find((card: any) => card.default));
                isNewCardSelected.value = false;
            } else {
                isNewCardSelected.value = true;
            }
        }
    };

    // Optional: If you have any watches or additional logic related to card changes
    watch(
        card,
        (_card) => {
            card.value = _card;
        },
        { deep: true }
    );

    // Watch for changes in the user and reset cards when user changes
    watch(
        user,
        (newUser, oldUser) => {
            if (!newUser) {
                // Reset the cards and related states
                cards.value = [];
                card.value = null;
                isNewCardSelected.value = false;
            }
        },
        { immediate: true } // Optional: trigger immediately if needed
    );

    return {
        card,
        cards,
        isNewCardSelected,
        fetchCards,
    };
}
