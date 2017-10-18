var webpack = require("webpack"),
    path = require("path");
    
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
     minimize: true,
     compress: false
    })
  ]
};