import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { TEST_IMAGES } from './ImageLoader.stories';
import { LazyLoadImage } from './LazyLoadImage';
import { Dimensions } from './types';

const defaultImg = TEST_IMAGES[0];
const toDimensions = (imgDef: any): Dimensions => ({ width: imgDef.width, height: imgDef.height } as Dimensions);

export default {
  title: 'LazyLoadImage',
  component: LazyLoadImage,
  args: {
    src: defaultImg.src,
    width: defaultImg.width,
    height: defaultImg.height,
    responsive: true,
  }
};

const Template: Story<ComponentProps<typeof LazyLoadImage>> = (args) => (
  <LazyLoadImage {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = 'LazyLoadImage';

export const Many = () => {
  const imgLoaders = TEST_IMAGES.map((img, i) => (
    <LazyLoadImage key={`img-${i}`} src={img.src} responsive {...toDimensions(defaultImg)} />
  ))
  return <div style={{ width: '450px' }}>{imgLoaders}</div>
};
