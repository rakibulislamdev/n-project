"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReviewCard, type Review } from "./review-card";
import { CustomPagination } from "@/components/custom-pagination";


const TABS = [
  { label: "All Reviews", value: "All" },
  { label: "5 Star", value: 5 },
  { label: "4 Star", value: 4 },
  { label: "3 Star", value: 3 },
  { label: "2 Star", value: 2 },
  { label: "1 Star", value: 1 },
];

const ITEMS_PER_PAGE = 6;

export function Reviews({ initialReviews }: { initialReviews?: Review[] }) {
  const [activeTab, setActiveTab] = useState<string | number>("All");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filter or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, sortBy]);

  const reviewsData = useMemo(() => {
    return initialReviews || [];
  }, [initialReviews]);

  // Filter and sort the reviews based on state
  const displayedReviews = useMemo(() => {
    // 1. Filter
    let filtered = reviewsData;
    if (activeTab !== "All") {
      filtered = filtered.filter(review => review.rating === activeTab);
    }

    // 2. Sort
    return filtered.sort((a, b) => {
      if (sortBy === "Highest Rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "Lowest Rating") {
        return a.rating - b.rating;
      }
      // "Most Recent" logic: parse dates and sort descending
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });
  }, [activeTab, sortBy, reviewsData]);

  const totalPages = Math.ceil(displayedReviews.length / ITEMS_PER_PAGE);
  const paginatedReviews = displayedReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full bg-background py-12 md:py-16 font-inter" id="reviews">
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full flex flex-col gap-6 md:gap-8">

        {/* Top Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/50 pb-6"
        >
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto w-full pb-3 md:pb-0 scrollbar-hide">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              const count = tab.value === "All" 
                ? reviewsData.length 
                : reviewsData.filter(r => r.rating === tab.value).length;

              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.value)}
                  className={`cursor-pointer text-sm pb-1 whitespace-nowrap transition-colors duration-300 border-b-2 font-medium ${isActive
                      ? "text-foreground border-foreground"
                      : "text-muted-foreground hover:text-foreground border-transparent"
                    }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
            <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
              <SelectTrigger className="w-full md:w-[180px] bg-secondary text-secondary-foreground border-none rounded-md">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} className="font-inter border-border/50">
                <SelectItem value="Most Recent" className="focus:bg-secondary focus:text-secondary-foreground cursor-pointer">Most Recent</SelectItem>
                <SelectItem value="Highest Rating" className="focus:bg-secondary focus:text-secondary-foreground cursor-pointer">Highest Rating</SelectItem>
                <SelectItem value="Lowest Rating" className="focus:bg-secondary focus:text-secondary-foreground cursor-pointer">Lowest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Reviews Flexbox (Used instead of CSS Grid to allow perfect popLayout shuffle animations) */}
        <motion.div layout className="flex flex-wrap gap-6 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {paginatedReviews.length > 0 ? (
              paginatedReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex items-center justify-center py-12 text-muted-foreground"
              >
                No reviews found for this category.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <CustomPagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />

      </div>
    </section>
  );
}
