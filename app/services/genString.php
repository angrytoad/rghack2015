<?php

/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/12/2015
 * Time: 10:11 AM
 */
class genString
{

    public static function random8(){
        return substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyz", 8)), 0, 8);
    }

}