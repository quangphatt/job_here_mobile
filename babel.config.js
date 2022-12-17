module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@Components': './src/Components',
          '@Layout': './src/Layout',
        },
      },
    ],
  ],
};
