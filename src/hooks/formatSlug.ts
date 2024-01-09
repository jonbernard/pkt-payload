import type { FieldHook } from 'payload/types';

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

const formatSlug =
  (fallback: string[]): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return format(value);
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback[0]] || originalDoc?.[fallback[0]];

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData);
      }

      const fallbackData2 = data?.[fallback[1]] || originalDoc?.[fallback[1]];

      if (fallbackData2 && typeof fallbackData2 === 'string') {
        return format(fallbackData2);
      }
    }

    return value;
  };

export default formatSlug;
