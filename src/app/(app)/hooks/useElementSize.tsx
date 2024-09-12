import { useEffect, useRef, useState } from 'react';

const useElementSize = (): [
  size: { width: number; height: number },
  ref: React.RefObject<HTMLDivElement | null>,
] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: ref.current?.offsetWidth || 0,
        height: ref.current?.offsetHeight || 0,
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return [size, ref];
};

export default useElementSize;
