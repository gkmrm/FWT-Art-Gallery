import type { Meta, StoryObj } from '@storybook/react';

import Navigation from './Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Project/components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Component displaying the bottom of the page`,
      },
    },
  },
};

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {},
};

export default meta;
