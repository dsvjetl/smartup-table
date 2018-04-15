<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$tableId = $_POST['tableId'];
$orderedProducts = $_POST['orderedProducts'];

if (isset($tableId) && isset($orderedProducts)) {
    $data = (object)[
        'tableId' => $tableId,
        'orderedProducts' => $orderedProducts
    ];
    $db->makeOrder($data);
}
else {
    $db->returnError('Make order data not recieved');
}