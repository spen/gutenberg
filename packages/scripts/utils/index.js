/**
 * Internal dependencies
 */
const {
	getCliArg,
	getCliArgs,
	hasCliArg,
	spawnScript,
} = require( './cli' );
const {
	getWebpackArgs,
	hasBabelConfig,
	hasJestConfig,
} = require( './config' );
const {
	fromConfigRoot,
	hasProjectFile,
} = require( './file' );
const {
	hasPackageProp,
} = require( './package' );

module.exports = {
	fromConfigRoot,
	getCliArg,
	getCliArgs,
	getWebpackArgs,
	hasBabelConfig,
	hasCliArg,
	hasJestConfig,
	hasPackageProp,
	hasProjectFile,
	spawnScript,
};
