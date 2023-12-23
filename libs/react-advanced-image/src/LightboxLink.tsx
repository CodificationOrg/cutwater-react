import 'photoswipe/style.css';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  src: string;
  width: number;
  height: number;
}

export const LightboxLink: React.FC<Props> = ({
  src,
  height,
  width,
  children,
}: Props) => {
  return (
    <a
      href={src}
      data-pswp-width={width}
      data-pswp-height={height}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
