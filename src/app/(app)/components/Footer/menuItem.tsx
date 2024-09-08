'use client';

import { useMemo } from 'react';
import { Menu } from '@payload-types';

import { isNumber } from 'lodash';

type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const MenuItem = (props: ArrayElement<Menu['items']>) => {
  const { label: passedLabel, newTab, reference, type, url: passedUrl } = props;

  const label = useMemo(() => {
    if (type === 'reference' && reference && !isNumber(reference.value)) {
      if ('shortTitle' in reference.value) {
        return passedLabel && passedLabel !== '' ? passedLabel : reference.value.shortTitle || reference.value.title;
      }

      return passedLabel && passedLabel !== '' ? passedLabel : reference.value.title;
    }

    return passedLabel;
  }, [passedLabel, type, reference]);

  const url = useMemo(() => {
    let nextUrl = passedUrl || '/';

    if (type === 'reference' && reference && !isNumber(reference.value) && reference.value.slug !== 'home') {
      nextUrl = reference.value.url || '/';
    }

    return nextUrl;
  }, [passedUrl, type, reference]);

  return (
    <li>
      <a
        href={url}
        className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
        {...(newTab
          ? {
              target: '_blank',
            }
          : {})}
      >
        {label}
      </a>
    </li>
  );
};

export default MenuItem;