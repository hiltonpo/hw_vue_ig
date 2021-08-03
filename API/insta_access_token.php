<?php
include 'defines.php';

//load graph-sdk files
require_once __DIR__ . '/vendor/autoload.php';

//facebook credentials array
$creds = array(
    'app_id' => FACEBOOK_APP_ID,
    'app_secret' => FACEBOOK_APP_SECRET,
    'default_graph_version' => 'v3.2',
    'persistent_data_handler' => 'session'
);

// create facebook object
$facebook = new Facebook\Facebook($creds);

// helper
$helper = $facebook->getRedirectLoginHelper();

// oauth object
$oAuth2Client = $facebook->getOAuth2Client();

if ( isset( $_GET['code'] )) {
    //get access token
    try {
        $accesstoken = $helper->getAccessToken();
    } catch (Facebook\Exceptions\FacebookResponseException $e) {
        echo 'Graph returned an error' . $e->getMessage;
    } catch (Facebook\Exceptions\FacebookSDKException $e) {
        echo 'Facebook SDK returned an error' . $e->getMessage;
    }
} else {
    //display login url
    $permissions = ['public_profile', 'instagram_basic', 'pages_show_list'];
    $loginUrl = $helper->getLoginUrl(FACEBOOK_REDIRECT_URI, $permissions);

    echo '<a href="' . $loginUrl . '">Login with facebook</a>';
}
// https://www.facebook.com/v2.4/dialog/oauth?client_id=326560215674441&state=c67ac4b2fdb5d45a56b02d9f03044ba4&response_type=code&sdk=php-sdk-5.7.0&redirect_uri=https%3A%2F%2Flocalhost%3A8888%2Fdemo_hw%2Fig_vue%2Finsta_access_token.php&scope=public_profile%2Cinstagram_basic%2Cpage_show_list
?>