const path = require('path');
module.exports = {
  //如果有一個以上的檔案需要打包，可以傳陣列給entry
  mode: "development",
  entry: ['./src/js/index.js'],
  output: {
    filename: 'public/dist/js/index.js',
    path: path.resolve(__dirname, './'),
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  //將loader的設定寫在module的rules屬性中
  module: {
    //rules的值是一個陣列可以存放多個loader物件
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['react-hot-loader/babel'],
          }
        }
      }
    ]
  }
};