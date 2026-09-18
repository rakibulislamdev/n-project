"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ReviewPhotoGalleryProps {
  propertyImages: string[];
}

export function ReviewPhotoGallery({ propertyImages }: ReviewPhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!propertyImages || propertyImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
        No Photo
      </div>
    );
  }

  const mainPhoto = propertyImages[0];
  const photoCount = propertyImages.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<div className="relative w-full h-full cursor-pointer group hover:opacity-90 transition-opacity" />}>
        <img src={mainPhoto} alt="Review Property" className="w-full h-full object-cover" />
        {photoCount > 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold tracking-wider">
            +{photoCount}
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-white text-[10px] font-semibold bg-black/50 px-2 py-1 rounded">View All</span>
        </div>
      </DialogTrigger>
      <DialogContent className="!max-w-none !w-screen !h-screen !top-0 !left-0 !translate-x-0 !translate-y-0 !p-0 !bg-black/95 !border-none !shadow-none !ring-0 text-white !rounded-none !flex !flex-col !justify-center [&>button]:absolute [&>button]:right-6 [&>button]:top-6 [&>button]:bg-white/10 [&>button]:hover:bg-white/20 [&>button]:rounded-full [&>button]:z-50 [&>button_svg]:w-6 [&>button_svg]:h-6">
        <Carousel className="w-full">
          <CarouselContent>
            {propertyImages.map((img, idx) => (
              <CarouselItem key={idx} className="flex items-center justify-center">
                <img 
                  src={img} 
                  alt={`Property image ${idx + 1}`} 
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {propertyImages.length > 1 && (
            <>
              <CarouselPrevious className="!left-6 bg-white/10 hover:bg-white/20 border-none text-white w-12 h-12 z-50" />
              <CarouselNext className="!right-6 bg-white/10 hover:bg-white/20 border-none text-white w-12 h-12 z-50" />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
