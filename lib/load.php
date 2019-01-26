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
 * Unregisters the core set of blocks. This should occur on the default
 * priority, immediately prior to Gutenberg's own action binding.
 */
function gutenberg_unregister_core_block_types() {
	$registry    = WP_Block_Type_Registry::get_instance();
	$block_names = array(
		'core/archives',
		'core/block',
		'core/calendar',
		'core/categories',
		'core/latest-comments',
		'core/latest-posts',
		'core/rss',
		'core/shortcode',
		'core/search',
	);

	foreach ( $block_names as $block_name ) {
		if ( $registry->is_registered( $block_name ) ) {
			$registry->unregister( $block_name );
		}
	}
}

if ( file_exists( dirname( __FILE__ ) . '/../build/block-library/blocks' ) ) {
	add_action( 'init', 'gutenberg_unregister_core_block_types' );

	require dirname( __FILE__ ) . '/../build/block-library/blocks/archives.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/block.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/calendar.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/categories.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/latest-comments.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/latest-posts.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/rss.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/shortcode.php';
	require dirname( __FILE__ ) . '/../build/block-library/blocks/search.php';
}
