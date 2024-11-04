// ~/composables/useCart.ts
import { ref, computed } from 'vue';
import { CartInterface, CartProductsInterface } from '~/model/cart/response/cart.interface';
import { useCartStore } from '~/store/cartStore';

export function useCart() {
  const cartStore = useCartStore();
  const cartItems = ref([] as CartProductsInterface[]);
  const cartId = ref('' as string);
  
  const fetchList = async () => {
      const cart = (await cartStore.updateAndReturnCart()) as CartInterface;
      const products = cart?.products;
      cartId.value = cart._id || '';
      // mapCartItems(products);
  };

  const calculateSubtotal = (orderItems: CartProductsInterface[], order: Ref<{subtotal: number}>) => {
    if (!orderItems) {
        return;
    }

    let subtotal = 0;

    orderItems.forEach((item: CartProductsInterface) => {
        const stockTotal = Number(item.unitPriceAfterDiscounts) * item.stock;
        const backorderTotal = Number(item.unitPriceAfterDiscounts) * (item.backorder_stock || 0);
        const allItemsTotal = stockTotal + backorderTotal;
        subtotal += allItemsTotal;
    });

    order.value.subtotal = subtotal.toFixed(2) as unknown as number;
};

const calculateDiscount = (orderItems: CartProductsInterface[], order: Ref<{discount: {total: number}}>) => {
    if (!orderItems) {
        return;
    }

    let discount = 0;

    orderItems.forEach((item: CartProductsInterface) => {
        discount += Number(item.initialUnitPrice) * item.stock - Number(item.unitPriceAfterDiscounts) * item.stock;
    });
    order.value.discount.total = discount;
};

const showWarning = computed(() => {
  return cartItems.value.some((item: any) => item.productEntity?.stock !== undefined && item.productEntity.stock < item.stock);
});

  return { cartItems, fetchList, calculateSubtotal, calculateDiscount, cartId, showWarning };
}
