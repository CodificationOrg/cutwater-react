import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { Gallery } from './Gallery';
import { Image, ThumbnailDetails } from './types';

const imageArray: Image[] = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    width: 1024,
    height: 556,
    thumbnail:
      'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg',
    width: 1024,
    height: 584,
    thumbnail:
      'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 183,
    caption: '37H (gratispgraphy.com)',
  },
  {
    src: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
    width: 629,
    height: 742,
    thumbnail:
      'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg',
    thumbnailWidth: 271,
    thumbnailHeight: 320,
    caption: 'Orange Macro (Tom Eversley - isorepublic.com)',
  },
  {
    src: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
    width: 1024,
    height: 683,
    thumbnail:
      'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: '201H (gratisography.com)',
  },
  {
    src: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
    width: 1024,
    height: 683,
    thumbnail:
      'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: 'Flower Interior Macro (Tom Eversley - isorepublic.com)',
  },
  {
    src: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
    width: 1024,
    height: 683,
    thumbnail:
      'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: 'Man on BMX (Tom Eversley - isorepublic.com)',
  },
  {
    src: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
    width: 1024,
    height: 683,
    thumbnail:
      'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: 'Ropeman - Thailand (Tom Eversley - isorepublic.com)',
    customOverlay: <div>Overlay Here</div>,
  },
  {
    src: 'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg',
    width: 596,
    height: 742,
    thumbnail:
      'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg',
    thumbnailWidth: 257,
    thumbnailHeight: 320,
    caption: 'A photo by 贝莉儿 NG. (unsplash.com)',
    customOverlay: (detail: ThumbnailDetails): ReactNode => (
      <div>
        {detail.width}x{detail.height}
      </div>
    ),
  },
];

const meta: Meta<typeof Gallery> = {
  component: Gallery,
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Primary: Story = {
  args: {
    images: imageArray,
    margin: 8,
    enableLightbox: true,
    enableImageSelection: true,
  },
};
