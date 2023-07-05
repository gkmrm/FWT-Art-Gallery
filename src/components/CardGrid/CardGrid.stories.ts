import type { Meta, StoryObj } from '@storybook/react';

import CardGrid from './CardGrid';
import testData from './testDataforCardGrid';

const meta: Meta<typeof CardGrid> = {
  title: 'Project/ui/CardGrid',
  component: CardGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Displays incorrectly in storybook, works correctly inside the application`,
      },
    },
  },
};

type Story = StoryObj<typeof CardGrid>;

export const Standart: Story = {
  args: {
    arrayData: testData,
  },
};

export default meta;
