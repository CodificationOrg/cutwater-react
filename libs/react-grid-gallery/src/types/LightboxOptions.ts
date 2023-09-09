import { ILightBoxProps } from 'react-image-lightbox';
import { SimpleClickHandler } from '.';

export interface LightboxOptions {
  currentImage?: number;
  isOpen?: boolean;
  imageCountSeparator?: string;
  showImageCount?: boolean;
  onClickImage?: SimpleClickHandler;
  onClickPrev?: SimpleClickHandler;
  onClickNext?: SimpleClickHandler;
  currentImageWillChange?: (index?: number) => void;
  onClickLightboxThumbnail?: SimpleClickHandler;
  lightBoxProps?: Partial<
    Omit<
      ILightBoxProps,
      | 'mainSrc'
      | 'prevSrc'
      | 'nextSrc'
      | 'mainSrcThumbnail'
      | 'prevSrcThumbnail'
      | 'nextSrcThumbnail'
      | 'onCloseRequest'
      | 'onMovePrevRequest'
      | 'onMoveNextRequest'
      | 'imageTitle'
      | 'imageCaption'
    >
  >;
}
