const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './example/src/index.js'   
    },
    output: {
        path: path.resolve(__dirname, 'example/dist'),
        publicPath: '/example/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: ['transform-object-assign']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devServer: {
        contentBase: './example',
        compress: true,
        port: 2345,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: false,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            }
        }
    }
};
