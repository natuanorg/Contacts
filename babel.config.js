module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.json',
            '.tsx',
            '.ts',
            '.native.js',
          ],
          alias: {
            '@context': './context',
            '@database': './database',
            '@hooks': './hooks',
            '@screens': './screens',
            '@components': './components',
            '@assets': './assets',
            '@helper': './helper'
          }
        }
      ],
      ['react-native-reanimated/plugin']
    ]
  };
};
