import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollSection } from "@/components/scroll-animation";
import { StarIcon } from "@/lib/icons";

interface ReviewSummaryProps {
  averageRating?: number;
  totalReviews?: number;
}

export function ReviewSummary({ averageRating = 0, totalReviews = 0 }: ReviewSummaryProps) {
  const formatNumber = (num: number) => {
    if (num === 0) return "0";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num.toString();
  };

  const formattedTotal = formatNumber(totalReviews);
  const formattedRating = averageRating.toFixed(1);
  const filledStars = Math.round(averageRating);
  return (
    <ScrollSection 
      y={30}
      duration={0.6}
      className="w-full bg-background border-y border-border/50 py-10 md:py-12"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">
        {/* Left Side: Rating */}
        <div className="flex items-center gap-6">
          <span className="text-5xl md:text-6xl font-bold text-foreground">{formattedRating}</span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`w-5 h-5 ${i < filledStars ? "text-primary" : "text-muted-foreground/20"}`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Based on {formattedTotal} review{totalReviews !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Right Side: Call to Action */}
        <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right max-w-sm">
          <p className="text-muted-foreground italic font-light text-lg leading-snug">
            Share your experience and help others make confident decisions.
          </p>
          <Link href="/reviews">
            <Button className="rounded-full px-6 bg-brand-dark text-brand-white hover:bg-brand-dark/90 dark:bg-brand-white dark:text-brand-dark dark:hover:bg-brand-white/90 font-medium font-inter">
              Write a Review
            </Button>
          </Link>
        </div>
      </div>
    </ScrollSection>
  );
}
