import { motion } from "framer-motion";
import { StarIcon, QuoteIcon } from "@/lib/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Review = {
  id: number;
  name: string;
  date: string;
  avatarUrl: string;
  rating: number;
  text: string;
};

interface ReviewCardProps {
  review: Review;
  index: number;
}

export function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.9,
        filter: "blur(10px)",
        transition: { duration: 0.2, ease: "easeIn" },
      }}
      transition={{
        layout: { type: "spring", stiffness: 220, damping: 25 },
        opacity: { duration: 0.4, delay: index * 0.08, ease: "easeOut" },
        y: { type: "spring", stiffness: 200, damping: 20, delay: index * 0.08 },
        scale: { duration: 0.4, delay: index * 0.08, ease: "easeOut" },
        filter: { duration: 0.4, delay: index * 0.08, ease: "easeOut" },
      }}
      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] flex-shrink-0"
    >
      <Card className="border-border/60 shadow-sm relative overflow-hidden h-full">
        <CardContent className="p-6 flex flex-col gap-4">
          {/* Quote Icon in Background */}
          <div className="absolute top-6 right-6 text-muted-foreground/10">
            <QuoteIcon className="rotate-180 w-14 h-14" />
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 relative z-10">
            <Avatar className="w-12 h-12 border border-border/50">
              <AvatarImage src={review.avatarUrl} alt={review.name} />
              <AvatarFallback>{review.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{review.name}</span>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-primary relative z-10 mt-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "text-primary" : "text-muted-foreground/20"}`}
              />
            ))}
          </div>

          {/* Text */}
          <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
            {review.text}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
