export const V2_EASE = {
  out: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuint: [0.32, 0.72, 0, 1] as const,
};

export const V2_DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  dramatic: 1.2,
};

export const V2_SPRING = {
  gentle: { type: "spring" as const, stiffness: 80, damping: 14 },
  snappy: { type: "spring" as const, stiffness: 120, damping: 16 },
};

export const V2_STAGGER = {
  fast: 0.04,
  normal: 0.08,
  slow: 0.15,
  hero: 0.1,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: V2_DURATION.slow, ease: V2_EASE.outExpo, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: V2_DURATION.normal, ease: V2_EASE.out, delay },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: V2_STAGGER.normal,
    },
  },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: V2_DURATION.slow, ease: V2_EASE.outExpo },
  },
};
