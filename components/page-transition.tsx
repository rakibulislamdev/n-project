"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={pathname + "-curtain"}
        className="fixed inset-0 z-[100] bg-foreground pointer-events-none"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      />
      {children}
    </>
  );
}
