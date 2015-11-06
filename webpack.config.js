module.exports = {
    entry: "./example/index.js",
    output: {
        path: "example",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel", query: {stage: 0} },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
        ]
    }
};
