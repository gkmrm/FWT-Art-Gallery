import type { Meta, StoryObj } from '@storybook/react';

import Container from './Container';

const meta: Meta<typeof Container> = {
  title: 'Project/components/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `This component limits the display of content within the set limits`,
      },
    },
  },
};

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {},
};

export default meta;
