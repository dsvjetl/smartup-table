<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$tableId = $_POST['tableId'];
$token = $_POST['token'];
$orderId = $_POST['orderId'];

if (isset($token) && isset($tableId) && isset($orderId)) {
    $db->makeDelivered($tableId, $token, $orderId);
}