import { Image } from './Image';

export interface CalculatedImage extends Image {
  scaledHeight: number;
  scaledWidth: number;
}
