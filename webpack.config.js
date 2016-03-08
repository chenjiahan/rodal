module.exports = {
    entry: "./example/src/index.js",
    output: {
        path: "example/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react'],
                }
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'autoprefixer']
            }
        ]
    }
};
