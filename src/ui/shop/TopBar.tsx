import { SORT_OPTIONS, SortOption } from "@/utils/ProductSorting";
import { motion, AnimatePresence } from "framer-motion";
import { List } from "lucide-react";
import { useState } from "react";

type TopBarType = {
  totalItems: number;
  currentPage: number;
  startIndex: number;
  endIndex: number;
  onSortChange: (sort: SortOption["value"]) => void;
  currentSort: SortOption["value"];
};

export function TopBar({
  totalItems,
  startIndex,
  endIndex,
  onSortChange,
  currentSort,
}: TopBarType) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState(
    SORT_OPTIONS[0]?.label
  );

  return (
    <div className="bg-white border-b mt-5">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">
            {totalItems} Products
          </span>
          <span>
            Showing {startIndex} - {endIndex}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex">
              <button className={`p-2 rounded-r border`}>
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <span>{currentSortOption}</span>
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-gray-500"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M2 4l4 4 4-4"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-10"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setCurrentSortOption(option.label);
                          onSortChange(option.value);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          currentSort === option.value
                            ? "bg-gray-50 text-pink-600"
                            : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
