'use client';

import { useMemo, useState } from 'react';

import classNames from 'classnames';
import { isNumber } from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu } from '@payload-types';

type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

const MenuItem = (
  props: ArrayElement<Menu['items']> & {
    onClick: () => void;
    index: number;
    isSubmenuItem?: boolean;
  },
) => {
  const {
    label: passedLabel,
    onClick,
    newTab,
    reference,
    submenu,
    type,
    url: passedUrl,
    index,
    isSubmenuItem,
  } = props;

  const label = useMemo(() => {
    if (type === 'reference' && reference && !isNumber(reference.value)) {
      return passedLabel && passedLabel !== ''
        ? passedLabel
        : reference.value.title || '<<ADD LABEL>>';
    }

    return passedLabel || '<<ADD LABEL>>';
  }, [passedLabel, type, reference]);

  const url = useMemo(() => {
    let nextUrl = passedUrl || '/';

    if (
      type === 'reference' &&
      reference &&
      !isNumber(reference.value) &&
      reference.value.slug !== 'home'
    ) {
      nextUrl = reference.value.url || '/';
    }

    return nextUrl;
  }, [passedUrl, type, reference]);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <li className="group relative">
      {!submenu || submenu.length === 0 ? (
        <Link
          href={url}
          onClick={onClick}
          className={classNames(
            'text-dark hover:text-primary dark:text-white/70 dark:hover:text-white',
            {
              'flex py-4 text-3xl md:text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6':
                !isSubmenuItem,
              'block rounded text-xl md:text-base py-2.5 lg:px-3': isSubmenuItem,
            },
          )}
          {...(newTab
            ? {
                target: '_blank',
              }
            : {})}
        >
          {label}
        </Link>
      ) : (
        <>
          <p
            onClick={() => handleSubmenu(index)}
            className="flex cursor-pointer items-center justify-between py-2 text-3xl md:text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
          >
            {label}
            <span className="pl-3">
              <svg width="25" height="24" viewBox="0 0 25 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </p>
          <ul
            className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
              openIndex === index ? 'block' : 'hidden'
            }`}
          >
            {submenu?.map((submenuItem, index) => (
              <MenuItem
                key={index}
                {...submenuItem}
                index={index}
                onClick={onClick}
                isSubmenuItem
              />
            ))}
          </ul>
        </>
      )}
    </li>
  );
};

export default MenuItem;
