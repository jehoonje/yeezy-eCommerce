import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useAccessibilityStore from "../store/accessibilityStore";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  disableAnimation: boolean;
}

const Drawer: React.FC<DrawerProps> = React.memo(
  ({ isOpen, onClose, disableAnimation }) => {
    const { accessibilityMode } = useAccessibilityStore();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const mq = window.matchMedia("(max-width: 768px)");
      setIsMobile(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }, []);

    const containerVariants = useMemo(() => {
      const variants: {
        open: {
          x: number;
          y?: number;
          opacity: number;
          scale: number;
          pointerEvents: "auto" | "none";
          transition: {
            duration?: number;
            type?: string;
            stiffness?: number;
            damping?: number;
          };
        };
        closed: {
          x: number;
          y?: string | number;
          opacity: number;
          scale: number;
          pointerEvents: "auto" | "none";
          transition: {
            duration?: number;
            type?: string;
            stiffness?: number;
            damping?: number;
          };
        };
      } = isMobile
        ? {
            open: {
              x: 10,
              y: 0,
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              transition: disableAnimation
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30 },
            },
            closed: {
              x: isMobile ? 0 : 40,
              y: "-100%",
              opacity: 0,
              scale: 0.95,
              pointerEvents: "none",
              transition: disableAnimation
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30, duration: 0.25 },
            },
          }
        : {
            open: {
              x: 95,
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              transition: disableAnimation
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30 },
            },
            closed: {
              x: 40,
              opacity: 0,
              scale: 0.95,
              pointerEvents: "none",
              transition: disableAnimation
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30, duration: 0.25 },
            },
          };
      return variants;
    }, [disableAnimation, isMobile]);

    const containerClass = useMemo(() => {
      return isMobile
        ? "absolute top-full left-0 w-full pl-4 flex flex-col overflow-hidden bg-white"
        : "absolute left-0 top-0 h-full flex items-center overflow-hidden bg-white";
    }, [isMobile]);

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
        className={containerClass}
      >
        <nav className="w-full">
          <ul
            className={`${
              isMobile
                ? "flex flex-col space-y-2 p-4"
                : "flex text-md space-x-9 p-4"
            }`}
          >
            {categories.map((cat) => (
              <li key={cat.name} className={isMobile ? "w-full" : ""}>
                <Link
                  href={cat.path}
                  onClick={() => {
                    onClose();
                  }}
                  className={isMobile ? "block w-full text-left py-2" : ""}
                >
                  <span className={accessibilityMode ? "underline" : ""}>
                    {cat.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    );
  }
);

Drawer.displayName = "Drawer";
export default Drawer;
