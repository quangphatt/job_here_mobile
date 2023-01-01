module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@Assets': './src/Assets',
          '@Business': './src/Business',
          '@Components': './src/Components',
          '@Layout': './src/Layout',
          '@Navigation': './src/Navigation',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
