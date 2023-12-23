export * from './CalculatedImage';
export * from './Image';
export * from './Tag';

export type SimpleClickHandler = () => void;
export type ClickHandler = (
  index?: number,
  event?: React.MouseEvent<HTMLElement>
) => void;
