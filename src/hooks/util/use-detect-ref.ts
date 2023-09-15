import { useState, useCallback, useEffect, RefObject } from "react";

const defaultOptions = {
  root: null,
  threshold: 0.5,
};

export const useDetectRef = <Element extends HTMLElement>(
  callback: () => void,
  ref: RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const observe = useCallback(
    (node: Element) => {
      const _options = { ...defaultOptions, ...options };

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
          // after callback is called, disconnect observer
          observer.disconnect();
        }
      }, _options);

      if (node) observer.observe(node);

      return () => {
        if (node) observer.unobserve(node);
      };
    },
    [callback, options]
  );

  useEffect(() => {
    if (ref.current) return observe(ref.current);
  }, [ref, observe]);
};
