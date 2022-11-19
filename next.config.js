const compose = require('next-compose');

// module.exports = {
//   // Webpack 5 is enabled by default
//   // You can still use webpack 4 while upgrading to the latest version of Next.js by adding the "webpack5: false" flag
//   webpack5: false,
// };

module.exports = compose([
  {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name].[ext]',
          },
        },
      });
      return config;
    },
  },
]);