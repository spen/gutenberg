/**
* External dependencies
*/
const path = require( 'path' );
const PnpWebpackPlugin = require( 'pnp-webpack-plugin' );

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	mode: NODE_ENV,
	entry: './index.js',
	output: {
		path: path.resolve( '.' ),
		filename: 'index.build.js',
	},
	resolve: {
		plugins: [
			PnpWebpackPlugin,
		],
	},
	resolveLoader: {
		plugins: [
			PnpWebpackPlugin.moduleLoader( module ),
		],
	},
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: [ {
					loader: require.resolve( 'babel-loader' ),
					options: {
						plugins: [
							[ require.resolve( '@babel/plugin-transform-react-jsx' ), {
								pragma: 'wp.element.createElement',
							} ],
						],
					},
				} ],
			},
		],
	},
};
