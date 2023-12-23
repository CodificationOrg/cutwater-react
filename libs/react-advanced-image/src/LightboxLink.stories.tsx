import type { Meta, StoryObj } from '@storybook/react';

import { PropsWithChildren } from 'react';
import { ImageLoader } from './ImageLoader';
import { useLightboxContainer } from './LightboxHook';
import { LightboxLink } from './LightboxLink';
import imgResources from './StorySupport';

const meta: Meta<typeof ImageLoader> = {
  component: ImageLoader,
};

export default meta;
type Story = StoryObj<typeof LightboxLink>;

export const Primary: Story = {
  args: {
    src: imgResources.defaultImg.src,
    width: imgResources.defaultImg.width,
    height: imgResources.defaultImg.height,
  },
};

const LightboxContainer: React.FC<PropsWithChildren> = ({ children }) => {
  useLightboxContainer('gallery-foo');
  return <div id="gallery-foo">{children}</div>;
};

export const Many: Story = {
  name: 'Many',
  render: () => (
    <LightboxContainer>
      {imgResources.testImages.map((img, i) => (
        <LightboxLink
          key={`img-${i}`}
          src={img.src}
          width={img.width}
          height={img.height}
        >
          <ImageLoader
            {...Primary.args}
            src={img.src}
            {...imgResources.toDimensions(img)}
            responsive
          />
        </LightboxLink>
      ))}
    </LightboxContainer>
  ),
};
