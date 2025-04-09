const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Точка входа
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Выходной файл
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Обработка CSS файлов
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Обработка картинок
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]", // Используем хеш для уникальности
            outputPath: "assets/", // Папка для картинок
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Шаблон для HTML
      filename: "index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Папка для обслуживания статических файлов
    },
    compress: true,
    port: 9000, // Порт для сервера
    open: true, // Автоматически открывать браузер
  },
};
