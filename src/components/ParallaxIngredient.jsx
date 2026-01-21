import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ParallaxIngredient = ({ src, speed = 0.5, size = "w-16", top, left, rotate = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // This maps the scroll to a Y-axis movement based on 'speed'
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 400]);
  const rotation = useTransform(scrollYProgress, [0, 1], [rotate, rotate + 45]);

  return (
    <motion.img
      ref={ref}
      src={src}
      className={`absolute z-20 pointer-events-none ${size} drop-shadow-2xl`}
      style={{ y, rotate: rotation, top, left }}
    />
  );
};

export default ParallaxIngredient;