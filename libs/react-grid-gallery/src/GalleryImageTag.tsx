import React, { CSSProperties } from 'react';
import { Tag } from './types';

interface Props {
  tag: Tag;
  tagStyle?: CSSProperties;
}

export const GalleryImageTag: React.FC<Props> = ({ tag, tagStyle }: Props) => {
  const style: CSSProperties = tagStyle || {
    display: "inline",
    padding: ".2em .6em .3em",
    fontSize: "75%",
    fontWeight: "600",
    lineHeight: "1",
    color: "yellow",
    background: "rgba(0,0,0,0.65)",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: ".25em"
  };

  return (
    <div title={tag.title}
      style={{
        display: "inline-block",
        cursor: 'pointer',
        pointerEvents: 'visible',
        margin: "2px"
      }}>
      <span style={style}>{tag.value}</span>
    </div>
  );
}