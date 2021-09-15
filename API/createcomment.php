<?php
	include 'defines.php';
	$data = json_decode(file_get_contents("php://input"), true);
   
	// https://graph.facebook.com/v11.0/{ig-media-id}/comments?message={message}&access_token=EAAEpATmnLkkBABlaZBIiILT4fAeU7FoiGMe7efKW28iadgbGRszWex5prGP3AiiiyljP0HeCxSHuTHQATBe8850serGJQGg6wF8QHd1yhZBhm9x4mlqCWx1U4JdhF0laJcuVJxZBr0F2KOwFrENvcihGWmZBmqcBfzjy95SMtQZDZD
	// postCommentEndpoint formats
	$postCommentEndpointFormat = ENDPOINT_BASE . '{ig-media-id}/comments?message={message}';
	$postCommentEndpoint = ENDPOINT_BASE . $data['mediaID'] ;

	// endpoint params
	$igParams = array(
		'message' => $data['message'],
		'access_token' => $accessToken
	);

	// add params to endpoint
	$postCommentEndpoint .= '/comments?' . http_build_query( $igParams );

	// setup curl
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $postCommentEndpoint );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query( $igParams ) );
	curl_setopt( $ch, CURLOPT_POST, 1 );

	curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false );
	curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

	// make call and get response
	$response = curl_exec( $ch );
	curl_close( $ch );
    echo $response;


// 	include 'defines.php';
// 	$mediaObject = array( // media post we are working with
// 		'id' => '17949076648318885',
// 		'caption' => "Can you spot me in the video?! 😆🤣 Coding tonight against the Instagram Graph API and getting a users metadata!
// .
// The metadata we can get from the Instagram Graph API for a user includes, profile image url, account I'd, username, website, name, biography, follow count, follower count, media count.
// .
// #coding #instagram #coder #tech #php #html #fullstackdeveloper #webdevelopment #webstagram #computers #frontenddeveloper #instagramgraphapi #instagramapi #api #backend #website #softwareengineer #code #programming #facebook",
// 		'media_url' => 'https://scontent.xx.fbcdn.net/v/t50.31694-16/82877274_168580704395389_6442072919343833857_n.mp4?_nc_cat=102&_nc_ohc=pfuRI1wD3twAX8AvCD6&_nc_ht=scontent.xx&oh=225a7ef08d9a72cf7f5b40580cb45923&oe=5ED484E7',
// 		'permalink' => 'https://www.instagram.com/p/B7pYqdPAezS/',
// 		'media_type' => "VIDEO"
// 	);

// 	function makeApiCall( $endpoint, $type, $params ) {
// 		$ch = curl_init();

// 		if ( 'POST' == $type ) {
// 			curl_setopt( $ch, CURLOPT_URL, $endpoint );
// 			curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query( $params ) );
// 			curl_setopt( $ch, CURLOPT_POST, 1 );
// 		} elseif ( 'GET' == $type ) {
// 			curl_setopt( $ch, CURLOPT_URL, $endpoint . '?' . http_build_query( $params ) );
// 		}

// 		curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false );
// 		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
// 		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

// 		$response = curl_exec( $ch );
// 		curl_close( $ch );

// 		echo $response;
// 	}

// 	// endpoint formats
// 	$commentsEndpointFormat = ENDPOINT_BASE . '{ig-media-id}/comments?fields=like_count,replies,username,text';
// 	$repliesEndpointFormat = ENDPOINT_BASE . '{ig-comment-id}/replies?fields=username,text,like_count';
// 	$postCommentEndpointFormat = ENDPOINT_BASE . '{ig-media-id}/comments?message={message}';
// 	$postReplyEndpointFormat = ENDPOINT_BASE . '{ig-comment-id}/replies?message={message}';

// 	// get comments from IG
// 	$commentsEndpoint = ENDPOINT_BASE . $mediaObject['id'] . '/comments';
// 	$igParams = array(
// 		'fields' => 'like_count,replies,username,text',
// 		'access_token' => $accessToken
// 	);
// 	$responseArray = makeApiCall( $commentsEndpoint, 'GET', $igParams );




?>