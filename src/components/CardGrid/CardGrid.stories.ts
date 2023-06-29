import type { Meta, StoryObj } from '@storybook/react';

import CardGrid from './CardGrid';

const meta: Meta<typeof CardGrid> = {
  title: 'Project/CardGrid',
  component: CardGrid,
};

type Story = StoryObj<typeof CardGrid>;

export const Standart: Story = {
  args: {},
};

export default meta;
