import { motion } from "framer-motion";
import { lifestyleImages } from "@/lib/lifestyleImages";

const floatingImageLayout = [
  { image: 0, top: "6%", left: "1rem", size: "w-20 2xl:w-28", rotate: -10, delay: 0 },
  { image: 2, top: "10%", right: "0.75rem", size: "w-16 2xl:w-24", rotate: -6, delay: 0.6 },
  { image: 4, top: "15%", right: "1.25rem", size: "w-20 2xl:w-28", rotate: 9, delay: 0.3 },
  { image: 6, top: "20%", left: "0.75rem", size: "w-16 2xl:w-24", rotate: 11, delay: 0.9 },
  { image: 8, top: "25%", left: "2.25rem", size: "w-24 2xl:w-32", rotate: 7, delay: 0.8 },
  { image: 11, top: "34%", right: "2rem", size: "w-20 2xl:w-28", rotate: -8, delay: 0.5 },
  { image: 13, top: "39%", left: "0.75rem", size: "w-16 2xl:w-24", rotate: 6, delay: 0.2 },
  { image: 15, top: "43%", left: "1.5rem", size: "w-20 2xl:w-28", rotate: -5, delay: 1 },
  { image: 16, top: "48%", right: "0.75rem", size: "w-16 2xl:w-24", rotate: -11, delay: 0.7 },
  { image: 18, top: "53%", right: "2.25rem", size: "w-24 2xl:w-32", rotate: 10, delay: 0.2 },
  { image: 19, top: "58%", left: "0.75rem", size: "w-16 2xl:w-24", rotate: -8, delay: 1.1 },
  { image: 21, top: "63%", left: "2rem", size: "w-20 2xl:w-28", rotate: 8, delay: 0.7 },
  { image: 22, top: "68%", right: "0.75rem", size: "w-16 2xl:w-24", rotate: 7, delay: 0.4 },
  { image: 24, top: "73%", right: "1.5rem", size: "w-20 2xl:w-28", rotate: -9, delay: 1.1 },
  { image: 25, top: "78%", left: "0.75rem", size: "w-16 2xl:w-24", rotate: 10, delay: 0.8 },
  { image: 26, top: "82%", left: "2.5rem", size: "w-24 2xl:w-32", rotate: -7, delay: 0.4 },
  { image: 27, top: "92%", right: "2.25rem", size: "w-20 2xl:w-28", rotate: 6, delay: 0.9 },
];

export function FloatingLifestyleImages() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden xl:block"
    >
      {floatingImageLayout.map((item, index) => {
        const image = lifestyleImages[item.image % lifestyleImages.length];

        return (
          <motion.div
            key={`${image.src}-${index}`}
            className={`absolute ${item.size}`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              rotate: `${item.rotate}deg`,
            }}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: item.delay }}
          >
            <motion.img
              src={image.src}
              alt=""
              loading="lazy"
              animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
              transition={{
                duration: 6 + (index % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
              className="aspect-[4/5] w-full rounded-lg border border-white/70 object-cover opacity-90 shadow-[0_18px_50px_-22px_hsl(220_20%_15%_/_0.55)] ring-1 ring-gold/20"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
