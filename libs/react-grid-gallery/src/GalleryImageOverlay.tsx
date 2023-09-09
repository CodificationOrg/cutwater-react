import React, { ReactNode } from 'react';

interface Props {
  hover: boolean;
  overlay: ReactNode;
}

export const GalleryImageOverlay: React.FC<Props> = ({ hover, overlay }: Props) => {
  return (
    <div className="ReactGridGallery_custom-overlay"
      style={{
        pointerEvents: "none",
        opacity: hover ? 1 : 0,
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 1
      }}>
      {overlay}
    </div>
  );
}
