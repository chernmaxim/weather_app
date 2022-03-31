const presets = ['module:metro-react-native-babel-preset'];

const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
  ],
]

module.exports = {
  presets,
  plugins,
};
