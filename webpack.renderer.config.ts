import type { Configuration } from 'webpack';
import path from 'path';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

const config: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  output: {
    path: path.resolve(__dirname, 'renderer'),
    filename: 'index.js',
  },
  entry: './src/renderer/index.tsx',
};

export default config;