import type { Meta, StoryObj } from '@storybook/react';

import Image from './Image';

const meta: Meta<typeof Image> = {
  title: 'Project/Image',
  component: Image,
};

type Story = StoryObj<typeof Image>;

export const Standart: Story = {
  args: {
    src: '/images/64761919c25ef9fb3e0cdb98/image.jpg',
    webp: '/images/64761919c25ef9fb3e0cdb98/image.webp',
    src2x: '/images/64761919c25ef9fb3e0cdb98/image2x.jpg',
    webp2x: '/images/64761919c25ef9fb3e0cdb98/image2x.webp',
    original: '/images/64761919c25ef9fb3e0cdb98/original.jpg',
    alt: 'Example',
  },
};

export default meta;
