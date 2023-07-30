import React from "react";

class MathUtil {
  public static clamp = (value: number, min?: number, max?: number) => {
    if (min !== undefined && max !== undefined) {
      return Math.min(Math.max(value, min), max);
    }
    if (min !== undefined) {
      return Math.max(value, min);
    }
    if (max !== undefined) {
      return Math.min(value, max);
    }
    return value;
  };
}

export default MathUtil;
