<?php
/**
 * Load API functions, register scripts and actions, etc.
 *
 * @package gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

// These files only need to be loaded if within a rest server instance
// which this class will exist if that is the case.
if ( class_exists( 'WP_REST_Controller' ) ) {
	require dirname( __FILE__ ) . '/rest-api.php';
}

require dirname( __FILE__ ) . '/meta-box-partial-page.php';
require dirname( __FILE__ ) . '/blocks.php';
require dirname( __FILE__ ) . '/client-assets.php';
require dirname( __FILE__ ) . '/compat.php';
require dirname( __FILE__ ) . '/plugin-compat.php';
require dirname( __FILE__ ) . '/i18n.php';
require dirname( __FILE__ ) . '/register.php';
require dirname( __FILE__ ) . '/demo.php';

/**
 * Discovers block files from the plugin built artifact, unregistering the
 * equivalent in core if already defined, then includes the block file.
 */
function gutenberg_reregister_core_block_types() {
	// Blocks directory may not exist if working from a fresh clone.
	$blocks_dir = dirname( __FILE__ ) . '/../build/block-library/blocks/';
	if ( ! file_exists( $blocks_dir ) ) {
		return;
	}

	$registry = WP_Block_Type_Registry::get_instance();

	$files = scandir( $blocks_dir );
	foreach ( $files as $file ) {
		$parts = pathinfo( $file );

		// Ignore all non-PHP files, subdirectories, path traversal.
		if ( 'php' !== $parts['extension'] ) {
			continue;
		}

		// Derive the assumed block name by file path.
		$block_name = 'core/' . $parts['filename'];

		if ( $registry->is_registered( $block_name ) ) {
			$registry->unregister( $block_name );
		}

		require $blocks_dir . $file;
	}
}
add_action( 'init', 'gutenberg_reregister_core_block_types' );
