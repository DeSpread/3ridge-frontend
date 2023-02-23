import { CSSProperties, PropsWithChildren } from "react";
import { motion } from "framer-motion";

type UpDownAnimatedComponentProps = PropsWithChildren & {
  width?: string | number;
  height?: string | number;
  yDist?: string | number;
  duration?: number;
  sx?: CSSProperties | undefined;
};

const UpDownAnimatedComponent = ({
  width,
  height,
  sx,
  children,
  duration = 5,
  yDist = "0px",
}: UpDownAnimatedComponentProps) => {
  return (
    <motion.div
      animate={{
        translateY: ["0px", `${yDist}`, "0px"],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 0,
      }}
      style={{ width, height, ...sx }}
    >
      {children}
    </motion.div>
  );
};

export default UpDownAnimatedComponent;
export type { UpDownAnimatedComponentProps };
