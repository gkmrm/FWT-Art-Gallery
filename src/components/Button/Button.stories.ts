import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Project/ui/buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
          The button coponent, has 3 types of display, which change as a result of passing the classname from the parent component.

          1) Default 
          Created for displaying normal buttons

          2) Text
          Created to display button as underlined text without background color

          3) Icon
          Created to display function buttons as a square image. eg: a trash icon button, a gear icon button. 

          Note: 
          Buttons to display the switching and scrolling of the theme USE components ToogleTheme and Scroll`,
      },
    },
  },
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    className: 'default',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('CLicked');
    },
    isDarkTheme: false,
    isDisabled: false,
    value: 'Default button',
  },
};

export const Text: Story = {
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

export const Icon: Story = {
  args: {
    className: 'icon',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('CLicked');
    },
    isDarkTheme: false,
    isDisabled: false,
    value: '',
  },
};

export default meta;
