'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useAccessibilityStore from '../store/accessibilityStore';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const { accessibilityMode } = useAccessibilityStore();

  // "즉시 닫기"를 위한 state
  const [instantClose, setInstantClose] = useState(false);

  // variants 정의:
  //  - closed: 슬라이드 애니메이션으로 닫힘
  //  - open: 슬라이드 애니메이션으로 열림
  //  - instantClosed: 애니메이션 없이 바로 사라짐
  const containerVariants = {
    open: {
      x: 95,
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      },
    },
    closed: {
      x: 40,
      opacity: 0,
      scale: 0.95,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        duration: 0.25, // 필요에 따라 조정
      },
    },
    // 즉시 사라지는 상태
    instantClosed: {
      x: 40,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0 }, // 0초!
    },
  };

  // 어떤 카테고리를 클릭해도 즉시 닫히도록 하려면 아래 처리를 모든 Link에 공통 적용
  // 만약 "SUPPORT"만 이렇게 하고 싶다면 조건문으로 분기해도 됨
  const categories = [
    { name: 'SUPPORT', path: '/help' },
    { name: 'TERMS', path: '/policies/terms-of-service' },
    { name: 'PRIVACY', path: '/policies/privacy-policy' },
    { name: 'ACCESSIBILITY', path: '/accessibility' },
    { name: 'COOKIES', path: '/policies/cookies' },
  ];

  // 현재 animate 상태 결정
  // - instantClose가 true 이면 instantClosed
  // - 아니면, isOpen 이면 open, 아니면 closed
  const currentVariant = instantClose ? 'instantClosed' : isOpen ? 'open' : 'closed';

  return (
    <motion.div
      variants={containerVariants}
      initial="closed"
      animate={currentVariant}
      className="absolute left-0 top-0 h-full flex items-center overflow-hidden"
    >
      <nav>
        <ul className="flex text-md space-x-9">
          {categories.map((cat) => (
            <li
              key={cat.name}
              className={`${accessibilityMode ? 'underline' : ''}`}
            >
              <Link
                href={cat.path}
                onClick={() => {
                  // 페이지 이동 시 즉시 닫히도록
                  setInstantClose(true);
                  onClose(); // 부모로부터 내려온 Drawer 닫기
                }}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Drawer;
