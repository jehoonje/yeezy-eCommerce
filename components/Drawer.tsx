import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useAccessibilityStore from '../store/accessibilityStore';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const { accessibilityMode } = useAccessibilityStore();
  const drawerVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  const categories = [
    { name: 'HELP', path: '/help' },
    { name: 'TERMS', path: '/policies/terms-of-service' },
    { name: 'PRIVACY', path: '/policies/privacy-policy' },
    { name: 'ACCESSIBILLITY', path: '/accessibility' },
    { name: 'COOKIES', path: '/policies/cookies' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={drawerVariants}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed top-16 left-0 bottom-0 w-64 bg-white shadow-lg z-40"
    >
      <nav className="mt-4">
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.name}
              className={`p-4 border-b ${accessibilityMode ? 'underline' : ''}`}
            >
              <Link href={cat.path}>
                <a onClick={onClose}>{cat.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Drawer;
