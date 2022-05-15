const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    demo: './demo/index.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000, // 端口
    open: true, // 自动打开
    compress: true, //启用gzip压缩
    client: {
      progress: true // 浏览器打印进度
    },
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // mainFiles: ['index', 'main'],
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '页面引导组件-DEMO',
      template: './static/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader', // 将 CSS 作为内联样式插入到 html 中
          },
          {
            loader: 'css-loader',
            options: {
              /**
               * importLoaders 默认值为 0，引用的文件会跳过处理。
               * 保证通过引用方式加载的样式文件能够通过 less-loader 和 postcss-loader 两个 loader 的处理。
               * https://webpack.docschina.org/loaders/css-loader/#importloaders
               */
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[local]-[hash:base64:5]'
              }
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          }
        ],
      },
      {
        test: /\.(less|css)$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader', // 将 CSS 作为内联样式插入到 html 中
          },
          {
            loader: 'css-loader',
            options: {
              /**
               * importLoaders 默认值为 0，引用的文件会跳过处理。
               * 保证通过引用方式加载的样式文件能够通过 less-loader 和 postcss-loader 两个 loader 的处理。
               * https://webpack.docschina.org/loaders/css-loader/#importloaders
               */
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[local]'
              }
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          }
        ],
      }
    ]
  }
};