<?php
	include 'defines.php';
    // https://graph.facebook.com/v11.0/17841400203867081/tags?fields=id,caption,username,like_count&access_token=EAAEpATmnLkkBABlaZBIiILT4fAeU7FoiGMe7efKW28iadgbGRszWex5prGP3AiiiyljP0HeCxSHuTHQATBe8850serGJQGg6wF8QHd1yhZBhm9x4mlqCWx1U4JdhF0laJcuVJxZBr0F2KOwFrENvcihGWmZBmqcBfzjy95SMtQZDZD
	// get instagram user metadata endpoint
	$endpointFormat = ENDPOINT_BASE . '{ig-user-id}?fields=id,caption,username,like_count&access_token={access-token}';
	$endpoint = ENDPOINT_BASE . $instagramAccountId;

	// endpoint params
	$igParams = array(
		'fields' => 'id,caption,username,media_url,like_count',
		'access_token' => $accessToken
	);

	// add params to endpoint
	$endpoint .= '/tags?' . http_build_query( $igParams );

	// setup curl
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $endpoint );
	curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false );
	curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

	// make call and get response
	$response = curl_exec( $ch );
	curl_close( $ch );
    echo $response;
?>