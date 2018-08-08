module.exports = {
    mode: 'development',
    entry: './test.ts',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'awesome-typescript-loader' }
        ]
    }
};
