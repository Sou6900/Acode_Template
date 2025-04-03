const { exec } = require('child_process');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');  // Minify JS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');  // Minify CSS

module.exports = (env, options) => {
  const { mode = 'production' } = options;

  const rules = [
    {
      test: /\.m?js$/,
      use: [
        'html-tag-js/jsx/tag-loader.js',
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.html/,  // Rule for HTML files
      use: ['html-loader'],
    },
  ];

  const main = {
    mode,  // Set mode dynamically (development or production)
    entry: {
      main: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    module: {
      rules,
    },
    optimization: {
      minimize: mode === 'production',  // Enable minification only in production mode
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,  // Remove all console.* statements
              pure_funcs: ['console.info', 'console.debug', 'console.warn' , 'console.error'], // Ensure other specific logs are removed
            },
            format: {
              comments: false,  // Remove all comments
            },
          },
          extractComments: false,  // Do not extract comments to a separate file
        }),
        new CssMinimizerPlugin(),  // Minify CSS
      ],
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterDone.tap('pack-zip', () => {
            exec('node .devServer/pack-zip.js', (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
          });
        }
      }
    ],
  };

  return [main];
};