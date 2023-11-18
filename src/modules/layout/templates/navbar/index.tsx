import CartDropdown from "@modules/layout/components/cart-dropdown"
import LogoCartago from '@modules/layout/components/logo';
import MenuNav from '@modules/layout/components/menu';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import Link from 'next/link';
import { Menu } from 'types/menu';

import Search from './search';
import MobileMenu from "@modules/mobile-menu/templates";
const { SITE_NAME } = process.env;

const menu: Menu = [
  {
    title: 'Marcas',
    path: '/suzuki/'
  }, {
    title: 'Accesorios',
    path: '/accesorios/'
  }
]

export default function Navbar() {

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-gray-800">
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            aria-label="Cartago4x4 home"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoCartago />
            <div className="mx-4 flex-none text-lg text-white font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          <MenuNav menu={menu} />
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          {/* <Search /> */}
          <DesktopSearchModal />
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartDropdown />
        </div>
      </div>
    </nav>
  );
}
