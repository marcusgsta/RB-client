<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    rb_search
 * @subpackage rb_search/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Rb_Search
 * @subpackage Rb_Search/includes
 * @author     Your Name <email@example.com>
 */
class Rb_Search {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      rb_search_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $rb_search    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'RB_SEARCH_VERSION' ) ) {
			$this->version = RB_SEARCH_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'rb_search';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Rb_Search_Loader. Orchestrates the hooks of the plugin.
	 * - Rb_Search_i18n. Defines internationalization functionality.
	 * - Rb_Search_Admin. Defines all hooks for the admin area.
	 * - Rb_Search_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-rb_search-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-rb_search-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-rb_search-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-rb_search-public.php';

		$this->loader = new Rb_Search_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Rb_Search_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Rb_Search_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Rb_Search_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Rb_Search_Public( $this->get_plugin_name(), $this->get_version() );

		add_shortcode('rb_search', array($this, 'shortcode'));

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

		// adding stuff from https://wordpress.stackexchange.com/questions/58067/custom-plugin-route-in-wordpress

		// $this->loader->add_filter( 'rewrite_rules_array', 'my_insert_rewrite_rules' );
		// $this->loader->add_filter( 'query_vars', 'my_insert_query_vars' );
		// $this->loader->add_action( 'wp_loaded', 'my_flush_rules' );
		add_filter( 'rewrite_rules_array', array( $this, 'my_insert_rewrite_rules' ) );
		add_filter( 'query_vars', array( $this, 'my_insert_query_vars' ) );
		add_action( 'wp_loaded', array( $this, 'my_flush_rules' ) );
	}

	// flush_rules () if our rules are not yet included
	public function my_flush_rules() {
		$rules = get_option( 'rewrite_rules' );

		if ( ! isset( $rules['schools/(.*?)/(.+?)'] ) ) {
			global $wp_rewrite;
			$wp_rewrite->flush_rules();
		}
	}

	// Adding a new rule
	public function my_insert_rewrite_rules( $rules ) {
		$newrules = array();
		$newrules['schools/(.*?)/(.+?)'] = 'index.php?myroute=$matches[1]&myargument=$matches[2]';
    	return $newrules + $rules;
	}

	// Adding the id var so WP recognizes it
	public function my_insert_query_vars( $vars ) {
		array_push($vars, 'myroute', 'myargument' );
		return $vars;
	}

	public function shortcode() {
		return "<div class='rb_search'></div>";
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Rb_Search_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
