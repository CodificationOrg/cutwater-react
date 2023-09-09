import { ReactNode } from 'react';

export interface Tag {
  value: string | ReactNode;
  title: string;
  key?: string;
}
