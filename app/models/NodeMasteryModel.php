<?php

	class NodeMasteryModel extends RiotApi
	{
	
	    public function loadMasteryById($ID){
			return json_encode($this->getChampionMasteries($ID));
			
	    }
	
	}

?>