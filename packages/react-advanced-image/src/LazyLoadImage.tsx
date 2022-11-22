import React from "react";
import LazyLoad from 'react-lazy-load';
import { ImageLoader } from "./ImageLoader";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  width: number;
  height: number;
  responsive?: boolean;
  loadedClassName?: string;
  loadingClassName?: string;
  offsetVertical?: number | string;
}

export const LazyLoadImage: React.FC<Props> =
  ({ offsetVertical, ...imgProps }: Props) => {
    const offset = `${offsetVertical || 800}px 0px`;
    return (<LazyLoad offset={offset} height={imgProps.height} width={imgProps.width}>
      <ImageLoader {...imgProps} />
    </LazyLoad>);
  }
