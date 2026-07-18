<?php
/**
 * Plugin Name: Vercel Auto Deploy
 * Description: Triggers a Vercel deploy hook when a post is published for the first time.
 * Version:     1.0.0
 * Author:      Emagrecer XXKG
 *
 * @package Vercel_Auto_Deploy
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'VERCEL_DEPLOY_HOOK_URL', 'https://api.vercel.com/v1/integrations/deploy/PRJ_ID/DEPLOY_HOOK_ID' );

/**
 * Sends a deploy request to Vercel when a post transitions to 'publish'.
 *
 * @param string  $new_status The new post status.
 * @param string  $old_status The old post status.
 * @param WP_Post $post       The post object.
 */
function vercel_auto_deploy_on_publish( $new_status, $old_status, $post ) {
    if ( 'publish' !== $new_status || 'publish' === $old_status ) {
        return;
    }

    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    if ( wp_is_post_revision( $post->ID ) || wp_is_post_autosave( $post->ID ) ) {
        return;
    }

    $hook_url = VERCEL_DEPLOY_HOOK_URL;

    $response = wp_remote_post(
        esc_url_raw( $hook_url ),
        array(
            'method'   => 'POST',
            'timeout'  => 15,
            'blocking' => true,
            'headers'  => array(
                'Content-Type' => 'application/json',
            ),
            'body'     => wp_json_encode(
                array(
                    'title'  => $post->post_title,
                    'slug'   => $post->post_name,
                    'action' => 'publish',
                    'id'     => $post->ID,
                )
            ),
        )
    );

    if ( is_wp_error( $response ) ) {
        error_log(
            sprintf(
                'Vercel Auto Deploy: Failed to trigger deploy for post #%d - %s',
                $post->ID,
                $response->get_error_message()
            )
        );
        return;
    }

    $response_code = wp_remote_retrieve_response_code( $response );

    if ( $response_code >= 200 && $response_code < 300 ) {
        error_log(
            sprintf(
                'Vercel Auto Deploy: Successfully triggered deploy for post #%d (status: %d)',
                $post->ID,
                $response_code
            )
        );
    } else {
        error_log(
            sprintf(
                'Vercel Auto Deploy: Unexpected response for post #%d - HTTP %d',
                $post->ID,
                $response_code
            )
        );
    }
}
add_action( 'transition_post_status', 'vercel_auto_deploy_on_publish', 10, 3 );
