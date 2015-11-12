<?php

/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/11/2015
 * Time: 9:56 PM
 */
class RiotApi
{
    private $key = '1b6bc810-7c4c-4db0-981c-57f7a1dc33bf';
    private $region = 'NA';
    private $username;

    public function searchForUser($username){
        $this->username = $username;
        if($response = @file_get_contents('https://global.api.pvp.net/api/lol/'.strtolower($this->region).'/v1.4/summoner/by-name/'.htmlspecialchars($username).'?summonerName='.$username.'&api_key='.$this->key)) {
            $response = json_decode($response);
            return json_encode([$response->{strtolower($username)}->id,genString::random8()]);;
        }else{
            responder::sendResponse(400);
        }
    }
}