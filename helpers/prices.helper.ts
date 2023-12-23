import { UserDetails } from '~/types/auth/user-details';
import { ProductDiscountsHelperInterface, ProductInterface } from '~/model/products/response/ProductResponse';

export const parseProductPriceConfiguration = (product: ProductInterface, userDetails: UserDetails, quantity = 0) => {
    let unitPrice = 0;

    if (!product.priceConfiguration) {
        return null;
    }

    const minimumOrderQuantityConfiguration = product.priceConfiguration?.configuration[0] || null;
    let currentPriceConfiguration = null;

    if (quantity) {
        for (let i = product.priceConfiguration.configuration.length - 1; i >= 0; i--) {
            if (quantity > product.priceConfiguration.configuration[i].quantity) {
                unitPrice = product.priceConfiguration.configuration[i].price;
                currentPriceConfiguration = product.priceConfiguration.configuration[i];

                break;
            }
        }
    } else {
        unitPrice = minimumOrderQuantityConfiguration?.price || 0;
        currentPriceConfiguration = minimumOrderQuantityConfiguration;
    }

    const userDiscount = userDetails?.adminSettings?.discount?.value || 0;
    const productDiscount = product.adminSettings?.discount?.value || 0;
    let discountPrice = 0;

    discountPrice = productDiscount ? unitPrice * (1 - productDiscount / 100) : unitPrice * (1 - userDiscount / 100);

    return {
        userDiscount: userDiscount,
        productDiscount: productDiscount,
        discountPrice: discountPrice,
        priceConfiguration: currentPriceConfiguration,
        minimumOrderQuantityConfiguration: minimumOrderQuantityConfiguration,
    } as unknown as ProductDiscountsHelperInterface;
};
