<?php
	
	$deck = '["Zilean", "Kindred", "Brand", "Sona", "Teemo", "Caitlyn", "ChoGath", "Karthus", "Bard", "Riven", "Rengar", "Master Yi", "Maokai", "Morgana", "Darius", "Soraka"]';
	
	error_reporting( E_ALL );
	ini_set( "display_errors", 1 );
	
	$address = 'http://52.32.183.170:3001/init';
<<<<<<< HEAD
	$input = json_decode(file_get_contents("php://input"));

	$data = array('deck' => $deck, "name" => $input->name, "id" => $input->id);
=======
	
	$data = array('deck0' => $deck, 'deck1' => $deck);
>>>>>>> 32fc77634af79fdbda4b24393e71b2ade71a6922

	$options = array(
    	'http' => array(
        	'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data),
		),
	);
	
	$context = stream_context_create($options);
	
	$result = file_get_contents($address, false, $context);
	
<<<<<<< HEAD
	if ($result === "0" || $result === "1") {

		echo $result;
=======
	if ($result === 'game initialized') {
		
			
>>>>>>> 32fc77634af79fdbda4b24393e71b2ade71a6922

	} else {
		
		echo 'Game Failed to connect';
		
	}
	
	
?>