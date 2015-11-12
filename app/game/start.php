<?php
	
	$deck = "[Zilean, Kindred, Brand, Sona, Teemo, Caitlyn Cho'Gath, Karthus, Bard, Riven, Rengar, Master Yi, Maokai, Morgana, Darius, Soraka]";
	
	error_reporting( E_ALL );
	ini_set( "display_errors", 1 );
	
	$address = 'http://52.32.183.170:3001/init';
	
	$data = array('deck0' => $deck, 'deck1' => $deck);

	$options = array(
    	'http' => array(
        	'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data),
		),
	);
	
	$context = stream_context_create($options);
	
	$result = file_get_contents($address, false, $context);
	
	if ($result === 'game initialized') {
		
			

	} else {
		
		echo 'Game Failed to connect';
		
	}
	
	
?>