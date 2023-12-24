import { useEffect, useLayoutEffect as useWindowLayout } from 'react';

export const useLayoutEffect =
  typeof window === 'undefined' ? useWindowLayout : useEffect;
