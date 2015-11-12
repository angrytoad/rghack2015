<?php


/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/11/2015
 * Time: 9:55 PM
 */
class LoginModel extends RiotApi
{
    public function __construct(){
        $this->db = dbconnection::createConnection();
    }

    public function attemptAuthentication($name){
        $returned = $this->searchForUser($name);
        $db_data = json_decode($returned);
        $data = array(
            'uuid' => genString::random32(),
            'user_id' => (string) $db_data[0],
            'runepage_string' => $db_data[1],
            'created_at' => $this->db->now()
        );
        if($this->db->insert('RunePageVerification',$data)){
            echo $returned;
            return true;
        }else{
            return false;
        }
    }

    public function checkForRunepage($uid,$runepage){
        if(count($this->db->where('user_id',$uid)->get('RunePageVerification')) > 0){
            if(count($this->db->where('runepage_string',$runepage)->where('user_id',$uid)->get('RunePageVerification')) > 0){
                $returned = $this->getUserRunepage($uid);
                if($returned === false){
                    return false;
                }
                $validRunepage = false;
                foreach($returned->{$uid}->pages as $summonerRunepage) {
                    if($summonerRunepage->name == $runepage) {
                        $validRunepage = true;
                    }
                }
                if($validRunepage) {
                    if (count($this->db->where('summonerID', $uid)->get('Users')) == 0) {
                        $userUUID = genString::random32();
                        $data = array(
                            'uuid' => $userUUID,
                            'summonerID' => htmlspecialchars($uid)
                        );
                        if ($this->db->insert('Users', $data)) {
                            if ($this->db->where('user_id',$uid)->delete('RunePageVerification')) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }
                }
            }else{
                return false;
            }
        }else{
            return false;
        }

    }
}