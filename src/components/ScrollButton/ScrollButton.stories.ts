import type { Meta, StoryObj } from '@storybook/react';

import ScrollButton from './ScrollButton';

const meta: Meta<typeof ScrollButton> = {
  title: 'Project/ui/buttons/ScrollButton',
  component: ScrollButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
          Note: 
          This button is designed to display an up arrow when you scroll down the page`,
      },
    },
  },
};

type Story = StoryObj<typeof ScrollButton>;

export const Default: Story = {
  args: {
    isDarkTheme: false,
  },
};

export const Dark: Story = {
  args: {
    isDarkTheme: true,
  },
};

export default meta;
