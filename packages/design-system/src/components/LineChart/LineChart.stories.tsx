import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const meta: Meta<typeof LineChart> = {
  title: 'Components/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    height:     { control: { type: 'range', min: 100, max: 400, step: 10 } },
    showLegend: { control: 'boolean' },
    showGrid:   { control: 'boolean' },
    showDots:   { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    height: 240,
    showLegend: true,
    showGrid: true,
    showDots: true,
    series: [
      {
        id: 'critical',
        label: 'Critical',
        severity: 'critical',
        data: MONTHS.map((label, i) => ({ label, value: 3600 - i * 480 })),
      },
      {
        id: 'high',
        label: 'High',
        severity: 'high',
        data: MONTHS.map((label, i) => ({ label, value: 2800 - i * 280 })),
      },
      {
        id: 'medium',
        label: 'Medium',
        severity: 'medium',
        data: MONTHS.map((label, i) => ({ label, value: 2000 - i * 200 })),
      },
      {
        id: 'low',
        label: 'Low',
        severity: 'low',
        data: MONTHS.map((label, i) => ({ label, value: 1000 - i * 80 })),
      },
    ],
  },
  decorators: [(Story) => <div style={{ padding: '24px', background: '#17243b' }}><Story /></div>],
};

export const SingleSeries: Story = {
  args: {
    height: 200,
    series: [
      {
        id: 'total',
        label: 'Total findings',
        severity: 'neutral',
        data: MONTHS.map((label, i) => ({ label, value: 12000 - i * 800 })),
      },
    ],
  },
  decorators: [(Story) => <div style={{ padding: '24px', background: '#17243b' }}><Story /></div>],
};

export const NoGrid: Story = {
  args: {
    ...Default.args,
    showGrid: false,
    showDots: false,
  },
  decorators: [(Story) => <div style={{ padding: '24px', background: '#17243b' }}><Story /></div>],
};
