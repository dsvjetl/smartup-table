<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$tableId = $_POST['tableId'];
$orderedProducts = $_POST['orderedProducts'];
$token = $_POST['token'];
$total = $_POST['total'];

if (isset($tableId) && isset($orderedProducts) && isset($token)) {
    $data = (object)[
        'tableId' => $tableId,
        'orderedProducts' => $orderedProducts,
        'token' => $token,
        'total' => $total
    ];
    $db->makeOrder($data);
}
else {
    $db->returnError('Make order data not recieved');
}