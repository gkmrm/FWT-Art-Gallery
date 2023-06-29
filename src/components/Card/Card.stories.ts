import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Project/Card',
  component: Card,
};

type Story = StoryObj<typeof Card>;

export const Standart: Story = {
  args: {
    title: 'JEAN-HONORE FRAGONARD',
    subtitle: '1732 - 1806',
    isDarkTheme: true,
    image: {
      src: '/images/64761919c25ef9fb3e0cdb98/image.jpg',
      webp: '/images/64761919c25ef9fb3e0cdb98/image.webp',
      src2x: '/images/64761919c25ef9fb3e0cdb98/image2x.jpg',
      webp2x: '/images/64761919c25ef9fb3e0cdb98/image2x.webp',
      original: '/images/64761919c25ef9fb3e0cdb98/original.jpg',
      alt: 'Example',
    },
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('Click');
    },
  },
};

export default meta;
