import type { Meta, StoryObj } from '@storybook/react';

import Button2 from './Button2';

const meta: Meta<typeof Button2> = {
  title: 'Project/Button2',
  component: Button2,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Button2>;

export const Default: Story = {
  args: {
    className: 'text',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('CLicked');
    },
    isDarkTheme: false,
    isDisabled: false,
    value: 'Default button',
  },
};

export default meta;
