import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@idira/design-system/icons':  path.resolve(__dirname, '../src/icons/index.ts'),
          '@idira/design-system/theme':  path.resolve(__dirname, '../src/theme/index.ts'),
          '@idira/design-system/types':  path.resolve(__dirname, '../src/types/index.ts'),
          '@idira/design-system/styles': path.resolve(__dirname, '../src/theme/styles/index.scss'),
          '@idira/design-system':        path.resolve(__dirname, '../src/index.ts'),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [path.resolve(__dirname, '../src/theme/styles')],
          },
        },
      },
    });
  },
};

export default config;
