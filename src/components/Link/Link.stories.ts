import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta: Meta<typeof Link> = {
  title: 'Project/ui/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Component "Link" has 2 types of display standard and with a dark theme`,
      },
    },
  },
};

type Story = StoryObj<typeof Link>;

export const Standart: Story = {
  args: {
    isDarkTheme: false,
    children: 'Normal link',
    href: 'https://framework.team/',
  },
};

export const Dark: Story = {
  args: {
    isDarkTheme: true,
    children: 'Normal link',
    href: 'https://framework.team/',
  },
};

export default meta;
