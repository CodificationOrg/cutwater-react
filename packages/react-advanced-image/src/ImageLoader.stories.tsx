import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { ImageLoader } from './ImageLoader';
import { Dimensions } from './types';

export const TEST_IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 1024,
    height: 556,
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    width: 1024,
    height: 584,
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 183,
  },
  {
    src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    width: 868,
    height: 1024,
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
    thumbnailWidth: 271,
    thumbnailHeight: 320,
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    width: 1024,
    height: 683,
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    width: 1024,
    height: 683,
    thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    width: 1024,
    height: 683,
    thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    width: 1024,
    height: 683,
    thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    width: 823,
    height: 1024,
    thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
    thumbnailWidth: 257,
    thumbnailHeight: 320,
  }
];

const defaultImg = TEST_IMAGES[0];
const toDimensions = (imgDef: any): Dimensions => ({ width: imgDef.width, height: imgDef.height } as Dimensions);

export default {
  title: 'ImageLoader',
  component: ImageLoader,
  args: {
    src: defaultImg.src,
    width: defaultImg.width,
    height: defaultImg.height,
    responsive: true,
  }
};

const Template: Story<ComponentProps<typeof ImageLoader>> = (args) => (
  <ImageLoader {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = 'ImageLoader';

export const Many = () => {
  const imgLoaders = TEST_IMAGES.map((img, i) => (
    <ImageLoader key={`img-${i}`} src={img.src} {...toDimensions(defaultImg)} responsive />
  ))
  return <>{imgLoaders}</>
};

export const Small = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <ImageLoader src={defaultImg.src} responsive {...toDimensions(defaultImg)} />
    </div>
  );
};
