import type { Meta, StoryObj } from '@storybook/react';

import { LazyLoadImage } from './LazyLoadImage';
import imgResources from './StorySupport';

const meta: Meta<typeof LazyLoadImage> = {
  component: LazyLoadImage,
};

export default meta;
type Story = StoryObj<typeof LazyLoadImage>;

export const Primary: Story = {
  args: {
    src: imgResources.defaultImg.src,
    width: imgResources.defaultImg.width,
    height: imgResources.defaultImg.height,
    responsive: true,
  },
};

export const Many = {
  render: () => {
    const imgLoaders = imgResources.testImages.map((img, i) => (
      <LazyLoadImage
        key={`img-${i}`}
        src={img.src}
        responsive
        {...imgResources.toDimensions(img)}
      />
    ));
    return <div style={{ width: '450px', height: 'auto' }}>{imgLoaders}</div>;
  },
};
