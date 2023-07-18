import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Project/ui/Card',
  component: Card,
};

type Story = StoryObj<typeof Card>;

export const Standart: Story = {
  args: {
    theme: 'light',
    title: 'JEAN-HONORE FRAGONARD',
    subtitle: '1732 - 1806',
    image: {
      src: '/images/64761919c25ef9fb3e0cdb98/image.jpg',
      webp: '/images/64761919c25ef9fb3e0cdb98/image.webp',
      src2x: '/images/64761919c25ef9fb3e0cdb98/image2x.jpg',
      webp2x: '/images/64761919c25ef9fb3e0cdb98/image2x.webp',
      alt: 'Example',
    },
  },
};

export default meta;
