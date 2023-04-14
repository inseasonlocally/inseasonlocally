const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'client/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  target: 'web',
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css?/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.join(__dirname, 'client', 'index.html')
    }),
  ],
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build')
    },
    //automatically open browser after it bundles our files
    open: true,
    //enables webpack Hot module replacement exchanges, adds, or removes modules while an application is running, without a full reload. to improve performance
    hot: true,
    //automatically update the app as you make changes
    liveReload: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
