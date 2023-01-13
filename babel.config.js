module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@Alert': './src/Components/Modal/ModalAlert',
          '@Assets': './src/Assets',
          '@Business': './src/Business',
          '@Components': './src/Components',
          '@Config': './src/Config',
          '@Layout': './src/Layout',
          '@Navigation': './src/Navigation',
          '@Provider': './src/Config/Provider',
          '@Global': './src/Config/Provider/GlobalContextProvider',
          '@Theme': './src/Config/Theme'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
