module.exports = {
    entry: "./example/src/index.js",
    output: {
        path: "example/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel", query: {stage: 0} },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
        ]
    }
};
