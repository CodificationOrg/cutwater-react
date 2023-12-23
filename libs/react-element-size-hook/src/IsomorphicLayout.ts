import { useEffect, useLayoutEffect as useWindowLayout } from 'react';

export const useLayoutEffect =
  window !== undefined ? useWindowLayout : useEffect;
