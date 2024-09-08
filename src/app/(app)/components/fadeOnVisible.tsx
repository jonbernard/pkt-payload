'use client';

import { ReactNode, useRef } from 'react';
import classNames from 'classnames';

import { useIsVisible } from '@/hooks/useIsVisible';

const FadeOnVisible = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);

  return (
    <div
      className={classNames(`animate-delay-300`, {
        'animate-fadeIn': isVisible,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default FadeOnVisible;
