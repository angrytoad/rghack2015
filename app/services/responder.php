<?php

/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/11/2015
 * Time: 9:58 PM
 */
class responder
{
    public static function sendResponse($statusCode, $message = null){
        http_response_code($statusCode);
        if(!is_null($message)) {
            echo json_encode($message);
        }
    }
}