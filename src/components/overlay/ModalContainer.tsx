"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalContainerProps {
  children: ReactNode;
}

export default function ModalContainer({ children }: ModalContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.2 }}
      className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg"
    >
      {children}
    </motion.div>
  );
}
