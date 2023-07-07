import type { Meta, StoryObj } from '@storybook/react';

import MainPage from './MainPage';

const meta: Meta<typeof MainPage> = {
  title: 'Project/components/MainPage',
  component: MainPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Component displaying the bottom of the page`,
      },
    },
  },
};

type Story = StoryObj<typeof MainPage>;

export const Default: Story = {
  args: {},
};

export default meta;
