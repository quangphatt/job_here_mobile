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
          '@Alert': './src/Components/Modal/ModalAlert',
          '@Config': './src/Config',
          '@Provider': './src/Config/Provider',
          '@Global': './src/Config/Provider/GlobalContextProvider',
          '@Theme': './src/Config/Theme',
          '@Navigation': './src/Navigation',
          '@NavigationAction':
            './src/Navigation/DrawerNavigation/NavigationAction.js',
          '@Screen': './src/Screen'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
