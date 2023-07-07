import type { Meta, StoryObj } from '@storybook/react';

import Navigation2 from './Navigation2';

const meta: Meta<typeof Navigation2> = {
  title: 'Project/components/Navigation2',
  component: Navigation2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Component displaying the bottom of the page`,
      },
    },
  },
};

type Story = StoryObj<typeof Navigation2>;

export const Default: Story = {
  args: {},
};

export default meta;
