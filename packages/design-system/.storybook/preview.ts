import type { Preview } from '@storybook/react';
import '../src/theme/styles/index.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#0F1827' },
        { name: 'surface', value: '#17243b' },
        { name: 'light',   value: '#ffffff' },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /date$/i } },
    layout: 'centered',
  },
};

export default preview;
