"use client";

import React, { useState, MouseEvent, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAccessibilityStore from "../store/accessibilityStore";
import Drawer from "./Drawer";
import { FiPlus, FiShoppingCart } from "react-icons/fi";
import "./HamburgerMenu.scss"; // SCSS 파일 import

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessibilityMode } = useAccessibilityStore();

  // 메인 페이지 여부
  const isMainPage = pathname === "/";

  // Drawer 열림 상태(메인 페이지에서만 의미)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  // 내비게이션(페이지 이동) 시 애니메이션을 끄고 뒤로가기 모양을 유지하기 위한 플래그
  const [disableAnimation, setDisableAnimation] = useState<boolean>(false);

  // 메인 페이지를 벗어날 경우 자동으로 Drawer를 닫고 disableAnimation 활성화
  useEffect(() => {
    if (!isMainPage) {
      setOpenDrawer(false);
      setDisableAnimation(true);
    } else {
      // 메인 페이지 복귀 시 애니메이션 복원
      setDisableAnimation(false);
    }
  }, [isMainPage]);

  // 햄버거(메뉴) 버튼 클릭 핸들러
  const handleHamburgerClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMainPage) {
      // 메인 페이지에서는 Drawer 토글 (애니메이션 사용)
      setOpenDrawer((prev) => !prev);
    } else {
      // 내비게이션 시에는 disableAnimation을 활성화하고 뒤로가기
      setDisableAnimation(true);
      router.back();
    }
  };

  // 장바구니 버튼 클릭 시 내비게이션 전에 disableAnimation 활성화
  const handleNavigation = (path: string, e: MouseEvent) => {
    e.stopPropagation();
    setDisableAnimation(true);
    router.push(path);
  };

  // disableAnimation 플래그가 활성화되면 무조건 뒤로가기 모양("open")을 사용
  const effectiveHamburgerClass = disableAnimation
    ? "open"
    : isMainPage
    ? openDrawer
      ? "open"
      : ""
    : "open";

  return (
    <header className="relative flex items-center justify-between px-6 py-3 h-12 bg-white">
      {/* 왼쪽 영역: 메뉴 버튼과 플러스 버튼 */}
      <div className="flex w-full items-center">
        <summary
          className={`menu-button z-30 ${accessibilityMode ? "bg-[#dadada]" : "bg-contrast"} ${effectiveHamburgerClass} ${disableAnimation ? "no-animation" : ""}`}
          aria-haspopup="dialog"
          aria-label="Open Menu"
          data-type="menu"
          role="button"
          onClick={handleHamburgerClick}
        >
          <div className="menu-button__icon-wrapper">
            <div className="menu-button__icon">
              <div className="menu-button__bar menu-button__bar--1"></div>
              <div className="menu-button__bar menu-button__bar--2"></div>
            </div>
          </div>
        </summary>

        {/* 플러스 버튼: 메인 페이지이고 Drawer가 닫힌 상태이며 disableAnimation이 아닐 때 렌더링 */}
        {isMainPage && !openDrawer && !disableAnimation && (
          <button className="ml-1 p-2 focus:outline-none">
            <FiPlus size={22} />
          </button>
        )}
      </div>

      {/* 오른쪽 영역: 쇼핑카트 버튼 */}
      <div className="flex-shrink-0">
        <button
          className={`p-2 focus:outline-none ${
            accessibilityMode ? "bg-[#dadada]" : ""
          }`}
          onClick={(e) => handleNavigation("/cart", e)}
        >
          <FiShoppingCart size={24} />
        </button>
      </div>

      {/* 메인 페이지일 때만 Drawer 렌더링 */}
      {isMainPage && (
        <Drawer
          isOpen={openDrawer}
          onClose={() => {
            setDisableAnimation(true);
            setOpenDrawer(false);
          }}
          disableAnimation={disableAnimation} // Drawer에도 disableAnimation 전달
        />
      )}
    </header>
  );
};

export default Header;
