import type { Meta, StoryObj } from '@storybook/react';

import ToggleTheme from './ToggleTheme';

const meta: Meta<typeof ToggleTheme> = {
  title: 'Project/ui/buttons/ToggleTheme',
  component: ToggleTheme,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
          Note: 
          This component is designed to display a button to change the theme`,
      },
    },
  },
};

type Story = StoryObj<typeof ToggleTheme>;

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
