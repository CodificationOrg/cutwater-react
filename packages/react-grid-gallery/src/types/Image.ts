import { ReactNode } from 'react';
import { Tag } from './Tag';

export interface Image {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  nano?: string;
  alt?: string;
  tags?: Tag[];
  isSelected?: boolean;
  caption?: string | ReactNode;
  srcSet?: string[];
  customOverlay?: ReactNode;
  thumbnailCaption?: string | ReactNode;
}
