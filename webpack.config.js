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
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
        ]
    }
};
