'use client';

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useAccessibilityStore from "../store/accessibilityStore";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  disableAnimation: boolean;
}

const Drawer: React.FC<DrawerProps> = React.memo(({ isOpen, onClose, disableAnimation }) => {
  const { accessibilityMode } = useAccessibilityStore();

  // variants: disableAnimation일 경우 transition을 0으로 적용
  const containerVariants = useMemo(
    () => ({
      open: {
        x: 95,
        opacity: 1,
        scale: 1,
        transition: disableAnimation 
          ? { duration: 0 } 
          : { type: "spring", stiffness: 300, damping: 30 },
      },
      closed: {
        x: 40,
        opacity: 0,
        scale: 0.95,
        transition: disableAnimation 
          ? { duration: 0 } 
          : { type: "spring", stiffness: 300, damping: 30, duration: 0.25 },
      },
    }),
    [disableAnimation]
  );

  const categories = [
    { name: "SUPPORT", path: "/help" },
    { name: "TERMS", path: "/policies/terms-of-service" },
    { name: "PRIVACY", path: "/policies/privacy-policy" },
    { name: "ACCESSIBILITY", path: "/accessibility" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute left-0 top-0 h-full flex items-center overflow-hidden"
    >
      <nav>
        <ul className="flex text-md space-x-9">
          {categories.map((cat) => (
            <li key={cat.name} className={`${accessibilityMode ? "underline" : ""}`}>
              <Link
                href={cat.path}
                onClick={() => {
                  // 내비게이션 전에 애니메이션 끄기
                  onClose();
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
});

Drawer.displayName = "Drawer";
export default Drawer;
