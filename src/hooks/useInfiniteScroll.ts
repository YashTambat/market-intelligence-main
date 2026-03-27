import { useEffect, useState, useCallback, useRef } from 'react';

export const useInfiniteScroll = (
  callback: () => Promise<void> | void,
  containerRef: React.RefObject<HTMLElement>
) => {
  const [isFetching, setIsFetching] = useState(false);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleScroll = useCallback(async () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !isFetching) {
      setIsFetching(true);
      try {
        await callbackRef.current();
      } finally {
        setIsFetching(false);
      }
    }
  }, [containerRef, isFetching]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTracker = () => {
      void handleScroll();
    };

    container.addEventListener('scroll', scrollTracker);

    return () => {
      container.removeEventListener('scroll', scrollTracker);
    };
  }, [containerRef, handleScroll]);

  return isFetching;
};
