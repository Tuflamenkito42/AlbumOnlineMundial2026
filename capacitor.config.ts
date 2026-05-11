import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mundialcartas2026.app',
  appName: 'Mundial Cartas 2026',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;