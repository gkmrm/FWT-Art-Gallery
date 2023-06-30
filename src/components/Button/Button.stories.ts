import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Project/Button',
  component: Button,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    className: 'default',
    props: {
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('CLicked');
      },
    },
    isDarkTheme: false,
    isDisabled: false,
    value: 'Default button',
  },
};

export const Text: Story = {
  args: {
    className: 'text',
    props: {
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('CLicked');
      },
    },
    isDarkTheme: false,
    isDisabled: false,
    value: 'button text',
  },
};

export const Up: Story = {
  args: {
    className: 'up',
    props: {
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('CLicked');
      },
    },
    isDarkTheme: false,
    isDisabled: false,
  },
};

export const Functional: Story = {
  args: {
    className: 'functional',
    props: {
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('CLicked');
      },
    },
    isDarkTheme: false,
    isDisabled: false,
  },
};

export default meta;
