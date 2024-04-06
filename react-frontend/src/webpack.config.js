module.exports = {
  // ... other webpack configurations

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        
      },
    ],
  },
};
