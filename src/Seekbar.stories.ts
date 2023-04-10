import type { Meta, StoryObj } from '@storybook/react';
import Seekbar from './Seekbar';

const meta = {
  title: 'Example/Seekbar',
  component: Seekbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Seekbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
