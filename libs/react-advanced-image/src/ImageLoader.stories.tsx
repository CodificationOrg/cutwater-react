import type { Meta, StoryObj } from '@storybook/react';

import { ImageLoader } from './ImageLoader';
import imgResources from './StorySupport';

const meta: Meta<typeof ImageLoader> = {
  component: ImageLoader,
};

export default meta;
type Story = StoryObj<typeof ImageLoader>;

export const Primary: Story = {
  args: {
    src: imgResources.defaultImg.src,
    width: imgResources.defaultImg.width,
    height: imgResources.defaultImg.height,
    responsive: true,
  },
};

export const Many: Story = {
  name: 'Many',
  render: () => (
    <>
      {imgResources.testImages.map((img, i) => (
        <ImageLoader
          key={`img-${i}`}
          {...Primary.args}
          src={img.src}
          {...imgResources.toDimensions(img)}
          responsive
        />
      ))}
    </>
  ),
};

export const Small: Story = {
  name: 'Small',
  render: () => (
    <div style={{ width: '300px', height: '300px' }}>
      <ImageLoader
        {...Primary.args}
        src={imgResources.defaultImg.src}
        responsive
        {...imgResources.toDimensions(imgResources.defaultImg)}
      />
    </div>
  ),
};

export const ConstrainedWide: Story = {
  name: 'Constrained Wide',
  render: () => (
    <div style={{ width: '50vh', height: '25vh' }}>
      <ImageLoader
        {...Primary.args}
        src={imgResources.defaultImg.src}
        responsive
        {...imgResources.toDimensions(imgResources.defaultImg)}
      />
    </div>
  ),
};

export const ConstrainedTall: Story = {
  name: 'Constrained Tall',
  render: () => (
    <div style={{ width: '25vh', height: '50vh' }}>
      <ImageLoader
        {...Primary.args}
        src={imgResources.defaultImg.src}
        responsive
        {...imgResources.toDimensions(imgResources.defaultImg)}
      />
    </div>
  ),
};
