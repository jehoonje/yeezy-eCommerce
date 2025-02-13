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
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const whiteImages = Array.from({ length: 18 }, (_, i) => `white-${i + 1}.webp`);
const greyImages = Array.from({ length: 18 }, (_, i) => `grey-${i + 1}.webp`);
const allImages = [...whiteImages, ...greyImages];

const containerStyles: {
  [key in "grid9" | "grid3" | "grid1"]: React.CSSProperties;
} = {
  grid9: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gap: "16px",
    willChange: "transform, opacity",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0px",
    willChange: "transform, opacity",
  },
  grid1: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "0px",
    justifyItems: "center",
    willChange: "transform, opacity",
  },
};

const gridVariants = {
  initial: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 1.5,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const zoomVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: {
    opacity: 0,
    scale: 0.7,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const Home: React.FC = () => {
  const { isZoomMode, setZoomMode } = useZoomStore();
  const { gridState } = useGridStore();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomReady, setZoomReady] = useState(false);
  const [selectedImageMounted, setSelectedImageMounted] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  const selectedImageRef = useRef<HTMLDivElement | null>(null);
  const setSelectedImageRef = useCallback((el: HTMLDivElement | null) => {
    selectedImageRef.current = el;
    if (el) {
      console.log("selectedImage mounted:", el);
      setSelectedImageMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!isZoomMode) {
      setTimeout(() => {
        gsap.set(window, { scrollTo: { y: prevScrollY, autoKill: false } });
      }, 100);
    }
  }, [isZoomMode, prevScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getGridImageStyle = useCallback(
    (state: "grid9" | "grid3" | "grid1", img: string): React.CSSProperties => {
      if (isMobile === null) return {};

      const isSelected = selectedImage === img;
      switch (state) {
        case "grid9":
          return {
            width: "100%",
            maxWidth: isMobile && isSelected ? "100%" : "200px",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            cursor: "pointer",
          };
        case "grid3":
          return {
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
            cursor: "pointer",
          };
        case "grid1":
          return {
            width: isMobile ? "100%" : "50vw",
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            cursor: isMobile ? "default" : "pointer",
          };
        default:
          return {};
      }
    },
    [isMobile, selectedImage]
  );

  const handleImageClick = useCallback(
    (img: string) => {
      if (isMobile === null) return;
      if (isMobile && gridState === "grid1") return;
      setPrevScrollY(window.scrollY);
      setSelectedImage(img);
      setSelectedImageMounted(false);
      setZoomMode(true);
    },
    [setZoomMode, isMobile, gridState]
  );

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
      requestAnimationFrame(() => {
        setZoomReady(true);
      });
    }
  }, [isZoomMode, selectedImage, selectedImageMounted, setZoomMode]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-12 p-4">
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
            {allImages.map((img, idx) => (
              <motion.img
                key={`grid-${gridState}-${img}`}
                src={`/${img}`}
                alt={img}
                loading={idx === 0 ? "eager" : "lazy"}
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
                style={{ marginBottom: "16px" }}
                ref={img === selectedImage ? setSelectedImageRef : null}
              >
                <motion.img
                  src={`/${img}`}
                  alt={img}
                  loading={img === selectedImage ? "eager" : "lazy"}
                  style={{
                    width: isMobile ? "100%" : "50vw",
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
