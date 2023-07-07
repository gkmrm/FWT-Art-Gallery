import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Project/components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Component displaying the bottom of the page`,
      },
    },
  },
};

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export default meta;
