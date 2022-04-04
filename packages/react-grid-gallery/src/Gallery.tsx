import JustifiedLayout from 'justified-layout';
import React, { ElementType, useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import useResizeObserver from 'resize-observer-hook';
import { GalleryImage } from './GalleryImage';
import { CalculatedImage, ClickHandler, Image, LightboxOptions, SimpleClickHandler } from './types';

interface OptionalProps {
  id?: string;
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
  imageCountSeparator: 'of'
}

const DEFUALT_PROPS: Required<OptionalProps> = {
  id: "ReactGridGallery",
  enableImageSelection: true,
  rowHeight: 180,
  margin: 2,
  enableLightbox: true
}

interface GalleryState {
  images: Image[];
  thumbnails: CalculatedImage[];
  lightboxIsOpen: boolean;
  currentImage: number;
  containerWidth: number;
}

export const Gallery: React.FC<Props> = (np: Props) => {
  const props: Props & Required<OptionalProps> = { ...DEFUALT_PROPS, ...np };
  const lbProps: (LightboxOptions & RequiredLightboxOptions) = { ...DEFAULT_LIGHTBOX_OPTIONS, ...np.lightboxOptions };

  const [ref, width] = useResizeObserver();
  const [state, setState] = useState<GalleryState>({
    images: props.images,
    thumbnails: [],
    lightboxIsOpen: lbProps.isOpen,
    currentImage: lbProps.currentImage,
    containerWidth: 0
  });

  useEffect(() => {
    if (width) {
      setState(prev => ({
        ...prev,
        containerWidth: Math.floor(width),
        thumbnails: renderThumbs(width)
      }));
    }
  }, [width]);

  const openLightbox = (index: number, event?: React.MouseEvent<HTMLElement>): void => {
    if (event) {
      event.preventDefault();
    }
    if (props.lightboxWillOpen) {
      props.lightboxWillOpen(index);
    }
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(index);
    }
    setState(prev => ({ ...prev, currentImage: index, lightboxIsOpen: true }));
  }

  const closeLightbox = (): void => {
    if (props.lightboxWillClose) {
      props.lightboxWillClose();
    }
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(0);
    }
    setState(prev => ({ ...prev, currentImage: 0, lightboxIsOpen: false }));
  }

  const gotoPrevious = (): void => {
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(state.currentImage - 1);
    }
    setState(prev => ({ ...prev, currentImage: prev.currentImage - 1 }));
  }

  const gotoNext = (): void => {
    if (lbProps.currentImageWillChange) {
      lbProps.currentImageWillChange(state.currentImage + 1);
    }
    setState(prev => ({ ...prev, currentImage: prev.currentImage + 1 }));
  }

  const getOnClickThumbnailFn = (): ClickHandler | undefined => {
    if (!props.onClickThumbnail && props.enableLightbox) {
      return openLightbox;
    }
    if (props.onClickThumbnail)
      return props.onClickThumbnail;
    return undefined;
  }

  const getOnClickPrevFn = (): SimpleClickHandler => {
    if (lbProps.onClickPrev)
      return lbProps.onClickPrev;
    return gotoPrevious;
  }

  const getOnClickNextFn = (): SimpleClickHandler => {
    if (lbProps.onClickNext)
      return lbProps.onClickNext;
    return gotoNext;
  }

  const onSelectImage = (index: number, event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (props.onSelectImage) {
      props.onSelectImage.call(this, index, state.images[index]);
    }
  }

  const renderImageTitle = (): string | undefined => {
    if (lbProps.showImageCount) {
      return `${state.currentImage + 1} ${lbProps.imageCountSeparator} ${props.images.length}`;
    }
    return undefined;
  }

  const renderThumbs = (containerWidth: number, images = state.images): CalculatedImage[] => {
    if (!images) return [];
    if (containerWidth == 0) return [];

    const items = images.slice() as CalculatedImage[];
    const ratios = items.map(item => item.thumbnailWidth / item.thumbnailHeight);
    const layoutConfig = {
      containerWidth,
      boxSpacing: props.margin,
      targetRowHeight: props.rowHeight,
      maxNumRows: props.maxRows
    }

    const result = JustifiedLayout(ratios, layoutConfig);

    result.boxes.forEach((box, i) => {
      const item = items[i];
      item.scaledWidth = box.width;
      item.scaledHeight = box.height;
    });

    return items;
  }

  const images = state.thumbnails.map((item, i) => {
    return <GalleryImage
      key={`Image-${i}-${item.src}`}
      item={item}
      index={i}
      margin={props.margin}
      isSelectable={props.enableImageSelection}
      onClick={getOnClickThumbnailFn()}
      onSelectImage={onSelectImage}
      tagStyle={props.tagStyle}
      tileViewportStyle={props.tileViewportStyle}
      thumbnailStyle={props.thumbnailStyle}
      thumbnailImageComponent={props.thumbnailImageComponent} />
  });

  const mainImage = props.images[state.currentImage];
  const prevImage = state.currentImage > 0 ? props.images[state.currentImage - 1] : undefined;
  const nextImage = state.currentImage < props.images.length - 1 ? props.images[state.currentImage + 1] : undefined

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
    <div id={props.id}
      className="ReactGridGallery"
      ref={ref}>
      {images}
      {lightbox}
    </div>
  );
};