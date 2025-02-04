'use client';

import React, { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAccessibilityStore from "../store/accessibilityStore";
import useZoomStore from "../store/zoomStore";
import useGridStore from "../store/useGridStore"; // 새로 만든 store
import dynamic from "next/dynamic";
import { FiPlus, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import "./HamburgerMenu.scss";

// Drawer는 기본적으로 그리드 모드(홈 페이지)일 때만 사용합니다.
const Drawer = dynamic(() => import("./Drawer"), {
  ssr: false,
  loading: () => null,
});

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessibilityMode } = useAccessibilityStore();
  const { isZoomMode, setZoomMode } = useZoomStore();
  const { gridState, setGridState, backGridState } = useGridStore();

  // 메인 페이지 여부 (홈 페이지는 항상 "/")
  const isMainPage = pathname === "/";

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [disableAnimation, setDisableAnimation] = React.useState(false);

  useEffect(() => {
    if (!isMainPage) {
      setOpenDrawer(false);
      setDisableAnimation(true);
    } else {
      setDisableAnimation(false);
    }
  }, [isMainPage]);

  // 왼쪽 버튼 클릭
  const handleHamburgerClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isZoomMode) {
        setZoomMode(false);
      } else if (isMainPage) {
        if (gridState !== "grid9") {
          // 뒤로가기: gridState가 grid1이면 grid3로, gridState가 grid3이면 grid9로 전환
          backGridState();
        } else {
          setOpenDrawer((prev) => !prev);
        }
      } else {
        setDisableAnimation(true);
        router.back();
      }
    },
    [isZoomMode, isMainPage, gridState, router, setZoomMode, backGridState]
  );

  // 플러스 버튼 클릭
  const handlePlusClick = useCallback(() => {
    if (gridState === "grid9") {
      setGridState("grid3");
    } else if (gridState === "grid3") {
      setGridState("grid1");
    }
  }, [gridState, setGridState]);

  const handleNavigation = useCallback(
    (path: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setDisableAnimation(true);
      router.push(path);
    },
    [router]
  );

  const effectiveHamburgerClass = useMemo(() => {
    if (disableAnimation) return "open";
    if (isMainPage && !isZoomMode && gridState === "grid9")
      return openDrawer ? "open" : "";
    return "open";
  }, [disableAnimation, isMainPage, openDrawer, isZoomMode, gridState]);

  return (
    <header className="relative sticky top-0 flex items-center justify-between px-6 py-3 h-12 bg-white">
      <div className="flex w-full items-center">
        <summary
          className={`menu-button z-30 ${
            accessibilityMode ? "bg-[#dadada]" : "bg-contrast"
          } ${effectiveHamburgerClass} ${disableAnimation ? "no-animation" : ""}`}
          aria-haspopup="dialog"
          aria-label={isZoomMode || gridState !== "grid9" ? "뒤로가기" : "Open Menu"}
          data-type="menu"
          role="button"
          onClick={handleHamburgerClick}
        >
          {isZoomMode || gridState !== "grid9" ? (
            <FiArrowLeft size={24} />
          ) : (
            <div className="menu-button__icon-wrapper">
              <div className="menu-button__icon">
                <div className="menu-button__bar menu-button__bar--1"></div>
                <div className="menu-button__bar menu-button__bar--2"></div>
              </div>
            </div>
          )}
        </summary>

        {/* 플러스 버튼: gridState가 "grid9" 또는 "grid3"일 때만 보임 */}
        {isMainPage && !openDrawer && !disableAnimation && !isZoomMode && (gridState === "grid9" || gridState === "grid3") && (
          <button className="ml-1 p-2 z-9999 focus:outline-none" onClick={handlePlusClick}>
            <FiPlus size={22} />
          </button>
        )}
      </div>

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

      {isMainPage && !isZoomMode && gridState === "grid9" && (
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
