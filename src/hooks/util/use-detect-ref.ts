import { useState, useCallback, useEffect, RefObject } from "react";

const observeOptions = {
  root: null,
  threshold: 0.5,
};

export const useDetectRef = <Element extends HTMLElement>(
  callback: () => void,
  ref: RefObject<Element>
) => {
  const observe = useCallback(
    (node: Element) => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
          // after callback is called, disconnect observer
          observer.disconnect();
        }
      }, observeOptions);

      if (node) observer.observe(node);

      return () => {
        if (node) observer.unobserve(node);
      };
    },
    [callback]
  );

  useEffect(() => {
    if (ref.current) return observe(ref.current);
  }, [ref, observe]);
};
