import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  onIntersect: VoidFunction;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ onIntersect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        onIntersect();
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect]);

  return <div ref={containerRef} />;
};

export default InfiniteScroll;
