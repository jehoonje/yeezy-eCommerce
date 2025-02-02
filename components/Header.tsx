'use client';

import React, { useState, MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAccessibilityStore from '../store/accessibilityStore';
import Drawer from './Drawer';
import { FiPlus, FiShoppingCart } from 'react-icons/fi';
import "./HamburgerMenu.scss"; // SCSS 파일 import

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessibilityMode } = useAccessibilityStore();

  // 메인 페이지 여부 (메인 페이지에서만 드로어 토글)
  const isMainPage = pathname === '/';

  // 드로어 열림 상태 (메인 페이지일 때만 의미 있음)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = (e: MouseEvent) => {
    e.stopPropagation();
    setOpenDrawer((prev) => !prev);
  };

  const handleNavigation = (path: string, e: MouseEvent) => {
    e.stopPropagation();
    router.push(path);
  };

  return (
    <header className="relative flex items-center justify-between px-6 py-3 h-12 bg-white">
      {/* 왼쪽 블록: 메뉴 버튼, 타이틀, 플러스 버튼 */}
      <div className="flex w-full items-center">
        {/* 메뉴 버튼 (SCSS 적용) */}
        <summary
          className={`menu-button z-30 bg-contrast ${openDrawer ? 'open' : ''}`}
          aria-haspopup="dialog"
          aria-label="Open Menu"
          data-type="menu"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            toggleDrawer(e);
          }}
        >
          <div className="menu-button__icon">
            <div className="menu-button__bar menu-button__bar--1"></div>
            <div className="menu-button__bar menu-button__bar--2"></div>
          </div>
        </summary>

        {/* 플러스 버튼: 메인 페이지에서 드로어가 닫혔을 때 보임 */}
        {isMainPage && !openDrawer && (
          <button className="ml-1 p-2 focus:outline-none">
            <FiPlus size={22} />
          </button>
        )}
      </div>

      {/* 오른쪽 블록: 쇼핑카트 아이콘 */}
      <div className="flex-shrink-0">
        <button
          className={`p-2 focus:outline-none ${accessibilityMode ? 'bg-[#dadada]' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigation("/cart", e);
          }}
        >
          <FiShoppingCart size={24} />
        </button>
      </div>

      {/* 드로어: 메인 페이지일 때 드로어 열림 상태면 렌더링 */}
      {isMainPage && (
        <Drawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />
      )}
    </header>
  );
};

export default Header;
