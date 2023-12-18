import { UserDetails } from '~/types/auth/user-details';
import { ProductDiscountsHelperInterface, ProductInterface } from '~/model/products/response/ProductResponse';

export const parseProductPriceConfiguration = (product: ProductInterface, userDetails: UserDetails) => {
    const priceConfiguration = product?.priceConfiguration?.configuration[0] || null;

    const userDiscount = userDetails?.adminSettings?.discount?.value || 0;
    const productDiscount = product.adminSettings?.discount?.value || 0;
    let discountPrice = 0;

    if (priceConfiguration) {
        discountPrice = productDiscount
            ? priceConfiguration?.price * (1 - productDiscount / 100)
            : priceConfiguration?.price * (1 - userDiscount / 100);
    }

    return {
        userDiscount: userDiscount,
        productDiscount: productDiscount,
        discountPrice: discountPrice,
        priceConfiguration: priceConfiguration,
    } as ProductDiscountsHelperInterface;
};
