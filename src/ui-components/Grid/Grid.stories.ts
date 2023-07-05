import type { Meta, StoryObj } from '@storybook/react';

import Grid from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Project/ui/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Displays incorrectly in storybook, works correctly inside the application`,
      },
    },
  },
};

type Story = StoryObj<typeof Grid>;

export const Standart: Story = {
  args: {},
};

export default meta;
