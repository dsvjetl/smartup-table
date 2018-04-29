<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$token = $_POST['token'];
$tableId = $_POST['tableId'];

if (isset($token) && isset($tableId)) {
    $data = (object)[
        'tableId' => $tableId,
        'token' => $token
    ];
    $db->connectWithToken($data);
} else {
    $db->returnError('values not received');
}

