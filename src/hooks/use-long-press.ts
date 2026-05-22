"use client";

import { useCallback, useRef, useState } from "react";

interface UseLongPressOptions {
  onLongPress: () => void;
  onPress?: () => void;
  delay?: number;
}

export function useLongPress({ onLongPress, onPress, delay = 500 }: UseLongPressOptions) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<EventTarget | null>(null);

  const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    // 防止文本选择等默认行为
    if (event.type === "touchstart") {
      event.preventDefault();
    }

    setIsPressed(true);
    targetRef.current = event.target;

    timeoutRef.current = setTimeout(() => {
      onLongPress();
      setIsPressed(false);
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback((event: React.TouchEvent | React.MouseEvent, shouldTriggerClick = true) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsPressed(false);

    if (shouldTriggerClick && onPress && targetRef.current === event.target) {
      onPress();
    }
  }, [onPress]);

  return {
    isPressed,
    handlers: {
      onMouseDown: start,
      onMouseUp: (e: React.MouseEvent) => clear(e),
      onMouseLeave: (e: React.MouseEvent) => clear(e, false),
      onTouchStart: start,
      onTouchEnd: (e: React.TouchEvent) => clear(e),
    },
  };
}