'use client';

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAccessibilityStore from "../store/accessibilityStore";
import dynamic from "next/dynamic";
import { FiPlus, FiShoppingCart } from "react-icons/fi";
import "./HamburgerMenu.scss";

// Drawer는 메인 페이지일 때만 동적 임포트되도록 구성합니다.
const Drawer = dynamic(() => import("./Drawer"), {
  ssr: false,
  // 로딩 시 빈 노출: 초기 렌더링에 걸리는 시간을 최소화합니다.
  loading: () => null,
});

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessibilityMode } = useAccessibilityStore();

  // 메인 페이지 여부 판단
  const isMainPage = pathname === "/";

  // Drawer 열림 상태 및 애니메이션 제어 플래그
  const [openDrawer, setOpenDrawer] = useState(false);
  const [disableAnimation, setDisableAnimation] = useState(false);

  // 페이지 전환 시 Drawer 상태 및 애니메이션 플래그 업데이트
  useEffect(() => {
    if (!isMainPage) {
      setOpenDrawer(false);
      setDisableAnimation(true);
    } else {
      setDisableAnimation(false);
    }
  }, [isMainPage]);

  // 햄버거 버튼 클릭 핸들러 (최소한의 로직만 남김)
  const handleHamburgerClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isMainPage) {
        setOpenDrawer((prev) => !prev);
      } else {
        setDisableAnimation(true);
        router.back();
      }
    },
    [isMainPage, router]
  );

  // 장바구니 버튼 클릭 핸들러
  const handleNavigation = useCallback(
    (path: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setDisableAnimation(true);
      router.push(path);
    },
    [router]
  );

  // 클래스 계산 로직을 메모이제이션하여 불필요한 재계산을 피함
  const effectiveHamburgerClass = useMemo(() => {
    if (disableAnimation) return "open";
    if (isMainPage) return openDrawer ? "open" : "";
    return "open";
  }, [disableAnimation, isMainPage, openDrawer]);

  return (
    <header className="relative sticky top-0 flex items-center justify-between px-6 py-3 h-12 bg-white">
      {/* 왼쪽 영역: 메뉴 버튼과 플러스 버튼 */}
      <div className="flex w-full items-center">
        <summary
          className={`menu-button z-30 ${
            accessibilityMode ? "bg-[#dadada]" : "bg-contrast"
          } ${effectiveHamburgerClass} ${disableAnimation ? "no-animation" : ""}`}
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

        {/* 메인 페이지일 때만 플러스 버튼 렌더링 */}
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
          disableAnimation={disableAnimation}
        />
      )}
    </header>
  );
};

export default React.memo(Header);
