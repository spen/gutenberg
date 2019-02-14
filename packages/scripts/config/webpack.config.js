/**
 * External dependencies
 */
const path = require( 'path' );

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	mode: NODE_ENV,
	entry: './index.js',
	output: {
		path: path.resolve( '.' ),
		filename: 'index.build.js',
	},
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};
