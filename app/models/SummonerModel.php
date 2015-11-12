<?php

/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/12/2015
 * Time: 1:57 PM
 */
class SummonerModel extends RiotApi
{

    private $profileIcon = null;
    private $summonerLevel = null;
    private $summonerId = null;
    private $summonerName = null;

    public function __construct(){
        $this->db = dbconnection::createConnection();
    }

    public static function loadSummonerByName($name){
        $name = strtolower($name);
        $summoner = new SummonerModel();
        $result = $summoner->loadSummonerInformationByName($name);
        if($result !== false){
            $summoner->profileIcon = $result->$name->profileIconId;
            $summoner->summonerLevel = $result->$name->summonerLevel;
            $summoner->summonerId = $result->$name->id;
            $summoner->summonerName = $result->$name->name;
        }
        return $summoner;
    }

    public function getProfileIcon(){
        return $this->profileIcon;
    }

    public function getChampMasteries(){
        return $this->getChampionMasteries($this->summonerId);
    }
}