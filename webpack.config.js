module.exports = {
    entry: "./example/index.js",
    output: {
        path: "example",
        filename: "bundle.js"
    },
    module: {
        perLoaders : [
            { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader" }
        ],
        loaders: [
            { test: /\.js$/, loader: "babel" },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" },
            { test: /\.css$/, loader: "style!css!autoprefixer" }
        ]
    }
};
