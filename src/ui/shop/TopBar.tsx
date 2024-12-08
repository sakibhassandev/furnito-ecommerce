import { motion, AnimatePresence } from "framer-motion";
import { Grid, List } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
  totalItems: number;
}

export function TopBar({ viewMode, onViewChange, totalItems }: TopBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sort Filtering");

  return (
    <div className="bg-white border-b">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">
            {totalItems} Products
          </span>
          <span>Showing 1-9</span>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex">
              <button
                onClick={() => onViewChange("grid")}
                className={`p-2 ${
                  viewMode === "grid" ? "bg-gray-100" : ""
                } rounded-l border border-r-0`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewChange("list")}
                className={`p-2 ${
                  viewMode === "list" ? "bg-gray-100" : ""
                } rounded-r border`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
              >
                <span>{selectedSort}</span>
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
                    {[
                      "Sort Filtering",
                      "Latest Products",
                      "Price: Low to High",
                      "Price: High to Low",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          selectedSort === option ? "bg-gray-200" : ""
                        }`}
                      >
                        {option}
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
