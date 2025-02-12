"use client";

import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import useZoomStore from "../store/zoomStore";
import useGridStore from "../store/useGridStore";
import useDrawerStore from "../store/drawerStore";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const whiteImages = Array.from({ length: 18 }, (_, i) => `white-${i + 1}.webp`);
const greyImages = Array.from({ length: 18 }, (_, i) => `grey-${i + 1}.webp`);
const allImages = [...whiteImages, ...greyImages];

const Home: React.FC = () => {
  const { isZoomMode, setZoomMode } = useZoomStore();
  const { gridState } = useGridStore();
  const { openDrawer, setOpenDrawer } = useDrawerStore();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomReady, setZoomReady] = useState(false);
  const [selectedImageMounted, setSelectedImageMounted] = useState(false);

  const selectedImageRef = useRef<HTMLDivElement | null>(null);
  const setSelectedImageRef = useCallback((el: HTMLDivElement | null) => {
    selectedImageRef.current = el;
    if (el) {
      console.log("selectedImage mounted:", el);
      setSelectedImageMounted(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      handleResize(); // 초기 렌더링 시 한 번 실행
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // grid 컨테이너 스타일
  const containerStyles: {
    [key in "grid9" | "grid3" | "grid1"]: React.CSSProperties;
  } = {
    grid9: {
      display: "grid",
      gridTemplateColumns: "repeat(9, 1fr)",
      gap: "16px",
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "0px",
    },
    grid1: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "0px",
      justifyItems: "center",
    },
  };

  // grid 내 이미지 스타일 (gridState별)
  const getGridImageStyle = useCallback(
    (state: "grid9" | "grid3" | "grid1", img: string) => {
      if (isMobile === null) return {}; // isMobile 값이 아직 설정되지 않았을 경우 기본 스타일 유지

      const isSelected = selectedImage === img; // 현재 선택된 이미지인지 확인

      switch (state) {
        case "grid9":
          return {
            width: isMobile && isSelected ? "100%" : "100%", // 선택된 경우 모바일에서 100%
            maxWidth: isMobile && isSelected ? "100%" : "200px",
            // 정사각형 이미지라면 aspectRatio로 비율 유지 (다른 비율이면 height: 'auto'로 설정)
            aspectRatio: "1 / 1",
            objectFit: "cover",
            cursor: "pointer",
          };
        case "grid3":
          return {
            width: isMobile && isSelected ? "100%" : "100%", // 선택된 경우 모바일에서 100%
            maxWidth: isMobile && isSelected ? "100%" : "100%",
            height: "auto",
            objectFit: "cover",
            cursor: "pointer",
          };
        case "grid1":
          return {
            width: window.innerWidth <= 768 ? "100%" : "50vw",
            height: "auto",
            objectFit: "contain",
            pointerEvents: isMobile ? "none" : "auto",
            cursor: isMobile ? "default" : "pointer",
          };
        default:
          return {};
      }
    },
    [isMobile, selectedImage]
  );

  const gridVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: {
      opacity: 0,
      scale: 1.5,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const zoomVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const handleImageClick = useCallback(
    (img: string) => {
      if (isMobile === null) return; // 초기 상태일 때 클릭 방지
      if (isMobile && gridState === "grid1") return;
      console.log("이미지 클릭:", img);
      setSelectedImage(img);
      setSelectedImageMounted(false);
      setZoomMode(true);
    },
    [setZoomMode, isMobile, gridState]
  );

  useEffect(() => {
    if (gridState === "grid9" && openDrawer) {
      console.log("grid9 - 스크롤 없애기");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [gridState, openDrawer]);
  

  useLayoutEffect(() => {
    if (
      isZoomMode &&
      selectedImage &&
      selectedImageMounted &&
      selectedImageRef.current
    ) {
      const rect = selectedImageRef.current.getBoundingClientRect();
      const scrollTo =
        rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
      console.log("useLayoutEffect - 선택된 이미지 위치:", rect);
      console.log("useLayoutEffect - 계산된 scrollTo 값:", scrollTo);

      gsap.set(window, {
        scrollTo: { y: scrollTo, autoKill: false },
      });

      const fadeTimer = setTimeout(() => {
        console.log("페이드인 시작");
        setZoomReady(true);
      }, 10);

      return () => clearTimeout(fadeTimer);
    }
  }, [isZoomMode, selectedImage, selectedImageMounted, setZoomMode]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-14 p-4">
      <AnimatePresence mode="wait">
        {!isZoomMode ? (
          <motion.div
            key={`grid-${gridState}`}
            style={containerStyles[gridState]}
            variants={gridVariants}
            initial="initial"
            animate="initial"
            exit="exit"
          >
            {allImages.map((img) => (
              <motion.img
                key={`grid-${gridState}-${img}`}
                src={`/${img}`}
                alt={img}
                onClick={() => handleImageClick(img)}
                style={getGridImageStyle(gridState, img)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="zoom"
            style={containerStyles["grid1"]}
            variants={zoomVariants}
            initial="hidden"
            animate={zoomReady ? "visible" : "hidden"}
            exit="exit" 
          >
            {allImages.map((img) => (
              <motion.div
                key={`zoom-${img}`}
                style={{ marginBottom: "16px" 
                }}
                ref={img === selectedImage ? setSelectedImageRef : null}
              >
                <motion.img
                  src={`/${img}`}
                  alt={img}
                  style={{
                    width: window.innerWidth <= 768 ? "100%" : "50vw",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
