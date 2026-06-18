module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@containers': './src/containers',
          '@stores': './src/stores',
          '@framework': './src/framework',
          '@theme': './src/theme',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          'App': './App',
        },
      },
    ],
    'react-native-reanimated/plugin', // must be last
  ],
};
