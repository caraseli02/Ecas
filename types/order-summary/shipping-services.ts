interface Price {
    total: number;
    noVat: number;
}

export interface ShippingOrderPricingService {
    id: number;
    courierName?: string;
    name?: string;
}

export interface ShippingOrderPricingOption {
    price: Price;
    service: ShippingOrderPricingService;
}

export interface ShippingOrderPricingResponse {
    selected: ShippingOrderPricingOption;
    list: ShippingOrderPricingOption[];
}
