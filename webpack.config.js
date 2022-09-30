const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        assetModuleFilename: 'images/[name][ext]'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },

        ],
    },
    optimization: {
        minimizer: [

            "...",
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {

                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["mozjpeg", { quality: 60 }],
                            ["optipng", { optimizationLevel: 5 }],

                            [
                                "svgo",
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {

                                            convertShapeToPath: {
                                                convertArcs: true
                                            },

                                            convertPathData: false
                                        }
                                    }
                                }
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    devServer: {
        open: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new CleanWebpackPlugin(), new MiniCssExtractPlugin()
    ],
};