module.exports = function( api ) {
	const isTestEnv = api.env() === 'test';

	return {
		presets: [
			! isTestEnv && [ require.resolve( '@babel/preset-env' ), {
				modules: false,
				targets: {
					browsers: require( '@wordpress/browserslist-config' ),
				},
			} ],
			isTestEnv && [ require.resolve( '@babel/preset-env' ), {
				useBuiltIns: 'usage',
			} ],
		].filter( Boolean ),
		plugins: [
			require.resolve( '@babel/plugin-proposal-object-rest-spread' ),
			[ require.resolve( '@babel/plugin-transform-react-jsx' ), {
				pragma: 'createElement',
			} ],
			require.resolve( '@babel/plugin-proposal-async-generator-functions' ),
			! isTestEnv && [ require.resolve( '@babel/plugin-transform-runtime' ), {
				corejs: false, // We polyfill so we don't need core-js.
				helpers: true,
				regenerator: false, // We polyfill so we don't need regenerator.
				useESModules: false,
			} ],
		].filter( Boolean ),
	};
};
