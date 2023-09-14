<?php

/**
 * Add GercPay link to WordPress menu.
 */
class GercpayMenu {

	/**
	 * Link for menu item.
	 *
	 * @var string
	 */
	public $slug = 'admin.php?page=wc-settings&tab=checkout&section=gercpay';

	/**
	 * Constructor method.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
	}

	/**
	 * Register menu item.
	 *
	 * @return void
	 */
	public function register_admin_menu() {
		add_menu_page(
			'GercPay',
			'GercPay',
			'manage_options',
			$this->slug,
			false,
			plugin_dir_url( __DIR__ ) . 'assets/img/gercpay-logo.svg',
			26
		);
	}
}
