import React, { CSSProperties, useState } from "react";
import './ImageLoader.css';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  responsive?: boolean;
  loadedClassName?: string;
  loadingClassName?: string;
}

const containerStyle = (width: number, height: number, responsive = false, style?: CSSProperties): CSSProperties => {
  const base: CSSProperties = { background: 'grey', ...style };
  if (responsive) {
    return {
      ...base,
      aspectRatio: `${width / height}`,
      maxWidth: `min(100%, ${width}px)`,
      maxHeight: `min(100%, ${height}px)`,
    }
  }
  return {
    ...base,
    width: `${width}px`,
    height: `${height}px`,
  }
};


export const ImageLoader: React.FC<Props> = ({ width, height, responsive = false, loadedClassName = 'img-loader-loaded', loadingClassName = 'img-loader-loading', ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);

  if (responsive && (!width || !height)) {
    throw new Error('width and height are required if responsive is true.');
  }

  const { className, ...imgProps } = props;
  const imgClasses = `img-loader-img ${className ? className + ' ' : ''}${responsive ? 'img-loader-img-responsive ' : ''}${loaded ? loadedClassName : loadingClassName}`;
  const imgElement = (
    <img
      alt=""
      {...imgProps}
      className={imgClasses}
      onLoad={() => setLoaded(true)}
    />
  );

  return (width && height) ? <div style={containerStyle(width, height, responsive, props.style,)}>{imgElement}</div> : imgElement;
}
