import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PaginationButtonProps {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export function PaginationButton({
  active,
  onClick,
  children,
  disabled,
}: PaginationButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 border rounded-lg transition-colors
        ${
          active
            ? "bg-[#B88E2F] text-white border-[#B88E2F]"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </motion.button>
  );
}
