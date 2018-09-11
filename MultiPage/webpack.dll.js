const webpack = require('webpack');
const path = require('path');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const os = require('os');

const vendors = [
    'vue', 
    'jquery', 
    'element-ui'
];

module.exports = {
    context: __dirname,
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    entry: {
        "vendor": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path:  path.join(__dirname, 'build', '[name]-manifest.json'),
            name: '[name]_[hash]',
        })
    ]
};