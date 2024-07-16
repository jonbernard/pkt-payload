import type { FieldHook } from 'payload';

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return format(value);
    }

    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData);
    }

    return value;
  };

export const generateSlug =
  <T>(getString: (data: T) => string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return format(value);
    }

    if (data && operation === 'create') {
      return format(getString(data as T));
    }

    return value;
  };
