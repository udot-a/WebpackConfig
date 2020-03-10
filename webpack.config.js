const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoader = {
    test:/\.scss|.css$/i,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: true
            }
        },
        'sass-loader'
    ]
}

const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        // options: {
        //     presets: ['react', 'es2015']
        //     // plugins: ['transform-class-properties']
        // }
    }
}
    const serverConfig = {
        entry: "./src/service/server.js",
        output: {
            path: path.join(__dirname, "./build"),
            filename: "server.js",
            libraryTarget: 'commonjs2',
        },
        target: 'node',
        mode: 'production',
        node: {
            __dirname: false,
            __filename: false
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    },
                },

                {
                    // Loads the javacript into html template provided.
                    // Entry point is set below in HtmlWebPackPlugin in Plugins
                    test: /\.html$/,
                    use: [{loader: "html-loader"}]
                },
                cssLoader
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
]
    }
const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: {
        'browser.js': path.resolve(__dirname, './src/browser.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            cssLoader,
            {
                test: /\.(png|svg|jp?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
            ]
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name]'
    },
    plugins: [
        new MiniCssExtractPlugin()
        ]

}
module.exports = [
    serverConfig,
    clientConfig


]
