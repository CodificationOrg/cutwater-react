import { useLightboxContainer } from '@codification/react-advanced-image';
import { useElementSize } from '@codification/react-element-size-hook';
import JustifiedLayout from 'justified-layout';
import React, { ElementType, useMemo } from 'react';

import { GalleryImage } from './GalleryImage';
import { CalculatedImage, ClickHandler, Image } from './types';

interface OptionalProps {
  id?: string;
  lazyLoad?: boolean;
  enableImageSelection?: boolean;
  rowHeight?: number;
  margin?: number;
  enableLightbox?: boolean;
}

interface Props extends OptionalProps {
  images: Image[];
  onSelectImage?: (index?: number, image?: Image) => void;
  maxRows?: number;
  onClickThumbnail?: ClickHandler;
  tagStyle?: React.CSSProperties;
  tileViewportStyle?: () => React.CSSProperties;
  thumbnailStyle?: () => React.CSSProperties;
  thumbnailImageComponent?: ElementType;
}

const DEFUALT_PROPS: Required<OptionalProps> = {
  id: 'ReactGridGallery',
  enableImageSelection: true,
  rowHeight: 180,
  margin: 2,
  lazyLoad: true,
  enableLightbox: true,
};

export const Gallery: React.FC<Props> = ({
  id = 'react-grid-gallery',
  images,
  ...np
}: Props) => {
  const props: Omit<Props, 'images'> & Required<OptionalProps> = useMemo(
    () => ({
      ...DEFUALT_PROPS,
      ...np,
    }),
    [np]
  );

  useLightboxContainer(id);
  const [ref, { width }] = useElementSize();

  const thumbnails: CalculatedImage[] = useMemo(() => {
    if (!images) return [];
    if (!width || width < 1) return [];

    const items = images.slice() as CalculatedImage[];
    const ratios = items.map(
      (item) => item.thumbnailWidth / item.thumbnailHeight
    );
    const layoutConfig = {
      containerWidth: width,
      boxSpacing: props.margin,
      targetRowHeight: props.rowHeight,
      maxNumRows: props.maxRows,
    };
    const result = JustifiedLayout(ratios, layoutConfig);

    result.boxes.forEach((box, i) => {
      const item = items[i];
      item.scaledWidth = Math.round(box.width);
      item.scaledHeight = Math.round(box.height);
    });

    return items;
  }, [width, images, props]);

  const getOnClickThumbnailFn = (): ClickHandler | undefined => {
    if (props.onClickThumbnail) return props.onClickThumbnail;
    return undefined;
  };

  const onSelectImage = (
    index?: number,
    event?: React.MouseEvent<HTMLElement>
  ): void => {
    event && event.preventDefault();
    if (props.onSelectImage) {
      props.onSelectImage.call(this, index, index ? images[index] : undefined);
    }
  };

  const galleryImages = thumbnails.map((item, i) => {
    return (
      <GalleryImage
        key={`Image-${i}-${item.src}`}
        item={item}
        index={i}
        margin={props.margin}
        lightboxEnabled={props.enableLightbox}
        lazyLoad={props.lazyLoad}
        isSelectable={props.enableImageSelection}
        onClick={getOnClickThumbnailFn()}
        onSelectImage={onSelectImage}
        tagStyle={props.tagStyle}
        tileViewportStyle={props.tileViewportStyle}
        thumbnailStyle={props.thumbnailStyle}
        thumbnailImageComponent={props.thumbnailImageComponent}
      />
    );
  });

  return (
    <div id={id} className="ReactGridGallery" ref={ref}>
      {galleryImages}
    </div>
  );
};
