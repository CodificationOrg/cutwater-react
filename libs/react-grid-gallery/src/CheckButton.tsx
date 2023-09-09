import * as CSS from 'csstype';
import React, { useState } from 'react';
import { ClickHandler } from './types';

interface Props {
  index: number;
  color: string;
  isSelectable: boolean;
  isSelected: boolean;
  selectedColor: string;
  parentHover: boolean;
  hoverColor: string;
  onClick?: ClickHandler;
}

const DEFAULT_PROPS: Partial<Props> = {
  isSelectable: true,
  isSelected: false,
  parentHover: false,
};

const fill = (
  { isSelected, selectedColor, hoverColor, color }: Props,
  hover: boolean
): string => {
  if (isSelected) return selectedColor;
  else if (hover) return hoverColor;
  return color;
};

const visibility = ({
  isSelected,
  isSelectable,
  parentHover,
}: Props): CSS.Property.Visibility => {
  if (isSelected || (isSelectable && parentHover)) return 'visible';
  return 'hidden';
};

export const CheckButton: React.FC<Props> = (np: Props) => {
  const props: Props = { ...DEFAULT_PROPS, ...np };
  const [hover, setHover] = useState<boolean>(false);

  const circleStyle = { display: props.isSelected ? 'block' : 'none' };

  return (
    <div
      title="Select"
      style={{
        visibility: visibility(props),
        background: 'none',
        float: 'left',
        width: '36px',
        height: '36px',
        border: 'none',
        padding: '6px',
        cursor: 'pointer',
        pointerEvents: 'visible',
      }}
      onClick={(e) => props.onClick && props.onClick(props.index, e)}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <svg
        fill={fill(props, hover)}
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <radialGradient
          id="shadow"
          cx="38"
          cy="95.488"
          r="10.488"
          gradientTransform="matrix(1 0 0 -1 -26 109)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".832" stopColor="#010101"></stop>
          <stop offset="1" stopColor="#010101" stopOpacity="0"></stop>
        </radialGradient>

        <circle
          style={circleStyle}
          opacity=".26"
          fill="url(#shadow)"
          cx="12"
          cy="13.512"
          r="10.488"
        ></circle>
        <circle
          style={circleStyle}
          fill="#FFF"
          cx="12"
          cy="12.2"
          r="8.292"
        ></circle>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </div>
  );
};
