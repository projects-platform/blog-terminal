const { merge } = require('webpack-merge');
const {resolve , BASE_CONF} = require('./webpack.base');

module.exports = merge(BASE_CONF, {
	devtool: 'inline-source-map',
	devServer: {
		hot: true,
		contentBase: resolve('../dist'),
		port: 5500
	}
});
