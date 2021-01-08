const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = p => path.join(__dirname, p);
const mode = process.env.NODE_ENV || 'development';

module.exports = {
	resolve,
	BASE_CONF: {
		mode,
		entry: resolve('../src/terminal.js'),
		output: {
			path: resolve('../dist'),
			filename: 'terminal.bundle.js',
		},
		resolve: {
			extensions: ['.js', '.styl', '.json'],
			alias: {
				'@': resolve('../src'),
				'@stylus': resolve('../src/assets/stylus')
			}
		},
		module:{
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader'
				},
				{
					test: /\.styl$/,
					use:[
						'style-loader',
						'css-loader?importLoaders=1',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										'autoprefixer',
										'postcss-preset-env'
									]
								}
							}
						},
						'stylus-loader',
					]
				},
				{
					test: /\.(jpg|png|jpe?g|gif|svg)(\?.*)?$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								outputPath: 'images/',// 输出目录
								name(file) {// 输出名称
									return '[hansh].[ext]'
								},
								limit: 5*1024
							}
						}
					]
				},
				{
					test: /\.(eot|woff2?|ttf|svg)$/,
					use: [{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:5].min.[ext]',
							limit: 5000,
							outputPath: 'fonts/'
						}
					}]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				title: 'Silence H_VK',
				template: resolve('../src/terminal.html'),
				favicon: resolve('../src/assets/images/favicon.ico'),
				minify: {
					caseSensitive: false, //是否大小写敏感
					collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
					collapseWhitespace: true, //是否去除空格
				},
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.LoaderOptionsPlugin({
				options: {
						minify: true,
						htmlLoader: {
								removeAttributeQuotes: false,
								caseSensitive: true
						}
				}
			}),
		],
	}
};
