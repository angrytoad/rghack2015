<?php
/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/11/2015
 * Time: 9:37 PM
 */
class requestObject
{
    public $request;
    private $get;
    private $post;
    public function __construct(){
        $this->loadFromGET();
        $this->loadFromPOST();
        $this->requestMerge();
    }
    private function loadFromGET(){
        foreach($_GET as $key => $value){
            $this->get[$key] = $value;
        }
    }
    private function loadFromPOST(){
        $this->post = json_decode(file_get_contents("php://input"));
    }
    private function requestMerge(){
        $this->request['GET'] = $this->get;
        $this->request['POST'] = $this->post;
    }
    public function getPOST(){
        return $this->post;
    }
    public function getGET(){
        return $this->get;
    }
}