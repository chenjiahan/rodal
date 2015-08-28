module.exports = {
    entry: "./example/index.jsx",
    output: {
        path: "example",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "babel" },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
        ]
    }
};
