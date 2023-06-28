import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta: Meta<typeof Link> = {
  title: 'Project/Link',
  component: Link,
};

type Story = StoryObj<typeof Link>;

export const Standart: Story = {
  args: {
    isDarkTheme: true,
    children: 'Normal link',
    href: 'https://framework.team/',
  },
};

export default meta;
