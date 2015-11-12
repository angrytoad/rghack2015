<?php

require_once (ROOT.'/rghack2015/db/MysqliDb.php');

/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/12/2015
 * Time: 10:22 AM
 */
class dbconnection
{
    public function __construct(){
        $this->db = new MysqliDb (Array (
            'host' => '127.0.0.1',
            'username' => 'root',
            'password' => '123',
            'db'=> 'lcg_db',
            'port' => 3306,
            'charset' => 'utf8'));
    }
    public static function createConnection(){
        $db = new dbconnection();
        return $db->db;
    }
}