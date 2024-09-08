'use client';

import { useEffect, useMemo, useState } from 'react';
import { Container, Stack } from '@mui/material';
import classNames from 'classnames';
import { Menu } from '@payload-types';
import { isNumber } from 'lodash';

import Image from 'next/image';
import Link from 'next/link';

import ThemeToggler from './ThemeToggler';
import MenuItem from './menuItem';

const Header = ({ menu: menuData }: { menu: Menu }) => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar);
  });

  const menu = useMemo(() => {
    if (!menuData || isNumber(menuData.items)) return false;

    return menuData.items;
  }, [menuData]);

  const hasLastSubmenu = useMemo(() => {
    if (!menu) return false;

    return (menu[menu.length - 1]?.submenu?.length || 0) > 0;
  }, [menu]);

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center h-[96px] ${
          sticky
            ? 'dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition'
            : 'absolute bg-transparent'
        }`}
      >
        <Container maxWidth="lg">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="px-4 xl:mr-12">
              <Stack
                component={Link}
                direction={'row'}
                alignItems="center"
                spacing={2}
                href="/"
                className={`header-logo w-full ${sticky ? 'py-5 lg:py-2' : 'py-8'} `}
              >
                <Image src="/coa.png" alt="logo" width={40} height={40} />
                <span className="whitespace-nowrap font-semibold text-2xl">Phi Chapter of Phi Kappa Tau</span>
              </Stack>
            </div>
            <div className="flex w-full items-center justify-end px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden z-40"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? ' top-[7px] rotate-45' : ' '
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? 'opacity-0 ' : ' '
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? ' top-[-8px] -rotate-45' : ' '
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-full md:w-[250px] rounded border-[.5px] border-body-color/50 bg-white lg:!bg-transparent dark:bg-dark lg:dark:!bg-transparent px-6 py-4 duration-300 dark:border-body-color/20 lg:visible lg:static lg:w-auto lg:border-none lg:p-0 lg:opacity-100 ${
                    navbarOpen ? 'visibility top-6 opacity-100 open' : 'invisible top-[120%] opacity-0'
                  }`}
                >
                  <ul className={classNames('block lg:flex lg:space-x-12', { 'mr-6': !hasLastSubmenu })}>
                    {menu && menu.map((menuItem, index) => <MenuItem key={menuItem.id} {...menuItem} index={index} />)}
                  </ul>
                </nav>
              </div>
              <ThemeToggler />
              {/* <div className="flex items-center justify-end pr-16 lg:pr-0">
                <Link href="/signin" className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Sign Up
                </Link>
                <div>
                  <ThemeToggler />
                </div>
              </div> */}
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
