const path = require('path');

module.exports = {
  // Set the mode to 'development' for debugging and more verbose output, or 'production' for optimization.
  mode: 'development',
  // Entry point of your application
  entry: './src/renderer.ts',
  // Output configuration for Webpack
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // Resolve extensions, so you import modules without specifying extensions
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // Configuration for Webpack Dev Server (optional)
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  // This option controls if and how source maps are generated.
  devtool: 'source-map',
};

