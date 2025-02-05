'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useZoomStore from '../store/zoomStore';
import useGridStore from '../store/useGridStore'; // 글로벌 gridState 사용
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

const whiteImages = Array.from({ length: 18 }, (_, i) => `white-${i + 1}.webp`);
const greyImages = Array.from({ length: 18 }, (_, i) => `grey-${i + 1}.webp`);
const allImages = [...whiteImages, ...greyImages];

const Home: React.FC = () => {
  const { isZoomMode, setZoomMode } = useZoomStore();
  const { gridState } = useGridStore(); // 글로벌 gridState 구독
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomReady, setZoomReady] = useState(false);
  const [selectedImageMounted, setSelectedImageMounted] = useState(false);

  const selectedImageRef = useRef<HTMLDivElement | null>(null);
  const setSelectedImageRef = useCallback((el: HTMLDivElement | null) => {
    selectedImageRef.current = el;
    if (el) {
      console.log('selectedImage mounted:', el);
      setSelectedImageMounted(true);
    }
  }, []);

  // 컨테이너 스타일: gridState에 따라 다름
  const containerStyles: { [key in "grid9" | "grid3" | "grid1"]: React.CSSProperties } = {
    grid9: {
      display: 'grid',
      gridTemplateColumns: 'repeat(9, 1fr)',
      gap: '16px'
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px'
    },
    grid1: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '16px',
      justifyItems: 'center'
    }
  };

  const gridVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.5, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  const zoomVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const handleImageClick = useCallback((img: string) => {
    console.log('이미지 클릭:', img);
    setSelectedImage(img);
    setSelectedImageMounted(false);
    setZoomMode(true);
  }, [setZoomMode]);

  useLayoutEffect(() => {
    if (isZoomMode && selectedImage && selectedImageMounted && selectedImageRef.current) {
      const rect = selectedImageRef.current.getBoundingClientRect();
      const scrollTo =
        rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
      console.log('useLayoutEffect - 선택된 이미지 위치:', rect);
      console.log('useLayoutEffect - 계산된 scrollTo 값:', scrollTo);

      gsap.set(window, {
        scrollTo: { y: scrollTo, autoKill: false }
      });

      const fadeTimer = setTimeout(() => {
        console.log('페이드인 시작');
        setZoomReady(true);
      }, 10);

      return () => clearTimeout(fadeTimer);
    }
  }, [isZoomMode, selectedImage, selectedImageMounted, setZoomMode]);

  return (
    <div className="min-h-screen pt-16 p-4">
      <AnimatePresence mode="wait">
        {!isZoomMode ? (
          <motion.div
            key={`grid-${gridState}`}
            style={containerStyles[gridState]}
            variants={gridVariants}
            initial="initial"
            exit="exit"
          >
            {allImages.map((img) => (
              <motion.img
                key={`grid-${gridState}-${img}`}
                src={`/${img}`}
                alt={img}
                onClick={() => handleImageClick(img)}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="zoom"
            style={containerStyles['grid1']}
            variants={zoomVariants}
            initial="hidden"
            animate={zoomReady ? 'visible' : 'hidden'}
          >
            {allImages.map((img) => (
              <motion.div
                key={`zoom-${img}`}
                style={{ marginBottom: '16px' }}
                ref={img === selectedImage ? setSelectedImageRef : null}
              >
                <motion.img
                  src={`/${img}`}
                  alt={img}
                  style={{
                    width: '50vw',
                    objectFit: 'contain',
                    cursor: 'pointer'
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
