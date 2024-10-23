import { PriceSettingsInterface, PriceSettingsTypeEnum } from '~/model/prices/price-settings.interface';

export const smartPricingRange = (pricing: PriceSettingsInterface[] | []) => {
    return pricing
        ? pricing
              .filter((smartPricing) => smartPricing.type === PriceSettingsTypeEnum.Range)
              .map((item, index) => ({
                  selected: false,
                  value: item.range && [`$${item.range.min} - $${item.range.max}`],
                  label: item.label || `EP-${index}`,
              }))
        : [];
};

export const smartPricingQuantity = (pricing: PriceSettingsInterface[] | []) => {
    return pricing
        .filter((smartPricing) => smartPricing.type === PriceSettingsTypeEnum.Quantity)
        .map((item, index) => ({
            selected: false,
            value: item.values
                ? item.values.reduce<string[]>((acc, curr, index) => {
                      const prevMax = index === 0 ? '0' : acc[index - 1].split(' - ')[1];
                      acc.push(`${parseInt(prevMax) + 1} - ${curr}`);
                      return acc;
                  }, [])
                : [],
            label: item.label || `QTY-${index}`,
        }));
};

export const smartPricingMargin = (pricing: PriceSettingsInterface[] | []) => {
    return pricing
        .filter((smartPricing) => smartPricing.type === PriceSettingsTypeEnum.Margins)
        .map((item, index) => ({
            selected: false,
            value: item.values && item.values.map((value) => `${value}%`),
            label: item.label || `NM-${index}`,
        }));
};
