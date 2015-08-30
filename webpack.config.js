module.exports = {
    entry: "./src/index.js",
    output: {
        path: "build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel" },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
        ]
    }
};
