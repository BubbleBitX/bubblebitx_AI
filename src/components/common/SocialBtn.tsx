import React from 'react';
import { motion } from 'motion/react';

interface SocialBtnProps {
  icon: React.ReactNode;
  className: string;
  href: string;
  label: string;
}

export const SocialBtn: React.FC<SocialBtnProps> = ({ icon, className, href, label }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-shadow duration-200 hover:shadow-md ${className}`}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
};

export default SocialBtn;
