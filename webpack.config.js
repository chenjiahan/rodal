module.exports = {
    entry: "./example/index.js",
    output: {
        path: "example",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel" },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
        ]
    }
};
