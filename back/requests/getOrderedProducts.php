<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$tableId = $_GET['tableId'];
$token = $_GET['token'];

if (isset($tableId) && isset($token)) {
    $db->getOrdersByTokenAndId($tableId, $token, 'response');
}