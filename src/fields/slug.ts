import type { Field } from 'payload';

import deepMerge from '../utilities/deepMerge';
import { formatSlug, generateSlug } from '../utilities/formatSlug';

type Slug = <T>(generate?: (data: T) => string, fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (generate, fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [generate ? generateSlug(generate) : formatSlug(fieldToUse)],
      },
      index: true,
      label: 'Slug',
    },
    overrides,
  );
