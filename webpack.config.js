const path = require('path');

module.exports = {
    entry: {
        app : ['babel-polyfill', './src/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    mode: 'none',
    plugins: [

    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['env', 'stage-0']
                        }
                    }
                ]
            }
        ]
    }
}