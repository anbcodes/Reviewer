const path = require('path');

module.exports = {
  entry: './src/Js/Main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
            {
                test:/\.(s*)ass$/,
                use:['style-loader','css-loader', 'sass-loader']
             }
     ]
  },
};