<?php

/*
 * This should be included whilst we are debugging the application
 */
error_reporting( E_ALL );
ini_set( "display_errors", 1 );

/*
 * Typically we'd handle this when we handle the back-end routing, but since we're calling specific scripts
 * we can just add it in here
 */
define('ROOT',$_SERVER['DOCUMENT_ROOT']);
require ROOT.'/rghack2015/app/services/classLoader.php';

class LoginController{

    private $login;
    private $request;

    public function __construct()
    {
        $this->request = new requestObject();
        $this->login = new LoginModel();
        $this->authenticateUser($this->request->getPOST());
    }

    public function authenticateUser($posted){
        if(isset($posted['name']) && strlen($posted['name']) > 0) {
            if ($this->login->attemptAuthentication($posted['name'])) {
                return responder::sendResponse(200, $posted['name']);
            } else {
                return responder::sendResponse(400);
            }
        }else{
            return responder::sendResponse(400);
        }
    }


}

new LoginController();
?>