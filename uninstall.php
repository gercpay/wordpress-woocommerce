<?php
/**
 * GercPay Uninstall
 *
 * Uninstalling GercPay deletes user options.
 *
 * @package WooCommerce\Gateways
 * @version 1.4.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	// Exit if accessed directly.
	exit;
}

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	// Exit if uninstall not called from WordPress.
	exit;
}

// Delete options.
delete_option( 'woocommerce_gercpay_settings' );
