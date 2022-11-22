import React, { CSSProperties, useState } from "react";
import './ImageLoader.css';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  responsive?: boolean;
  loadedClassName?: string;
  loadingClassName?: string;
}

const imgStyle = (style?: CSSProperties, width = 0, height = 0, responsive = false): CSSProperties | undefined => responsive ? {
  ...style,
  maxWidth: `${width}px`,
  aspectRatio: `${(width / height)}`
} : style;

export const ImageLoader: React.FC<Props> = ({ width, height, responsive = false, loadedClassName = 'img-loader-loaded', loadingClassName = 'img-loader-loading', ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);

  if (responsive && (!width || !height)) {
    throw new Error('width and height are required if responsive is true.');
  }

  const { className, ...imgProps } = props;

  const imgClasses = `${className ? className + ' ' : ''}${responsive ? 'img-loader-img ' : ''}${loaded
    ? loadedClassName
    : loadingClassName}`;

  return (
    <img
      {...imgProps}
      style={imgStyle(props.style, width, height, responsive)}
      className={imgClasses}
      onLoad={() => setLoaded(true)} />
  );
}
