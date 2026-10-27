export const propertyCategories = ['hotel', 'home', 'apartment', 'unique-stay'] as const;

export type PropertyCategory = (typeof propertyCategories)[number];

export const propertyCategoryHeading: Record<PropertyCategory, string> = {
  hotel: 'Hotel',
  home: 'Home',
  apartment: 'Apartment',
  'unique-stay': 'Unique Stay',
};

export function parsePropertyCategory(value: string | undefined): PropertyCategory {
  return propertyCategories.find((item) => item === value) ?? 'hotel';
}
