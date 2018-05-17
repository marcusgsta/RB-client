<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/public
 * @author     Your Name <email@example.com>
 */
class Rb_Search_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/rb_search-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		 wp_register_script('rb_polyfill', 'https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch');
		 wp_register_script('rb_nav', plugin_dir_url( __FILE__ ) .'/js/nav.js');
		 wp_register_script('rb_education', plugin_dir_url( __FILE__ ) .'/js/education.js');
		 wp_register_script('rb_school', plugin_dir_url( __FILE__ ) .'/js/school.js');
		 wp_register_script('rb_start', plugin_dir_url( __FILE__ ) .'/js/start.js');
		 wp_register_script('rb_helpers', plugin_dir_url( __FILE__ ) .'/js/helpers.js');
		 wp_register_script('rb_main', plugin_dir_url( __FILE__ ) .'/js/main.js');
		 //wp_register_script('rb_func', plugin_dir_url( __FILE__ ) .'/js/rb_search-public.js');

		 wp_enqueue_script('rb_polyfill', '', '', '', true);
		 wp_enqueue_script('rb_nav', '', '', '', true);
		 wp_enqueue_script('rb_education', '', '', '', true);
		 wp_enqueue_script('rb_school', '', '', '', true);
		 wp_enqueue_script('rb_start', '', '', '', true);
		 wp_enqueue_script('rb_helpers', '', '', '', true);
		 //wp_enqueue_script('rb_func', '', '', '', true);
		 wp_enqueue_script('rb_main', '', '', '', true);

	}

}
