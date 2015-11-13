<?php

	class SummonerModel extends RiotApi
	{
	
	    public static function loadMasteryById($ID){
			return json_encode($this->getChampMasteries($ID));
			
	    }
	
	}

?>