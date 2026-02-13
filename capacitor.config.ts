import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fingerprint.app',
  appName: 'fingerprint',
  webDir: 'dist/fingerprint/browser',
  plugins: {
    CapacitorHttp:{
      enabled: true
    }
  }
};

export default config;
