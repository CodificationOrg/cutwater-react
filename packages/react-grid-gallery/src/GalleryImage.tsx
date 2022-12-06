import { ImageLoader, LazyLoadImage } from '@codification/react-advanced-image';
import React, { CSSProperties, ElementType, ReactNode, useState } from 'react';

import { CheckButton } from './CheckButton';
import { GalleryImageOverlay } from './GalleryImageOverlay';
import { GalleryImageTag } from './GalleryImageTag';
import { CalculatedImage, ClickHandler } from './types';

interface Props {
  item: CalculatedImage;
  index: number;
  margin: number;
  lazyLoad: boolean;
  isSelectable: boolean;
  onClick?: ClickHandler;
  onSelectImage: ClickHandler;
  tileViewportStyle?: () => CSSProperties;
  thumbnailStyle?: () => CSSProperties;
  tagStyle?: CSSProperties;
  customOverlay?: ReactNode,
  thumbnailImageComponent?: ElementType;
}

const DEFAULT_PROPS: Partial<Props> = {
  isSelectable: true
}

const thumbnailStyle = ({ thumbnailStyle, item }: Props): CSSProperties => {
  const optional: CSSProperties = thumbnailStyle ? thumbnailStyle() : {};
  return {
    cursor: 'pointer',
    width: item.scaledWidth,
    height: item.scaledHeight,
    ...optional,
  };
}

const tileViewportStyle = ({ tileViewportStyle, item }: Props): CSSProperties => {
  if (tileViewportStyle)
    return tileViewportStyle();
  let nanoBase64Backgorund = {}
  if (item.nano) {
    nanoBase64Backgorund = {
      background: `url(${item.nano})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
  }
  if (item.isSelected)
    return Object.assign({
      width: item.scaledWidth - 32,
      height: item.scaledHeight - 32,
      margin: 16,
      overflow: "hidden",
    }, nanoBase64Backgorund);
  return Object.assign({
    width: item.scaledWidth,
    height: item.scaledHeight,
    overflow: "hidden",
  }, nanoBase64Backgorund);
}

const renderCheckButton = ({ index, item, isSelectable, onSelectImage }: Props, hover: boolean): ReactNode => {
  return (
    <CheckButton key="Select"
      index={index}
      color={"rgba(255, 255, 255, 0.7)"}
      selectedColor={"#4285f4"}
      hoverColor={"rgba(255, 255, 255, 1)"}
      isSelected={item.isSelected || false}
      isSelectable={isSelectable}
      onClick={isSelectable ? onSelectImage : undefined}
      parentHover={hover} />
  );
}

const toCustomOverlay = ({ item }: Props): ReactNode | undefined => {
  const { customOverlay } = item;
  if (!customOverlay) {
    return undefined;
  }
  if (typeof customOverlay === 'function') {
    return customOverlay({ width: item.scaledWidth, height: item.scaledHeight });
  }
  return customOverlay;
}

export const GalleryImage: React.FC<Props> = (np: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const props: Props = { ...DEFAULT_PROPS, ...np };

  const alt = props.item.alt || '';

  const tags = (typeof props.item.tags === 'undefined') ? <noscript /> :
    props.item.tags.map((tag) => {
      const key = tag.key || (typeof tag.value === 'string' ? tag.value : null) || tag.title;
      return <GalleryImageTag key={`tag-${key}`} tag={tag} tagStyle={props.tagStyle} />;
    });

  const overlayNode = toCustomOverlay(props);
  const customOverlay = !overlayNode ? <noscript /> : <GalleryImageOverlay hover={hover} overlay={overlayNode} />;

  const thumbnailProps = {
    key: `img-${props.index}`,
    src: props.item.thumbnail,
    alt: alt,
    height: props.item.scaledHeight,
    width: props.item.scaledWidth,
    title: typeof props.item.caption === 'string' ? props.item.caption : undefined,
    style: thumbnailStyle(props),
  };

  const ThumbnailImageComponent = props.thumbnailImageComponent;
  return (
    <div className="ReactGridGallery_tile"
      key={`tile-${props.index}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        margin: (props.margin / 2),
        WebkitUserSelect: "none",
        position: "relative",
        float: "left",
        background: "#eee",
        padding: "0px"
      }}>

      <div className="ReactGridGallery_tile-icon-bar"
        key={`tile-icon-bar-${props.index}`}
        style={{
          pointerEvents: "none",
          opacity: 1,
          position: "absolute",
          height: "36px",
          width: "100%",
          zIndex: 1
        }}>
        {renderCheckButton(props, hover)}
      </div>

      <div className="ReactGridGallery_tile-bottom-bar"
        key={`tile-bottom-bar-${props.index}`}
        style={{
          padding: "2px",
          pointerEvents: "none",
          position: "absolute",
          minHeight: "0px",
          maxHeight: "160px",
          width: "100%",
          bottom: "0px",
          overflow: "hidden",
          zIndex: 1
        }}>
        {tags}
      </div>

      {customOverlay}

      <div className="ReactGridGallery_tile-overlay"
        key={`tile-overlay-${props.index}`}
        style={{
          pointerEvents: "none",
          opacity: 1,
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 1,
          background: (hover
            && !props.item.isSelected
            && props.isSelectable) ?
            'linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)' : 'none'
        }}>
      </div>

      <div className="ReactGridGallery_tile-viewport"
        style={tileViewportStyle(props)}
        key={`tile-viewport-${props.index}`}
        onClick={props.onClick ?
          (e) => props.onClick!(props.index, e) : undefined}>
        {ThumbnailImageComponent ?
          <ThumbnailImageComponent {...props} imageProps={thumbnailProps} /> : props.lazyLoad ?
            <LazyLoadImage {...thumbnailProps} />
            : <ImageLoader {...thumbnailProps} />}
      </div>
      {props.item.thumbnailCaption && (
        <div className="ReactGridGallery_tile-description"
          key={`tile-viewport-caption-${props.index}`}
          style={{
            background: "white",
            height: "100%",
            width: "100%",
            margin: 0,
            userSelect: "text",
            WebkitUserSelect: "text",
            MozUserSelect: "text",
            overflow: "hidden",
            zIndex: 1
          }}>
          {props.item.thumbnailCaption}
        </div>
      )}
    </div>
  );
};
