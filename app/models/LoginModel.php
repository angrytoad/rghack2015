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
}