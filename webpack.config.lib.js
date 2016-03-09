module.exports = {
    entry: "./src/rodal.js",
    output: {
        path: "dist",
        filename: "rodal.js",
        libraryTarget: 'umd'
    },
    externals: {
        "react" : "react",
        "react-dom" : "react-dom",
        "rodal.css": 'rodal.css'
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
