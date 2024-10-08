'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Container, Stack } from '@mui/material';

import { Menu } from '@payload-types';

import MenuItem from './menuItem';

const Footer = ({ menus }: { menus: Menu[] }) => {
  return (
    <footer className="dark:bg-gray-dark relative z-10 bg-white py-16 md:py-20 lg:py-24">
      <Container maxWidth="lg">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183] mb-12"></div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 space-y-6 mb-6">
            <Stack
              component={Link}
              direction={'row'}
              alignItems="center"
              spacing={2}
              href="/"
              className="header-logo w-full"
            >
              <Image src="/coa.png" alt="logo" width={40} height={40} />
              <div>
                <div className="font-semibold text-lg">Phi Chapter of Phi Kappa Tau</div>
                <div className="text-sm">Bethany College | Bethany, West Virginia</div>
              </div>
            </Stack>
            <div className="flex items-center">
              <a
                href="https://www.facebook.com/groups/pktphichapter/"
                aria-label="social-link"
                className="dark:text-body-color-dark mr-6 text-body-color duration-300 hover:text-primary dark:hover:text-primary"
              >
                <svg width="9" height="18" viewBox="0 0 9 18" className="fill-current">
                  <path d="M8.13643 7H6.78036H6.29605V6.43548V4.68548V4.12097H6.78036H7.79741C8.06378 4.12097 8.28172 3.89516 8.28172 3.55645V0.564516C8.28172 0.254032 8.088 0 7.79741 0H6.02968C4.11665 0 2.78479 1.58064 2.78479 3.92339V6.37903V6.94355H2.30048H0.65382C0.314802 6.94355 0 7.25403 0 7.70564V9.7379C0 10.1331 0.266371 10.5 0.65382 10.5H2.25205H2.73636V11.0645V16.7379C2.73636 17.1331 3.00273 17.5 3.39018 17.5H5.66644C5.81174 17.5 5.93281 17.4153 6.02968 17.3024C6.12654 17.1895 6.19919 16.9919 6.19919 16.8226V11.0927V10.5282H6.70771H7.79741C8.11222 10.5282 8.35437 10.3024 8.4028 9.96371V9.93548V9.90726L8.74182 7.95968C8.76604 7.7621 8.74182 7.53629 8.59653 7.31048C8.54809 7.16935 8.33016 7.02823 8.13643 7Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/bc_phitau/"
                aria-label="social-link"
                className="dark:text-body-color-dark mr-6 text-body-color duration-300 hover:text-primary dark:hover:text-yellow"
              >
                <svg width="20" height="20" viewBox="2 0 28 28" className="fill-current">
                  <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/phi-kappa-tau-fraternity/"
                aria-label="social-link"
                className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-yellow"
              >
                <svg width="17" height="16" viewBox="0 0 17 16" className="fill-current">
                  <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                </svg>
              </a>
            </div>
          </div>

          {menus.map((menu, index) => (
            <div
              key={menu.id}
              className={`w-full ${menus.length === 1 ? 'md:w-1/2' : 'md:w-1/4'} px-4 mb-6`}
            >
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">{menu.label}</h2>
              <ul>
                {menu.items?.map((menuItem, index) => (
                  <MenuItem key={menuItem.id} {...menuItem} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="absolute bottom-4 right-0 z-[-1] opacity-20 dark:opacity-5">
        <Image src="/letters-red.png" alt="logo" width={400} height={40} className="dark:hidden" />
        <Image
          src="/letters-white.png"
          alt="logo"
          width={400}
          height={40}
          className="hidden dark:block"
        />
      </div>
    </footer>
  );
};

export default Footer;
