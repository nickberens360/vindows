import { computed, unref } from 'vue';

export function useItemCustomization(orderItem) {
  const omniProductTypes = [
    'BA',
    'BK',
    'BW',
    'CO',
    'HA',
    'LS',
    'SO',
  ];
  const customizableProductTypes = ['TG', ...omniProductTypes];
  const isOmniProduct = computed(() => omniProductTypes.includes(unref(orderItem)?.type));
  const isCustomizableProduct = computed(() => customizableProductTypes.includes(unref(orderItem)?.type));
  const rawFrontText = computed(() => unref(orderItem)?.customization?.frontSideText);
  const frontSideTextLines = computed(() => unref(orderItem)?.customization?.frontSideText?.split('\n') || []);
  const backSideTextLines = computed(() => unref(orderItem)?.customization?.backSideText?.split('\n') || []);
  const textColor = computed(() => getOmniCustomizationTextColor(unref(orderItem)?.customization?.textColor));

  return {
    isOmniProduct,
    isCustomizableProduct,
    rawFrontText,
    frontSideTextLines,
    backSideTextLines,
    textColor
  };
}

function getOmniCustomizationTextColor(colorName) {
  const color = colorName.toLowerCase();
  switch (color) {
  case 'black':
    return '#2B2926';
  case 'navy':
    return '#171C8F';
  case 'white':
    return '#F9F8F9';
  case 'hot pink':
    return '#F8485E';
  case 'gold':
    return '#FFD635';
  case 'sky blue':
    return '#71C5E8';
  case 'red':
    return '#D50032';
  default:
    return 'transparent';
  }
}
