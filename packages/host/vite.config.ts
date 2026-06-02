import { federation } from '@module-federation/vite';
import { defineConfig, type PluginOption } from 'vite';
import { dependencies } from './package.json';

export default defineConfig(() => ({
  optimizeDeps: {
    // simulate an external npm dependency being pre-bundled
    include: ['pkg-bar'],
  },
  plugins: [
    federation({
      dts: false,
      dev: {
        remoteHmr: true,
      },
      name: 'host',
      remotes: {
        remote: {
          type: 'module',
          name: 'remote',
          entry: 'http://localhost:4174/remoteEntry.js',
          entryGlobalName: 'remote',
          shareScope: 'default',
        },
      },
      exposes: {},
      filename: 'remoteEntry.js',
      shared: {
        lit: { requiredVersion: dependencies.lit, singleton: true },
        'pkg-foo/': { singleton: true },
      },
    }) as unknown as PluginOption,
  ],
}));
