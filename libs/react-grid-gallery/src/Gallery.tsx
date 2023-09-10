import { useElementSize } from '@codification/react-element-size-hook';
import JustifiedLayout from 'justified-layout';
import React, { ElementType, useEffect, useMemo, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { GalleryImage } from './GalleryImage';
import {
  CalculatedImage,
  ClickHandler,
  Image,
  LightboxOptions,
  SimpleClickHandler,
} from './types';

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
  lightboxOptions?: LightboxOptions;
  lightboxWillOpen?: (index?: number) => void;
  lightboxWillClose?: () => void;
  tagStyle?: React.CSSProperties;
  tileViewportStyle?: () => React.CSSProperties;
  thumbnailStyle?: () => React.CSSProperties;
  thumbnailImageComponent?: ElementType;
}

interface RequiredLightboxOptions {
  currentImage: number;
  isOpen: boolean;
  showImageCount: boolean;
  imageCountSeparator: string;
}

const DEFAULT_LIGHTBOX_OPTIONS: RequiredLightboxOptions = {
  currentImage: 0,
  isOpen: false,
  showImageCount: true,
  imageCountSeparator: 'of',
};

const DEFUALT_PROPS: Required<OptionalProps> = {
  id: 'ReactGridGallery',
  enableImageSelection: true,
  rowHeight: 180,
  margin: 2,
  lazyLoad: true,
  enableLightbox: true,
};

interface GalleryState {
  lightboxIsOpen: boolean;
  currentImage: number;
  containerWidth: number;
}

export const Gallery: React.FC<Props> = ({ images, ...np }: Props) => {
  const props: Omit<Props, 'images'> & Required<OptionalProps> = useMemo(
    () => ({
      ...DEFUALT_PROPS,
      ...np,
    }),
    [np]
  );
  const lbProps: LightboxOptions & RequiredLightboxOptions = useMemo(
    () => ({
      ...DEFAULT_LIGHTBOX_OPTIONS,
      ...np.lightboxOptions,
    }),
    [np]
  );

  const [ref, { width }] = useElementSize();
  const [state, setState] = useState<GalleryState>({
    lightboxIsOpen: lbProps.isOpen,
    currentImage: lbProps.currentImage,
    containerWidth: 0,
  });

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

  useEffect(() => {
    if (width) {
      setState((prev) => ({
        ...prev,
        containerWidth: Math.floor(width),
      }));
    }
  }, [width]);

  const openLightbox = (
    index?: number,
    event?: React.MouseEvent<HTMLElement>
  ): void => {
    if (event) {
      event.preventDefault();
    }
    if (props.lightboxWillOpen) {
      props.lightboxWillOpen(index);
    }
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(index);
    }
    setState((prev) => ({
      ...prev,
      currentImage: index || lbProps.currentImage,
      lightboxIsOpen: true,
    }));
  };

  const closeLightbox = (): void => {
    if (props.lightboxWillClose) {
      props.lightboxWillClose();
    }
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(0);
    }
    setState((prev) => ({ ...prev, currentImage: 0, lightboxIsOpen: false }));
  };

  const gotoPrevious = (): void => {
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(state.currentImage - 1);
    }
    setState((prev) => ({ ...prev, currentImage: prev.currentImage - 1 }));
  };

  const gotoNext = (): void => {
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(state.currentImage + 1);
    }
    setState((prev) => ({ ...prev, currentImage: prev.currentImage + 1 }));
  };

  const getOnClickThumbnailFn = (): ClickHandler | undefined => {
    if (!props.onClickThumbnail && props.enableLightbox) {
      return openLightbox;
    }
    if (props.onClickThumbnail) return props.onClickThumbnail;
    return undefined;
  };

  const getOnClickPrevFn = (): SimpleClickHandler => {
    if (lbProps.onClickPrev) return lbProps.onClickPrev;
    return gotoPrevious;
  };

  const getOnClickNextFn = (): SimpleClickHandler => {
    if (lbProps.onClickNext) return lbProps.onClickNext;
    return gotoNext;
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

  const renderImageTitle = (): string | undefined => {
    if (lbProps.showImageCount) {
      return `${state.currentImage + 1} ${lbProps.imageCountSeparator} ${
        images.length
      }`;
    }
    return undefined;
  };

  const galleryImages = thumbnails.map((item, i) => {
    return (
      <GalleryImage
        key={`Image-${i}-${item.src}`}
        item={item}
        index={i}
        margin={props.margin}
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

  const mainImage = images[state.currentImage];
  const prevImage =
    state.currentImage > 0 ? images[state.currentImage - 1] : undefined;
  const nextImage =
    state.currentImage < images.length - 1
      ? images[state.currentImage + 1]
      : undefined;

  const lightbox = state.lightboxIsOpen ? (
    <Lightbox
      {...lbProps.lightBoxProps}
      mainSrc={mainImage.src}
      prevSrc={prevImage?.src}
      nextSrc={nextImage?.src}
      mainSrcThumbnail={mainImage.thumbnail}
      prevSrcThumbnail={prevImage?.thumbnail}
      nextSrcThumbnail={nextImage?.thumbnail}
      onCloseRequest={closeLightbox}
      onMovePrevRequest={getOnClickPrevFn()}
      onMoveNextRequest={getOnClickNextFn()}
      imageTitle={renderImageTitle()}
      imageCaption={mainImage.caption}
    />
  ) : null;

  return (
    <div id={props.id} className="ReactGridGallery" ref={ref}>
      {galleryImages}
      {lightbox}
    </div>
  );
};
