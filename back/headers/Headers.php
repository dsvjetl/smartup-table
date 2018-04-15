<?php

class Headers {

    public function __construct()
    {
        $this->initHeaders();
        $this->enablePost();
    }

    private function initHeaders() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    }

    private function enablePost() {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }

}

$headers = new Headers();